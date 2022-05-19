import React from "react";

function SignIn(props) {
  const handleSignIn = () => {
    console.log("sign In pressed");
  };
  return (
    <button className="border rounded-full px-2 py-2" onClick={handleSignIn}>
      Sign In
    </button>
  );
}

export default SignIn;
