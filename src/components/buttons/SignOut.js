import React from "react";

function SignOut() {
  const handleSignOut = () => {
    console.log("sign Out pressed");
  };
  return (
    <button className="border rounded-full px-2 py-2" onClick={handleSignOut}>
      Sign Out
    </button>
  );
}

export default SignOut;
