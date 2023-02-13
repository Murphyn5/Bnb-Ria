// frontend/src/components/LoginFormModal/index.js
import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { Link } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showErrorsList, setShowErrorsList] = useState(false);
  const [disabled, setDisabled] = useState(true)
  const [loginButtonClassName, setLoginButtonClassName] = useState("disabled")

  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          setShowErrorsList(true)
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential: "Demo-lition", password: "password" }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  useEffect(() => {
    if (credential.length < 4 || password.length < 6) {
      setDisabled(true)
      setLoginButtonClassName("disabled")
      return
    }
    setLoginButtonClassName("enabled")
    setDisabled(false)
  }, [password, credential])

  const ulClassName = "error-list" + (showErrorsList ? "" : " hidden");

  const formClassName = "login-form" + (showErrorsList ? " with-errors1" : "");

  return (
    <>
      <div className="login-form-container">
        <form className={formClassName} onSubmit={handleSubmit}>
          <h1 className="login-form-title">Log In</h1>
          <ul className={ulClassName}>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder="Username or Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
          <button type="submit" className={loginButtonClassName} disabled={disabled}>Log In</button>
          <Link onClick={handleDemoSubmit}>Demo User</Link>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
