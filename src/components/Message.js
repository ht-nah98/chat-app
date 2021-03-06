import React, { useRef, useEffect } from "react";
import Moment from "react-moment";

const Message = ({ msg, user1, valiUser }) => {
  const scrollRef = useRef();
  useEffect(() => {
    console.log(msg);
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);
  return (
    <div
      className={`message_wrapper ${msg.from === user1 ? "own" : ""}`}
      ref={scrollRef}
    >
      <p className={msg.from === user1 ? "me" : "friend"}>
        {msg.media ? <img src={msg.media} alt={msg.text} /> : null}
        {msg.text}
        <br />

        <small>
          <span>{msg.checkUser}</span>
          <br/>
          <Moment fromNow>{msg.createdAt.toDate()}</Moment>
        </small>
      </p>
    </div>
  );
};

export default Message;
