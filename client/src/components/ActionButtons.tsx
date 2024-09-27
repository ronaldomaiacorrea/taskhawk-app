import { Button } from 'primereact/button';

export interface ActionButtonsProps {
	handleCloseDialog: () => void;
	handleSubmit: () => void;
	handleResetForm: () => void;
}

const ActionButtons = ({
	handleCloseDialog,
	handleSubmit,
	handleResetForm,
}: ActionButtonsProps) => {
	return (
		<>
			<Button
				label="Cancel"
				className="p-button-text"
				onClick={() => {
					handleResetForm();
					handleCloseDialog();
				}}
				text
				severity="secondary"
			/>
			<Button
				label="Save"
				className="p-button-primary"
				onClick={handleSubmit}
			/>
		</>
	);
};

export default ActionButtons;
