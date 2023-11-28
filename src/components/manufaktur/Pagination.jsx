import React from 'react'

const Pagination = () => {
    return (
        <div>
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
    )
}

export default Pagination