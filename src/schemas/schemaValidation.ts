import * as yup from 'yup';

export const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .email('Not a proper email')
    .required('Email is a required field')
    .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format'),
  password: yup
    .string()
    .min(8, 'Password should be 8 chars minimum.')
    .max(32, 'Password should be 32 chars maximum.')
    .required('Password is a required field'),
});

export const schemaEmail = yup.object().shape({
  email: yup
    .string()
    .email('Not a proper email')
    .required('Email is a required field')
    .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format'),
});

export const schemaResetPassword = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Password should be 8 chars minimum.')
    .max(32, 'Password should be 32 chars maximum.')
    .required('Password is a required field'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Repeat password is a required field'),
});

export const schemaSignUp = yup.object().shape({
  email: yup
    .string()
    .email('Not a proper email')
    .required('Email is a required field')
    .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format'),
  password: yup
    .string()
    .min(8, 'Password should be 8 chars minimum.')
    .max(32, 'Password should be 32 chars maximum.')
    .required('Password is a required field'),
  name: yup.string().required('Name is a required field'),
});

export const schemaWorkspace = yup.object().shape({
  workspaceName: yup.string().required('Workspace name is a required field'),
});
