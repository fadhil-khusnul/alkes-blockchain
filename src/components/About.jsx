import React from 'react'

export default function About() {
    return (
        <div className="ltn__about-us-area pt-25 pb-120 ">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 align-self-center">
                        <div className="about-us-img-wrap about-img-left">
                            <img src="img/others/9.png" alt="About Us Image"/>
                        </div>
                    </div>
                    <div className="col-lg-6 align-self-center">
                        <div className="about-us-info-wrap">
                            <div className="section-title-area ltn__section-title-2--- mb-30">
                                <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color d-none">About Us</h6>
                                <h1 className="section-title">Your faithful partners Medical Goods</h1>
                                <p>Houzez allow you to design unlimited panels and real estate custom
                                    forms to capture leads and keep record of all information</p>
                            </div>
                            <ul className="ltn__list-item-1 ltn__list-item-1-before--- clearfix">
                                <li><i className="fas fa-check-square"></i> Better security for patient privacy and information.</li>
                                <li><i className="fas fa-check-square"></i> More products at lower prices.</li>
                                <li><i className="fas fa-check-square"></i> connect customers with the power of eCommerce at all.</li>
                            </ul>
                            <div className="about-author-info-2 border-top mt-30 pt-20">
                                <ul>
                                    <li>
                                        <div className="about-author-info-2-brief  d-flex">
                                            <div className="author-img">
                                                <img src="img/blog/author.jpg" alt="#"/>
                                            </div>
                                            <div className="author-name-designation">
                                                <h4 className="mb-0">Jerry Henson</h4>
                                                <small>Medical Specialist</small>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="about-author-info-2-contact  d-flex">
                                            <div className="about-contact-icon d-flex align-self-center mr-10">
                                                <i className="icon-call"></i>
                                            </div>
                                            <div className="about-author-info-2-contact-info">
                                                <small>Get Support</small>
                                                <h6 className="mb-0">123-456-789-10</h6>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
