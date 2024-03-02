import { useTheme } from "./ThemeContext";
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Marquee from "react-fast-marquee";
import axios from "axios";

const AnonEmail = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { theme } = useTheme();

  const handleEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const access_token = localStorage.getItem("access_token");
      const response = await axios.post(
        "http://127.0.0.1:8000/email",
        {
          email,
          message,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Email sent successfully");
      } else {
        alert("Some issue occured please send Email again");
      }
    } catch (error) {
      console.log("Something went wrong : ", error);
    }
  };

  return (
    <div className="bg-div" style={{ background: theme ? "#FDF5DF" : "white" }}>
      <Navbar />
      <Sidebar />
      <form className="email-container" onSubmit={handleEmail}>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextareaDisabled"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            required
          ></input>
          <label htmlFor="floatingTextareaDisabled">
            Your special one's Email Address
          </label>
        </div>
        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2Disabled"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            required
            style={{ height: "100px" }}
          ></textarea>
          <label htmlFor="floatingTextarea2Disabled">
            Share your feelings anonymously
          </label>
        </div>
        <button type="submit" className="btn btn-secondary">
          Submit
        </button>
      </form>
      <Marquee>
        <img
          className="marque-img"
          src="/images/cc4147c1188abed1207807ed1ced01ce.gif"
          alt="Pink heart"
        />
      </Marquee>
    </div>
  );
};
export default AnonEmail;
