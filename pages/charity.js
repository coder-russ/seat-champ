import { useState, Fragment, useEffect } from 'react'
import { getAllPurchases } from '../lib/models'
// import useSWR from 'swr'

const nfc = [
  'Arizona Cardinals',
  'Atlanta Falcons',
  'Carolina Panthers',
  'Chicago Bears',
  'Dallas Cowboys',
  'Detroit Lions',
  'Green Bay Packers',
  'Los Angeles Rams',
  'Minnesota Vikings',
  'New Orleans Saints',
  'New York Giants',
  'Philadelphia Eagles',
  'San Francisco 49ers',
  'Seattle Seahawks',
  'Tampa Bay Buccaneers',
  'Washington Football Team'
];

const afc = [
  'Baltimore Ravens',
  'Buffalo Bills',
  'Cincinnati Bengals',
  'Cleveland Browns',
  'Denver Broncos',
  'Houston Texans',
  'Indianapolis Colts',
  'Jacksonville Jaguars',
  'Kansas City Chiefs',
  'Las Vegas Raiders',
  'Los Angeles Chargers',
  'Miami Dolphins',
  'New England Patriots',
  'New York Jets',
  'Pittsburgh Steelers',
  'Tennessee Titans'
];

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Charity({ totalSales, teamSales }) {
  const [teamOne, setTeamOne] = useState(null);
  const [teamTwo, setTeamTwo] = useState(null);
  const [payout, setPayout] = useState(null);

  // const { data, error } = useSWR(teamOne && teamTwo ? `/api/cart/${teamOne}/${teamTwo}/true` : null, fetcher, { refreshInterval: 1000 })

  const handleTeamOne = (event) => {
    setTeamOne(event.target.value);
  }
  const handleTeamTwo = (event) => {
    setTeamTwo(event.target.value);
  }

  useEffect(() => {
    let teamOneCount = teamSales[teamOne];
    let teamTwoCount = teamSales[teamTwo];
    const total = (teamOneCount + teamTwoCount) * 3000;
    setPayout(total)
  }, [teamOne, teamTwo, teamSales])

  return (
    <div className='container'>
      <h1>Charity Tracker</h1>
      <p className='fs-4'>Use the tracker below to estimate the donation amount based on selected teams</p>
      <br/>
      <p className='fs-5'>If this is the Super Bowl matchup...</p>
      <p className='fs-5'>NFC</p>
      <select className="form-select" aria-label="Default select example" onChange={handleTeamOne}>
        <option defaultValue>Choose team one</option>
        {nfc.map((team, i) =>
          <Fragment key={i}>
            <option value={team}>{team}</option>
          </Fragment>
        )}
      </select>
      <br/>
      <p>VS</p>
      <br/>
      <p className='fs-5'>AFC</p>
      <select className="form-select" aria-label="Default select example" onChange={handleTeamTwo}>
        <option defaultValue>Choose team two</option>
        {afc.map((team, i) =>
          <Fragment key={i}>
            <option value={team}>{team}</option>
          </Fragment>
        )}
      </select>
      <br/>
      <p>This amount of money will be donated to charity...</p>
      <br/>
      {teamOne && teamTwo && <h1 style={{color: '#03fc03'}}>{formatter.format(totalSales - payout)}</h1> }
    </div>
  );
};


export async function getStaticProps() {
  let totalSales = 0;
  let teamSales = {};
  const purchases = await getAllPurchases();
  purchases.map((purchase) => {
    totalSales += Number(purchase.total)
    if(!teamSales[purchase.team]) {
      teamSales[purchase.team] = 1;
    } else {
      teamSales[purchase.team] = teamSales[purchase.team] += 1;
    }
  })

  if (!totalSales) {
    return {
      notFound: true,
    }
  }

  return {
    props: { totalSales, teamSales }, // will be passed to the page component as props
    revalidate: 21600
  }
}