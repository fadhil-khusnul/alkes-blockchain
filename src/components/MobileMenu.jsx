import React from 'react'

import Logo from '@/assets/img/logo.png'
import Image from 'next/image'
export default function MobileMenu({ title }) {
    return (
        <div id="ltn__utilize-mobile-menu" className="ltn__utilize ltn__utilize-mobile-menu">
            <div className="ltn__utilize-menu-inner ltn__scrollbar">
                <div className="ltn__utilize-menu-head justify-content-end align-items-end ">
                    <div className="site-logo mr-30">
                        <a href="/">
                            <Image width={50} height={50} src={Logo.src} alt="Logo" />
                            <h2 className='page-title mb-0 text-secondary align-content-center'>
                                {title}
                            </h2>
                        </a>
                    </div>
                    <div className='px-0 py-0'>

                        <button className="ltn__utilize-close text-secondary">×</button>
                    </div>
                </div>

                <div className="ltn__utilize-menu">
                    <ul>
                        <li>
                            <a href="/manufaktur">Manufaktur</a>

                        </li>
                        <li>
                            <a href="/distributor">Distributor</a>

                        </li>
                        <li>
                            <a href="/kemenkes">Kemenkes</a>

                        </li>
                        <li>
                            <a href="/rumah-sakit">Rumah Sakit</a>

                        </li>

                    </ul>
                </div>

                <div className="ltn__social-media-2">
                    <ul>
                        <li><a href="/" title="home"><i className="fas fa-home"></i></a></li>
                        <li><a href="/registrasi-user" title="User"><i className="fas fa-user"></i></a></li>
                    </ul>
                </div>

            </div>
        </div>
    )
}