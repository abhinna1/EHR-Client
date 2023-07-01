import { ethers } from "ethers";

const connectToMetaMask = async () => {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Please install MetaMask");
      return;
    }
    // Chain Validation
    // const chainId = await ethereum.request({ method: "eth_chainId" });

    // if (chainId !== "0x539") {
    //   alert("Please connect to the EHR Network");
    // }

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts[0];

  } catch (err) {
    console.log(err);
    return ;
  }
};

export default { connectToMetaMask };
