import type { Task } from '@shared/types';

interface PriorityInfo {
	icon: string;
	text: string;
}

const priorityMapping: Record<Task['priority'], PriorityInfo> = {
	High: {
		icon: 'pi pi-arrow-up',
		text: 'HIGH',
	},
	Medium: {
		icon: 'pi pi-arrow-right',
		text: 'MEDIUM',
	},
	Low: {
		icon: 'pi pi-arrow-down',
		text: 'LOW',
	},
};

export interface PriorityBadgeProps {
	task: Task;
}

const PriorityBadge = ({ task }: PriorityBadgeProps) => {
	const priorityInfo = priorityMapping[task.priority] || {};
	const { text, icon } = priorityInfo;
	if (!priorityInfo) return null;

	return (
		<>
			<i className={`${icon} pr-2`} />
			{text}
		</>
	);
};

export default PriorityBadge;
