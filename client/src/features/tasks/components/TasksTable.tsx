import { useTranslations } from '@hooks/useTranslations';
import type { Category, Task } from '@shared/types';
import { dateTemplate } from '@utils';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import type { DataTableExpandedRows } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import EmptyData from 'src/common/EmptyData';
import PriorityBadge from 'src/common/PriorityBadge';
import StatusBadge from 'src/common/StatusBadge';

export interface TasksTableProps {
  tasks: Task[];
  categories: Category[];
  deleteTasks: (tasks: Task[]) => void;
}

const TasksTable = ({ tasks, categories, deleteTasks }: TasksTableProps) => {
  const { t } = useTranslations();
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | Task[] | undefined
  >(undefined);
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);

  const descriptionTemplate = (task: Task) =>
    task.description ? (
      <>
        <div className="font-bold p-2">{t('tasks.description')}</div>
        <div className="pl-2">{task.description}</div>
      </>
    ) : (
      <EmptyData message={t('tasks.noDescription')} />
    );

  const allowExpansion = () => tasks.length > 0;

  const expandAll = () => {
    const _expandedRows: DataTableExpandedRows = {};

    tasks.forEach((task) => (_expandedRows[`${task.id}`] = true));

    setExpandedRows(_expandedRows);
  };

  const collapseAll = () => {
    setExpandedRows(undefined);
  };

  const categoryTemplate = (task: Task) => {
    const taskCategory = categories.find(
      (category) => category.id === task.categoryId,
    );

    return (
      <>
        <i className={`${taskCategory?.icon} pr-2`} />
        {taskCategory?.name}
      </>
    );
  };

  const header = (
    <div className="flex md:flex-row md:justify-end justify-between gap-2 flex-col flex-wrap">
      <div className="md:flex-auto">
        <div className="relative w-full ">
          <InputText
            placeholder={t('common.keywordSearch')}
            className="pl-10 w-full"
          />
          <i className="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
        </div>
      </div>
      <div className="flex flex-row md:justify-end justify-between gap-2">
        <div>
          <Button
            icon="pi pi-trash"
            severity="danger"
            outlined
            disabled={selectedTasks.length === 0}
            onClick={() => deleteTasks(selectedTasks)}
          >
            <span className="hidden sm:inline mx-2">{t('common.delete')}</span>
          </Button>
        </div>
        <div className="flex flex-row justify-end">
          <div>
            <Button icon="pi pi-plus" onClick={expandAll} text>
              <span className="hidden sm:inline mx-2">
                {t('common.expandAll')}
              </span>
            </Button>
          </div>
          <div>
            <Button icon="pi pi-minus" onClick={collapseAll} text>
              <span className="hidden sm:inline mx-2">
                {t('common.collapseAll')}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <DataTable
      value={tasks}
      emptyMessage={<EmptyData message={t('tasks.notDefined')} />}
      paginator
      onRowExpand={(e) => setExpandedRows(e.data)}
      rows={5}
      rowsPerPageOptions={[5, 10, 20]}
      resizableColumns
      rowExpansionTemplate={descriptionTemplate}
      expandedRows={expandedRows}
      onRowToggle={(e) => setExpandedRows(e.data)}
      dataKey="id"
      scrollable
      selectionMode="checkbox"
      selection={selectedTasks}
      removableSort
      header={header}
      onSelectionChange={(e) => setSelectedTasks(e.value as Task[])}
    >
      <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
      <Column expander={allowExpansion} style={{ width: '2rem' }} frozen />
      <Column field="title" header={t('common.name')} sortable frozen />
      <Column
        body={(task: Task) => dateTemplate(new Date(task.creationDate))}
        header={t('tasks.creationDate')}
        sortField="creationDate"
        sortable
        style={{ minWidth: '250px' }}
      />
      <Column
        body={(task: Task) => dateTemplate(task?.dueDate)}
        header={t('tasks.dueDate')}
        sortField="dueDate"
        sortable
        style={{ minWidth: '250px' }}
      />
      <Column
        body={(task: Task) => <PriorityBadge task={task} />}
        header={t('tasks.priority')}
        style={{ minWidth: '120px' }}
        sortable
        sortField="priority"
      />
      <Column
        body={(task: Task) => <StatusBadge task={task} />}
        header={t('tasks.status')}
        sortable
        sortField="status"
        style={{ minWidth: '150px' }}
      />
      <Column
        body={categoryTemplate}
        header={t('common.category')}
        sortable
        sortField="categoryId"
        style={{ minWidth: '150px' }}
      />
    </DataTable>
  );
};

export default TasksTable;
