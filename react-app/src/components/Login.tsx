import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const getCSRFToken = () => {
    const csrfCookie = document.cookie.match(/csrftoken=([^ ;]*)/);
    return csrfCookie ? csrfCookie[1] : null;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const csrfToken = getCSRFToken();
      const response = await axios.post(
        "http://127.0.0.1:8000/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
        }
      );
      if (response.status === 200) {
        const refreshToken = response.data.refresh_token;
        const accessToken = response.data.access_token;
        const accessTokenExpiry = response.data.access_token_expiry;
        localStorage.setItem("refresh_token", refreshToken);
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("access_token_expiry", accessTokenExpiry);
        navigate("/Main");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Something went wrong ", error);
    }
  };
  return (
    <form className="auth-form" onSubmit={handleLogin}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your details with anyone else.
        </div>
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control pw-input"
          id="exampleInputPassword1"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Link to="/Forgot-password">Forgot password ?</Link>
      </div>
      <button type="submit" className="btn btn-secondary btn-login">
        Login
      </button>
      <p className="authpages-link">
        Don't have an account ? Sign up <Link to="/SignUp">here</Link>
      </p>
    </form>
  );
};

export default Login;
