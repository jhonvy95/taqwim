import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { AppRouter } from "./router";
import { store } from "./store";

const CalendarApp = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppRouter />
      </Router>
    </Provider>
  );
};
export default CalendarApp;
