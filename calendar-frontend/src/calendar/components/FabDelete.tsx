import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useCalendarStore } from "../../hooks";

// interface FabDeleteProps {
//   event: Event;
// }

const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();
  const handleDelete = () => {
    startDeletingEvent();
  };

  return (
    <button
      onClick={handleDelete}
      className="btn btn-danger fab-danger"
      style={{
        display: hasEventSelected ? "" : "none",
      }}
    >
      <DeleteOutlineIcon />
    </button>
  );
};
export default FabDelete;
