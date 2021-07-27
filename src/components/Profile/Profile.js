import React, { Component } from "react";

import UploadImage from "./imageLoader/UploadImage";
export class Profile extends Component {
  render() {
    return (
      <div className="profile">
        <div className="content">
          <UploadImage />
        </div>
      </div>
    );
  }
}

export default Profile;
