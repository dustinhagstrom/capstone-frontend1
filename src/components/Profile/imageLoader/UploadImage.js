import React, { Component } from "react";

import Axios from "../../utils/Axios";

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

  handleOnChange(event) {
    this.setState({
      file: this.fileInput.current.files[0],
      img: URL.createObjectURL(this.fileInput.current.files[0]),
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let ourFile = this.state.file;
    // alert(`Selected file = ${this.fileInput.current.files[0].name}`);
    Axios({
      method: "post",
      url: "api/pics/upload-player-image-to-db",
      ourFile,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        throw err;
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
      console.log("click");
      let fetchedPic = await Axios.get("api/pics/player-image");
      console.log(fetchedPic);
      console.log(fetchedPic.data);
      console.log(fetchedPic.data.payload);
      console.log(fetchedPic.data.payload.img.data.data);
      let somethingElse = this.arrayBufferToBase64(
        fetchedPic.data.payload.img.data.data
      );
      console.log(somethingElse);
      this.setState({
        profileImg: `data:image/png;base64${somethingElse}`,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <form style={{ marginTop: "100px" }} onSubmit={this.handleSubmit}>
          <label>
            Upload your Photo:
            <input
              name="image"
              type="file"
              ref={this.fileInput}
              accept="image/*"
              onChange={this.handleOnChange}
            />
          </label>
          <div>
            <button type="submit">Upload</button>
          </div>
        </form>
        <hr />
        <div>
          <div>
            {this.state.profileImg && (
              <img src={this.state.profileImg} alt="profile"></img>
            )}
          </div>
          <div>
            <button onClick={this.handleGetPic}>load profile pic</button>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadImage;
