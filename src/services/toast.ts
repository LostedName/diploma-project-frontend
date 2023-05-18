import {toast} from "react-toastify";
export enum ToastType {
  success = "success",
  warn = "warn",
  error = "error"
}
export class Notify {
  static success = (text: string) => {
    toast.success(text);
  }
  static warn = (text: string) => {
    toast.warn(text);
  }
  static error = (text: string) => {
    toast.error(text);
  }
}