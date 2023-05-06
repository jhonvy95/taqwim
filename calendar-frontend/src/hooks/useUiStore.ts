import { useAppSelector, useAppDispatch } from "../calendar/hooks/redux";
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice";

export const useUiStore = () => {
  const { isDateModalOpen } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  };
  return { isDateModalOpen, openDateModal, closeDateModal };
};
