import React from "react";
import notFoundImage from "../Images/not-found.png";

function NotFoundPage() {
  return (
    <div className="column item-center text-center">
      <div className="item-center">
        <img src={notFoundImage} alt="not found" className="image-not-found" />
      </div>
      <h1 className="text-not-found">PAGE NOT FOUND</h1>
    </div>
  );
}

export default NotFoundPage;
