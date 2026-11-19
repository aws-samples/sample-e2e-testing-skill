// ビューアの出力を features/viewer/ に書く。新しい出力を書き終えてから入れ替え、前回の出力は入れ替えが済むまで失わない。
// 作業場所は features/ の中に作る。os.tmpdir() は別のドライブになり、そこからは移せないことがあるため。
// Windows でも同じに動くよう、ファイル操作は node:fs と node:path だけで行い、子プロセスを起動しない
import { randomBytes } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

/** 作業場所(書き込み先と退避先)の名前の頭 */
const WORK_PREFIX = '.viewer-';
/** 前に落ちたビルドの作業場所とみなす古さ。同じ時刻に走っている別のビルドの作業場所は消さない */
const STALE_MS = 60 * 60 * 1000;

function messageOf(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

function workName(kind: string): string {
  return `${WORK_PREFIX}${kind}${randomBytes(6).toString('hex')}`;
}

/** 消せなかったものは残して続ける。次のビルドで消す */
function removeQuietly(dir: string): void {
  try {
    fs.rmSync(dir, { recursive: true, force: true });
  } catch {
    // 消せなくても続ける
  }
}

/** features/ の直下の作業場所のうち、更新から 1 時間以上たったものを消す */
function removeStaleWorkDirs(featuresDir: string): void {
  const now = Date.now();
  for (const entry of fs.readdirSync(featuresDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || !entry.name.startsWith(WORK_PREFIX)) continue;
    const dir = path.join(featuresDir, entry.name);
    try {
      if (now - fs.statSync(dir).mtimeMs >= STALE_MS) removeQuietly(dir);
    } catch {
      // 調べられなくても続ける
    }
  }
}

/** プロジェクトのルート root の features/viewer/ を、files(ファイル名 → 中身)だけを持つディレクトリに入れ替える */
export function replaceOutput(root: string, files: Readonly<Record<string, string>>): void {
  const featuresDir = path.join(root, 'features');
  /** エラーに書く、ルートからの POSIX のパス */
  const rel = (dir: string): string => `${path.relative(root, dir).split(path.sep).join('/')}/`;
  // 1. 前に落ちたビルドの残りを片づける
  removeStaleWorkDirs(featuresDir);
  // 2. 書き込み先を作って全部書く
  const work = path.join(featuresDir, workName(''));
  fs.mkdirSync(work);
  for (const [name, text] of Object.entries(files)) fs.writeFileSync(path.join(work, name), text);
  // 3. 前回の出力を退避する。退避先は名前を決めるだけで作らない(Windows では、すでにあるディレクトリの上には移せないため)
  const output = path.join(featuresDir, 'viewer');
  const old = path.join(featuresDir, workName('old-'));
  const hadOutput = fs.existsSync(output);
  if (hadOutput) {
    try {
      fs.renameSync(output, old);
    } catch (e) {
      removeQuietly(work);
      throw new Error(
        `features/viewer/ を入れ替えられない(${messageOf(e)})。features/viewer/ の中のファイルを開いているアプリを閉じてから、ビルドし直す`,
      );
    }
  }
  // 4. 新しいものを移す。移せなければ、退避したものを戻す
  try {
    fs.renameSync(work, output);
  } catch (e) {
    let restored = !hadOutput;
    if (hadOutput) {
      try {
        fs.renameSync(old, output);
        restored = true;
      } catch {
        // 戻せなければ、下で退避先と書き込み先の両方のパスをエラーに書く
      }
    }
    if (!restored) {
      throw new Error(`features/viewer/ を書けない(${messageOf(e)})。前回の出力は ${rel(old)}、今回の出力は ${rel(work)} に残っている`);
    }
    removeQuietly(work);
    throw new Error(`features/viewer/ を書けない(${messageOf(e)})`);
  }
  // 5. 退避したものを、再試行を付けて消す。Windows ではウイルス対策ソフトなどがファイルをしばらく掴んでいることがある
  if (hadOutput) {
    try {
      fs.rmSync(old, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 });
    } catch (e) {
      process.stderr.write(`${rel(old)} を消せなかった(${messageOf(e)})\n`);
    }
  }
}
