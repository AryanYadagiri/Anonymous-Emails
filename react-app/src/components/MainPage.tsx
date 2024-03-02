import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";

function MainPage() {
  const { theme } = useTheme();
  const [position, setPosition] = useState({ x: 712, y: 424 });
  const [visible, setVisible] = useState(true);
  const [visible1, setVisible1] = useState(true);
  const [img, setImg] = useState(false);
  const img1 = "/images/PinkHeart.png";
  const img2 = "/images/cc4147c1188abed1207807ed1ced01ce.gif";

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer1 = setInterval(() => {
      setVisible1(false);
    }, 5000);

    return () => clearTimeout(timer1);
  }, []);

  useEffect(() => {
    if (!visible1) {
      const timer1 = setTimeout(() => {
        setVisible1(true);
      }, 5000);

      return () => clearTimeout(timer1);
    }
  }, [visible1]);

  const RandomMovement = () => {
    const newX = Math.random() * window.innerWidth - 20;
    const newY = Math.random() * window.innerHeight - 30;
    setPosition({ x: newX, y: newY });
  };

  const toggleImage = () => {
    setImg(!img);
  };

  return (
    <div className="bg-div" style={{ background: theme ? "#FDF5DF" : "white" }}>
      <Navbar />
      <div
        className="prompt-container"
        style={{ display: visible ? "block" : "none" }}
      >
        <div className="pnt"></div>
        <div className="message-box">
          <p>Change background colour.</p>
        </div>
      </div>
      <div className="heart"></div>
      <div className="heart1"></div>
      <div className="heart2"></div>
      <div className="heart3"></div>
      <Link to="/Email">
        <img className="logo" src={img ? img2 : img1} alt="Pink heart" />
      </Link>
      <div className={visible1 ? "prompt-container1" : "prompt-container-I"}>
        <div className="pnt1"></div>
        <div className="message-box1">
          <p>Click me !</p>
        </div>
      </div>
      <h1>Would you come on a date ?</h1>
      <div className="btn-index">
        <button
          type="button"
          className="btn btn-secondary btn-sm btny"
          onClick={toggleImage}
        >
          Yepppssss !
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          style={{ position: "absolute", top: position.y, left: position.x }}
          onMouseEnter={RandomMovement}
        >
          Naaaaaahh !
        </button>
      </div>
    </div>
  );
}

export default MainPage;

// div className="bg-div"
