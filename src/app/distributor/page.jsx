"use client";

import Breadcumb from '@/components/Breadcumb'
import MenuDistributor from '@/components/Distributor/MenuDistributor'
import Header from '@/components/Header'
import MobileMenu from '@/components/MobileMenu'
import OverlayMenu from '@/components/OverlayMenu'
import React from 'react'

const DistributorIndex = () => {
    return (
        <>

            <Header title={"Distributor"} />
            <MobileMenu title={"Distributor"} />

            <OverlayMenu />

            <Breadcumb />

            <MenuDistributor />
        

        </>

    )
}

export default DistributorIndex