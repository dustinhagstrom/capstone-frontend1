import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Axios from "../../utils/Axios";

import defaultPic from "./new_user.png";
export class UploadImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: undefined,
      img: undefined,
      profileImg: undefined,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
    this.handleGetPic = this.handleGetPic.bind(this);
    this.arrayBufferToBase64 = this.arrayBufferToBase64.bind(this);
  }

  componentDidMount = () => {
    this.handleGetPic();
  };

  handleOnChange(event) {
    this.setState({
      file: this.fileInput.current.files[0],
      img: URL.createObjectURL(this.fileInput.current.files[0]),
    });
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
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  async handleGetPic() {
    try {
      let fetchedPic = await Axios.get("api/pics/player-image");
      let somethingElse;
      if (fetchedPic) {
        somethingElse = this.arrayBufferToBase64(
          fetchedPic.data.payload.img.data.data
        );
      } else {
        somethingElse = defaultPic;
      }
      console.log(somethingElse);
      this.setState({
        profileImg: `data:image/png;base64,${somethingElse}`,
        img: undefined,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <form className="file-form" onSubmit={this.handleSubmit}>
          <div className="inline-div">
            <label style={{ textIndent: "10%", margin: "20px 10px" }}>
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

            <div>
              <button style={{ margin: "0px 10px" }} type="submit">
                Upload
              </button>
            </div>
          </div>
        </form>
        <hr />
        <div>
          <div>
            <h3 style={{ textIndent: "2%", textDecoration: "underline" }}>
              Your Profile Pic
            </h3>
            {this.state.profileImg && (
              <img src={this.state.profileImg} alt="profile"></img>
            )}
          </div>
          <div>
            <div style={{ textIndent: "5%" }}>Preview Upload:</div>
            {this.state.img && <img src={this.state.img} alt="profile"></img>}
          </div>
        </div>
      </div>
    );
  }
}

export default UploadImage;
