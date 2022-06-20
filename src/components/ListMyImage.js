import React, { useState, useEffect } from "react";

export const ListMyImage = ({ image }) => {
  const [image1, setImage] = useState("");
  useEffect(() => {
    setImage(image);
  });
  return (
    <div className="myImage_container">
      <div className="cover">
        <a href={image1.media} target="_blank">
          <img src={image1.media} alt="myImage" className="myImage" />
        </a>

        <div className="myImage_infor">
          <h3 className="myImage_title">{image1.title}</h3>
          <p className="myImage_des">{image1.description}</p>
          <small>Author: {image1.user} </small>
        </div>
      </div>
    </div>
  );
};
