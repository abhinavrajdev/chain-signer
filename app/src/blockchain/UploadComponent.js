import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import ImageIcon from "@mui/icons-material/Image";

function UploadComponent({ set_imageURL }) {
  const [loading, setLoading] = useState(false);

  const uploadImage = async (event) => {
    setLoading(true);
    event.preventDefault();

    const form = new FormData(event.target);

    try {
      const response = await fetch(
        "https://d17424ff-c18c-4800-b11d-f8a442a30806-00-131oqxe6ggq12.sisko.replit.dev/upload",
        {
          method: "POST",
          body: form,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setLoading(false);
        const _cid = result.data.ipfs_storage.ipfs_url.split("/").pop();
        const _imageURL = `https://gateway.pinata.cloud/ipfs/${_cid}`;
        alert(_imageURL);
        set_imageURL(_imageURL);
      } else {
        setLoading(false);
        const errorText = await response.text();
      }
    } catch (error) {
      setLoading(false);
      console.error("Error uploading image:", error);
      alert("Error uploading image. Please try again.");
    }
  };

  return (
    <div>
      <h1 className=" mt-3 w-full  font-light text-sm text-slate-300 tracking-tighter  ">
        Upload Image
      </h1>
      <form
        id="uploadForm"
        encType="multipart/form-data"
        onSubmit={uploadImage}
      >
        <input
          type="file"
          name="image"
          id="upload"
          accept="image/*"
          required
          hidden
        />
        <label for="upload">
          {" "}
          <ImageIcon sx={{ color: "#c7bca3" }} />{" "}
        </label>
        <button type="submit">
          {" "}
          <UploadIcon sx={{ color: "#c7bca3" }} />{" "}
        </button>
      </form>

      {loading && <CircularProgress sx={{ color: "#c7bca3" }} />}
    </div>
  );
}

export default UploadComponent;
