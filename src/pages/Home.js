import React, { useEffect, useState } from "react";
import { db, auth, storage } from "../firebase";

import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import User from "../components/User";
import MessageForm from "../components/MessageForm";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Message from "../components/Message";
const Home = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [isWorld, setWorld] = useState(false);
  const [checkUser, setCheckUser] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [msgs, setMsgs] = useState([]);

  const user1 = auth.currentUser.uid;
  const valiUser = auth.currentUser;
  useEffect(() => {
    const usersRef = collection(db, "users");
    // query object
    const q = query(usersRef, where("uid", "not-in", [user1]));
    // execute query
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);

  const selectUser = async (user) => {
    setChat(user);
    console.log("hh", user);
    const userWorld = "uWMUXes6unTIZpYesx9n";
    if (user.uid === userWorld) {
      const idWorld = "uWMUXes6unTIZpYesx9n99999";
      setWorld(true);
      const msgsRef = collection(db, "messages", idWorld, "chat");
      const q = query(msgsRef, orderBy("createdAt", "asc"));

      onSnapshot(q, (querySnapshot) => {
        let msgs = [];
        querySnapshot.forEach((doc) => {
          msgs.push(doc.data());
        });
        setMsgs(msgs);
      });

      const docSnap = await getDoc(doc(db, "lastMsg", idWorld));
      if (docSnap.data() && docSnap.data().from !== user1) {
        await updateDoc(doc(db, "lastMsg", idWorld), { unread: false });
      }
    } else {
      setWorld(false);
      const user2 = user.uid;
      const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
      const msgsRef = collection(db, "messages", id, "chat");
      const q = query(msgsRef, orderBy("createdAt", "asc"));

      onSnapshot(q, (querySnapshot) => {
        let msgs = [];
        querySnapshot.forEach((doc) => {
          msgs.push(doc.data());
        });
        setMsgs(msgs);
      });

      const docSnap = await getDoc(doc(db, "lastMsg", id));
      if (docSnap.data() && docSnap.data().from !== user1) {
        await updateDoc(doc(db, "lastMsg", id), { unread: false });
      }
    }
  };

  const handleSubmit = async (e) => {
    if (text === "") {
      e.preventDefault();
    } else {
      e.preventDefault();
      const idWorld = "uWMUXes6unTIZpYesx9n99999";

      const user2 = chat.uid;
      const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
      let url;
      if (img) {
        const imgRef = ref(
          storage,
          `images/${new Date().getTime()} -${img.name}`
        );

        const snap = await uploadBytes(imgRef, img);
        const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        url = dlUrl;
      }
      if (isWorld) {
        await addDoc(collection(db, "messages", idWorld, "chat"), {
          text,
          checkUser: valiUser.email,
          from: user1,
          to: user2,
          createdAt: Timestamp.fromDate(new Date()),
          media: url || "",
        });

        await setDoc(doc(db, "lastMsg", id), {
          text,
          // checkUser,
          from: user1,
          to: user2,
          createdAt: Timestamp.fromDate(new Date()),
          media: url || "",
          unread: true,
        });
      } else {
        await addDoc(collection(db, "messages", id, "chat"), {
          text,
          from: user1,
          to: user2,
          createdAt: Timestamp.fromDate(new Date()),
          media: url || "",
        });

        await setDoc(doc(db, "lastMsg", id), {
          text,
          from: user1,
          to: user2,
          createdAt: Timestamp.fromDate(new Date()),
          media: url || "",
          unread: true,
        });
      }
      setImg("");
      setText("");
    }
  };

  return (
    <div className="home_container">
      <div className="users_container">
        {users.map((user) => (
          <User
            key={user.uid}
            user={user}
            selectUser={selectUser}
            user1={user1}
            chat={chat}
          />
        ))}
      </div>

      <div className="messages_container">
        {chat ? (
          <>
            <div className="messages_user">
              <h3>{chat.name}</h3>
            </div>
            <div className="messages">
              {msgs.length
                ? msgs.map((msg, i) => (
                    <Message
                      key={i}
                      msg={msg}
                      user1={user1}
                      valiUser={valiUser}
                    />
                  ))
                : null}
            </div>
            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              setImg={setImg}
            />
          </>
        ) : (
          <h3 className="no_conv">Select a user to start conversation ^.^</h3>
        )}
      </div>
    </div>
  );
};

export default Home;
