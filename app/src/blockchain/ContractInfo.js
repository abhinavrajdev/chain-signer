const contractAddress = "0xa296c5ffCBb5B8EFf265D49b95A67eD2f511B06c";
const abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [
      { internalType: "string", name: "uid", type: "string" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "description", type: "string" },
      { internalType: "string", name: "imageURL", type: "string" },
    ],
    name: "createUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "", type: "string" }],
    name: "documents",
    outputs: [
      { internalType: "bool", name: "exists", type: "bool" },
      { internalType: "string", name: "uid", type: "string" },
      { internalType: "string", name: "imageURL", type: "string" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "description", type: "string" },
      { internalType: "string", name: "uploaderUID", type: "string" },
      { internalType: "address", name: "uploaderAddr", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "uid", type: "string" }],
    name: "getSignedBy",
    outputs: [{ internalType: "string[]", name: "", type: "string[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "uid", type: "string" }],
    name: "getUploadedDocumentUID",
    outputs: [{ internalType: "string[]", name: "", type: "string[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "uid", type: "string" }],
    name: "getsignedDocumentsUID",
    outputs: [{ internalType: "string[]", name: "", type: "string[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "documentUID", type: "string" }],
    name: "sign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "uid", type: "string" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "description", type: "string" },
      { internalType: "string", name: "imageURL", type: "string" },
    ],
    name: "uploadDocument",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "", type: "string" }],
    name: "users",
    outputs: [
      { internalType: "bool", name: "exists", type: "bool" },
      { internalType: "string", name: "uid", type: "string" },
      { internalType: "address", name: "addr", type: "address" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "description", type: "string" },
      { internalType: "string", name: "imageURL", type: "string" },
      { internalType: "bool", name: "verified", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "usersAdddrs",
    outputs: [
      { internalType: "bool", name: "exists", type: "bool" },
      { internalType: "string", name: "uid", type: "string" },
      { internalType: "address", name: "addr", type: "address" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "description", type: "string" },
      { internalType: "string", name: "imageURL", type: "string" },
      { internalType: "bool", name: "verified", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "uid", type: "string" }],
    name: "verifyUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export { contractAddress, abi };
