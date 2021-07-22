import React, { Component } from "react";

import UploadImage from "./imageLoader/UploadImage";
export class Profile extends Component {
  render() {
    return (
      <div className="container">
        <div className="content">
          <UploadImage />
        </div>
      </div>
    );
  }
}

export default Profile;
