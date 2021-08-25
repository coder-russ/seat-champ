import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import logo from '../public/logo.png'
import Footer from '../components/footer'
import man from '../public/man.png'

export default function Home() {

  return (
    <div className='container-fluid'>
      <div className='row align-items-center justify-content-center'>
        <div className='col-4'>
          <Image src={man} alt='man holding tickets' height='600' width='700' />
        </div>
        <div className='col-6'>
          <h1>Welcome Champ!</h1>
          <p className='fs-4'>Put money on your team, if they make the big game, you get tickets.</p>
          <Link href='/events' passHref>
            <button type="button" className="btn btn-dark btn-lg">Buy tickets</button>
          </Link>
        </div>
        <Footer title='You lose, They win!' description='We like win-wins, all money after we cover our costs will go to charity. Support your team and the underprivileged youth'/>
      </div>
    </div>
  )
}
