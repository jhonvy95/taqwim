import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useAuthStore } from "../../hooks";

const Navbar = () => {
  const { startLogout, user } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <CalendarMonthIcon />
        &nbsp;
        {user?.name}
      </span>

      <button className="btn btn-outline-danger" onClick={startLogout}>
        <ExitToAppIcon />
        <span>Salir</span>
      </button>
    </div>
  );
};
export default Navbar;
