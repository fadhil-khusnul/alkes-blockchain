import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    return (
        <nav>
            <div className="ltn__main-menu">
                <ul>
                    <li className="menu"><a href="/manufaktur">Manufaktur</a>
                        
                    </li>
                    <li className="menu"><a href="/distributor">Distributor</a>
                        
                    </li>
                    <li className="menu"><a href="/kemenkes">Kemenkes</a>
                        
                    </li>
                    <li className="menu"><a href="/faskes">Faskes</a>
                        
                    </li>
                    <li className="menu"><a href="/pasien">Pasien</a>
                        
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