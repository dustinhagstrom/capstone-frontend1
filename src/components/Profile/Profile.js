import React from "react";
// import "./App.css";

import UploadImages from "./imageLoader/image-upload.component";

function Profile() {
  return (
    <div className="container">
      <div className="content">
        <UploadImages />
      </div>
    </div>
  );
}

export default Profile;
