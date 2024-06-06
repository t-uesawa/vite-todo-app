import { Button, Dialog, DialogActions, TextField } from "@mui/material";

type Props = {
	text: string;
	dialogOpen: boolean;
	onSubmit: () => void;
	onChange: (e: string) => void;
	onDialogOpen: () => void;
}

export const FormDialog = (props: Props) => (
	<Dialog fullWidth open={props.dialogOpen} onClose={props.onDialogOpen}>
		<form onSubmit={e => {
			// Enterページリロード防止
			e.preventDefault();
			// タスク追加
			props.onSubmit();
		}}>
			<div style={{ margin: '1rem' }}>
				<TextField
					aria-label="todo-input"
					variant="standard"
					style={{
						width: '100%',
						fontSize: '16px',
						fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
					}}
					label='タスクを入力'
					value={props.text}
					autoFocus
					onChange={(e) => props.onChange(e['target']['value'])} />
				<DialogActions>
					<Button
						aria-label="form-add"
						color="secondary"
						onClick={props.onSubmit}
					>登録</Button>
				</DialogActions>
			</div>
		</form>
	</Dialog>
)