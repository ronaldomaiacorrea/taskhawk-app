import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

export interface ConfirmDialogProps {
	header?: string;	
	visible: boolean;
	handleHiding: () => void;
	content: React.ReactNode;
	onConfirm: () => void;
}

const ConfirmDialog = ({
	header = 'Confirm modal',
	visible = false,
	content,
	handleHiding,
	onConfirm
}: ConfirmDialogProps) => {

	const footerContent = (
		<>
			<Button
				label="No"
				icon="pi pi-times"
				onClick={handleHiding}
				autoFocus
			/>
			<Button
				label="Yes"
				icon="pi pi-check"
				text
				onClick={onConfirm}
				severity="secondary"
			/>
		</>
	);

	return (
		<Dialog
			header={header}
			visible={visible}
			onHide={handleHiding}
			footer={footerContent}
			breakpoints={{ '960px': '75vw' }}
			style={{ width: '30vw' }}
		>
			{content}
		</Dialog>
	);
};

export default ConfirmDialog;
