import { useState, Fragment, useEffect } from 'react'
import { getAllPurchases } from '../lib/models'
import useSWR from 'swr'

const teams = [
  'Arizona Cardinals',
  'Chicago Bears',
  'Green Bay Packers',
  'New York Giants',
  'Detroit Lions',
  'Washington Football Team',
  'Philadelphia Eagles',
  'Pittsburgh Steelers',
  'Los Angeles Rams',
  'San Francisco 49ers',
  'Cleveland Browns',
  'Indianapolis Colts',
  'Dallas Cowboys',
  'Kansas City Chiefs',
  'Los Angeles Chargers',
  'Denver Broncos',
  'New York Jets',
  'New England Patriots',
  'Las Vegas Raiders',
  'Tennessee Titans',
  'Buffalo Bills',
  'Minnesota Vikings',
  'Atlanta Falcons',
  'Miami Dolphins',
  'New Orleans Saints',
  'Cincinnati Bengals',
  'Seattle Seahawks',
  'Tampa Bay Buccaneers',
  'Carolina Panthers',
  'Jacksonville Jaguars',
  'Baltimore Ravens',
  'Houston Texans',
];

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Charity({ totalSales }) {
  const [teamOne, setTeamOne] = useState(null);
  const [teamTwo, setTeamTwo] = useState(null);
  const [payout, setPayout] = useState(null);

  const { data, error } = useSWR(teamOne && teamTwo ? `/api/cart/${teamOne}/${teamTwo}/true` : null, fetcher)

  const handleTeamOne = (event) => {
    setTeamOne(event.target.value);
  }
  const handleTeamTwo = (event) => {
    setTeamTwo(event.target.value);
  }

  useEffect(() => {
    if(data && data.length > 0) {
      let teamOneCount = data[0].length;
      let teamTwoCount = data[1].length;
      const total = (teamOneCount + teamTwoCount) * 3000;
      setPayout(total)
    }
  }, [data])

  return (
    <div className='container'>
      <h1>Charity Tracker</h1>
      <p className='fs-4'>Use the tracker below to estimate the donation amount based on selected teams</p>
      <br/>
      <p>If this is the Super Bowl matchup...</p>
      <select className="form-select" aria-label="Default select example" onChange={handleTeamOne}>
        <option defaultValue>Choose team one</option>
        {teams.map((team, i) =>
          <Fragment key={i}>
            <option value={team}>{team}</option>
          </Fragment>
        )}
      </select>
      <br/>
      <p>VS</p>
      <select className="form-select" aria-label="Default select example" onChange={handleTeamTwo}>
        <option defaultValue>Choose team two</option>
        {teams.map((team, i) =>
          <Fragment key={i}>
            <option value={team}>{team}</option>
          </Fragment>
        )}
      </select>
      <br/>
      <p>This amount of money will be donated to charity...</p>
      <br/>
      {payout && totalSales && <h1 style={{color: '#03fc03'}}>{formatter.format(totalSales - payout)}</h1> }
    </div>
  );
};


export async function getStaticProps() {
  let totalSales = 0;
  const purchases = await getAllPurchases();
  purchases.map((purchase) => totalSales += Number(purchase.total))

  if (!totalSales) {
    return {
      notFound: true,
    }
  }

  return {
    props: { totalSales }, // will be passed to the page component as props
  }
}