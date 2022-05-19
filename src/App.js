import Header from "./components/navigation/Header";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "./firebase/Firebase.js";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import Chatroom from "./components/panels/Chatroom";
function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err.message);
    }
  };
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      user ? setUser(user) : setUser(null);
      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscribe;
  }, [auth, db]);
  return (
    <div className="App">
      {user ? (
        <>
          <div className="flex my-5 justify-between mx-5">
            <p className="text-lg">
              Welcome to MHL chats,
              <span className="italic"> {user.displayName}</span>
            </p>
            <button
              className="border-red font-semibold rounded-full px-2 py-1 bg-red-100/75 hover:bg-red-100 transition ease-in-out hover:scale-105"
              onClick={logOut}
            >
              Sign Out
            </button>
          </div>
          <Chatroom user={user} db={db} />
        </>
      ) : (
        <button onClick={signInWithGoogle}>Login</button>
      )}
      <Header signInState={signedIn} handleSignIn={setSignedIn} />
    </div>
  );
}

export default App;
