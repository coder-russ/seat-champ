import axios from 'axios';
import CardNFL from '../../components/cardNFL'

export default function SuperBowl({ teamData }) {
  return (
    <div className='container'>
      <div className='row'>
        {Object.keys(teamData).map((item, i) =>
          <CardNFL key={i} className='col-auto' image={teamData[item].image} title={item} description={teamData[item].odds} buttonLink='/' buttonText='Add to cart' />
        )}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const teamData = {};
  const data = await axios.get('https://api.sportsdata.io/v3/nfl/scores/json/Teams?key=49fb0ebb5a954fa8b79b64f0c71d73e9')
  data.data.map((team) => {
    teamData[team.FullName] = {
      image: team.WikipediaLogoUrl,
      odds: 0
    }
  });
  const bettingMarket = await axios.get('https://api.sportsdata.io/v3/nfl/odds/json/BettingFuturesBySeason/2021?key=49fb0ebb5a954fa8b79b64f0c71d73e9')
  const AFC = await bettingMarket.data[0].BettingMarkets.filter((odds) => odds.BettingMarketID === 86058);
  const NFC = await bettingMarket.data[0].BettingMarkets.filter((odds) => odds.BettingMarketID === 86057);
  AFC[0].BettingOutcomes.map((team) => {
    if (team.SportsBook.SportsbookID === 19) {
      console.log(team.Participant);
      teamData[team.Participant].odds = team.PayoutAmerican;
    }
  })
  NFC[0].BettingOutcomes.map((team) => {
    if (team.SportsBook.SportsbookID === 19) {
      console.log(team.Participant);
      teamData[team.Participant].odds = team.PayoutAmerican;
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