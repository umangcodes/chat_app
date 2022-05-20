import React from "react";
import Logo from "../../mhl.png";
function Footer() {
  return (
    <div className="">
      <div className="fixed bottom-0 flex p-5 justify-center w-full border-t bg-white">
        <div className="">
          <img src={Logo} alt="MHL" className="h-16 " />
        </div>
        <div className="flex flex-col justify-end">
          <span className="text-center"> MHL Chats developed By Umang A</span>
          <span className="text-center">Powered by React.js & Firebase</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
