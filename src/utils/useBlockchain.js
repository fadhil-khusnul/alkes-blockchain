import { useState, useEffect } from 'react';
import Web3 from 'web3';
import SupplyChain from '../build/SupplyChain.json'; // Adjust the path accordingly

const useBlockchain = () => {
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(true);
  const [supplyChain, setSupplyChain] = useState(null);
  const [web3, setWeb3] = useState(null);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
    setWeb3(window.web3);
  };

  const handleInputChange = (e) => {
    setAccount((prevAccount) => ({
      ...prevAccount,
      [e.target.id]: e.target.value,
    }));
  };

  const loadBlockchain = async () => {
    const web3Instance = window.web3;
    const accounts = await web3Instance.eth.getAccounts();
   
    console.log(accounts);

    setAccount(accounts[0]);

    const networkId = await web3Instance.eth.net.getId();
    const networkData = SupplyChain.networks[networkId];

    if (networkData) {
      const supplyChainInstance = new web3Instance.eth.Contract(
        SupplyChain.abi,
        networkData.address
      );

      console.log(supplyChainInstance);

      setSupplyChain(supplyChainInstance);
      setLoading(false);
    } else {
      window.alert('Supply chain contract not deployed to detected network.');
    }
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchain();
  }, []);

  return { account, loading, supplyChain, web3, handleInputChange };
};

export default useBlockchain;