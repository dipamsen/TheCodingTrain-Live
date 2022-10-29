import "react";
import "./Header.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <h1>The Coding Train Live Streams</h1>
    </div>
  );
}
