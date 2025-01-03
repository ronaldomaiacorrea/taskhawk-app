// Import { backgroundColors } from '@constants';
import frLocale from '@fullcalendar/core/locales/fr-ca';
import ptLocale from '@fullcalendar/core/locales/pt-br';
import zhLocale from '@fullcalendar/core/locales/zh-cn';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useTranslations } from '@hooks/useTranslations';

import { Tooltip } from 'primereact/tooltip';
import PageTitle from 'src/common/PageTitle';

const Calendar = () => {
  const { t, i18n } = useTranslations();
  // Const { data: tasks } = useMonthTasks();

  // const [initialView, setInitialView] = useState('dayGridMonth');

  return (
    <>
      <PageTitle description={t('calendar.description')}>
        {t('common.calendar')}
      </PageTitle>
      <Tooltip />
      <FullCalendar
        locale={i18n.language}
        locales={[ptLocale, zhLocale, frLocale]}
        headerToolbar={{
          left: 'prev,next today',
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
        initialView={'dayGridMonth'}
        // Events={tasks.map((task) => ({
        //   title: task.title,
        //   start: task.creationDate.toISOString(),
        //   end: task.dueDate.toISOString(),
        //   description: task.description,
        //   backgroundColor: backgroundColors[task.status],
        //   borderColor: backgroundColors[task.status],
        // }))}
        allDaySlot={false}
        height={1000}
        timeZone="local"
        dayMaxEvents
        editable
        listDayFormat={{ weekday: 'long' }}
        displayEventTime
        eventOrder="start,title"
        moreLinkClick="popover"
        navLinks
        handleWindowResize
        stickyHeaderDates
        eventClick={(info) => info.event.title}
      />
    </>
  );
};

export default Calendar;
