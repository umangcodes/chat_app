import React from "react";

function Message(props) {
  const { userId, userName, message, messageFrom, user } = props;
  let sent;
  if (messageFrom === userName) {
    sent = true;
  } else {
    sent = false;
  }
  return (
    <div
      className={
        sent
          ? "bg-lime-100 rounded-full max-w-2xl justify-end my-2"
          : "bg-teal-100 rounded-full max-w-2xl justify-start my-2"
      }
    >
      <div className="mx-5 pt-2">{messageFrom}</div>
      <li key={userId} className="mx-8 my-2 pb-2 font-thin">
        {message}
      </li>
    </div>
  );
}

export default Message;
