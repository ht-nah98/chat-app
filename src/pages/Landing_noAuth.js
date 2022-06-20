import React from "react";
import Img1 from "../images/italia1.JPG";
import Img2 from "../images/italia2.JPG";
import Img3 from "../images/italia3.JPG";
import Img4 from "../images/italia4.JPG";
import Me from "../images/ME.JPG";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";

const Landing_noAuth = () => {
  return (
    <div className="landing_wrapper">
      <div className="landing_slider">
        <div className="text-content">
          <h2 className="text-heading">MESSAGE</h2>
          <p className="text-des">MESSAGE-connect people to people</p>
        </div>
      </div>
      <div className="landing-content">
        <div className="section-image">
          <h2 className="section-heading">MESSAGE</h2>
          <p className="section-sub-heading">Connection is power</p>
          <p className="about-content">
            Microsoft Word is a word processing software developed by Microsoft.
            It was first released on October 25, 1983, under the name Multi-Tool
            Word for Xenix systems.Microsoft Word is a word processing software
            developed by Microsoft. It was first released on October 25, 1983,
            under the name Multi-Tool Word for Xenix systems.
          </p>
          <div className="members-list">
            <div className="member-item">
              <p className="member-name">HA TIEN ANH</p>
              <img src={Me} alt="name" className="member-img" />
            </div>
            <div className="member-item">
              <p className="member-name">HA TIEN ANH</p>
              <img src={Me} alt="name" className="member-img" />
            </div>
            <div className="member-item">
              <p className="member-name">HA TIEN ANH</p>
              <img src={Me} alt="name" className="member-img" />
            </div>
            <div className="clear"></div>
          </div>
        </div>
      </div>

      <div className="section-1">
        <h2 className="section-heading">LIST IMAGE</h2>
        <p className="section-sub-heading">Image for everyone</p>

        <ul className="finding-images">
          <li>ABC </li>
          <li>ABC</li>
          <li>ABC</li>
        </ul>
      </div>
      <div className="image-position ">
        <Slide>
          <div className="each-slide">
            <img src={Img1} className="each-img" />
          </div>
          <div className="each-slide">
            <img src={Img2} className="each-img" />
          </div>
          <div className="each-slide">
            <img src={Img3} className="each-img" />
          </div>
          <div className="each-slide">
            <img src={Img4} className="each-img" />
          </div>
        </Slide>
      </div>
      <div className="landing-content">
        <div className="section-image">
          <h2 className="section-heading">CONTACT US</h2>
          <p className="section-sub-heading">Connection is power</p>
        </div>
      </div>
    </div>
  );
};

export default Landing_noAuth;
