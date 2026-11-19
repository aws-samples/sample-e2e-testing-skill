// 表の列の幅を、見出しのセルの右端のつまみで変えられるようにする。build.mjs が出す HTML の <script> と、Storybook のストーリーの両方から呼ぶ。
// スクリプトが無くても表は CSS と colgroup で決まる幅で読めるので、ここでは幅を変える手段だけを足す。幅は保存しない。
// 最初につまみを動かすまで表はその幅のままにし、動かしたときに、そのときの列の幅を px で colgroup の col に書いて table-layout: fixed にする。
// colgroup の無い表には足す。表の幅も px にするので、ほかの列の幅は変わらず、表がページより広くなったら外枠で横にスクロールする

/** 矢印キー 1 回で変える幅(px) */
const KEY_STEPS: Record<string, number> = { ArrowLeft: -16, ArrowRight: 16 };
/** 列の最小幅(em)。表の文字の大きさで px にする */
const MIN_WIDTH_EM = 4;
/** つまみの値の上限(px)。幅に上限は無いが、aria-valuemax が無いと既定の 100 で値が頭打ちになるので、幅が届かない値にする */
const MAX_WIDTH_PX = Number.MAX_SAFE_INTEGER;

/** root の中の table.resizable の見出しの各セルに、その列の幅を変えるつまみを付ける */
export function enableColumnResize(root: ParentNode): void {
  for (const table of root.querySelectorAll<HTMLTableElement>('table.resizable')) makeResizable(table);
}

function makeResizable(table: HTMLTableElement): void {
  const doc = table.ownerDocument;
  const headers = [...(table.tHead?.rows[0]?.cells ?? [])];
  const minWidth = Number.parseFloat(getComputedStyle(table).fontSize) * MIN_WIDTH_EM;
  /** colgroup に移した後の列の幅と表の幅(px)。移すまでは null */
  let fixed: { cols: HTMLTableColElement[]; widths: number[]; tableWidth: number } | null = null;

  const widthOf = (index: number): number => fixed?.widths[index] ?? headers[index].getBoundingClientRect().width;

  /** index の列の幅を width にして、実際の幅を返す。最小幅より狭くはしない。ただし、もとから最小幅より狭い列を広げはしない */
  const resize = (index: number, width: number): number => {
    if (fixed === null) {
      const widths = headers.map((th) => th.getBoundingClientRect().width);
      const colgroup =
        table.querySelector<HTMLTableColElement>(':scope > colgroup') ??
        table.insertBefore(doc.createElement('colgroup'), table.firstChild);
      const existing = [...colgroup.querySelectorAll<HTMLTableColElement>(':scope > col')];
      const cols = widths.map((w, column) => {
        const col = existing[column] ?? colgroup.appendChild(doc.createElement('col'));
        col.style.width = `${w}px`;
        return col;
      });
      fixed = { cols, widths, tableWidth: table.getBoundingClientRect().width };
      table.style.tableLayout = 'fixed';
      table.style.width = `${fixed.tableWidth}px`;
    }
    const current = fixed.widths[index];
    const next = Math.max(Math.min(minWidth, current), width);
    fixed.widths[index] = next;
    fixed.tableWidth += next - current;
    fixed.cols[index].style.width = `${next}px`;
    table.style.width = `${fixed.tableWidth}px`;
    return next;
  };

  headers.forEach((th, index) => {
    const name = th.textContent?.trim() ?? '';
    // 見出しの名前を中身から計算させると、中のつまみの値が混ざって「本文 317」のようになるので、元の文字列を名前にする
    th.setAttribute('aria-label', name);
    const handle = doc.createElement('span');
    handle.className = 'col-resize';
    handle.tabIndex = 0;
    handle.setAttribute('role', 'separator');
    handle.setAttribute('aria-orientation', 'vertical');
    handle.setAttribute('aria-label', `「${name}」の列の幅`);
    handle.setAttribute('aria-valuemin', String(Math.round(minWidth)));
    handle.setAttribute('aria-valuemax', String(MAX_WIDTH_PX));
    const show = (width: number): void => {
      const px = Math.round(width);
      handle.setAttribute('aria-valuenow', String(px));
      handle.setAttribute('aria-valuetext', `${px}px`);
    };
    show(widthOf(index));

    handle.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return;
      // 文字の選択を始めない
      event.preventDefault();
      const startX = event.clientX;
      const startWidth = widthOf(index);
      const move = (e: PointerEvent): void => show(resize(index, startWidth + e.clientX - startX));
      const end = (): void => {
        doc.removeEventListener('pointermove', move);
        doc.removeEventListener('pointerup', end);
        doc.removeEventListener('pointercancel', end);
      };
      // つまみの外にポインターが出ても追えるよう、文書全体で受ける
      doc.addEventListener('pointermove', move);
      doc.addEventListener('pointerup', end);
      doc.addEventListener('pointercancel', end);
    });

    handle.addEventListener('keydown', (event) => {
      const step = KEY_STEPS[event.key];
      if (step === undefined) return;
      // 表の外枠を横にスクロールさせない
      event.preventDefault();
      show(resize(index, widthOf(index) + step));
    });

    th.append(handle);
  });
}
