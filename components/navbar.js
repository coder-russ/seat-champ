import Link from 'next/link'
import Image from 'next/image'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../public/logo.png'

export default function Navbar({ numberOfItems }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link href='/' passHref>
          <a className="navbar-brand">
          <Image src={logo} alt="logo" height="61" width="200" />
          </a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link href='/' passHref>
              <a className="nav-link p-md-5">About</a>
            </Link>
            <Link href='/events' passHref>
              <a className="nav-link p-md-5">Events</a>
            </Link>
            <Link href='/' passHref>
              <a className="nav-link p-md-5">FAQ</a>
            </Link>
          </div>
        </div>
        <div className="d-flex p-3">
          <div className="p-3">
            <Link href='/api/auth/signin' passHref>
              <a><FontAwesomeIcon icon={faUser} size="lg" color="white"/></a>
            </Link>
          </div>
          <div className="p-3">
            <Link href='/cart' passHref>
              <a><FontAwesomeIcon icon={faShoppingCart} size="lg" color="white"/>
                <span className="position-absolute top-10 start-80 translate-middle badge rounded-pill bg-danger">
                  {numberOfItems}
                  <span className="visually-hidden">items in cart</span>
                </span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}


