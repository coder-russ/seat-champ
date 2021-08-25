import Footer from '../components/footer'
import Image from 'next/image'
import kids from '../public/kids.jpeg'
import standup from '../public/standup.png'

export default function About() {
  return (
    <div className='container-fluid text-center'>
      <div className='row justify-content-center'>
        <div className='col-5 align-self-center'>
        <Image src={kids} alt='kids'/>
        </div>
        <div className='col-6'>
        <h1>What is this all about?</h1>
        <p>We sell team-specific Championship tickets.  Each team&apoos;s ticket price is directly correlated to their chance of reaching the big game.  If your team is more likely to go to the championship, the cost of the ticket is higher. If your team is less likely to go to the Super Bowl, the cost is lower. <br/><br/>If your team reaches the championship, you receive a ticket to cheer on your team at no additional cost.  If your team does not make it to the championship, your initial payment is forfeited and will be added to the charity bucket.<br/><br/> Ultimately, you are buying a ticket before you know if your team will reach the Super Bowl, allowing us to offer team-specific tickets at an affordable price.</p>
        </div>
      </div>
      <div className='row justify-content-center'>
        <div className='col-4'>
          <h1>Our goal</h1>
          <p>is to raise awareness and money for &quot;StandUp For Kids&quot; charity. <br/><br/>Click the logo to learn more.</p>
        </div>
        <div className='col-4'>
          <a href='https://www.standupforkids.org/' target='_blank' rel='noreferrer'><Image src={standup} alt='standup for kids logo'/></a>
        </div>

      </div>
      <div className='row'>
      <Footer title='We give back' description='Any money leftover will go to benefit ending the cycle of youth homelessness.' />
      </div>
    </div>
  );
}