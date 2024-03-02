import axios from "axios";
import { useEffect, useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

interface EmailHistoryItem {
  email_recipient: string;
  message: string;
  timestamp: number;
}

const Sidebar = () => {
  const [data, setData] = useState<EmailHistoryItem[] | null>(null);

  useEffect(() => {
    const emailHistory = async () => {
      try {
        const access_token = localStorage.getItem("access_token");
        const response = await axios.get(
          "http://127.0.0.1:8000/email-history",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        console.log("Response data:", response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.log("Something went wrong: ", error);
      }
    };
    emailHistory();
  }, []);

  return (
    <>
      <Menu>
        <div>
          <h6>
            History{" "}
            <Link to="/Delete-Account" className="del-user">
              Delete account
            </Link>
          </h6>

          {data ? (
            <div>
              {data.map((item: EmailHistoryItem, index: number) => (
                <div key={index} className="history-block">
                  <p>Timestamp : {item.timestamp}</p>
                  <p>Recipient email : {item.email_recipient}</p>
                  <p>Message : {item.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <div>Loading ...</div>
          )}
        </div>
      </Menu>
    </>
  );
};

export default Sidebar;
