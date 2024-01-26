"use client";
import Breadcumb from '@/components/Breadcumb'
import Header from '@/components/Header'
import MobileMenu from '@/components/MobileMenu'
import OverlayMenu from '@/components/OverlayMenu'
import RumahSakit from '@/components/RumahSakit/RumahSakit';


const Page = () => {



  return (
    <div>
      <Header title={"Faskes"} />
      <MobileMenu title={"Faskes"} />

      <OverlayMenu />

      <Breadcumb />

      <RumahSakit />




    </div>
  )
}

export default Page