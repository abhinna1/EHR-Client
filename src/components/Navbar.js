import EHRContext from "../context/EHRContext";
import { useContext } from "react";
import ContextHelpers from "../context/ContextHelpers";
const Navbar = () => {
  const { account, provider } = useContext(EHRContext);
  return (
    <nav className="p-4 bg-green-300 flex justify-end w-full">
      {account ? (
        <h1>{account}</h1>
      ) : (
        <h1
          onClick={() => {
            ContextHelpers.connectToMetaMask(provider)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
          className="cursor-pointer
          font-semibold"
        >
          Connect Wallet
        </h1>
      )}
    </nav>
  );
};

export default Navbar;
