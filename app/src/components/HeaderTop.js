import React from "react";
import PersonIcon from "@mui/icons-material/Person";

const HeaderTop = ({ user }) => {
  return (
    <div className="w-full flex justify-between ">
      <h1 className="text-3xl racking-tighter font-bold w-full ">
        Chain Signer{" "}
      </h1>
      <a href={"/user/" + user.uid}>
        <button className="p-2 rounded-full bg-slate-700">
          <PersonIcon sx={{ color: "#c7bca3" }} />
        </button>
      </a>
    </div>
  );
};

export default HeaderTop;
