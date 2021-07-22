import Axios from "../../utils/Axios";

class FileUploadService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    return Axios.post("/upload-player-image-to-db", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return Axios.get("/files");
  }
}

export default new FileUploadService();
