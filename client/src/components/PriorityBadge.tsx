import type { Task } from '@shared/types';

interface PriorityInfo {
	icon: string;
	text: string;
	textColor: string;
}

const priorityMapping: Record<Task['priority'], PriorityInfo> = {
	High: {
		icon: 'pi pi-arrow-up',
		text: 'HIGH',
		textColor: 'text-red-500',
	},
	Medium: {
		icon: 'pi pi-arrow-right',
		text: 'MEDIUM',
		textColor: 'text-orange-500',
	},
	Low: {
		icon: 'pi pi-arrow-down',
		text: 'LOW',
		textColor: 'text-indigo-500',
	},
};

export interface PriorityBadgeProps {
	task: Task;
}

const PriorityBadge = ({ task }: PriorityBadgeProps) => {
	const priorityInfo = priorityMapping[task.priority] || {};
	const { text, icon, textColor } = priorityInfo;
	if (!priorityInfo) return null;

	return (
		<div className={textColor}>
			<i className={`${icon} pr-2`} />
			{text}
		</div>
	);
};

export default PriorityBadge;
