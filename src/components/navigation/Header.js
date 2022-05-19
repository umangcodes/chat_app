import React from "react";
import Logo from "../../mhl.png";
import SignIn from "../buttons/SignIn";
import SignOut from "../buttons/SignOut";
export default function Header(props) {
  const { isSignedIn } = props;
  return (
    <div className="flex p-5 justify-between">
      <div className="">
        <img src={Logo} alt="MHL" className="h-16 " />
      </div>
      <div className="w-48">
        <ul className="flex justify-between">
          <li className="m-auto">Let's Chat MHL!</li>
          <li className="m-auto">{isSignedIn ? <SignOut /> : <SignIn />}</li>
        </ul>
      </div>
    </div>
  );
}
