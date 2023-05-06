import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import { onLogoutCalendar } from "../store/calendar/CalendarSlice";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";
import { RootState } from "../store/store";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  type StarLoginArgs = { email: string; password: string };
  type StartLogin = ({ email, password }: StarLoginArgs) => void;

  const startLogin: StartLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout("Invalid credentials"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 3000);
    }
  };

  type StartRegisterArgs = { name: string; email: string; password: string };
  type StartRegister = ({ name, email, password }: StartRegisterArgs) => void;

  const startRegister: StartRegister = async ({ name, email, password }: StartRegisterArgs) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth/new", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error: any) {
      dispatch(onLogout(error?.response?.data?.msg || "Error"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 3000);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await calendarApi.get("/auth/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogoutCalendar());
    dispatch(onLogout());
  };
  return {
    // parameters
    errorMessage,
    status,
    user,

    // Methods
    checkAuthToken,
    startLogin,
    startLogout,
    startRegister,
  };
};
