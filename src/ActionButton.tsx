import { Fab, Icon, styled } from "@mui/material";

type Props = {
	todos: Todo[];
	filter: Filter;
	alertOpen: boolean;
	dialogOpen: boolean;
	onAlertOpen: () => void;
	onDialogOpen: () => void;
}

const FabButton = styled(Fab)({
	position: 'fixed',
	right: 15,
	bottom: 15,
});

export const ActionButton = (props: Props) => {
	const removed = props.todos.filter((todo) => todo.removed).length !== 0;

	return (
		<>
			{props.filter === 'removed' ? (
				<FabButton
					aria-label="fab-delete-button"
					color="secondary"
					onClick={props.onAlertOpen}
					disabled={!removed || props.alertOpen}
				>
					<Icon>delete</Icon>
				</FabButton>
			) : (
				<FabButton
					aria-label="fab-add-button"
					color="secondary"
					onClick={props.onDialogOpen}
					disabled={props.filter === 'checked' || props.dialogOpen}
				>
					<Icon>create</Icon>
				</FabButton>
			)}
		</>
	);
};