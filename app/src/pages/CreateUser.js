import React, { useEffect, useState } from "react";
import UserDashboard from "./UserDashboard";
import createUser from "../blockchain/createUser";
import getWalletAddress from "../blockchain/getWalletAddress";
import getUserByAddr from "../blockchain/getUserByAddr";
import HeaderTop from "../components/HeaderTop";
import { CircularProgress } from "@mui/material";
import UploadComponent from "../blockchain/UploadComponent";

const CreateUser = () => {
  const [name, set_name] = useState("");
  const [uid, set_uid] = useState("");
  const [bio, set_bio] = useState("");
  const [loading, set_loading] = useState(false);
  const [showUserDashBoard, set_showUserDashBoard] = useState(false);
  const [imageURL, set_imageURL] = useState("");
  const [loadingheck, set_loadingheck] = useState(true);
  const [userfound, set_userfound] = useState({});
  const handleCreateAccountClick = async () => {
    set_loading(true);
    try {
      const res = await createUser(uid, name, bio, imageURL);
      set_loading(false);
      set_showUserDashBoard(true);
    } catch (error) {
      alert("Error...");
      console.log("Error...", error);
    }
  };

  const handleUIDChange = async () => {};

  useEffect(() => {
    const firstRun = async () => {
      const addr = await getWalletAddress();
      set_uid(addr);
      try {
        const user = await getUserByAddr(addr);
        set_userfound(user);
        if (user.uid.length > 0) {
          set_showUserDashBoard(true);
        }
      } catch (error) {}
      set_loadingheck(false);
    };
    firstRun();
  }, []);

  return (
    <div>
      {!showUserDashBoard && !loadingheck && (
        <div
          className="w-screen h-screen  flex justify-center items-center bg-slate-50  w-screen h-screen bg-center bg-cover bg-no-repeat  "
          style={{ backgroundImage: "url(https://i.imgur.com/yGw2JXc.png)" }}
        >
          <div className="flex-grow px-3 lg:px-[60px] flex flex-col justify-center w-full items-start">
            <div className=" w-full flex flex-col lg:flex-row">
              {/* First Box */}
              <div className="bg-[#02020e] px-5 py-9 lg:py-[120px] shadow-lg flex flex-col justify-center w-full max-w-[480px]  text-slate-100">
                <h1 className="text-3xl racking-tighter font-bold w-full lg:pl-[60px] lg:pr-[120px]  ">
                  Welcome to CS
                  <br />
                  <h1 className=" mt-3 font-light text-sm text-slate-300 tracking-tighter ">
                    Create Your account
                  </h1>
                </h1>
                <div className="flex flex-col gap-5 w-full lg:ml-[60px] lg:mr-[120px] mt-5 ">
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
                    <h1 className=" mt-3 font-light text-sm text-slate-300 tracking-tighter  ">
                      User Name
                    </h1>
                    <UploadComponent set_imageURL={set_imageURL} />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <h1 className=" mt-3 font-light text-sm text-slate-300 tracking-tighter  ">
                      Bio
                    </h1>
                    <input
                      className=" w-full max-w-[300px] bg-transparent border-b-[1px] border-slate-500 tracking-tight font-bold text-slate-300 outline-none "
                      type="text"
                      value={bio}
                      onChange={(e) => set_bio(e.target.value)}
                    />
                  </div>

                  <button
                    disabled={loading}
                    className="w-full text-sm bg-[#191a25] max-w-[300px]  text-[#c7bca3] py-5 rounded-xl tracking-tighter font-bold"
                    onClick={handleCreateAccountClick}
                  >
                    {!loading && "Create an account"}
                    {loading && <CircularProgress sx={{ color: "#c7bca3" }} />}
                  </button>
                </div>
              </div>
              {/* Second box */}
              <div
                className="w-full bg-[#333c43]   opacity-100 flex flex-col py-9 px-9 bg-center bg-cover bg-no-repeat  "
                style={{
                  backgroundImage: "url(https://i.imgur.com/2rc12Oo.png)",
                }}
              >
                <h1 className="text-5xl lg:text-9xl font-bold text-white tracking-wide">
                  Built for <br /> Trust
                </h1>
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
      {showUserDashBoard && <UserDashboard user={userfound} />}
    </div>
  );
};

export default CreateUser;
