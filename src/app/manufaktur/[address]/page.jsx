
"use client";

import Header from '@/components/Header'
import MobileMenu from '@/components/MobileMenu'
import OverlayMenu from '@/components/OverlayMenu'
import Breadcumb from '@/components/Breadcumb'
import React from 'react'
import AlkesDetails from '@/components/manufaktur/AlkesDetails';

const ViewDetailAlkes = ({params : {address} }  ) => {
    // const { address } = params
    console.log(address);


    return (
        <div>

           <Layout />

           <AlkesDetails />

           
            {address}
        </div>
    )
}

const Layout = () => {
    return (
        <>
            <Header title={"Detail"} />
            <MobileMenu title={"Manufaktur"} />

            <OverlayMenu />

            <Breadcumb />
        </>
    )


}

export default ViewDetailAlkes