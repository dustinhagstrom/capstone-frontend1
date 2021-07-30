import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Axios from "../../utils/Axios";

import "./uploadImage.css";
import defaultPic from "./new_user.png";
export class UploadImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: undefined,
      image: undefined,
      profileImg: undefined,
      isButtonDisabled: true,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef(); //the ref is assigned to an instance
    //property when the component is constructed so that it can be referenced
    //throughout the component. does not follow normal props to children model
    this.handleGetPic = this.handleGetPic.bind(this);
    this.arrayBufferToBase64 = this.arrayBufferToBase64.bind(this);
  }

  componentDidMount = () => {
    this.handleGetPic();
  };

  handleOnChange(event) {
    console.log("new value", event.target);
    if (this.fileInput.current.files.length !== 0) {
      //prevents breaking app by preventing
      //image preview of something that does not exist.
      this.setState({
        file: this.fileInput.current.files[0],
        image: URL.createObjectURL(this.fileInput.current.files[0]),
        isButtonDisabled: false,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault(); //prevent full page reload
    let data = new FormData(); //make a new formdata object
    data.append("image", this.state.file); //give previously defined formdata object the ('key', 'value') pair.
    Axios({
      method: "post",
      url: "/api/pics/upload-player-image-to-db",
      data,
    }) //send the post req with the new form data obj
      .then((res) => {
        this.handleGetPic();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  arrayBufferToBase64(buffer) {
    //convert the buffer to base64
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  async handleGetPic() {
    try {
      let fetchedPic = await Axios.get("api/pics/player-image");
      console.log(fetchedPic);
      let somethingElse;
      if (fetchedPic.data.payload) {
        somethingElse = this.arrayBufferToBase64(
          fetchedPic.data.payload.img.data.data
        );
        somethingElse = `data:image/png;base64,${somethingElse}`;
      } else {
        somethingElse = defaultPic; //if no pic in db then give default
      }
      console.log(somethingElse);
      this.setState({
        file: undefined,
        image: undefined,
        profileImg: somethingElse,
        isButtonDisabled: true,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { isButtonDisabled, profileImg, image } = this.state;
    return (
      <div>
        <form className="file-form" onSubmit={this.handleSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px 0px",
              alignItems: "flex-end",
              width: "500px",
            }}
          >
            <div>
              <label>
                Upload your Photo:
                <input
                  name="image"
                  type="file"
                  ref={this.fileInput}
                  accept="image/*"
                  onChange={this.handleOnChange}
                  style={{ cursor: "grab" }}
                />
              </label>
            </div>
            <div>
              <button type="submit" disabled={isButtonDisabled}>
                Upload
              </button>
            </div>
          </div>
        </form>
        <div className="inline-div">
          <div style={{ width: "250px" }}>
            <h3 className="image-headers">Your Profile Pic</h3>
            {profileImg && <img src={profileImg} alt="profile"></img>}
          </div>
          <div style={{ width: "250px" }}>
            <h3 className="image-headers">Preview Upload</h3>
            {image && <img src={image} alt="profile"></img>}
          </div>
        </div>
      </div>
    );
  }
}

export default UploadImage;
