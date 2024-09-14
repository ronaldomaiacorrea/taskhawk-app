export enum Status {
	TO_DO = 'To do',
	COMPLETED = 'Completed',
	BLOCKED = 'Blocked',
	OVERDUE = 'Overdue',
	IN_PROGRESS = 'In progress',
}

type Task = {
	id: number;
	title: string;
	description?: string;
	creationDate: Date;
	dueDate: Date;
	priority: 'High' | 'Medium' | 'Low';
	status: Status;
};

export const mockTasks: Task[] = [
	{
		id: 1,
		title: 'Prepare Quarterly Report',
		description:
			'Compile and prepare the quarterly financial and performance report.',
		creationDate: new Date('2023-06-17T04:40:15'),
		dueDate: new Date('2023-04-07T05:01:56'),
		priority: 'Low',
		status: Status.TO_DO,
	},
	{
		id: 2,
		title: 'Submit Expense Reimbursement',
		description:
			'Submit receipts and complete forms for expense reimbursement for the recent business trip.',
		creationDate: new Date('2023-04-01T15:32:08'),
		dueDate: new Date('2023-06-27T06:44:11'),
		priority: 'Low',
		status: Status.OVERDUE,
	},
	{
		id: 3,
		title: 'Fix Login Bug',
		description:
			'Identify and fix the bug in the user login system that has been reported.',
		creationDate: new Date('2023-04-29T03:35:39'),
		dueDate: new Date('2023-01-13T20:04:36'),
		priority: 'High',
		status: Status.COMPLETED,
	},
	{
		id: 4,
		title: 'Team Meeting for Project X',
		description:
			'Attend the project meeting to discuss progress, issues, and next steps for Project X.',
		creationDate: new Date('2023-07-01T13:00:29'),
		dueDate: new Date('2023-10-30T22:28:50'),
		priority: 'High',
		status: Status.OVERDUE,
	},
	{
		id: 5,
		title: 'Client Presentation Review',
		description:
			'Review and make adjustments to the client presentation scheduled for next week.',
		creationDate: new Date('2023-01-24T21:26:58'),
		dueDate: new Date('2023-04-13T00:49:00'),
		priority: 'Medium',
		status: Status.COMPLETED,
	},
	{
		id: 6,
		title: 'Research New Market Opportunities',
		description:
			'Research potential new markets for product expansion and present findings.',
		creationDate: new Date('2023-11-14T15:05:22'),
		dueDate: new Date('2023-07-20T06:10:41'),
		priority: 'Medium',
		status: Status.IN_PROGRESS,
	},
	{
		id: 7,
		title: 'Write Blog Post for Website',
		description:
			'Draft and publish a blog post outlining the latest product features.',
		creationDate: new Date('2023-10-12T19:12:08'),
		dueDate: new Date('2023-06-18T02:20:18'),
		priority: 'Low',
		status: Status.COMPLETED,
	},
	{
		id: 8,
		title: 'Update Product Documentation',
		description:
			'Update the product documentation to reflect new features and updates.',
		creationDate: new Date('2023-02-24T04:44:31'),
		dueDate: new Date('2023-03-23T03:35:26'),
		priority: 'Medium',
		status: Status.IN_PROGRESS,
	},
	{
		id: 9,
		title: 'Create Wireframes for New Feature',
		description:
			'Create wireframes and mockups for the new feature being added to the product.',
		creationDate: new Date('2023-08-01T15:10:09'),
		dueDate: new Date('2023-09-10T01:18:46'),
		priority: 'High',
		status: Status.BLOCKED,
	},
	{
		id: 10,
		title: 'Review Code Pull Request',
		description:
			'Review and approve code changes submitted in the pull request by the development team.',
		creationDate: new Date('2023-03-14T10:24:43'),
		dueDate: new Date('2023-05-05T11:32:29'),
		priority: 'Low',
		status: Status.BLOCKED,
	},
	{
		id: 11,
		title: 'Design Marketing Campaign',
		description:
			'Design and develop a marketing campaign for the upcoming product launch.',
		creationDate: new Date('2023-07-29T14:22:16'),
		dueDate: new Date('2023-12-25T17:42:35'),
		priority: 'High',
		status: Status.OVERDUE,
	},
	{
		id: 12,
		title: 'Conduct Performance Review',
		description:
			'Conduct performance reviews for team members and provide constructive feedback.',
		creationDate: new Date('2023-05-11T05:13:23'),
		dueDate: new Date('2023-04-16T09:54:48'),
		priority: 'Medium',
		status: Status.TO_DO,
	},
	{
		id: 13,
		title: 'Prepare Financial Forecast',
		description:
			'Prepare the financial forecast for the next fiscal year, including revenue and expense projections.',
		creationDate: new Date('2023-09-09T21:24:44'),
		dueDate: new Date('2023-07-31T22:15:11'),
		priority: 'High',
		status: Status.COMPLETED,
	},
	{
		id: 14,
		title: 'Organize Team Building Event',
		description:
			'Organize a team-building event to improve collaboration and morale within the team.',
		creationDate: new Date('2023-12-03T12:45:20'),
		dueDate: new Date('2023-11-11T20:22:50'),
		priority: 'Low',
		status: Status.TO_DO,
	},
	{
		id: 15,
		title: 'Review Supplier Contracts',
		description:
			'Review contracts from suppliers to ensure they meet company standards and requirements.',
		creationDate: new Date('2023-10-13T20:44:44'),
		dueDate: new Date('2023-01-09T08:41:37'),
		priority: 'High',
		status: Status.TO_DO,
	},
	{
		id: 16,
		title: 'Finalize Budget for Q3',
		description:
			'Finalize the budget for Q3, ensuring all projects and departments are accounted for.',
		creationDate: new Date('2023-10-19T06:45:56'),
		dueDate: new Date('2023-08-14T07:13:54'),
		priority: 'Medium',
		status: Status.IN_PROGRESS,
	},
	{
		id: 17,
		title: 'Develop API Integration',
		description:
			'Develop and test the API integration for the new external service.',
		creationDate: new Date('2023-08-20T07:24:42'),
		dueDate: new Date('2023-02-20T14:11:25'),
		priority: 'High',
		status: Status.COMPLETED,
	},
	{
		id: 18,
		title: 'Schedule Social Media Posts',
		description:
			'Schedule posts for social media platforms based on the marketing calendar.',
		creationDate: new Date('2023-06-17T16:01:27'),
		dueDate: new Date('2023-08-18T08:15:19'),
		priority: 'Medium',
		status: Status.IN_PROGRESS,
	},
	{
		id: 19,
		title: 'Test New Software Release',
		description:
			'Test the latest software release for bugs and performance issues before deployment.',
		creationDate: new Date('2023-02-21T19:06:24'),
		dueDate: new Date('2023-07-19T05:01:04'),
		priority: 'High',
		status: Status.COMPLETED,
	},
	{
		id: 20,
		title: 'Plan Company Retreat',
		description:
			'Plan and coordinate logistics for the company retreat, including venue, travel, and activities.',
		creationDate: new Date('2023-11-05T18:17:53'),
		dueDate: new Date('2023-10-17T03:57:37'),
		priority: 'High',
		status: Status.OVERDUE,
	},
];
