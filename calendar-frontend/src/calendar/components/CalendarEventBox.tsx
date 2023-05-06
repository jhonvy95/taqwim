import { Event } from "../model/Event";

interface ICalendarEventBoxProps {
  event: Event;
}

const CalendarEventBox = ({ event }: ICalendarEventBoxProps) => {
  const { title, user } = event;
  return (
    <>
      <strong>{title} </strong>
      <span>- {user.name} </span>
    </>
  );
};
export default CalendarEventBox;
