import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getUserById from "../blockchain/getUserById";
import DocumentsUploaded from "../components/DocumentsUploaded";
import DocumentsSigned from "../components/DocumentsSigned";
import getsignedDocumentsUID from "../blockchain/getsignedDocumentsUID";
import getUploadedDocumentUID from "../blockchain/getUploadedDocumentUID";
import PersonIcon from "@mui/icons-material/Person";
import { CircularProgress } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const UserProfile = () => {
  const { filter } = useParams();

  const [user, set_user] = useState({});
  const [loading, set_loading] = useState(true);
  const [error, set_error] = useState(false);
  const [signedDocumentsUID, set_signedDocumentsUID] = useState([]);
  const [uploadedDocumentsUID, set_uploadedDocumentsUID] = useState([]);
  const [loadingheck, set_loadingheck] = useState(true);

  useEffect(() => {
    const firstRun = async () => {
      try {
        const _user = await getUserById(filter);
        const _signedDocumentsUID = await getsignedDocumentsUID(_user.uid);
        set_signedDocumentsUID(_signedDocumentsUID);
        const _uploadedDocumentsUID = await getUploadedDocumentUID(_user.uid);
        set_uploadedDocumentsUID(_uploadedDocumentsUID);
        set_user(_user);
      } catch (error) {
        set_error(true);
      }
      set_loading(false);
      set_loadingheck(false);
    };
    firstRun();
  }, []);
  return (
    <div>
      {!loadingheck && (
        <div
          className="w-screen overflow-scroll h-screen  flex justify-center items-center bg-slate-50  w-screen h-screen bg-center bg-cover bg-no-repeat px-3 lg:px-[60px]   "
          style={{ backgroundImage: "url(https://i.imgur.com/yGw2JXc.png)" }}
        >
          <div className="bg-[#02020e] overflow-scroll px-5 py-9 justify-between  shadow-lg flex flex-col w-full h-full max-h-[600px]  text-slate-100">
            <div className="w-full flex justify-between ">
              <h1 className="text-3xl racking-tighter font-bold w-full ">
                Chain Signer{" "}
              </h1>
              <a href={"/app/"}>
                <button className="p-2 rounded-full bg-slate-700">
                  <HomeIcon sx={{ color: "#c7bca3" }} />
                </button>
              </a>
            </div>
            <div className="w-full flex flex-col items-center flex-grow pt-[50px] ">
              <div className="bg-[#02020e] px-5 py-9 gap-5  flex lg:flex-row flex-col lg:items-start items-center lg:justify-start justify-center w-full ">
                <div>
                  <img
                    className="bg-cover rounded-full w-full max-w-[300px] h-full max-h-[200px]  "
                    src={user.imageURL}
                  />
                </div>
                <div className="flex flex-col gap-3 lg:h-full justify-center w-full max-w-[300px]">
                  <h1 className="  font-light text-sm text-slate-300 tracking-tighter  ">
                    <span className="font-bold"> {"User: "} </span>
                    {user.uid} <br />{" "}
                  </h1>
                  <h1 className="  font-light text-sm text-slate-300 tracking-tighter  ">
                    {" "}
                    <span className="font-bold"> {"Name: "} </span>
                    {user.name}
                  </h1>
                  <h1 className="  font-light text-sm text-slate-300 tracking-tighter  ">
                    {" "}
                    <span className="font-bold"> {"Bio: "} </span>
                    {user.description}{" "}
                  </h1>
                </div>
              </div>
              <div className="bg-[#02020e] px-5 py-9 gap-5   flex lg:flex-row flex-col lg:items-start items-center lg:justify-start justify-center w-full ">
                <div className="w-full h-9 h-full min-h-[100px]  ">
                  <h1 className=" mt-3 bg-slate-700 font-light py-3 font-bold text-slate-300 tracking-tighter px-3  ">
                    Documents Uploaded
                  </h1>
                  <DocumentsUploaded
                    uploadedDocumentsUID={uploadedDocumentsUID}
                  />
                </div>
                <div className="w-full h-full min-h-[100px]   ">
                  <h1 className=" mt-3 bg-slate-700 font-light py-3 font-bold text-slate-300 tracking-tighter px-3  ">
                    Documents Signed
                  </h1>
                  <DocumentsSigned signedDocumentsUID={signedDocumentsUID} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {loadingheck && (
        <div className="w-screen h-screen bg-black flex justify-center items-center flex flex-col gap-9">
          <h1 className="text-[#c7bca3] text-3xl ">Checking User...</h1>{" "}
          <CircularProgress sx={{ color: "#c7bca3" }} />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
