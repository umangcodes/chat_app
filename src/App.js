import Header from "./components/navigation/Header";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "./firebase/Firebase.js";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import Chatroom from "./components/panels/Chatroom";
import Footer from "./components/navigation/Footer";
function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  // const firstName = user.displayName.split(" ").slice(0, -1).join(" ");

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
    <div className="h-screen">
      <div className="h-screen">
        {user ? (
          <>
            <div className="flex my-5 justify-between mx-5">
              <p className="text-lg">
                Welcome to MHL chats,
                <span className="italic">
                  {``} {user.displayName.split(" ").slice(0, -1).join(" ")}
                  {/* {firstName.charAt(0).toUpperCase() + firstName.slice(1)} */}
                </span>
              </p>
              <button
                className=" font-semibold rounded-full px-4 border hover:shadow-sm text-red-900 transition ease-in-out hover:scale-105"
                onClick={logOut}
              >
                Sign Out
              </button>
            </div>
            <Chatroom user={user} db={db} />
          </>
        ) : (
          <div className="h-4/5 flex justify-center align-center">
            <button
              onClick={signInWithGoogle}
              className=" hover:scale-105 transition ease-linear hover:font-semibold"
            >
              Login with Google
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
