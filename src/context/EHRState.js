import { useContext, useEffect, useState } from "react";
import EHRContext from "./EHRContext";
import { ethers } from "ethers";
import ContextHelpers from "./ContextHelpers";

export default (props) => {
  const [wallet, setWallet] = useState("");
  const [account, setAccount] = useState("asdasd");
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  useEffect(() => {
    // Connect Metamask Wallet.
    ContextHelpers.connectToMetaMask(provider)
    .then((account)=>{
        console.log(account);
        setAccount(account);
    })
    .catch((err)=>{
        console.log(err);
    })
    
  }, []);


  return (
    <EHRContext.Provider
      value={{
        wallet,
        setWallet,
        provider,
        account,
      }}
    >
      <h1>{account}</h1>
      {props.children}
    </EHRContext.Provider>
  );
};
