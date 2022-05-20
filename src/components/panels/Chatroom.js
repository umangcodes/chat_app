import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  onSnapshot,
  onSnapshotsInSync,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import Message from "../cards/Message";
const Chatroom = (props) => {
  const { user, db } = props;
  const { uid, displayName } = user;
  const [messages, setMessages] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [snap, setSnap] = useState();
  const [formError, setFormError] = useState("");
  let sub;
  useEffect(() => {
    // onSnapshot(collection(db, "messages"), (snap) => {
    //   setSnap(snap);
    // });

    if (db) {
      const getMessages = async () => {
        const ref = collection(db, "messages");
        const resp2 = await query(ref, orderBy("createdAt"), limit(100));
        // console.log(resp2);
        const resp = await getDocs(resp2);
        setMessages(resp.docs);
      };
      getMessages();
    }
  }, [snap, newMessage]);

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
    setFormError("");
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (newMessage === "") {
      setFormError("please add message");
    } else {
      setFormError("");
      try {
        if (db) {
          addDoc(collection(db, "messages"), {
            createdAt: serverTimestamp(),
            text: newMessage,
            uid,
            createdBy: displayName,
          });
          setNewMessage("");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <ul className="h-96 border-b my-5">
        {/* {console.log(messages)} */}
        {messages &&
          messages.map((msg) => (
            <Message
              key={msg.data().id}
              userId={msg.data().id}
              userName={user.displayName}
              message={msg.data().text}
              messageFrom={msg.data().createdBy}
              user={user.displayName}
            />
          ))}
      </ul>
      <div className="mx-10 px-10 w-98% justify-between flex border rounded-full py-2">
        <div className="">
          <input
            type="text"
            onChange={handleOnChange}
            value={newMessage}
            placeholder="type your message"
            size="100"
            className="italic"
          />
          {formError ? (
            <p className="text-red-500 italic font-semibold text-sm">
              {formError}
            </p>
          ) : (
            ""
          )}
        </div>
        <button
          onClick={handleOnSubmit}
          className="rounded-full px-4 mx-4 bg-green-300/25 italic hover:shadow-sm hover:bg-green-300/50 transition ease-in-out hover:scale-105"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatroom;
