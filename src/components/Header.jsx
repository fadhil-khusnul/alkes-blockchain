
import Image from 'next/image'
import React from 'react'
import NavBar from './NavBar'
import TopMenu from './TopMenu'
import Link from 'next/link'

import Logo from '@/assets/img/logo.png'

export default function Header({title}) {
    return (
        <header className="ltn__header-area ltn__header-5 ltn__header-logo-and-mobile-menu-in-mobile--- ltn__header-logo-and-mobile-menu--- ltn__header-transparent py-5">

            <div className="ltn__header-middle-area ltn__logo-right-menu-option ltn__header-row-bg-white ltn__header-padding ltn__header-sticky ltn__sticky-bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="site-logo-wrap mt-10 mb-10">
                                <div className="site-logo">
                                    <a href={"/"}>
                                        <Image width={70} height={70} src={Logo.src} alt="Logo" />
                                        
                                        </a>
                                    <h2 className='page-title text-secondary align-content-center mb-0 '>
                                        {title}
                                    </h2>
                                </div>

                            </div>
                        </div>
                        <div className="col header-menu-column menu-color-white---">
                            <div className="header-menu d-none d-xl-block">
                                <NavBar />
                            </div>
                        </div>
                        <TopMenu />
                    </div>
                </div>
            </div>
        </header>
    )
}