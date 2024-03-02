import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmReset = () => {
  const navigate = useNavigate();
  const [reset_token, setResetToken] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [retype_password, setRetypePassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/confirm-password-reset",
        {
          reset_token,
          new_password,
          retype_password,
        }
      );
      if (response.status === 200) {
        navigate("/Login");
      } else {
        console.error("Password reset failed");
      }
    } catch (error) {
      console.error("Something went wrong ", error);
    }
  };
  return (
    <form className="auth-form" onSubmit={handleLogin}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Token
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={reset_token}
          onChange={(e) => {
            setResetToken(e.target.value);
          }}
        />
        <div id="emailHelp" className="form-text">
          Enter your new password.
        </div>
        <label htmlFor="exampleInputPassword1" className="form-label">
          New password
        </label>
        <input
          type="password"
          className="form-control pw-input"
          id="exampleInputPassword1"
          value={new_password}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
        <label htmlFor="exampleInputPassword1" className="form-label">
          Retype password
        </label>
        <input
          type="password"
          className="form-control pw-input"
          id="exampleInputPassword1"
          value={retype_password}
          onChange={(e) => {
            setRetypePassword(e.target.value);
          }}
        />
      </div>
      <button type="submit" className="btn btn-secondary btn-login">
        Submit
      </button>
    </form>
  );
};

export default ConfirmReset;

//http://localhost:5173/Confirm-reset
