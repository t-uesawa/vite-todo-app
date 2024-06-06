import { useEffect, useState } from 'react';
// import './App.css'
import localforage from 'localforage';
import { FormDialog } from './FormDialog';
import { ActionButton } from './ActionButton';
import { SideBar } from './SideBar';
import { TodoItems } from './TodoItem';
import { ToolBar } from './ToolBar';
import { GlobalStyles, ThemeProvider, createTheme } from '@mui/material';
import { indigo, pink } from '@mui/material/colors';
import { QR } from './QR';
import { AlertDialog } from './AlertDialog';
import { isTodos } from './lib/isTodos';

// MUI テーマ作成
const theme = createTheme({
  palette: {
    // プライマリーカラー
    primary: {
      main: indigo[500],
      light: '#757de8',
      dark: '#002984',
    },
    // セカンダリーカラー
    secondary: {
      main: pink[500],
      light: '#ff6090',
      dark: '#b0003a',
    }
  }
});

export const App = () => {
  // タスク入力値
  const [text, setText] = useState('');
  // タスクリスト
  const [todos, setTodos] = useState<Todo[]>([]);
  // フィルター
  const [filter, setFilter] = useState<Filter>('all');
  // ドロワー状態
  const [drawerOpen, setdrawerOpen] = useState<boolean>(false);
  // QR状態
  const [qrOpen, setQrOpen] = useState<boolean>(false);
  // 新規作成ダイアログ
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  // 削除前アラート
  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  const handleChange = (text: string) => {
    setText(text);
  }

  // todosステートを追加する関数
  const handleSubmit = () => {
    if (!text) {
      // 入力値がなければダイアログを閉じる
      setDialogOpen(dialogOpen => !dialogOpen);
      return;
    }
    // ミューテート防止のための新しい配列
    const newTodos: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };
    // スプレッド構文を用いて新しいタスクを先頭に全てのタスクを返す
    setTodos((todos) => [newTodos, ...todos]);

    // 更新後は入力フォームの値をクリア
    setText('');
    // FormDialog コンポーネントを閉じる
    setDialogOpen(dialogOpen => !dialogOpen);
  };

  // 登録済みタスク編集・タスク完了チェック・タスク削除
  const handleTodo = <A extends keyof Todo, B extends Todo[A]>(id: number, key: A, value: B) => {
    setTodos(todos => {
      // ミューテート防止のため新しい配列を生成
      const newTodos = todos.map(todo => {
        // idが一致するタスクの値を変更
        if (todo.id == id) {
          /**
           * todo.value = value;
           * 上記はシャローコピーの関係で元データを触っていることになる
           */
          return { ...todo, [key]: value };
        }
        // 何も変更していないタスクまたは値を変更したタスクを返す
        return todo;
      });
      return newTodos;
    });
  }

  // フィルターチェンジ
  const handleSort = (filter: Filter) => {
    setFilter(filter);
  }

  // ゴミ箱を空にする
  const handleEmpty = () => {
    setTodos(todos => {
      const newTodos = todos.filter(todo => {
        return !todo.removed;
      });
      return newTodos;
    });
  }

  // ドロワー状態を反転する
  const handleDrawerOpen = () => {
    setdrawerOpen((drawerOpen => !drawerOpen));
  }

  // QR表示状態を反転
  const handleQrOpen = () => {
    setQrOpen(qrOpen => !qrOpen);
  }

  // タスク追加ダイアログの状態を反転
  const handleDialogOpen = () => {
    setDialogOpen(dialogOpen => !dialogOpen);
    // 入力フォームの中身をクリア
    setText('');
  }

  // 削除前アラート
  const handleAlertOpen = () => {
    setAlertOpen(alertOpen => !alertOpen);
  }

  // ローカルストレージからデータを取得（第2引数が空配列なのでマウント時のみ実行）
  useEffect(() => {
    localforage
      .getItem('todo-list')
      .then(values => isTodos(values) && setTodos(values));
  }, []);

  // todosステートが更新されたらローカルストレージに保存
  useEffect(() => {
    localforage.setItem('todo-list', todos);
  }, [todos]);


  // JSXです
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />

      <ToolBar filter={filter} onDrawerOpen={handleDrawerOpen}></ToolBar>

      <SideBar drawerOpen={drawerOpen} qrOpen={qrOpen} onSort={handleSort} onDrawerOpen={handleDrawerOpen} onQrOpen={handleQrOpen}></SideBar>
      <QR qrOpen={qrOpen} onClose={handleQrOpen}></QR>

      <FormDialog text={text} dialogOpen={dialogOpen} onChange={handleChange} onSubmit={handleSubmit} onDialogOpen={handleDialogOpen}></FormDialog>
      <AlertDialog alertOpen={alertOpen} onAlertOpen={handleAlertOpen} onEmpty={handleEmpty}></AlertDialog>

      <TodoItems todos={todos} filter={filter} onTodo={handleTodo}></TodoItems>

      <ActionButton
        todos={todos}
        filter={filter}
        alertOpen={alertOpen}
        dialogOpen={dialogOpen}
        onAlertOpen={handleAlertOpen}
        onDialogOpen={handleDialogOpen}>

      </ActionButton>

    </ThemeProvider>
  );
};

export default App