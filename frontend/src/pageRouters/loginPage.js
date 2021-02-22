import React, { useContext, useState } from "react";
import { authContext } from "../context/authContext";
import { useHttp } from "../hooks/httpHook";

export const LoginPage = () => {
  const {loading, request, error} = useHttp();
  const [form, setForm] = useState({
    login: "",
    password: "",
  });
  const context = useContext(authContext);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = async () => {
    try {
      const data = await request("/auth/login/", "POST", { ...form });
      context.login(data.token, data.id)
    } catch (err) {
      console.log("Error in login page");
    }
  };

  return (
    <div>
      <div className="header">
        <div className="headerLogo">Login Page</div>
      </div>
      <div className="form-wrapper">
        <form>
          <div className="row justify-content-center">
            <div className="form-group col-lg-5">
              <label>Login: </label>
              <input
                name="login"
                type="text"
                onChange={changeHandler}
                className="form-control"
                id="login"
                aria-describedby="login"
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="form-group col-lg-5">
              <label name="password">Password: </label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="password"
                onChange={changeHandler}
              />
            </div>
          </div>
          <div className="row justify-content-center mt-1">
            <button
              className="btn btn-primary"
              disabled={loading}
              onClick={loginHandler}
            >
              Submit
            </button>
            <div className="regLink">
              <a href="/register">Register</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
