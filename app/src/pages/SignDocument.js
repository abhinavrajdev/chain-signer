import React, { useState } from "react";
import getDocument from "../blockchain/getDocument";
import signDocument from "../blockchain/signDocument";
import HeaderTop from "../components/HeaderTop";
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress } from "@mui/material";

const SignDocument = ({ set_showSignocument, user }) => {
  const [document, set_document] = useState({});
  const [uid, set_uid] = useState("");
  const [loadingDocument, set_loadingDocument] = useState(false);
  const [showDocument, set_showDocument] = useState(false);
  const [loadingSign, set_loadingSign] = useState(false);

  const fetchDocument = async () => {
    set_showDocument(true);
    set_loadingDocument(true);
    set_document({});
    try {
      const res = await getDocument(uid);
      set_document(res);
      console.log(res);
    } catch (error) {
      set_showDocument(false);
    }
    set_loadingDocument(false);
  };

  const handleSignClick = async () => {
    set_loadingSign(true);
    try {
      const res = await signDocument(uid);
      alert("signed");
    } catch (error) {
      alert("error");
    }
    set_loadingSign(false);
  };

  return (
    <div
      className="w-screen overflow-scroll h-screen  flex justify-center items-center bg-slate-50  w-screen h-screen bg-center bg-cover bg-no-repeat px-3 lg:px-[60px]   "
      style={{ backgroundImage: "url(https://i.imgur.com/yGw2JXc.png)" }}
    >
      <div className="bg-[#02020e] overflow-scroll px-5 py-9 justify-between  shadow-lg flex flex-col w-full h-full max-h-[600px]  text-slate-100">
        <HeaderTop user={user} />
        <div className="w-full flex flex-col items-center flex-grow pt-[50px] ">
          <div className="bg-[#02020e] px-5 py-9 gap-5  flex flex-col justify-center w-full max-w-[480px]">
            <h1 className="text-3xl racking-tighter font-bold w-full   ">
              Sign on CS
              <br />
              <h1 className=" mt-3 font-light text-sm text-slate-300 tracking-tighter ">
                Trust Your Safety
              </h1>
            </h1>
            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-col gap-2 w-full">
                <h1 className=" mt-3 w-full  font-light text-sm text-slate-300 tracking-tighter  ">
                  Document UID
                </h1>
                <div className="flex gap-1 items-center">
                  <input
                    className=" w-full max-w-[600px] bg-transparent border-b-[1px] border-slate-500 tracking-tight font-bold text-slate-300 outline-none "
                    type="text"
                    value={uid}
                    onChange={(e) => set_uid(e.target.value)}
                  />{" "}
                  <button
                    className="cursor-pointer"
                    onClick={fetchDocument}
                    disabled={loadingDocument}
                  >
                    <SearchIcon
                      sx={{
                        color: "#c7bca3",
                        fontSize: 30,
                      }}
                    />
                  </button>
                </div>
                {showDocument && !loadingDocument && (
                  <div className="mt-9 flex flex-col gap-2">
                    {" "}
                    <p>{document.name}</p>
                    <img
                      className="w-full max-w-[600px] "
                      src={document.imageURL}
                    />
                    <h1 className=" mt-3 w-full  font-light text-sm text-slate-300 tracking-tighter  ">
                      {"Description:"}
                      <br />
                      {document.description}
                    </h1>
                    <h1 className=" mt-3 w-full  font-light text-sm text-slate-300 tracking-tighter  ">
                      {"Uploader Address:"}
                      <br />
                      {document.uploaderAddr}
                    </h1>
                  </div>
                )}
                {showDocument && loadingDocument && <h1>Loading...</h1>}
              </div>

              <br />

              <button
                className="w-full text-sm bg-[#191a25] max-w-[600px]  text-[#c7bca3] py-5 rounded-xl tracking-tighter font-bold"
                disabled={loadingSign}
                onClick={handleSignClick}
              >
                {" "}
                {!loadingSign && "Sign"}
                {loadingSign && <CircularProgress sx={{ color: "#c7bca3" }} />}
              </button>

              <button
                disabled={loadingSign}
                className="w-full text-sm bg-none max-w-[600px] pt-9  text-red-500 tracking-tighter"
                onClick={() => set_showSignocument(false)}
              >
                Back
              </button>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default SignDocument;
