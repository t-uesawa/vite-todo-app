import { Backdrop, styled } from "@mui/material"
import { QRCode } from "react-qrcode-logo";

type Props = {
	qrOpen: boolean;
	onClose: () => void;
}

const TodoBackdrop = styled(Backdrop)(({ theme }) => ({
	zIndex: theme.zIndex.drawer + 1,
	color: '#fff',
	backgroundColor: 'rgba(0, 0, 0, 0.8)',
}));

export const QR = (props: Props) => {
	return (
		<TodoBackdrop open={props.qrOpen} onClick={props.onClose}>
			<QRCode value="https://sprout2000.github.io/todo"></QRCode>
		</TodoBackdrop>
	)
}