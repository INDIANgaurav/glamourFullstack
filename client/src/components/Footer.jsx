import React from "react";
import github from "../assets/github.png";
import linkedin from "../assets/linkedin.png";

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-center bg-neutral-200 text-center dark:bg-neutral-500 lg:text-left">
      <div className=" p-4 text-center text-neutral-700 dark:text-neutral-200">
        © 2024 Copyright:
        <a className="text-neutral-800 dark:text-neutral-400">
          {" "}
          ❤️ Glamour-By-Gaurav
        </a>
      </div>
      <div className="flex gap-2 w-12 ">
        <a href="https://github.com/INDIANgaurav" target="_blank">
          <img src={github} alt="githubimage" />
        </a>
        <a href="https://www.linkedin.com/in/gaurav-parasar" target="_blank">
          <img src={linkedin} alt="linkedinimage" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
