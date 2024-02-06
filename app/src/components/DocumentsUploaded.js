import React, { useEffect, useState } from "react";
import getDocument from "../blockchain/getDocument";
import { CircularProgress } from "@mui/material";

const DocumentsUploaded = ({ uploadedDocumentsUID }) => {
  const [document, set_documents] = useState([]);
  const [loding, set_loading] = useState(true);

  useEffect(() => {
    const firstRun = async () => {
      const _document = [];

      for (var i = 0; i < uploadedDocumentsUID.length; i++) {
        const _currentDocument = await getDocument(uploadedDocumentsUID[i]);
        console.log(_currentDocument);
        _document.push(_currentDocument);
      }
      set_documents(_document);
      set_loading(false);
    };
    firstRun();
  }, []);

  return (
    <div className="h-full min-h-[100px]">
      {" "}
      {!loding && (
        <div className="flex flex-col bg-slate-900 pb-3 ">
          <div className="w-full flex gap-2 py-2 px-3 ">
            <h1 className="  font-bold text-sm w-[40px]  text-slate-300 tracking-tighter  ">
              Sno.
            </h1>
            <h1 className="  font-bold w-[100px] text-sm  text-slate-300 tracking-tighter  ">
              UID
            </h1>
            <h1 className="  font-bold text-sm  text-slate-300 flex-grow  tracking-tighter  ">
              Name
            </h1>
            <h1 className="  font-bold text-sm w-[40px]  text-slate-300 tracking-tighter  "></h1>
          </div>
          {document.map((doc, index) => {
            return (
              <div className="w-full flex gap-2 px-3 ">
                <h1 className="  font-bold text-sm w-[40px]  text-slate-300 tracking-tighter  ">
                  {index + 1}
                </h1>
                <h1 className=" w-[100px] text-sm  text-slate-300 tracking-tighter  ">
                  {doc.uid}
                </h1>
                <h1 className="text-sm  text-slate-300 flex-grow  tracking-tighter  ">
                  {doc.name}
                </h1>
                <a target="_blank" href={"/document/" + doc.uid}>
                  <u>
                    <h1 className=" cursor-pointer  text-sm w-[40px]  text-[#c7bca3] tracking-tighter  ">
                      Open
                    </h1>
                  </u>
                </a>
              </div>
            );
          })}
        </div>
      )}
      {loding && <CircularProgress />}
    </div>
  );
};

export default DocumentsUploaded;
