import { useTheme } from "./ThemeContext";
import Navbar from "./Navbar";

function About() {
  const { theme } = useTheme();
  return (
    <div className="bg-div" style={{ background: theme ? "#FDF5DF" : "white" }}>
      <Navbar />
      <div className="abt-container">
        <h1>About this project and me</h1>
        <h2>Project : </h2>
        <h6>
          Share your feelings anonymously. An anonymous email will be sent to
          your special one. Your identity will be kept secret.
        </h6>
        <h2>Me : </h2>
        <h6>
          Hello, I am an average self-thought programmer who would love to learn
          more about penetration testing. Anyways you can invite me for
          hackathons and coding competitions. Contact me here on my{" "}
          <a className="link" href="https://www.instagram.com/mayybearyan/">Instagram</a>.
        </h6>
      </div>
    </div>
  );
}

export default About;
