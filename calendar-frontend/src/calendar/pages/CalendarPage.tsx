import { useEffect, useMemo, useState } from "react";
import { Calendar, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { addHours, differenceInSeconds } from "date-fns";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { Navbar, CalendarEventBox, CalendarModal } from "../";
import { localizer } from "../../helpers";
import { Event } from "../model/Event";
import { useModal } from "../hooks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks";
import { FabCreateNewEvent, FabDelete } from "../components";

const CalendarPage = () => {
  const [lastView, setLastView] = useState<any>(localStorage.getItem("lastView") || "week");
  const { isDateModalOpen, openDateModal, closeDateModal } = useUiStore();
  const { events, activeEvent, setActiveEvent, startSavingEvent, startLoadingEvents } =
    useCalendarStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { user } = useAuthStore();
  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";
    return formValues.title.length > 0 ? "is-valid" : "is-invalid";
  }, [formValues.title, formSubmitted]);

  useEffect(() => {
    if (activeEvent !== null) setFormValues({ ...activeEvent });
  }, [activeEvent]);

  const onInpunChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChange = (date: Date | [Date, Date] | null, changing: string) => {
    setFormValues({
      ...formValues,
      [changing]: date,
    });
  };
  const eventStyleGetter = (event: Event, start: Date, end: Date, isSelected: boolean) => {
    const style = {
      backgroundColor: "#367CF7",
      borderRadius: "0px",
      height: "100%",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  const onDoubleClick = (event: any) => {
    openDateModal();
  };

  const onSelectEvent = (event: any) => {
    setActiveEvent(event);
  };

  const onViewChange = (e: any) => {
    localStorage.setItem("lastView", e);
    setLastView(e);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    const diffence = differenceInSeconds(formValues.end, formValues.start);
    if (diffence <= 0 || isNaN(diffence)) {
      Swal.fire("Fechas incorrectas", "Revisar las fechas ingresadas", "error");
      return;
    }

    if (formValues.title.trim().length <= 0) {
      console.log("error en titulo");
      return;
    }

    startSavingEvent(formValues);
    closeDateModal();
    setFormSubmitted(false);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: `calc(100vh - 80px)` }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
      />
      <CalendarModal isOpen={isDateModalOpen} closeDateModal={closeDateModal}>
        <h1> Nuevo evento </h1>
        <hr />
        <form className="container" onSubmit={onSubmit}>
          <div className="form-group mb-2">
            <label>Fecha y hora inicio</label>
            <DatePicker
              selected={formValues.start}
              className="form-control"
              onChange={(event) => onDateChange(event, "start")}
              dateFormat="Pp"
              showTimeSelect
            />
          </div>

          <div className="form-group mb-2">
            <label>Fecha y hora fin</label>
            <DatePicker
              minDate={formValues.start}
              selected={formValues.end}
              className="form-control"
              onChange={(event) => onDateChange(event, "end")}
              dateFormat="Pp"
              showTimeSelect
            />
          </div>

          <hr />
          <div className="form-group mb-2">
            <label>Titulo y notas</label>
            <input
              type="text"
              className={`form-control ${titleClass}`}
              placeholder="Título del evento"
              name="title"
              autoComplete="off"
              value={formValues.title}
              onChange={onInpunChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              Una descripción corta
            </small>
          </div>

          <div className="form-group mb-2">
            <textarea
              className="form-control"
              placeholder="Notas"
              rows={5}
              name="notes"
              value={formValues.notes}
              onChange={onInpunChange}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Información adicional
            </small>
          </div>

          <button type="submit" className="btn btn-outline-primary btn-block">
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </form>
      </CalendarModal>
      <FabCreateNewEvent />
      <FabDelete />
    </>
  );
};
export default CalendarPage;
