import React from 'react'
import Header from '../Header';
import HeaderProduct from '../Product/HeaderProduct';
import styles from './page.module.css'
import Link from 'next/link';
import Image from 'next/image';

import Background from '@/assets/img/bg/bg-full.jpg'


const SelectRole = () => {

    // const Background = "@/assets/img/bg/bg-full.jpg";

    return (
        <>
            <div className="ltn__utilize-overlay"></div>
            <div className="ltn__slider-area ltn__slider-3  section-bg-1">
                <div className="ltn__slide-one-active slick-slide-arrow-1 slick-slide-dots-1">
                    <div style={{ paddingTop: 50 + 'px' }} className="ltn__slide-item ltn__slide-item-2 ltn__slide-item-3-normal--- ltn__slide-item-3 bg-image bg-overlay-theme-black-70" data-bs-bg={Background.src}>
                        <div className="ltn__slide-item-inner text-center">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12 align-self-center">
                                        <div className="slide-item-info" style={{ maxWidth: 1000 + 'px' }}>
                                            <div className="slide-item-info-inner ltn__slide-animation row ltn__tab-product-slider-one-active--- slick-arrow-">
                                                <div className="slide-video mb-50 d-none">
                                                    <a className="ltn__video-icon-2 ltn__video-icon-2-border" href="https://www.youtube.com/embed/tlThdr3O5Qo" data-rel="lightcase:myCollection">
                                                        <i className="fa fa-play"></i>
                                                    </a>
                                                </div>
                                                <h6 className="slide-sub-title white-color animated"><span><i className="fas fa-stethoscope"></i></span> Alat Kesehatan</h6>
                                                <h1 className="slide-title white-color animated pb-50  ">Blockchain Alat Kesehatan</h1>
                                                <div className="col-lg-3 col-md-4 col-sm-6 col-6 animated">
                                                    <div className="ltn__product-item ltn__product-item-3 bg-overlay-white-50 text-center">
                                                        <div className="product-img">
                                                            <a href="/manufaktur"><img src="./img/manufaktur.png" alt="#" /></a>
                                                            <div className="product-badge">
                                                                <ul>
                                                                    <li className="sale-badge">1</li>
                                                                </ul>
                                                            </div>
                                                            <div className="product-hover-action">
                                                                <ul>
                                                                    <li>
                                                                        <a href="/manufaktur">
                                                                            <i className="fas fa-external-link-alt"></i>
                                                                        </a>
                                                                    </li>

                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="product-info">

                                                            <h2 className="product-title text-white"><a href="/manufaktur">Manufaktur</a></h2>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-4 col-sm-6 col-6 animated">
                                                    <div className="ltn__product-item ltn__product-item-3 text-center bg-overlay-white-50">
                                                        <div className="product-img">
                                                            <a href="/distributor"><img src="./img/distributor.png" alt="#" /></a>
                                                            <div className="product-badge">
                                                                <ul>
                                                                    <li className="sale-badge">2</li>
                                                                </ul>
                                                            </div>
                                                            <div className="product-hover-action">
                                                                <ul>
                                                                    <li>
                                                                        <a href="/distributor">
                                                                            <i className="fas fa-external-link-alt"></i>
                                                                        </a>
                                                                    </li>

                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="product-info">

                                                            <h2 className="product-title text-white"><a href="/distributor">Distributor</a></h2>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-4 col-sm-6 col-6 animated">
                                                    <div className="ltn__product-item ltn__product-item-3 text-center bg-overlay-white-50">
                                                        <div className="product-img">
                                                            <a href="/kemenkes"><img src="./img/kemenkes.png" alt="#" /></a>
                                                            <div className="product-badge">
                                                                <ul>
                                                                    <li className="sale-badge">3</li>
                                                                </ul>
                                                            </div>
                                                            <div className="product-hover-action">
                                                                <ul>
                                                                    <li>
                                                                        <a href="/kemenkes">
                                                                            <i className="fas fa-external-link-alt"></i>
                                                                        </a>
                                                                    </li>

                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="product-info">

                                                            <h2 className="product-title text-white"><a href="/kemenkes">Kemenkes</a></h2>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-4 col-sm-6 col-6 animated">
                                                    <div className="ltn__product-item ltn__product-item-3 text-center bg-overlay-white-50">
                                                        <div className="product-img">
                                                            <a href="/rumah-sakit"><img src="./img/hospital.png" alt="#" /></a>
                                                            <div className="product-badge">
                                                                <ul>
                                                                    <li className="sale-badge">4</li>
                                                                </ul>
                                                            </div>
                                                            <div className="product-hover-action">
                                                                <ul>
                                                                    <li>
                                                                        <a href="/rumah-sakit" title="Rumah Sakit View">
                                                                            <i className="fas fa-external-link-alt"></i>
                                                                        </a>
                                                                    </li>

                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="product-info text-white">
                                                            <h2 className="product-title text-white"><a href="/rumah-sakit">Rumah Sakit</a></h2>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="animated pb-50">
                                                    <a
                                                        href={"/registrasi-user"}
                                                        className="theme-btn-1 btn btn-effect-1">
                                                        Registrasi User <i className='fas fa-user-plus'></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>




                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div >
        </>
    )
}

export default SelectRole