# 引用元: docs/requirements.md > 3.2 認証
Feature: ログイン

  Background:
    Given ログインページを表示している

  # 引用元: docs/requirements.md > 3.2.1 送信
  Rule: REQ-001 WHEN 正しい資格情報を送信した, the 会員サイト SHALL ダッシュボードを表示する

    Background:
      Given ログインしていない

    @REQ-001-1
    Scenario: REQ-001-1 正しい資格情報でログインできる
      When 次の資格情報を入力して送信する
        | 項目 | 値 |
        | メールアドレス | user@example.com |
        | パスワード | pass\|word |
      Then ダッシュボードに「ようこそ」と表示される

    # 引用元: docs/requirements.md > 3.2.2 エラー表示
    @REQ-001-2
    Scenario Outline: REQ-001-2 必須項目が空のときはエラーが表示される
      When <項目> を空にして送信する
      Then 「<期待メッセージ>」と表示される

      Examples:
        | 項目 | 期待メッセージ |
        | メールアドレス | メールアドレスを入力してください |
        | パスワード | パスワードを入力してください |

    @REQ-001-3
    Scenario: REQ-001-3 メールアドレスの大文字小文字を区別せずにログインできる
      When メールアドレスを大文字で入力して送信する
      Then ダッシュボードに「ようこそ」と表示される

  Rule: REQ-002 IF 5 回続けて誤ったパスワードを送信した, THEN the 会員サイト SHALL アカウントをロックする

    @REQ-002-1
    Scenario: REQ-002-1 5 回失敗するとロックされる
      When 誤ったパスワードで 5 回送信する
      Then 次の通知が表示される
        """
        アカウントをロックしました。
        管理者に連絡してください。
        """
