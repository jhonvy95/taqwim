import AddIcon from "@mui/icons-material/Add";
import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

const FabCreateNewEvent = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();
  const handleClickNew = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgcolor: "#fafafa",
      user: {
        _id: "123",
        name: "John Doe",
      },
    });
    openDateModal();
  };

  return (
    <button onClick={handleClickNew} className="btn btn-primary fab">
      <AddIcon />
    </button>
  );
};
export default FabCreateNewEvent;
