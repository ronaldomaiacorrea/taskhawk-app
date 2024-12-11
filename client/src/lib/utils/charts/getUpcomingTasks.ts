import type { Task } from "@shared/types";
import { Status } from "@shared/types";

/**
 * Filters and sorts a list of tasks to return only the upcoming tasks.
 *
 * @param {Task[]} tasks - The array of tasks to filter and sort.
 * @returns {Task[]} - An array of tasks that are not completed or overdue, sorted by due date in ascending order.
 */
export const getUpcomingTasks = (tasks: Task[]) =>
  tasks
    ?.filter(
      (task) =>
        task.status !== Status.COMPLETED && task.status !== Status.OVERDUE,
    )
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    );
