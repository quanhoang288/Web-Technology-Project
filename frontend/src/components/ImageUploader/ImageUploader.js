import React, { useState, useEffect } from "react";
import FolderIcon from "./assets/folder_icon_transparent.png";
import CloseIcon from "./assets/CloseIcon.svg";
import "./FileUploader.css";

function FileUploader(props) {
  const [image, setImage] = useState(props.preview ?  props.preview : null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [typeFile, setTypeFile] = useState("");
  const [nameFile, setNameFile] = useState("")

  function handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      var files = e.target.files[0]
      
      var fileName = files.name
      setTypeFile(e.target.files[0].type);
      setNameFile(fileName)
      
      
      
      
      let reader = new FileReader();

      reader.onload = function (e) {
        
        setImage(e.target.result);
        setIsUploaded(true);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  }
  useEffect(() => {
    props.onChange(image);
  }, [image]);
  useEffect(() => {
    if(props.preview)
    {
      setIsUploaded(true)
    }
  },[])
  
  
    var img_preview = (
      <div className="image-preview">
        <img
          className="close-icon"
          src={CloseIcon}
          alt="CloseIcon"
          onClick={() => {
            setIsUploaded(false);
            setImage(null);
          }}
        />
        {typeFile.includes("officedocument") ? (
          <div
            id="uploaded-image"
            
          >{nameFile}</div>
        ) : (
          <img
            id="uploaded-image"
            src={image}
            draggable={false}
            alt="uploaded-img"
          />
        )}
      </div>
    );
  

  return (
    <div className="uploader-layout">
      <div className="uploader-container">
        <h2>{props.title ? props.title : "Upload your image"}</h2>

        <div className="box-upload">
          <div className="image-upload">
            {!isUploaded ? (
              <>
                <label htmlFor="upload-input">
                  <img
                    src={FolderIcon}
                    draggable={"false"}
                    alt="placeholder"
                    style={{ width: 100, height: 100 }}
                  />
                  <p style={{ color: "#444" }}>Click to upload image</p>
                </label>

                <input
                  id="upload-input"
                  type="file"
                  accept=".jpg,.jpeg,.gif,.png,.mov,.mp4, .docx,.txt"
                  onChange={handleImageChange}
                />
              </>
            ) : (
              img_preview
            )}
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default FileUploader;
