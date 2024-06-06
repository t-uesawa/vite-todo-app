import { Button, Card, Icon, TextField, Typography, styled } from "@mui/material";
import { grey, lightBlue, pink } from "@mui/material/colors";

type Props = {
	todos: Todo[];
	filter: Filter;
	onTodo: <K extends keyof Todo, V extends Todo[K]>(
		id: number,
		key: K,
		value: V
	) => void;
};

const Container = styled('div')({
	margin: '0 auto',
	maxWidth: '640px',
	fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
});

const TodoCard = styled(Card)(({ theme }) => ({
	marginTop: theme.spacing(1),
	marginLeft: theme.spacing(2),
	marginRight: theme.spacing(2),
	padding: theme.spacing(2),
	fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
}));

const Form = styled('div')(({ theme }) => ({
	marginTop: theme.spacing(1),
	marginLeft: theme.spacing(1),
	marginRight: theme.spacing(1),
	fontSize: '16px',
}));

const ButtonContainer = styled('div')(({ theme }) => ({
	marginTop: theme.spacing(1),
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
}));

const Trash = styled('button')(() => ({
	background: 'none',
	border: 'none',
	cursor: 'pointer',
	outline: 'none',
}));

export const TodoItems = (props: Props) => {
	// フィルタリング変数
	const filteredTodos = props.todos.filter(todo => {
		// filterステートの値に応じて適した内容の配列を返す
		switch (props.filter) {
			case 'all':
				// 削除されていないTODO
				return !todo.removed;
			case 'checked':
				// 完了済みと削除されていないTODO
				return !todo.removed && todo.checked;
			case 'unchecked':
				// 未完了と削除されていないTODO
				return !todo.removed && !todo.checked;
			case 'removed':
				// 削除されているTODO
				return todo.removed;
			default:
				return todo;
		}
	});

	return (
		<Container>
			{filteredTodos.map(todo => {
				return (
					<TodoCard key={todo.id}>
						<Form>
							<TextField
								aria-label={`todo-${todo.value}`}
								fullWidth
								variant="standard"
								value={todo.value}
								disabled={todo.checked || todo['removed']}
								onChange={(e) => props.onTodo(todo.id, 'value', e['target']['value'])}
							/>
						</Form>
						<ButtonContainer>
							<Button
								aria-label={`todo-${todo.value}`}
								onClick={() => props.onTodo(todo['id'], 'checked', !todo['checked'])}
								disabled={props.filter === 'removed'}
							>
								{todo.checked ? (<Icon aria-label={`todo-${todo.value}`} style={{ color: props.filter !== 'removed' ? pink.A200 : grey[500], }}>
									check_circle_outline
								</Icon>) : (
									<Icon aria-label={`todo-uncheck-${todo.value}`}
										style={{
											color:
												props.filter !== 'removed' ? lightBlue[500] : grey[500],
										}}>
										radio_button_unchecked
									</Icon>)}
								<Typography
									style={{
										userSelect: 'none',
										color:
											todo.checked && props.filter !== 'removed'
												? pink.A200
												: grey[500],
									}}
								>
									完了
								</Typography>
							</Button>
							<Trash
								aria-label={`todo-trash-${todo.value}`}
								onClick={() => props.onTodo(todo.id, 'removed', !todo.removed)}
							>
								{todo.removed ? (
									<Icon
										aria-label={`todo-undo-${todo.value}`}
										style={{ color: lightBlue[500] }}
									>
										undo
									</Icon>
								) : (
									<Icon
										aria-label={`todo-delete-${todo.value}`}
										style={{ color: grey[500] }}
									>
										delete
									</Icon>
								)}
							</Trash>
						</ButtonContainer>
					</TodoCard>
				)
			})}
		</Container>
	)
}