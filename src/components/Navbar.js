import fullLogo from "../full_logo.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ethers } from "ethers";

function Navbar() {
  const [connected, toggleConnect] = useState(false);
  const location = useLocation();
  const [currAddress, updateAddress] = useState("0x");
  const [correctNetwork, setCorrectNetwork] = useState(false);

  async function getAddress() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    updateAddress(addr);
  }

  function updateButton() {
    const ethereumButton = document.querySelector(".enableEthereumButton");
    ethereumButton.textContent = "Connected";
    ethereumButton.classList.remove("hover:bg-[#2fb1b5]");
    ethereumButton.classList.remove("bg-[#296f71]");
    ethereumButton.classList.add("hover:bg-[#2fb1b5]");
    ethereumButton.classList.add("bg-[#296f71]");
  }

  // async function connectWebsite() {
  //   const chainId = await window.ethereum.request({ method: "eth_chainId" });
  //   if (chainId !== "0x5") {
  //     //alert('Incorrect network! Switch your metamask network to Rinkeby');
  //     await window.ethereum.request({
  //       method: "wallet_switchEthereumChain",
  //       params: [{ chainId: "0x2A" }],
  //     });
  //   }
  //   await window.ethereum
  //     .request({ method: "eth_requestAccounts" })
  //     .then(() => {
  //       updateButton();
  //       console.log("here");
  //       getAddress();
  //       window.location.replace(location.pathname);
  //     });
  // }

  // useEffect(() => {
  //   if (window.ethereum == undefined) return console.log("No ethereum");
  //   let val = window.ethereum.isConnected();
  //   if (val) {
  //     console.log("here");
  //     getAddress();
  //     toggleConnect(val);
  //     updateButton();
  //   } else {
  //     console.log("Not Connected!");
  //   }

  //   window.ethereum.on("accountsChanged", function (accounts) {
  //     window.location.replace(location.pathname);
  //   });
  // });

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }

      let chainId = await ethereum.request?.({ method: "eth_chainId" });
      console.log("Connected to chain:" + chainId);
      const lineaSpeolia = "0x59141";

      if (chainId !== lineaSpeolia) {
        alert("You are not connected to the Linea Sepolia Testnet!");
        updateAddress(".");
        toggleConnect(false);
        return;
      } else {
        setCorrectNetwork(true);
        toggleConnect(true);
      }


      if(window.ethereum.isMetaMask) {
        updateButton();
        console.log("here");
        getAddress();
        toggleConnect(()=>true);
        
        window.location.replace(location.pathname);
      } else {
        console.log("MetaMask is not installed!");
      }

      const accounts = await ethereum.request?.({
        method: "eth_requestAccounts",
      });

      console.log("Found account", accounts[0]);
      updateAddress(accounts[0]);
      toggleConnect(true);
    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };

  return (
    <div className="">
      <nav className="w-screen">
        <ul className="flex items-end justify-between py-3 bg-transparent text-white pr-5">
          <li className="flex items-end ml-5 pb-2">
            <Link to="/">
              <img
                src={fullLogo}
                alt=""
                width={220}
                height={220}
                className="inline-block -mt-2"
              />
            </Link>
          </li>
          <li className="w-2/6">
            <ul className="lg:flex justify-between font-bold mr-10 text-lg">
              {location.pathname === "/" ? (
                <li className="border-b-2 hover:pb-0 p-2">
                  <Link to="/">Marketplace</Link>
                </li>
              ) : (
                <li className="hover:border-b-2 hover:pb-0 p-2">
                  <Link to="/">Marketplace</Link>
                </li>
              )}
              {location.pathname === "/sellNFT" ? (
                <li className="border-b-2 hover:pb-0 p-2">
                  <Link to="/sellNFT">List My Craft NFT</Link>
                </li>
              ) : (
                <li className="hover:border-b-2 hover:pb-0 p-2">
                  <Link to="/sellNFT">List My NFT</Link>
                </li>
              )}
              {location.pathname === "/profile" ? (
                <li className="border-b-2 hover:pb-0 p-2">
                  <Link to="/profile">Profile</Link>
                </li>
              ) : (
                <li className="hover:border-b-2 hover:pb-0 p-2">
                  <Link to="/profile">Profile</Link>
                </li>
              )}
              <li>
                {/* <button
                  className="enableEthereumButton bg-[#296f71] hover:bg-[#2fb1b5] text-white font-bold py-2 px-4 rounded text-sm"
                  onClick={connectWallet}
                >
                  {connected ? "Connected" : "Connect"}
                </button> */}
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className="text-white text-bold text-right mr-10 text-sm">
        {currAddress !== "0x"
          ? "Connected to"
          // : "Not Connected. Please login to view NFTs"}{" "}
          : ""}{" "}
        {currAddress !== "0x" ? currAddress.substring(0, 15) + "..." : ""}
      </div>
    </div>
  );
}

export default Navbar;
