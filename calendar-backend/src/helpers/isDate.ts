import { CustomValidator } from "express-validator";
import moment from "moment";

const isDate: CustomValidator = (value) => {
  if (!value) return false;

  const date = moment(value);
  if (date.isValid()) {
    return true;
  } else {
    return false;
  }
};

export default isDate;
