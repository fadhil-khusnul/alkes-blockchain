"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import useBlockchain from '@/utils/useBlockchain';

const GetSize = () => {
  const { account, loading, supplyChain, web3, handleInputChange } = useBlockchain();
  const [transactionHash, setTransactionHash] = useState('');
  const [bytes, setBytes] = useState('')

  const getTransactionSize = async () => {
    try {
      if (!transactionHash) {
        console.error('Transaction Hash is empty');
        return;
      }
  
      const transaction = await web3.eth.getTransaction(transactionHash);
  
      if (transaction) {
        console.log('Transaction:', transaction);
  
        // Get the length of the input data in bytes
        const inputDataSizeInBytes = transaction.input.length / 2;

        setBytes(inputDataSizeInBytes)
        console.log(`Transaction Input Data Size: ${inputDataSizeInBytes} bytes`);
      } else {
        console.log('Transaction not found');
      }
    } catch (error) {
      console.error('Error retrieving transaction:', error);
    }
  };
  

  const handleTransactionHashChange = (e) => {
    setTransactionHash(e.target.value);
  };

  return (
    <div>
      <div>
        <label>Transaction Hash:</label>
        <label>{bytes}</label>
        <input type="text" value={transactionHash} onChange={handleTransactionHashChange} />
        <button onClick={getTransactionSize}>Get Transaction Size</button>
      </div>
    </div>
  );
};

export default GetSize;
