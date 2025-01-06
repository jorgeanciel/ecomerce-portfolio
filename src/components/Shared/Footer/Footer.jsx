import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <a
        href="https://www.linkedin.com/in/jorgechirinosalferez/"
        target={"_blank"}
      >
        {" "}
        <i className="bx bxl-linkedin-square" />
      </a>
      <a
        href="https://github.com/jorgeanciel/ecomerce-portfolio.git"
        target={"_blank"}
      >
        {" "}
        <i className="bx bxl-github" />{" "}
      </a>
    </footer>
  );
};

export default Footer;
