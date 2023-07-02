import { useContext, useEffect, useState } from "react";
import EHRContext from "./EHRContext";
import { ethers } from "ethers";
import ContextHelpers from "./ContextHelpers";
import EHRAbi from "../artifacts/contracts/EHR.sol/EHR.json";

export default (props) => {
  const [account, setAccount] = useState("");
  const [isLogegdIn, setIsLoggedIn] = useState(false);
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();
  const [EHRContract, setEHRContract] = useState(null);

  useEffect(() => {
    console.log("setting TaskContract");
    try{
      setEHRContract(
        new ethers.Contract(
          process.env.REACT_APP_CONTRACT_ADDRESS,
          EHRAbi.abi,
          signer
        )
      );
    }
    catch(e){
      console.log(e);
    }
    
  }, []);

  useEffect(() => {
    console.log("checking connection");
    ContextHelpers.connectToMetaMask()
      .then((res) => {
        setAccount(res);
        if (res) return setIsLoggedIn(true);
        setIsLoggedIn(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
      });
  }, [window.ethereum]);

  return (
    <EHRContext.Provider
      value={{
        account,
        setAccount,
        isLogegdIn,
        setIsLoggedIn,
        provider,
        account,
        EHRContract,
      }}
    >
      {props.children}
    </EHRContext.Provider>
  );
};
