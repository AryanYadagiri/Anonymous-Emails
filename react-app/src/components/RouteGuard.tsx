import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface RouteGuardProps {
  children: ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const refreshInterval = 5 * 60 * 1000;
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const isAuth =
      localStorage.getItem("refresh_token") !== null &&
      localStorage.getItem("access_token") !== null;

    if (!isAuth) {
      navigate("/Login");
      return;
    }

    const refreshMech = async () => {
      if (!isRefreshing) {
        try {
          setIsRefreshing(true);
          const refresh_token = localStorage.getItem("refresh_token");
          const response = await axios.post("http://127.0.0.1:8000/refresh", {
            refresh_token: refresh_token,
          });
          if (response.status === 200) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("access_token_expiry");
            const newAccessToken = response.data.new_access_token;
            const access_token_expiry = response.data.access_token_expiry;
            localStorage.setItem("access_token", newAccessToken);
            localStorage.setItem("access_token_expiry", access_token_expiry);
          } else {
            console.error("Token refresh failed with status:", response.status);
          }
        } catch (error) {
          console.error("Token refresh failed:", error);
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("access_token");
          localStorage.removeItem("access_token_expiry");
          navigate("/Login");
        } finally {
          setIsRefreshing(false);
        }
      }
    };

    const accessTokenExpirationStr = localStorage.getItem(
      "access_token_expiry"
    );

    const accessTokenExpiration = accessTokenExpirationStr
      ? new Date(accessTokenExpirationStr).getTime()
      : 0;

    const currentTime = new Date().getTime();
    const timeToExpire = accessTokenExpiration - currentTime;

    if (timeToExpire < 0) {
      refreshMech();
    }
    const refreshIntervalID = setInterval(refreshMech, refreshInterval);
    return () => clearInterval(refreshIntervalID);
  }, [refreshInterval, navigate]);

  return <>{children}</>;
};

export default RouteGuard;
