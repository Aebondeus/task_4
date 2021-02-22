import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useHttp } from "../hooks/httpHook";

export const RegPage = () => {
  const { loading, request, error}  = useHttp();
  const [form, setForm] = useState({
    login: "",
    password: "",
    email: "",
  })
  const history = useHistory();


  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/auth/register", "POST", { ...form });
      history.push("/login");
    } catch (err) {
      console.log("Error in register");
    }
  };

  return (
    <div>
      <div className="header">
        <div className="headerLogo">Registration Page</div>
      </div>
      <div className="form-wrapper">
        <form>
          <div className="row justify-content-center">
            <div className="form-group col-lg-5">
              <label name="login">Login: </label>
              <input
                name="login"
                type="text"
                className="form-control"
                id="login"
                aria-describedby="login"
                onChange={changeHandler}
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
          <div className="row justify-content-center">
            <div className="form-group col-lg-5">
              <label name="email">Email: </label>
              <input
                name="email"
                type="text"
                className="form-control"
                id="email"
                onChange={changeHandler}
              />
            </div>
          </div>
          <div className="row justify-content-center mt-1">
            <button
              type="submit"
              onClick={registerHandler}
              disabled={loading}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
