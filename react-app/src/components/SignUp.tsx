import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/signup", {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        console.log("Account created successfully");
        navigate("/Login");
      } else {
        document.getElementById("emailHelp")!.innerHTML =
          "Email already exists";
      }
    } catch (error) {
      console.error("Something went wrong ", error);
    }
  };
  return (
    <form className="auth-form" onSubmit={handleSignUp}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputUsername"
          aria-describedby="emailHelp"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
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
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button type="submit" className="btn btn-secondary btn-signup">
        Sign up
      </button>
      <p className="authpages-link">
        Already have an account ? Login <Link to="/Login">here</Link>
      </p>
    </form>
  );
};

export default SignUp;
