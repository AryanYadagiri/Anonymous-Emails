import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/password-reset",
        {
          email,
        }
      );

      if (response.status === 200) {
        console.log("Email has been sent to you");
      } else {
        document.getElementById("emailHelp")!.innerHTML = "Invalid email";
      }
    } catch (error) {
      console.error("Something went wrong ", error);
    }
  };
  return (
    <form className="auth-form" onSubmit={handleReset}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div id="emailHelp" className="form-text">
          A code will be sent to your email.
        </div>
      </div>
      <button type="submit" className="btn btn-secondary btn-signup">
        Submit
      </button>
      <p className="authpages-link1">
        Go back to login page <Link to="/Login">here</Link>
      </p>
    </form>
  );
};

export default ForgotPassword;
