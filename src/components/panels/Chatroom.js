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
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
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
  };
  return (
    <div>
      <ul>
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
      <input
        type="text"
        onChange={handleOnChange}
        value={newMessage}
        placeholder="type your message"
      />

      <button onClick={handleOnSubmit}>Send</button>
    </div>
  );
};

export default Chatroom;
