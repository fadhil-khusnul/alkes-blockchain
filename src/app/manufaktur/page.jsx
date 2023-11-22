"use client";
import Breadcumb from '@/components/Breadcumb'
import CartMenu from '@/components/CartMenu'
import Header from '@/components/Header'
import MobileMenu from '@/components/MobileMenu'
import OverlayMenu from '@/components/OverlayMenu'
import MobileProductHeader from '@/components/Product/MobileProductHeader'
import React, { useEffect, useState } from 'react'
import Web3 from 'web3';
import SupplyChain from '../../build/SupplyChain.json';
import useBlockchain from '@/utils/useBlockchain';
import TambahAlkes from '@/components/manufaktur/TambahAlkes';


const Page = () => {



  return (
    <div>
      <Header title={"Manufaktur"} />
      <MobileMenu />

      <OverlayMenu />

      <Breadcumb />

      <TambahAlkes subtitle={"Tambah Alat Kesehatan"} />

    </div>
  )
}

export default Page