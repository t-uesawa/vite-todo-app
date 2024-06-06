import { AppBar, Box, Icon, IconButton, Toolbar, Typography } from "@mui/material";

// import Box from '@mui/material/Box';
// import Icon from '@mui/material/Icon';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';

type Props = {
	filter: Filter
	onDrawerOpen: () => void;
}

const translator = (str: Filter) => {
	switch (str) {
		case 'all':
			return 'すべてのタスク';
		case 'checked':
			return '完了済みタスク';
		case 'unchecked':
			return '未完了タスク';
		case 'removed':
			return 'ごみ箱';
		default:
			return '予想外!!!!!';
	}
}

export const ToolBar = (props: Props) => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						aria-label="menu-button"
						size="large"
						edge="start"
						sx={{ mr: 2 }}
						onClick={props.onDrawerOpen}
					>
						<Icon>menu</Icon>
					</IconButton>
					<Typography>{translator(props.filter)}</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
}