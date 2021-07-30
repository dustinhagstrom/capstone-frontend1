import React, { Component } from "react";

import UploadImage from "./imageLoader/UploadImage";
import UpdateProfile from "./updateProfile/UpdateProfile";
export class Profile extends Component {
  render() {
    return (
      <div className="profile">
        <div
          className="content"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <UploadImage />
          <UpdateProfile />
        </div>
      </div>
    );
  }
}

export default Profile;
