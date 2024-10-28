import { Status } from '@shared/types';
import { StatusColors } from './colors';

export const backgroundColors: Record<Status, StatusColors> = {
	'To do': StatusColors.TODO,
	Completed: StatusColors.COMPLETED,
	Blocked: StatusColors.BLOCKED,
	Overdue: StatusColors.OVERDUE,
	'In progress': StatusColors.IN_PROGRESS,
};
