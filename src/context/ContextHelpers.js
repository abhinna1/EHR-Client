import { ethers } from "ethers";

const connectToMetaMask = async (provider) => {
  if (window.ethereum) {
    try {
      // Request access to the user's MetaMask accounts
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Create an ethers.js provider using MetaMask's provider

      // Get the connected accounts
      const accounts = await provider.listAccounts();
      // console.log(accounts)
      return accounts[0];

    } catch (error) {
      console.error("Failed to connect to MetaMask:", error);
    }
  } else {
    console.error("MetaMask extension not detected");
  }
};

export default { connectToMetaMask };
