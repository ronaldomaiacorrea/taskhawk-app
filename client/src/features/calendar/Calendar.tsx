import { ErrorMessage, Spinner } from '@common';
import type { EventApi, EventClickArg } from '@fullcalendar/core';
import allLocales from '@fullcalendar/core/locales-all';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useTranslations } from '@hooks/useTranslations';
import { useTasks } from '@queries';
import { Status } from '@shared/types';
import { Tooltip } from 'primereact/tooltip';
import PageTitle from 'src/common/PageTitle';
import { backgroundColors } from 'src/lib/constants/themes';

const Calendar = () => {
  const { t, i18n } = useTranslations();
  const { data: tasks = [], isLoading, isError, error } = useTasks();

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <ErrorMessage error={error} />;
  }

  const filteredTasks = tasks.filter(
    (task) => task.status !== Status.COMPLETED,
  );

  const handleEdit = (info: EventClickArg) => {
    window.console.log(info.event.title);
  };

  const statusOrder: Record<string, number> = {
    Overdue: 0,
    'In progress': 1,
    'To do': 2,
  };

  return (
    <>
      <PageTitle description={t('calendar.description')}>
        {t('common.calendar')}
      </PageTitle>
      <Tooltip />
      <FullCalendar
        locale={i18n.language}
        locales={allLocales}
        headerToolbar={{
          left: 'prev,next,today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        }}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false,
        }}
        titleFormat={{ year: 'numeric', month: 'long', day: 'numeric' }}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        events={filteredTasks.map((task) => ({
          title: task.title,
          start: new Date(task.creationDate).toISOString(),
          end: new Date(task.dueDate).toISOString(),
          description: task.description,
          backgroundColor: task.status
            ? (backgroundColors?.[task.status] ?? '')
            : '',
          borderColor: task.status
            ? (backgroundColors?.[task.status] ?? '')
            : '',
          status: task.status,
        }))}
        allDaySlot={false}
        height={1200}
        timeZone="local"
        dayMaxEvents
        editable
        selectable
        listDayFormat={{ weekday: 'long' }}
        displayEventTime
        moreLinkClick="popover"
        navLinks
        handleWindowResize
        stickyHeaderDates
        eventClick={(info) => handleEdit(info)}
        eventDidMount={(info) => {
          const description =
            info.event.extendedProps.description || 'No description';
          const status = info.event.extendedProps.status || 'No status';
          info.el.setAttribute('title', `${description} - Status: ${status}`);
        }}
        eventOrder={(a, b) => {
          const eventA = a as EventApi;
          const eventB = b as EventApi;
          return (
            statusOrder[eventA.extendedProps.status] -
            statusOrder[eventB.extendedProps.status]
          );
        }}
        eventContent={(eventInfo) => (
          <div>
            <strong>{eventInfo.timeText}</strong> -{' '}
            <span>{eventInfo.event.title}</span>
            <div>{eventInfo.event.extendedProps.description}</div>
            <div>
              <div>{`${t('tasks.status')}: ${eventInfo.event.extendedProps.status}`}</div>
            </div>
          </div>
        )}
      />
    </>
  );
};

export default Calendar;
