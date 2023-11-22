import React from 'react'

const ProductList = () => {
    return (

        <>
            <div className="ltn__product-area ltn__product-gutter mb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ltn__shop-options">
                                <ul>
                                    <li>
                                        <div className="ltn__grid-list-tab-menu ">
                                            <div className="nav">
                                                <a className="active show" data-bs-toggle="tab" href="#liton_product_grid"><i className="fas fa-th-large"></i></a>
                                                <a data-bs-toggle="tab" href="#liton_product_list"><i className="fas fa-list"></i></a>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="short-by text-center">
                                            <select className="nice-select">
                                                <option>Default sorting</option>
                                                <option>Sort by popularity</option>
                                                <option>Sort by new arrivals</option>
                                                <option>Sort by price: low to high</option>
                                                <option>Sort by price: high to low</option>
                                            </select>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="showing-product-number text-right">
                                            <span>Showing 9 of 20 results</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="tab-content">
                                <div className="tab-pane fade active show" id="liton_product_grid">
                                    <div className="ltn__product-tab-content-inner ltn__product-grid-view">
                                        <div className="row">
                                            <div className="col-xl-3 col-lg-4 col-sm-6 col-6">
                                                <div className="ltn__product-item ltn__product-item-3 text-center">
                                                    <div className="product-img">
                                                        <a href="product-details.html"><img src="./img/product/1.png" alt="#" /></a>
                                                        <div className="product-badge">
                                                            <ul>
                                                                <li className="sale-badge">New</li>
                                                            </ul>
                                                        </div>
                                                        <div c lassName="product-hover-action">
                                                            <ul>
                                                                <li>
                                                                    <a href="#" title="Quick View" data-bs-toggle="modal" data-bs-target="#quick_view_modal">
                                                                        <i className="far fa-eye"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" title="Add to Cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal">
                                                                        <i className="fas fa-shopping-cart"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" title="Wishlist" data-bs-toggle="modal" data-bs-target="#liton_wishlist_modal">
                                                                        <i className="far fa-heart"></i></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="product-info">
                                                        <div className="product-ratting">
                                                            <ul>
                                                                <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                                <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                                <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                                <li><a href="#"><i className="fas fa-star-half-alt"></i></a></li>
                                                                <li><a href="#"><i className="far fa-star"></i></a></li>
                                                            </ul>
                                                        </div>
                                                        <h2 className="product-title"><a href="product-details.html">Digital Stethoscope</a></h2>
                                                        <div className="product-price">
                                                            <span>$149.00</span>
                                                            <del>$162.00</del>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-sm-6 col-6">
                                                <div className="ltn__product-item ltn__product-item-3 text-center">
                                                    <div className="product-img">
                                                        <a href="product-details.html"><img src="./img/product/2.png" alt="#" /></a>
                                                        <div className="product-hover-action">
                                                            <ul>
                                                                <li>
                                                                    <a href="#" title="Quick View" data-bs-toggle="modal" data-bs-target="#quick_view_modal">
                                                                        <i className="far fa-eye"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" title="Add to Cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal">
                                                                        <i className="fas fa-shopping-cart"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" title="Wishlist" data-bs-toggle="modal" data-bs-target="#liton_wishlist_modal">
                                                                        <i className="far fa-heart"></i></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="product-info">
                                                        <div className="product-ratting">
                                                            <ul>
                                                                <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                                <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                                <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                                <li><a href="#"><i className="fas fa-star-half-alt"></i></a></li>
                                                                <li><a href="#"><i className="far fa-star"></i></a></li>
                                                            </ul>
                                                        </div>
                                                        <h2 className="product-title"><a href="product-details.html">Thermometer Gun</a></h2>
                                                        <div className="product-price">
                                                            <span>$62.00</span>
                                                            <del>$85.00</del>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-sm-6 col-6">
                                                <div className="ltn__product-item ltn__product-item-3 text-center">
                                                    <div className="product-img">
                                                        <a href="product-details.html"><img src="./img/product/3.png" alt="#" /></a>
                                                        <div className="product-badge">
                                                            <ul>
                                                                <li className="sale-badge">Hot</li>
                                                            </ul>
                                                        </div>
                                                        <div className="product-hover-action">
                                                            <ul>
                                                                <li>
                                                                    <a href="#" title="Quick View" data-bs-toggle="modal" data-bs-target="#quick_view_modal">
                                                                        <i className="far fa-eye"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" title="Add to Cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal">
                                                                        <i className="fas fa-shopping-cart"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" title="Wishlist" data-bs-toggle="modal" data-bs-target="#liton_wishlist_modal">
                                                                        <i className="far fa-heart"></i></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="product-info">
                                                        <div className="product-ratting">
                                                            <ul>
                                                                <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                                <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                                <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                                <li><a href="#"><i className="fas fa-star-half-alt"></i></a></li>
                                                                <li><a href="#"><i className="far fa-star"></i></a></li>
                                                            </ul>
                                                        </div>
                                                        <h2 className="product-title"><a href="product-details.html">Cosmetic Containers</a></h2>
                                                        <div className="product-price">
                                                            <span>$75.00</span>
                                                            <del>$92.00</del>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="liton_product_list">
                                    <div className="ltn__product-tab-content-inner ltn__product-list-view">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="ltn__product-item ltn__product-item-3">
                                                    <div className="product-img">
                                                        <a href="product-details.html"><img src="./img/product/1.png/" alt="#" /></a>
                                                        <div className="product-badge">
                                                            <ul>
                                                                <li className="sale-badge">New</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="product-info">
                                                        <h2 className="product-title"><a href="product-details.html">Thermometer Gun</a></h2>
                                                        <div className="product-ratting">
                                                            <ul>
                                                                <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                                <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                                <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                                <li><a href="#"><i className="fas fa-star-half-alt"></i></a></li>
                                                                <li><a href="#"><i className="far fa-star"></i></a></li>
                                                            </ul>
                                                        </div>
                                                        <div className="product-price">
                                                            <span>$165.00</span>
                                                            <del>$1720.00</del>
                                                        </div>
                                                        <div className="product-brief">
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae asperiores sit odit nesciunt,  aliquid, deleniti non et ut dolorem!</p>
                                                        </div>
                                                        <div className="product-hover-action">
                                                            <ul>
                                                                <li>
                                                                    <a href="#" title="Quick View" data-bs-toggle="modal" data-bs-target="#quick_view_modal">
                                                                        <i className="far fa-eye"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" title="Add to Cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal">
                                                                        <i className="fas fa-shopping-cart"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" title="Wishlist" data-bs-toggle="modal" data-bs-target="#liton_wishlist_modal">
                                                                        <i className="far fa-heart"></i></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="ltn__product-item ltn__product-item-3">
                                                    <div className="product-img">
                                                        <a href="product-details.html"><img src="./img/product/2.png" alt="#" /></a>
                                                    </div>
                                                    <div className="product-info">
                                                        <h2 className="product-title"><a href="product-details.html">Cosmetic Containers</a></h2>
                                                        <div className="product-ratting">
                                                            <ul>
                                                                <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                                <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                                <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                                <li><a href="#"><i className="fas fa-star-half-alt"></i></a></li>
                                                                <li><a href="#"><i className="far fa-star"></i></a></li>
                                                            </ul>
                                                        </div>
                                                        <div className="product-price">
                                                            <span>$165.00</span>
                                                            <del>$1720.00</del>
                                                        </div>
                                                        <div className="product-brief">
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae asperiores sit odit nesciunt,  aliquid, deleniti non et ut dolorem!</p>
                                                        </div>
                                                        <div className="product-hover-action">
                                                            <ul>
                                                                <li>
                                                                    <a href="#" title="Quick View" data-bs-toggle="modal" data-bs-target="#quick_view_modal">
                                                                        <i className="far fa-eye"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" title="Add to Cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal">
                                                                        <i className="fas fa-shopping-cart"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" title="Wishlist" data-bs-toggle="modal" data-bs-target="#liton_wishlist_modal">
                                                                        <i className="far fa-heart"></i></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="ltn__product-item ltn__product-item-3">
                                                    <div className="product-img">
                                                        <a href="product-details.html"><img src="./img/product/3.png" alt="#" /></a>
                                                        <div className="product-badge">
                                                            <ul>
                                                                <li className="sale-badge">New</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="product-info">
                                                        <h2 className="product-title"><a href="product-details.html">Thermometer Gun</a></h2>
                                                        <div className="product-ratting">
                                                            <ul>
                                                                <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                                <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                                <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                                <li><a href="#"><i className="fas fa-star-half-alt"></i></a></li>
                                                                <li><a href="#"><i className="far fa-star"></i></a></li>
                                                            </ul>
                                                        </div>
                                                        <div className="product-price">
                                                            <span>$165.00</span>
                                                            <del>$1720.00</del>
                                                        </div>
                                                        <div className="product-brief">
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae asperiores sit odit nesciunt,  aliquid, deleniti non et ut dolorem!</p>
                                                        </div>
                                                        <div className="product-hover-action">
                                                            <ul>
                                                                <li>
                                                                    <a href="#" title="Quick View" data-bs-toggle="modal" data-bs-target="#quick_view_modal">
                                                                        <i className="far fa-eye"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" title="Add to Cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal">
                                                                        <i className="fas fa-shopping-cart"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" title="Wishlist" data-bs-toggle="modal" data-bs-target="#liton_wishlist_modal">
                                                                        <i className="far fa-heart"></i></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ltn__pagination-area text-center">
                                <div className="ltn__pagination">
                                    <ul>
                                        <li><a href="#"><i className="fas fa-angle-double-left"></i></a></li>
                                        <li><a href="#">1</a></li>
                                        <li className="active"><a href="#">2</a></li>
                                        <li><a href="#">3</a></li>
                                        <li><a href="#">...</a></li>
                                        <li><a href="#">10</a></li>
                                        <li><a href="#"><i className="fas fa-angle-double-right"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ltn__modal-area ltn__quick-view-modal-area">
                <div className="modal fade" id="quick_view_modal" tabindex="-1">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="ltn__quick-view-modal-inner">
                                    <div className="modal-product-item">
                                        <div className="row">
                                            <div className="col-lg-6 col-12">
                                                <div className="modal-product-img">
                                                    <img src="./img/product/4.png" alt="#"/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-12">
                                                <div className="modal-product-info">
                                                    <div className="product-ratting">
                                                        <ul>
                                                            <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                            <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                            <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                            <li><a href="#"><i className="fas fa-star-half-alt"></i></a></li>
                                                            <li><a href="#"><i className="far fa-star"></i></a></li>
                                                            <li className="review-total"> <a href="#"> ( 95 Reviews )</a></li>
                                                        </ul>
                                                    </div>
                                                    <h3>Digital Stethoscope</h3>
                                                    <div className="product-price">
                                                        <span>$149.00</span>
                                                        <del>$165.00</del>
                                                    </div>
                                                    <div className="modal-product-meta ltn__product-details-menu-1">
                                                        <ul>
                                                            <li>
                                                                <strong>Categories:</strong>
                                                                <span>
                                                                    <a href="#">Parts</a>
                                                                    <a href="#">Car</a>
                                                                    <a href="#">Seat</a>
                                                                    <a href="#">Cover</a>
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="ltn__product-details-menu-2">
                                                        <ul>
                                                            <li>
                                                                <div className="cart-plus-minus">
                                                                    <input type="text" value="02" name="qtybutton" className="cart-plus-minus-box"/>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <a href="#" className="theme-btn-1 btn btn-effect-1" title="Add to Cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal">
                                                                    <i className="fas fa-shopping-cart"></i>
                                                                    <span>ADD TO CART</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="ltn__product-details-menu-3">
                                                        <ul>
                                                            <li>
                                                                <a href="#" className="" title="Wishlist" data-bs-toggle="modal" data-bs-target="#liton_wishlist_modal">
                                                                    <i className="far fa-heart"></i>
                                                                    <span>Add to Wishlist</span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#" className="" title="Compare" data-bs-toggle="modal" data-bs-target="#quick_view_modal">
                                                                    <i className="fas fa-exchange-alt"></i>
                                                                    <span>Compare</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <hr/>
                                                        <div className="ltn__social-media">
                                                            <ul>
                                                                <li>Share:</li>
                                                                <li><a href="#" title="Facebook"><i className="fab fa-facebook-f"></i></a></li>
                                                                <li><a href="#" title="Twitter"><i className="fab fa-twitter"></i></a></li>
                                                                <li><a href="#" title="Linkedin"><i className="fab fa-linkedin"></i></a></li>
                                                                <li><a href="#" title="Instagram"><i className="fab fa-instagram"></i></a></li>

                                                            </ul>
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ltn__modal-area ltn__add-to-cart-modal-area">
                <div className="modal fade" id="add_to_cart_modal" tabindex="-1">
                    <div className="modal-dialog modal-md" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="ltn__quick-view-modal-inner">
                                    <div className="modal-product-item">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="modal-product-img">
                                                    <img src="./img/product/1.png" alt="#"/>
                                                </div>
                                                <div className="modal-product-info">
                                                    <h5><a href="product-details.html">Digital Stethoscope</a></h5>
                                                    <p className="added-cart"><i className="fa fa-check-circle"></i>  Successfully added to your Cart</p>
                                                    <div className="btn-wrapper">
                                                        <a href="cart.html" className="theme-btn-1 btn btn-effect-1">View Cart</a>
                                                        <a href="checkout.html" className="theme-btn-2 btn btn-effect-2">Checkout</a>
                                                    </div>
                                                </div>
                                                <div className="additional-info d-none">
                                                    <p>We want to give you <b>10% discount</b> for your first order,  Use discount code at checkout</p>
                                                    <div className="payment-method">
                                                        <img src="./img/icons/payment.png" alt="#"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ltn__modal-area ltn__add-to-cart-modal-area">
                <div className="modal fade" id="liton_wishlist_modal" tabindex="-1">
                    <div className="modal-dialog modal-md" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="ltn__quick-view-modal-inner">
                                    <div className="modal-product-item">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="modal-product-img">
                                                    <img src="./img/product/7.png" alt="#"/>
                                                </div>
                                                <div className="modal-product-info">
                                                    <h5><a href="product-details.html">Digital Stethoscope</a></h5>
                                                    <p className="added-cart"><i className="fa fa-check-circle"></i>  Successfully added to your Wishlist</p>
                                                    <div className="btn-wrapper">
                                                        <a href="wishlist.html" className="theme-btn-1 btn btn-effect-1">View Wishlist</a>
                                                    </div>
                                                </div>
                                                <div className="additional-info d-none">
                                                    <p>We want to give you <b>10% discount</b> for your first ordut</p>
                                                    <div className="payment-method">
                                                        <img src="./img/icons/payment.png" alt="#"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductList