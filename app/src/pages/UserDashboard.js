import React, { useState } from "react";
import SignDocument from "./SignDocument";
import UploadDocument from "./UploadDocument";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CreateIcon from "@mui/icons-material/Create";
import HeaderTop from "../components/HeaderTop";

const UserDashboard = ({ user }) => {
  const [showSignocument, set_showSignocument] = useState(false);
  const [showUploadDocument, set_showUploadDocument] = useState(false);
  const handleSignDocumentClick = () => {
    set_showSignocument(true);
    set_showUploadDocument(false);
  };
  const handleUploadDocumentClick = () => {
    set_showSignocument(false);
    set_showUploadDocument(true);
  };
  return (
    <div>
      {!showSignocument && !showUploadDocument && (
        <div
          className="w-screen overflow-scroll h-screen  flex justify-center items-center bg-slate-50  w-screen h-screen bg-center bg-cover bg-no-repeat px-3 lg:px-[60px]   "
          style={{ backgroundImage: "url(https://i.imgur.com/yGw2JXc.png)" }}
        >
          <div className="bg-[#02020e] overflow-scroll px-5 py-9 justify-between  shadow-lg flex flex-col w-full h-full max-h-[600px]  text-slate-100">
            <HeaderTop user={user} />
            <div className="w-full flex flex-col flex-grow pt-[50px] ">
              <h1 className="tracking-wide text-4xl font-bold text-slate-200 ">
                {" "}
                {"Welcome "} <br />
                <span className="text-[#c7bca3]"> {user.name} </span>
              </h1>
              <h1 className="tracking-wide text-center w-full py-9 text-xl font-bold text-slate-200  ">
                {"What you like to do"}
              </h1>
              <div className="w-full flex justify-center gap-9 lg:flex-row flex-col">
                <div className="flex flex-col items-center ">
                  <button
                    className="bg-[#1d1d2e] p-3 rounded-3xl w-full lg:w-fit"
                    onClick={handleSignDocumentClick}
                  >
                    <CreateIcon
                      sx={{
                        color: "#c7bca3",
                        fontSize: 70,
                        background: "#1d1d2e",
                      }}
                    />{" "}
                  </button>
                  <h1 className=" mt-3 text-[#c7bca3] font-light text-sm tracking-tighter  ">
                    Sign Document
                  </h1>
                </div>
                <div className="flex flex-col items-center ">
                  <button
                    className="bg-[#1d1d2e] p-3 rounded-3xl w-full lg:w-fit"
                    onClick={handleUploadDocumentClick}
                  >
                    <UploadFileIcon
                      sx={{
                        color: "#c7bca3",
                        fontSize: 70,
                        background: "#1d1d2e",
                      }}
                    />{" "}
                  </button>
                  <h1 className=" mt-3 text-[#c7bca3] font-light text-sm tracking-tighter  ">
                    Upload Document
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showSignocument && !showUploadDocument && (
        <SignDocument user={user} set_showSignocument={set_showSignocument} />
      )}
      {!showSignocument && showUploadDocument && (
        <UploadDocument
          user={user}
          set_showUploadDocument={set_showUploadDocument}
        />
      )}
    </div>
  );
};

export default UserDashboard;
