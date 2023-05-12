import React from "react";
import "./Login.scss";
import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
// import { authAPI } from "../../api/api";
// import { userKeyStorage } from "../../api/Storage";
// import { setAppErrorAC, setIsLoggedInAC } from "../../store/auth-reducer";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/store";
import { Button, FormControl, FormGroup, FormLabel, Grid, TextField } from "@material-ui/core";

type LoginFormPropsType = {
  pageTitle: string;
  buttonTitle: string;
  navLinkTitle: string;
  navLinkRoute: string;
  navLinkDescription: string;
};

type FormikErrorType = {
  login?: string;
  password?: string;
};

export const LoginForm = ({
  pageTitle,
  buttonTitle,
  navLinkRoute,
  navLinkTitle,
  navLinkDescription,
}: LoginFormPropsType) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.login) {
        errors.login = "Введите email";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.login)) {
        errors.login = "Неверный email";
      }

      if (!values.password) {
        errors.password = "Введите пароль";
      }
      return errors;
    },
    onSubmit: (values) => {
      console.log(formik.values);
      formik.resetForm();
      if (pageTitle === "Вход") {
        navigate("/notes");
        // authAPI
        //   .login(formik.values)
        //   .then((data) => {
        //     userKeyStorage.setItem(data.data.token);
        //     dispatch(setIsLoggedInAC(true));
        //   })
        //   .catch(() => {
        //     dispatch(setAppErrorAC("Пользователь не найден"));
        //     formik.resetForm();
        //   });
      } else {
        // authAPI.register(formik.values).then();
        navigate("/login");
      }
    },
  });

  // if (isLoggedIn) {
  //   navigate("/notes");
  // }

  const inputStyle = {
    width: "300px",
  };

  return (
    <Grid container className="login">
      <Grid item>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p className="title">Notes App</p>
              <p className="entry">{pageTitle}</p>
            </FormLabel>
            <FormGroup>
              <TextField
                style={inputStyle}
                label="Email"
                margin="normal"
                {...formik.getFieldProps("login")}
              />
              {formik.touched.login && formik.errors.login && (
                <div style={{ color: "red" }}>{formik.errors.login}</div>
              )}
              <TextField
                type="password"
                label="Пароль"
                margin="normal"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              )}
              <Button type={"submit"} variant={"contained"} style={{ backgroundColor: "#6666B5" }}>
                {buttonTitle}
              </Button>
            </FormGroup>
            {navLinkDescription}
            <NavLink to={navLinkRoute}>{navLinkTitle}</NavLink>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
