import { hexToRgba } from "@utils";
import type { Task } from "@shared/types";
import { Status } from "@shared/types";
import { TooltipItem } from "chart.js";
import { backgroundColors } from "@constants";

/**
 * Generates chart data and configuration options for an overview chart based on task statuses.
 *
 * @param {Task[] | undefined} data - An array of tasks or undefined.
 * @returns {Object} An object containing the chart data and options.
 *
 */
export const getOverviewChartData = (data: Task[] | undefined) => {
  const labels = Object.values(Status);
  const dataValues = new Array(7).fill(0);

  const statusIndexMap: Record<Status, number> = {
    [Status.TO_DO]: 0,
    [Status.COMPLETED]: 1,
    [Status.BLOCKED]: 2,
    [Status.OVERDUE]: 3,
    [Status.IN_PROGRESS]: 4,
  };

  data?.forEach((task) => {
    const index = statusIndexMap[task.status];
    if (index !== undefined) {
      dataValues[index]++;
    }
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        text: "Status",
        borderRadius: 10,
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        boxPadding: 5,
        callbacks: {
          label: function (tooltipItem: TooltipItem<"pie">) {
            const data = tooltipItem.dataset.data as number[];
            const currentValue = data[tooltipItem.dataIndex as number];

            const total = data.reduce(
              (acc: number, value: number) => acc + value,
              0,
            );
            const percentage = ((currentValue / total) * 100).toFixed(2);

            return `${percentage}%`;
          },
        },
      },
    },
  };

  const chartBackgroundColors = dataValues.map((_, index) => {
    const taskStatus = labels[index] as Status;
    return backgroundColors[taskStatus];
  });

  const chartData = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: chartBackgroundColors,
        borderWidth: 2,
        hoverBackgroundColor: chartBackgroundColors.map((color) =>
          hexToRgba(color, 0.8),
        ),
        hoverBorderColor: chartBackgroundColors.map((color) =>
          hexToRgba(color, 1),
        ),
      },
    ],
  };

  return { chartData, options };
};
