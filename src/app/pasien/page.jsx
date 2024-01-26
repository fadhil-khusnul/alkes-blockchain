"use client";
import Breadcumb from '@/components/Breadcumb'
import Header from '@/components/Header'
import MobileMenu from '@/components/MobileMenu'
import OverlayMenu from '@/components/OverlayMenu'
import Pasien from '@/components/Pasien/Pasien';


const Page = () => {



  return (
    <div>
      <Header title={"Pasien"} />
      <MobileMenu title={"Pasien"} />

      <OverlayMenu />

      <Breadcumb />

      <Pasien />




    </div>
  )
}

export default Page