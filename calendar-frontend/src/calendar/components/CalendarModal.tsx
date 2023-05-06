import "../styles/modal.css";

interface ICalendarModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  closeDateModal: () => void;
}

const CalendarModal = ({ children, isOpen, closeDateModal }: ICalendarModalProps) => {
  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={closeDateModal}>
          <div onClick={(e) => e.stopPropagation()} className="modal-box">
            {children}
          </div>
        </div>
      )}
    </>
  );
};
export default CalendarModal;
