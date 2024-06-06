import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled } from "@mui/material"

type Props = {
	alertOpen: boolean;
	onAlertOpen: () => void;
	onEmpty: () => void;
};

const Alert = styled(Dialog)(() => ({
	fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
}));

export const AlertDialog = (props: Props) => (
	<Alert open={props.alertOpen} onClose={props.onAlertOpen}>
		<DialogTitle>注意</DialogTitle>
		<DialogContent>
			<DialogContentText>ゴミ箱を完全に空にしますか?</DialogContentText>
			<DialogContentText>この操作は取消しできません</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button
				aria-label="alert-cancel"
				onClick={props.onAlertOpen}
				color="primary"
			>
				キャンセル
			</Button>
			<Button
				aria-label="alert-success"
				onClick={() => {
					props.onAlertOpen();
					props.onEmpty()
				}}
				color="secondary"
				autoFocus
			>
				OK
			</Button>
		</DialogActions>
	</Alert>
)