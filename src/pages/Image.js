import React, { useState, useEffect } from "react";
import Attachment from "./../components/svgs/Attachment";

import { db, auth, storage } from "../firebase";
import {
  setDoc,
  Timestamp,
  doc,
  getDoc,
  collection,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { ListMyImage } from "../components/ListMyImage";

export const Image = () => {
  const [img, setImg] = useState("");
  const [share, setShare] = useState("");
  const [user, setUser] = useState();
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDes] = useState("");
  const [isPublic, setPublic] = useState(true);
  const [required, setRequired] = useState("");
  const user1 = auth.currentUser.uid;

  useEffect(() => {
    getDoc(doc(db, "users", user1)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });
    const q = query(collection(db, "sharings"), where("userid", "==", user1));
    // console.log(q);
    const unsub = onSnapshot(q, (querySnapshot) => {
      let images = [];
      querySnapshot.forEach((doc) => {
        images.push(doc.data());
      });
      setImages(images);
      console.log("images", images);
    });
    return () => unsub();
  }, []);
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setShare(e.target.files[0]);
    setImg(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text1 = "I love this environment and love my friend";
    // console.log(isPublic);

    let url;
    if (share) {
      const imgRef = ref(
        storage,
        `sharing_images/${new Date().getTime()}-${share.name}`
      );
      const snap = await uploadBytes(imgRef, share);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }
    var rand = user1 + Math.random() * 9999;
    if (url === "" || title === "" || description === "") {
      setRequired("Required");
    } else {
      await setDoc(doc(db, "sharings", rand), {
        user: user.name,
        userid: user.uid,
        title,
        description,
        media: url || "",
        isPublic,
        createAt: Timestamp.fromDate(new Date()),
      });
      // await addDoc(collection(db, "sharing", user1, "images"), {
      //   user: user1,
      //   title,
      //   description,
      //   media: url || "",
      //   createAt: Timestamp.fromDate(new Date()),
      // });
      setTitle("");
      setDes("");
      setImg("");
      setPublic(null);
    }
  };

  return (
    <div className="sharingImage">
      <section>
        <form className="form" onSubmit={handleSubmit}>
          <div className="img_container">
            <h3>Upload My Image</h3>
            <div className="overlay">
              <div>
                <label htmlFor="img">
                  <Attachment />
                </label>
                <input
                  onChange={onImageChange}
                  type="file"
                  id="img"
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>

          <div>
            {/* <input type="file" onChange={onImageChange} /> */}
            <img
              src={img}
              alt=""
              width="70%"
              height="auto"
              className="myImage"
            />
          </div>
          <div className="input_container">
            <label htmlFor="title">Image Title</label>
            <input
              placeholder={required}
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="input_container">
            <label htmlFor="description">Description</label>
            <textarea
              maxlength={80}
              placeholder={required}
              name="description"
              rows="5"
              cols="50"
              value={description}
              onChange={(e) => setDes(e.target.value)}
            ></textarea>
          </div>
          <div className="checkbox">
            <label>
              <input
                type="radio"
                name="isPublic"
                value={true}
                onChange={(e) => setPublic(e.target.value)}
                checked
              />
              Public
            </label>

            <label>
              <input
                type="radio"
                name="isPublic"
                value={false}
                onChange={(e) => setPublic(e.target.value)}
              />
              Private
            </label>
          </div>
          <div className="btn_container">
            <button className="btn">Upload</button>
          </div>
        </form>
      </section>
      <div className="myImages">
        {/* <ListMyImage images={images}></ListMyImage> */}
        {images.length
          ? images.map((image, i) => (
              <ListMyImage key={i} image={image} user1={user1} />
            ))
          : null}
      </div>
    </div>
  );
};
