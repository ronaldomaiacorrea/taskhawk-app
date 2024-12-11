import { Chart } from "primereact/chart";
import { getOverviewChartData } from "@utils";
import { Card } from "primereact/card";
import EmptyData from "src/common/EmptyData";
import { Task } from "@shared/types";
import { useTranslations } from "@hooks/useTranslations";

interface OverviewProps {
  tasks: Task[];
}

const Overview = ({ tasks }: OverviewProps) => {
  const { t } = useTranslations();
  const { chartData, options } = getOverviewChartData(tasks);

  return (
    <Card
      title={t("dashboard.statusOverviewTitle")}
      className="rounded-none"
      subTitle={t("dashboard.statusOverviewDescription")}
    >
      <div className="border-b border-gray-300 mb-4" />
      <div className="flex flex-row justify-center items-center">
        <div
          className="w-3/4 h-full"
          style={{
            position: "relative",
          }}
        >
          {chartData?.datasets?.[0]?.data?.some(
            (item: number) => item !== 0,
          ) ? (
            <Chart type="pie" data={chartData} options={options} />
          ) : (
            <div className="flex justify-center items-center h-full">
              <EmptyData message={t("tasks.notDefined")} />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Overview;
