import axios from 'axios';
import CardNFL from '../../components/cardNFL'
import { signIn, signOut, useSession } from 'next-auth/client'
import CartModal from '../../components/cartModal'
import { useState } from 'react'

export default function SuperBowl({ teamData }) {
  const [ session, loading ] = useSession()
  const [modalShow, setModalShow] = useState(false);

  const addToCart = (item) => {
    setModalShow(true);
    axios.post('/api/cart', item)
  }

  if(!session) {
    return <>
    Not signed in <br/>
    <button onClick={() => signIn()}>Sign in</button>
    </>
  }

  return (
    <div className='container'>
      <CartModal show={modalShow} onHide={() => setModalShow(false)}/>
      <div className='row'>
        {Object.keys(teamData).map((item, i) => {
          let price = 6000 / (teamData[item].odds / 100)
          if (price < 100) {
            price += 150;
          }
          let obj = {
            team: item,
            event: 'Super Bowl',
            date: '02/20/2022',
            price: price.toFixed(2),
            quantity: 1,
            total: price.toFixed(2),
            email: session.user.email,
            purchased: false,
          }
          return (<CardNFL key={i} className='col-auto' image={`/${item}.svg`} title={item} description={`$${price.toFixed(2)}`} handleClick={addToCart} item={obj} buttonText='Add to cart' />);
        }
        )}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const teamData = {};
  const bettingMarket = await axios.get('https://api.sportsdata.io/v3/nfl/odds/json/BettingFuturesBySeason/2021?key=49fb0ebb5a954fa8b79b64f0c71d73e9')
  const AFC = await bettingMarket.data[0].BettingMarkets.filter((odds) => odds.BettingMarketID === 86058);
  const NFC = await bettingMarket.data[0].BettingMarkets.filter((odds) => odds.BettingMarketID === 86057);
  AFC[0].BettingOutcomes.map((team) => {
    if (team.SportsBook.SportsbookID === 19) {
      teamData[team.Participant] = {
        odds: team.PayoutAmerican,
      }
    }
  })
  NFC[0].BettingOutcomes.map((team) => {
    if (team.SportsBook.SportsbookID === 19) {
      teamData[team.Participant] = {
        odds: team.PayoutAmerican,
      }
    }
  })
  if (Object.keys(teamData).length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      teamData: teamData,
    },
  }
}