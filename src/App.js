import Header from "./components/navigation/Header";
import { useState } from "react";
function App() {
  const [signedIn, setSignedIn] = useState(false);
  return (
    <div className="App">
      <Header signInState={signedIn} handleSignIn={setSignedIn} />
    </div>
  );
}

export default App;
