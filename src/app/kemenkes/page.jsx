"use client";
import Breadcumb from '@/components/Breadcumb'
import CartMenu from '@/components/CartMenu'
import Header from '@/components/Header'
import MobileMenu from '@/components/MobileMenu'
import OverlayMenu from '@/components/OverlayMenu'
import MobileProductHeader from '@/components/Product/MobileProductHeader'
import FormRegis from '@/components/RegisUser/FormRegis'
import React, { useEffect, useState } from 'react'
import Web3 from 'web3';
import SupplyChain from '../../build/SupplyChain.json';
import useBlockchain from '@/utils/useBlockchain';
import Kemenkes from '@/components/Kemenkes/Kemenkes';


const Page = () => {



  return (
    <div>
      <Header title={"Kemenkes"} />
      <MobileMenu title={"Kemenkes"} />

      <OverlayMenu />

      <Breadcumb />

      <Kemenkes />


    </div>
  )
}

export default Page