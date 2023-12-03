"use client";
import Breadcumb from '@/components/Breadcumb'
import Header from '@/components/Header'
import MobileMenu from '@/components/MobileMenu'
import OverlayMenu from '@/components/OverlayMenu'
import TambahAlkes from '@/components/manufaktur/TambahAlkes';


const Page = () => {



  return (
    <div>
      <Header title={"Manufaktur"} />
      <MobileMenu />

      <OverlayMenu title={"Manufaktur"} />

      <Breadcumb />

      <TambahAlkes subtitle={"Tambah Alat Kesehatan"} />

    </div>
  )
}

export default Page