import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getUserById from "../blockchain/getUserById";
import getDocument from "../blockchain/getDocument";
import { CircularProgress } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import getSignedBy from "../blockchain/getSignedBy";

const DocumentPage = () => {
  const { filter } = useParams();

  const [document, set_document] = useState({});
  const [loading, set_loading] = useState(true);
  const [error, set_error] = useState(false);
  const [signer, set_signer] = useState([]);
  const [signername, set_signerName] = useState([]);

  useEffect(() => {
    const firstRun = async () => {
      try {
        const _document = await getDocument(filter);
        const _signedBy = await getSignedBy(filter);
        const _signername = [];
        for (let i = 0; i < _signedBy.length; i++) {
          const _name = await getUserById(_signedBy[i]);
          _signername.push(_name);
          set_signerName(_signername);
        }

        console.log(_document);
        set_document(_document);
      } catch (error) {
        set_error(true);
      }
      set_loading(false);
    };
    firstRun();
  }, []);
  return (
    <div>
      {!loading && !error && (
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
            <div className="w-full h-full flex flex-col  items-center">
              <h1 className="py-9  font-light text-base text-slate-300 tracking-tighter  ">
                {" "}
                {document.name}
              </h1>
              <img className="h-full max-h-[400px] " src={document.imageURL} />
              <div className="flex flex-col items-start">
                <h1 className=" text-left  w-full font-light text-sm text-slate-300 tracking-tighter  ">
                  {" "}
                  <span className="font-bold"> {"Name: "} </span>
                  {document.name}
                </h1>
                <h1 className=" text-left  w-full font-light text-sm text-slate-300 tracking-tighter  ">
                  {" "}
                  <span className="font-bold"> {"UID: "} </span>
                  {document.uid}
                </h1>
                <h1 className=" text-left  w-full font-light text-sm text-slate-300 tracking-tighter  ">
                  {" "}
                  <span className="font-bold"> {"Description:: "} </span>
                  {document.description}
                </h1>
                <div className="w-full pt-5 flex flex-col gap-2">
                  <h1 className=" font-light text-base text-slate-300 tracking-tighter  ">
                    {" "}
                    Signed By:
                  </h1>
                  {signername.map((_signer) => {
                    return (
                      <div>
                        <a href={"/user/" + _signer.uid}>
                          <h1 className="text-[#c7bca3] ">{_signer.name}</h1>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="w-screen h-screen bg-black flex justify-center items-center flex flex-col gap-9">
          <h1 className="text-[#c7bca3] text-3xl ">Checking User...</h1>{" "}
          <CircularProgress sx={{ color: "#c7bca3" }} />
        </div>
      )}
    </div>
  );
};

export default DocumentPage;
