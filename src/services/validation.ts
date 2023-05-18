export const isFieldFilled = (value: string) => value.trim() !== "";
export const isFieldsEquals = (value1: string, value2: string) => value1 === value2;
export const isEmailValid = (email: string) => {
  const mailFormat: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return mailFormat.test(email);
}