"use client"
import React, { useEffect } from 'react';
import CartMenu from "@/components/CartMenu";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import CategoryList from '@/components/CategoryList';
import Slider from '@/components/Slider';
import About from '@/components/About';
import ProductList from '@/components/Product/ProductList';
import { Breadcrumb } from 'reactstrap';
import HeaderProduct from '@/components/Product/HeaderProduct';
import MobileProductHeader from '@/components/Product/MobileProductHeader';





export default function Product() {


  


  return (

    <div className='body-wrapper'>


      <HeaderProduct />
      <MobileProductHeader />
      <CartMenu />
      <MobileMenu title={"Product"} />

      <div className="ltn__utilize-overlay"></div>

      <div className="ltn__breadcrumb-area text-left bg-overlay-white-30 bg-image " data-bs-bg="./img/bg/14.jpg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="ltn__breadcrumb-inner">
                <h1 className="page-title">Shop Grid</h1>
                <div className="ltn__breadcrumb-list">
                  <ul>
                    <li><a href="index.html"><span className="ltn__secondary-color"><i className="fas fa-home"></i></span> Home</a></li>
                    <li>Shop Grid</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <ProductList />









    </div>




  )
}
