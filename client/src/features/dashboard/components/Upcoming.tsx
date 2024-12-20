import { ConfirmDialog } from "@common";
import { useTranslations } from "@hooks/useTranslations";
import type { Task } from "@shared/types";
import { dateTemplate, getUpcomingTasks } from "@utils";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Toolbar } from "primereact/toolbar";
import { useState } from "react";
import EmptyData from "src/common/EmptyData";


interface UpcomingProps {
  tasks: Task[];
}

const Upcoming = ({ tasks }: UpcomingProps) => {
  const { t } = useTranslations();
  const [visible, setVisible] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<Task[] | null>(null);

  const checkButton = (
    <Button
      icon="pi pi-check"
      label="Mark as completed"
      outlined
      disabled={!selectedTasks || selectedTasks.length === 0}
      onClick={() => {
        if (!selectedTasks) {return;}
        setVisible(true);
      }}
    />
  );

  const dialogContent = (
    <>
      <p className="py-4">{t("dashboard.markCompletedMessage")}</p>
      <ul>
        {selectedTasks?.map((task) => (
          <li key={task.id} className="p-1 px-2">
            {task.title}
          </li>
        ))}
      </ul>
    </>
  );

  const dueDateTemplate = (rowData: Task) => dateTemplate(rowData?.dueDate);

  return (
    <>
      <Card
        title={t("dashboard.upComingDeadlinesTitle")}
        subTitle={t("dashboard.upComingDeadlinesDescription")}
      >
        <div className="border-b border-gray-300 mb-4" />
        {tasks.length > 0 && (
          <Toolbar className="mb-4" start={checkButton}></Toolbar>
        )}
        <DataTable
          stripedRows
          value={getUpcomingTasks(tasks)}
          paginator
          emptyMessage={<EmptyData message={t("tasks.notDefined")} />}
          rows={5}
          rowsPerPageOptions={[5, 10, 20]}
          selection={selectedTasks}
          onSelectionChange={(e) => setSelectedTasks(e.value as Task[] | null)}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column>
          <Column field="title" header={t("common.title")}></Column>
          <Column body={dueDateTemplate} header={t("tasks.dueDate")}></Column>
        </DataTable>
      </Card>
      <div className="w-3/4">
        <ConfirmDialog
          header={t("tasks.confirmCompletion")}
          visible={visible}
          handleHiding={() => {
            if (!visible) {return;}
            setVisible(false);
          }}
          content={dialogContent}
          onConfirm={() => setVisible(false)}
        />
      </div>
    </>
  );
};

export default Upcoming;
