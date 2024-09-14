import React from 'react';
import { Dialog } from 'primereact/dialog';

export interface ConfirmDialogProps {
	header?: string;
	footer?: React.ReactNode;
	visible: boolean;
	handleHiding: () => void;
	content: React.ReactNode;
}

const ConfirmDialog = ({
	header = 'Confirm modal',
	footer,
	visible = false,
	content,
	handleHiding,
}: ConfirmDialogProps) => {
	return (
		<Dialog
			header={header}
			visible={visible}
			onHide={handleHiding}
			footer={footer}
			breakpoints={{ '960px': '75vw' }}
			style={{ width: '30vw' }}
		>
			{content}
		</Dialog>
	);
};

export default ConfirmDialog;
