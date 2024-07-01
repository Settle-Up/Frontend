import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; 

dayjs.extend(relativeTime);
dayjs.locale('en');

const formatTimeAgo = (date: dayjs.Dayjs | null) => {
  if (!date) return null;

  const currentDate = dayjs();

  if (currentDate.isSame(date, 'day')) {
    return date.format('h:mm A'); 
  } else if (currentDate.diff(date, 'day') === 1) {
    return "Yesterday";
  } else if (currentDate.diff(date, 'day') < 7) {
    return date.fromNow(); 
  } else {
    return date.format('YYYY-MM-DD'); 
  }
};

export default formatTimeAgo;
