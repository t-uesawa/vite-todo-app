import { Avatar, Divider, Drawer, Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled } from "@mui/material";
import { indigo, lightBlue, pink } from "@mui/material/colors";

import pjson from '../package.json';

type Props = {
	drawerOpen: boolean;
	qrOpen: boolean;
	onDrawerOpen: () => void;
	onSort: (e: Filter) => void;
	onQrOpen: () => void;
};

// カスタムパーツの設定

// ドロワー内リストの幅
const DrawerList = styled('div')(() => ({
	width: 250,
}));
// ドロワーヘッダーのサイズ・色
const DrawerHeader = styled('div')(() => ({
	height: 150,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '1em',
	backgroundColor: indigo[500],
	color: '#ffffff',
	fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
}));
// ヘッダー内のアバター
const DrawerAvatar = styled(Avatar)(({ theme }) => ({
	backgroundColor: pink[500],
	width: theme.spacing(6),
	height: theme.spacing(6),
}));

export const SideBar = (props: Props) => {
	return (
		<Drawer
			variant="temporary"
			// 開閉状態
			open={props.drawerOpen}
			// 開閉トグル
			onClose={props.onDrawerOpen}
		>
			{/* カスタムパーツ */}
			<DrawerList role="presentation" onClick={props.onDrawerOpen}>
				{/* ヘッダー・アバター */}
				<DrawerHeader>
					<DrawerAvatar>
						<Icon>account_circle</Icon>
					</DrawerAvatar>
					<p>TODO v{pjson.version}</p>
				</DrawerHeader>
				{/* ここからリスト表示 */}
				<List>
					{/* すべて */}
					<ListItem disablePadding>
						<ListItemButton
							aria-label="list-all" onClick={() => props.onSort('all')}>
							<ListItemIcon>
								<Icon>subject</Icon>
							</ListItemIcon>
							<ListItemText secondary="すべてのタスク"></ListItemText>
						</ListItemButton>
					</ListItem>

					{/* 未完了 */}
					<ListItem disablePadding>
						<ListItemButton
							aria-label="list-all" onClick={() => props.onSort('unchecked')}>
							<ListItemIcon>
								<Icon sx={{ color: lightBlue[500] }}>radio_button_unchecked</Icon>
							</ListItemIcon>
							<ListItemText secondary="未完了タスク"></ListItemText>
						</ListItemButton>
					</ListItem>

					{/* 完了済みタスク */}
					<ListItem disablePadding>
						<ListItemButton
							aria-label="list-all" onClick={() => props.onSort('checked')}>
							<ListItemIcon>
								<Icon>check_circle_outline</Icon>
							</ListItemIcon>
							<ListItemText secondary="完了済みタスク"></ListItemText>
						</ListItemButton>
					</ListItem>

					{/* 削除 */}
					<ListItem disablePadding>
						<ListItemButton
							aria-label="list-all" onClick={() => props.onSort('removed')}>
							<ListItemIcon>
								<Icon>delete</Icon>
							</ListItemIcon>
							<ListItemText secondary="ゴミ箱"></ListItemText>
						</ListItemButton>
					</ListItem>
				</List>
			</DrawerList>

			<Divider></Divider>

			{/* 共有 */}
			<ListItem disablePadding>
				<ListItemButton
					aria-label="list-all" onClick={() => props.onQrOpen()}>
					<ListItemIcon>
						<Icon>qr_code_2</Icon>
					</ListItemIcon>
					<ListItemText secondary="このアプリを共有"></ListItemText>
				</ListItemButton>
			</ListItem>
		</Drawer>
	)
}