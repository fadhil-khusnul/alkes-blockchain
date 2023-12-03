"use client";
import React, { Component } from 'react';
import { useRouter } from 'next/navigation';
// import 'bootstrap/dist/css/bootstrap.min.css';

import SelectRole from '@/components/Home/SelectRole';
import useBlockchain from '@/utils/useBlockchain';

const Home = () => {
  const { account, loading, supplyChain, web3, handleInputChange } = useBlockchain();

  console.log(account);
  return (
    <SelectRole />
  );
};

export default Home;




