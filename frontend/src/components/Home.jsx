import React from "react";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  return (
    <div className="main">
      <div
        className="home-bg"
        style={{ backgroundImage: `url('splash-art.jpg')` }}
      />
      <div className="bottom" />
    </div>
  );
}
