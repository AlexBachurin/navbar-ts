import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { links, social } from "./data";
import logo from "./logo.svg";

const Navbar = () => {
  const [showContainer, setShowContainer] = useState<boolean>(false);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);

  // every time we toggle displaying of links run useeffect
  useEffect(() => {
    // calculate height of links container based on how many links we have
    if (!linksContainerRef.current)
      throw Error("linksContainerRef is not assigned");
    if (!linksRef.current) throw Error("linksRef is not assigned");
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    // set height of container based on links height
    if (showContainer) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      // if we not displaying links reset the height
      linksContainerRef.current.style.height = "0px";
    }
  }, [showContainer]);
  return (
    <div className="nav-center">
      <div className="nav-header">
        <img src={logo} alt="logo" />
        <button
          className="nav-toggle"
          onClick={() => setShowContainer(!showContainer)}
        >
          <FaBars />
        </button>
      </div>
      {/* use css approach to add smoothness to displaying sidebar with links */}
      <div className="links-container" ref={linksContainerRef}>
        <ul className="links" ref={linksRef}>
          {links.map((link) => {
            const { id, url, text } = link;
            return (
              <li key={id}>
                <a href={url}>{text}</a>
              </li>
            );
          })}
        </ul>
      </div>
      <ul className="social-icons">
        {social.map((link) => {
          const { id, url, icon } = link;
          return (
            <li key={id}>
              <a href={url}>{icon}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Navbar;
