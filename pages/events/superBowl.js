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
// export async function getStaticProps() {
//   const teamData = {};
//   axios.get('https://api.sportsdata.io/v3/nfl/scores/json/Teams?key=49fb0ebb5a954fa8b79b64f0c71d73e9')

//     .then((data) => {
//       data.data.map((team) => {
//         teamData[team.FullName] = {
//           image: team.WikipediaLogoUrl,
//           odds: 0
//         }
//       });
//       return axios.get('https://api.sportsdata.io/v3/nfl/odds/json/BettingFuturesBySeason/2021?key=49fb0ebb5a954fa8b79b64f0c71d73e9')
//     })
//     .then((data) => {
//       const AFC = data.data[0].BettingMarkets.filter((odds) => odds.BettingMarketID === 86058);
//       const NFC = data.data[0].BettingMarkets.filter((odds) => odds.BettingMarketID === 86057);
//       return [AFC, NFC];
//     })
//     .then((array) => {
//       array[0][0].BettingOutcomes.map((team) => {
//         if (team.SportsBook.SportsbookID === 19) {
//           console.log(team.Participant);
//           teamData[team.Participant].odds = team.PayoutAmerican;
//         }
//       })
//       array[1][0].BettingOutcomes.map((team) => {
//         if (team.SportsBook.SportsbookID === 19) {
//           console.log(team.Participant);
//           teamData[team.Participant].odds = team.PayoutAmerican;
//         }
//       })
//     })
//     .catch((err) => {
//       console.log(err);
//       return {
//         notFound: true,
//       }
//     });
//   return {
//     props: {
//       teamData: teamData,
//     },
//     revalidate: 10800
//   }
// }

// { "Key": "ARI", "TeamID": 1, "PlayerID": 1, "City": "Arizona", "Name": "Cardinals", "Conference": "NFC", "Division": "West", "FullName": "Arizona Cardinals", "StadiumID": 29, "ByeWeek": 12, "AverageDraftPosition": 145.8, "AverageDraftPositionPPR": 177.4, "HeadCoach": "Kliff Kingsbury", "OffensiveCoordinator": "Kliff Kingsbury", "DefensiveCoordinator": "Vance Joseph", "SpecialTeamsCoach": "Jeff Rodgers", "OffensiveScheme": "3WR", "DefensiveScheme": "3-4", "UpcomingSalary": 5093, "UpcomingOpponent": "Scrambled", "UpcomingOpponentRank": 3, "UpcomingOpponentPositionRank": 3, "UpcomingFanDuelSalary": null, "UpcomingDraftKingsSalary": null, "UpcomingYahooSalary": null, "PrimaryColor": "97233F", "SecondaryColor": "FFFFFF", "TertiaryColor": "000000", "QuaternaryColor": null, "WikipediaLogoUrl": "https:\/\/upload.wikimedia.org\/wikipedia\/en\/7\/72\/Arizona_Cardinals_logo.svg", "WikipediaWordMarkUrl": "https:\/\/upload.wikimedia.org\/wikipedia\/commons\/0\/04\/Arizona_Cardinals_wordmark.svg", "GlobalTeamID": 1, "DraftKingsName": "Cardinals ", "DraftKingsPlayerID": 355, "FanDuelName": "Arizona Cardinals", "FanDuelPlayerID": 12546, "FantasyDraftName": "Arizona Cardinals", "FantasyDraftPlayerID": 355, "YahooName": "Arizona Cardinals", "YahooPlayerID": null, "AverageDraftPosition2QB": 135.2, "AverageDraftPositionDynasty": 152.8, "StadiumDetails": { "StadiumID": 29, "Name": "State Farm Stadium", "City": "Glendale", "State": "AZ", "Country": "USA", "Capacity": 63400, "PlayingSurface": "Grass", "GeoLat": 33.528000, "GeoLong": -112.263036, "Type": "RetractableDome" } }