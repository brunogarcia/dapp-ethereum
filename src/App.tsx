import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/WavePortal.json";

const getEthereumObject = () => window.ethereum;

const findMetaMaskAccount = async () => {
  try {
    const ethereum = getEthereumObject();

    /*
    * First make sure we have access to the Ethereum object.
    */
    if (!ethereum) {
      console.error("Make sure you have Metamask!");
      return null;
    }

    console.log("We have the Ethereum object", ethereum);
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const [account] = accounts;
      console.log("Found an authorized account:", account);
      return account;
    } else {
      console.error("No authorized account found");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");

  /**
   * This is our contract ABI, which is just a JavaScript version of the smart contract.
   * We can use this to tell Web3 how to format calls to the smart contract.
   */
  const contractABI = abi.abi;

  /**
   * This is our contract address on the Goerli test network.
   * https://goerli.etherscan.io/address/0x813Ef809589Fc3e31CC06d1F81364aAb7E8fB565
   */
  const contractAddress = "0x813Ef809589Fc3e31CC06d1F81364aAb7E8fB565";

  const connectWallet = async () => {
    try {
      const ethereum = getEthereumObject();
      if (!ethereum) {
        console.log("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      const [account] = accounts;
      if (account) {
        console.log("Connected", account);
        setCurrentAccount(account);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const waveAtMe = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        // Read the current count of waves
        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());

        // Execute the actual wave from your smart contract
        const waveTxn = await wavePortalContract.wave();
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        // Read again the current count of waves
        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
}

  useEffect(() => {
    const getMetaMaskAccount = async () => {
      try {
        const account = await findMetaMaskAccount();
        if (account !== null) {
          setCurrentAccount(account);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getMetaMaskAccount();
  }, []);
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
        I am Bruno. Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={waveAtMe}>
          Wave at Me
        </button>

       {/*
         * If there is no currentAccount render this button
         */}
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}