import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showErrorsList, setShowErrorsList] = useState(false);
  const [disabled, setDisabled] = useState(true)
  const [signupButtonClassName, setSignupButtonClassName] = useState("disabled")
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          setShowErrorsList(true)
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    setShowErrorsList(true)
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  useEffect(() => {
    if (
      email.length === 0 ||
      username.length === 0 ||
      firstName.length === 0 ||
      lastName.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
      ) {
      setDisabled(true)
      setSignupButtonClassName("disabled")
      return
    }
    setSignupButtonClassName("enabled")
    setDisabled(false)
  }, [email, username, firstName, lastName, password, confirmPassword])

  const ulClassName = "error-list" + (showErrorsList ? "" : " hidden");

  const signupFormContainerClassName = "signup-form-container" + (showErrorsList ? " with-errors2" : "");

  return (
    <>
      <div className={signupFormContainerClassName}>
        <form onSubmit={handleSubmit} className="signup-form">
          <h1 className="signup-form-title">Sign Up</h1>
          <ul className={ulClassName}>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username"
            />
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="First Name"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Lastt Name"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm Password"
            />
          <button type="submit" disabled={disabled} className={signupButtonClassName}>Sign Up</button>
        </form>
      </div>

    </>
  );
}

export default SignupFormModal;
