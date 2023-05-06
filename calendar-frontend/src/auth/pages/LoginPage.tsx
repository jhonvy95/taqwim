import { FormEvent, useState } from "react";
import { getEnvVariables } from "../../helpers";
import { useEffect } from "react";
import { useAuthStore, useForm } from "../../hooks";
import "../styles/LoginPage.css";
import Swal from "sweetalert2";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import CalendarImage from "../../assets/images/calendar.png";
import CalendarLetter from "../../assets/images/calendarLogoType.png";
import CalendarLogo from "../../assets/images/calendarLogo.png";

const loginFormFields = {
  loginEmail: "",
  LoginPassword: "",
};

const registerFormFields = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerPassword2: "",
};

const LoginPage = () => {
  const [toggleLogin, setToggleLogin] = useState(true);
  const { startLogin, startRegister, errorMessage } = useAuthStore();
  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en la autenticacion", errorMessage, "error");
    }
  }, [errorMessage]);

  const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);

  const handleToggleLogin = () => {
    setToggleLogin(!toggleLogin);
  };
  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormFields);

  const loginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword });
  };

  const registerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (registerPassword !== registerPassword2) {
      Swal.fire("Error", "Las contraseñas deben ser iguales", "error");
      return;
    }
    startRegister({ name: registerName, email: registerEmail, password: registerPassword });
  };
  return (
    <div className="Home">
      <div className="presentation">
        <div className="calendar_image">
          <img src={CalendarImage} alt="image" />
        </div>
      </div>

      <div className="right">
        <div className="calendar_logo">
          <img src={CalendarLogo} alt="logo" />
        </div>
        <div className="calendar_logo_letter">
          <img src={CalendarLetter} alt="logo" />
        </div>
        <div className={`container ${toggleLogin ? "active" : "none"}`}>
          <div className="forms">
            <div className="form login">
              <span className="title">Login</span>
              <form onSubmit={loginSubmit} className="">
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Correo"
                    name="loginEmail"
                    value={loginEmail}
                    onChange={onLoginInputChange}
                  />
                  <EmailOutlinedIcon />
                </div>
                <div className="input-field">
                  <input
                    type="password"
                    placeholder="Contraseña"
                    name="loginPassword"
                    value={loginPassword}
                    onChange={onLoginInputChange}
                  />
                  <LockOutlinedIcon />
                </div>
                <div className="input-field button">
                  <input type="submit" value="Login Now" />
                </div>
              </form>
              <div className="login-signup" onClick={handleToggleLogin}>
                <span className="text">
                  Need an account?
                  <a href="#" className="text signup-text">
                    Signup now
                  </a>
                </span>
              </div>
            </div>
            {/* Registration Form */}
            <div className="form signup">
              <span className="title">Registration</span>
              <form onSubmit={registerSubmit}>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Nombre"
                    name="registerName"
                    value={registerName}
                    onChange={onRegisterInputChange}
                  />
                  <PermIdentityOutlinedIcon />
                </div>
                <div className="input-field">
                  <input
                    type="email"
                    placeholder="Correo"
                    name="registerEmail"
                    value={registerEmail}
                    onChange={onRegisterInputChange}
                  />
                  <EmailOutlinedIcon />
                </div>
                <div className="input-field">
                  <input
                    type="password"
                    placeholder="Create a password"
                    name="registerPassword"
                    value={registerPassword}
                    onChange={onRegisterInputChange}
                  />
                  <LockOutlinedIcon />
                </div>
                <div className="input-field">
                  <input
                    type="password"
                    placeholder="Confirm a password"
                    name="registerPassword2"
                    value={registerPassword2}
                    onChange={onRegisterInputChange}
                  />
                  <LockOutlinedIcon />
                </div>
                <div className="input-field button">
                  <input type="submit" value="Register Now" />
                </div>
              </form>
              <div className="login-signup" onClick={handleToggleLogin}>
                <span className="text">
                  Already a user?
                  <a href="#" className="text signup-text">
                    Login now
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
