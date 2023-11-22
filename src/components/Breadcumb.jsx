import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'


const Breadcumb = () => {

    // const router = useRouter();

    return (
        <div className="ltn__breadcrumb-area text-left bg-overlay-black-30 bg-image " data-bs-bg="./img/bg/bg-full.jpg">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mt-1">
                        <div className="ltn__breadcrumb-inner">
                            <div className="ltn__breadcrumb-list third-color py-10">
                                <ul>
                                    <li>
                                        <Link href={"/"} passHref><span className="third-color"><i className="fas fa-home"></i></span> /</Link></li>
                                    <li className='text-white'>Registrasi User</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Breadcumb