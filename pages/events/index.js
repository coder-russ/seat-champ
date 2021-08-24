import Card from '../../components/card'
import superBowl from '../../public/superBowl.png'
import worldSeries from '../../public/worldSeries.png'
import nbaFinals from '../../public/nbaFinals.png'

export default function Events() {
  const cardData = [
    {
      image: superBowl,
      title: 'Super Bowl',
      description: 'Sunday, February 13th, 2022',
      buttonLink: '/events/superBowl',
      buttonText: 'Show tickets'
    },
    {
      image: worldSeries,
      title: 'World Series',
      description: 'Tuesday, October 26th, 2021',
      buttonLink: '/events/worldSeries',
      buttonText: 'Show tickets'
    },
    {
      image: nbaFinals,
      title: 'NBA Finals',
      description: 'Thursday, June 2nd, 2021',
      buttonLink: '/events/worldSeries',
      buttonText: 'Show tickets'
    },
  ]
  return (
    <div className='container'>
      <div className='row'>
        {cardData.map((item, i) =>
          <Card key={i} className='col-auto' image={item.image} title={item.title} description={item.description} buttonLink={item.buttonLink} buttonText={item.buttonText} />
        )}
      </div>
    </div>

  );
}