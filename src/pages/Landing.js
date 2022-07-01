import React, { useState, useEffect } from "react";
// import Attachment from "./../components/svgs/Attachment";
import Img from "../images/ME.JPG";
import { db, auth } from "../firebase";
import "react-slideshow-image/dist/styles.css";
import Zyana from "../images/Zyana.jpeg"
import logo from "../images/DSC01681.JPG"
// import { Slide } from "react-slideshow-image";
import {
  collection,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
// import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { ListMyImage } from "../components/ListMyImage";

export const Landing = () => {
  const user1 = auth.currentUser.uid;
  // const [user, setUser] = useState();
  const [images, setImages] = useState([]);
  useEffect(() => {
    // getDoc(doc(db, "users", user1)).then((docSnap) => {
    //   if (docSnap.exists) {
    //     setUser(docSnap.data());
    //   }
    // });
    const q = query(collection(db, "sharings"), where("isPublic", "==", true));
    // console.log(q);
    const unsub = onSnapshot(q, (querySnapshot) => {
      let images = [];
      querySnapshot.forEach((doc) => {
        images.push(doc.data());
      });
      setImages(images);
      // console.log(images);
    });
    return () => unsub();
  }, []);
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
              <img src={Img} alt="name" className="member-img" />
            </div>
            <div className="member-item">
              <p className="member-name">Firebase</p>
              <img src={logo} alt="name" className="member-img" />
            </div>
            <div className="member-item">
              <p className="member-name">ZHANIYA BALGOZHNA</p>
              <img src={Zyana} alt="name" className="member-img" />
            </div>
            <div className="clear"></div>
          </div>
        </div>
      </div>

      <div className="section-1">
        <h2 className="section-heading">LIST IMAGE</h2>
        <p className="section-sub-heading">Image for everyone</p>

        <ul className="finding-images">
          <li>New Images </li>
          <li>Most Like Images</li>
          <li>My Image</li>
        </ul>
      </div>
      <div className="place-images">
        {/* <ListMyImage images={images}></ListMyImage> */}
        {images.length
          ? images.map((image, i) => (
              <ListMyImage key={i} image={image} user1={user1} />
            ))
          : null}
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
