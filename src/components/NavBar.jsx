import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    return (
        <nav>
            <div className="ltn__main-menu">
                <ul>
                    <li className="menu-icon"><a href="/product">Manufaktur</a>
                        <ul className="sub-menu menu-pages-img-show ltn__sub-menu-col-2---">
                            <li>
                                <a href="/">Tambah Alat Kesehatan</a>
                            </li>
                            <li>
                                <a href="/">Request</a>
                            </li>
                            <li>
                                <a href="/">Response</a>
                            </li>
                        </ul>
                    </li>
                    <li className="menu-icon"><a href="#">Distributor</a>
                        <ul className="sub-menu menu-pages-img-show ltn__sub-menu-col-2---">
                       
                            <li>
                                <a href="/">Request</a>
                            </li>
                            <li>
                                <a href="/">Response</a>
                            </li>
                        </ul>
                    </li>
                    <li className="menu-icon"><a href="#">Kemenkes</a>
                        <ul className="sub-menu menu-pages-img-show ltn__sub-menu-col-2---">
                          
                            <li>
                                <a href="/">Request</a>
                            </li>
                            <li>
                                <a href="/">Response</a>
                            </li>
                        </ul>
                    </li>
                    <li className="menu-icon"><a href="#">Hospital</a>
                        <ul className="sub-menu menu-pages-img-show ltn__sub-menu-col-2---">
                           
                            <li>
                                <a href="/">Request</a>
                            </li>
                            <li>
                                <a href="/">Response</a>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link href={"/"}>

                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar