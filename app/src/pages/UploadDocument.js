import React, { useState } from "react";
import uploadDocument from "../blockchain/uploadDocument";
import HeaderTop from "../components/HeaderTop";
import { CircularProgress } from "@mui/material";
import UploadComponent from "../blockchain/UploadComponent";

const UploadDocument = ({ set_showUploadDocument, user }) => {
  const [name, set_name] = useState("");
  const [imageURL, set_imageURL] = useState("");
  const [description, set_description] = useState("");
  const [loading, set_loading] = useState(false);
  var uid = "abv";

  const handleUploadDocumentClick = async () => {
    uid = (Math.random() * 100).toString();

    set_loading(true);
    try {
      const res = await uploadDocument(uid, name, description, imageURL);
      alert("uploaded with UID: " + uid);
    } catch (error) {
      alert("Error...");
      console.log("error...", error);
    }
    set_loading(false);
  };

  return (
    <div>
      <div
        className="w-screen overflow-scroll h-screen  flex justify-center items-center bg-slate-50  w-screen h-screen bg-center bg-cover bg-no-repeat px-3 lg:px-[60px]   "
        style={{ backgroundImage: "url(https://i.imgur.com/yGw2JXc.png)" }}
      >
        <div className="bg-[#02020e] overflow-scroll px-5 py-9 justify-between  shadow-lg flex flex-col w-full h-full max-h-[600px]  text-slate-100">
          <HeaderTop user={user} />
          <div className="w-full flex flex-col items-center flex-grow pt-[50px] ">
            <div className="bg-[#02020e] px-5 py-9 gap-5  flex flex-col justify-center w-full max-w-[480px]">
              <h1 className="text-3xl racking-tighter font-bold w-full   ">
                Upload to CS
                <br />
                <h1 className=" mt-3 font-light text-sm text-slate-300 tracking-tighter ">
                  Trust Your Safety
                </h1>
              </h1>
              <div className="flex flex-col gap-2 w-full">
                <h1 className=" mt-3 w-full  font-light text-sm text-slate-300 tracking-tighter  ">
                  Name
                </h1>
                <input
                  className=" w-full max-w-[300px] bg-transparent border-b-[1px] border-slate-500 tracking-tight font-bold text-slate-300 outline-none "
                  type="text"
                  value={name}
                  onChange={(e) => set_name(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <h1 className=" mt-3 w-full  font-light text-sm text-slate-300 tracking-tighter  ">
                  Description
                </h1>
                <input
                  className=" w-full max-w-[300px] bg-transparent border-b-[1px] border-slate-500 tracking-tight font-bold text-slate-300 outline-none "
                  type="text"
                  value={description}
                  onChange={(e) => set_description(e.target.value)}
                />
              </div>
              <UploadComponent set_imageURL={set_imageURL} />
              <button
                disabled={loading}
                className="w-full text-sm bg-[#191a25] max-w-[300px]  text-[#c7bca3] py-5 rounded-xl tracking-tighter font-bold"
                onClick={handleUploadDocumentClick}
              >
                {!loading && "Upload"}
                {loading && <CircularProgress sx={{ color: "#c7bca3" }} />}
              </button>

              <button
                disabled={loading}
                className="w-full text-sm bg-none max-w-[300px] pt-9  text-red-500 tracking-tighter"
                onClick={() => set_showUploadDocument(false)}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;
