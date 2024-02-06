import { contractAddress, abi } from "./ContractInfo";

async function createUser(uid, name, description, imageURL) {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new window.ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const feeValue = window.ethers.utils.parseUnits("0.0000000001", "ether");
  const contract = new window.ethers.Contract(contractAddress, abi, signer);

  try {
    const result = await contract.createUser(uid, name, description, imageURL);
    console.log("done");
    console.log("Result:", await result.wait());
    return await result;
  } catch (error) {
    console.log(error);
  }
}
export default createUser;
