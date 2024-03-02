import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const access_token = localStorage.getItem("access_token");
      const response = await axios.post(
        "http://127.0.0.1:8000/delete-user",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (response.status === 200) {
        navigate("/Login");
      } else {
        console.error("Account could'nt delete");
      }
    } catch (error) {
      console.error("Something went wrong ", error);
    }
  };
  return (
    <>
      <Navbar />
      <form className="auth-form" onSubmit={handleDelete}>
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
        </div>
        <button type="submit" className="btn btn-secondary btn-login">
          Submit
        </button>
        <h6 className="del-acc-text">
          Are you sure you want to delete your account?
        </h6>
      </form>
    </>
  );
};

export default DeleteAccount;
