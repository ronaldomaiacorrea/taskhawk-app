import { Status } from '@shared/types';
import type { Task } from '@shared/types';

interface StatusInfo {
	color: string;
	icon: string;
	text: string;
}

const statusMapping: Record<Task['status'], StatusInfo> = {
	[Status.OVERDUE]: {
		color: 'text-red-500',
		icon: 'pi pi-exclamation-triangle',
		text: 'Overdue',
	},
	[Status.COMPLETED]: {
		color: 'text-green-500',
		icon: 'pi pi-check-circle',
		text: 'Completed',
	},
	[Status.IN_PROGRESS]: {
		color: 'text-blue-500',
		icon: 'pi pi-spinner',
		text: 'In Progress',
	},
	[Status.TO_DO]: {
		color: '',
		icon: 'pi pi-calendar',
		text: 'To Do',
	},
	[Status.BLOCKED]: {
		color: 'text-orange-500',
		icon: 'pi pi-ban',
		text: 'Blocked',
	},
};

export interface StatusBadgeProps {
	task: Task;
}

const StatusBadge = ({ task }: StatusBadgeProps) => {
	const statusInfo = statusMapping[task.status] || {};
	const { text, color, icon } = statusInfo;
	if (!statusInfo) return null;

	return (
		<div className={color}>
			<i className={`${icon} pr-2`} />
			{text}
		</div>
	);
};

export default StatusBadge;
