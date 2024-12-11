import { Divider } from "primereact/divider";
import { PageTitle, Spinner } from "@common";
import Overview from "./components/Overview";
import Upcoming from "./components/Upcoming";
import TasksCompletedTime from "./components/TasksCompletedTime";
import TasksPerPriority from "./components/TasksPerPriority";
import { Message } from "primereact/message";
import { useTasks } from "@queries";
import { useTranslations } from "@hooks/useTranslations";

const Dashboard = () => {
  const { data: tasks = [], isError, error, isLoading } = useTasks();
  const { t } = useTranslations();

  if (isLoading)
    return (
      <div className="flex flex-row justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );

  if (isError) return <Message severity="error" text={error?.message} />;

  return (
    <>
      <PageTitle>{t("common.dashboard")}</PageTitle>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col space-y-8 align-center justify-evenly space-x-0 lg:flex-row lg:space-y-0 lg:space-x-8">
          <div className="flex-1">
            <Upcoming tasks={tasks} />
          </div>
          <Divider layout="vertical" className="hidden lg:block" />
          <div className="flex-1">
            <Overview tasks={tasks} />
          </div>
        </div>
        <Divider layout="horizontal" className="hidden lg:block" />
        <div className="flex flex-col space-y-8 align-center justify-evenly space-x-0 lg:flex-row lg:space-y-0 lg:space-x-8">
          <div className="flex-1">
            <TasksCompletedTime tasks={tasks} />
          </div>
          <Divider layout="vertical" className="hidden lg:block" />
          <div className="flex-1">
            <TasksPerPriority tasks={tasks} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
