import Accordion from 'react-bootstrap/Accordion'
import sofi from '../public/sofi.gif'
import Image from 'next/image'

export default function Faq() {
  return (
    <div className='container'>
      <h1>Frequently Asked Questions</h1>
      <br/>
      <Accordion defaultActiveKey="0" className='text-dark'>
        <Accordion.Item eventKey="0">
          <Accordion.Header>How are the tickets so cheap?</Accordion.Header>
          <Accordion.Body>
            A normal championship ticket can cost anywhere from $2,000-$5,000. We offer them as low as just a couple hundred dollars. We are able to do this by setting the price based on the odds that a team makes it to the big game. If they do not make the game, the price you paid will go to cover the cost for buying the winners tickets and of course the leftover going to StandUp for Kids charity fund.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>What happens if my team makes it to the championship game?</Accordion.Header>
          <Accordion.Body>
            You will be notified through e-mail once your team is confirmed to participate in the game. Within 24 hours, you will receive an email with a certified digital ticket to attend the game. This is why it is very important that you sign up with an email that you will always have access to.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>How do I know I will get my tickets?</Accordion.Header>
          <Accordion.Body>
            We fully guarantee our tickets. If you buy a ticket and your team makes it to the championship, you will have a ticket - GUARANTEED.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Do I get to choose my seats?</Accordion.Header>
          <Accordion.Body>
            No, your seats will be based on the availbility at the time we purchase the tickets. We will get the best available seat in the 300 level. See below.
            <br/>
            <Image src={sofi} alt='sofi stadium map'/>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>What happens if the game gets cancelled?</Accordion.Header>
          <Accordion.Body>
            We will fully refund your money if the game is cancelled for any reason, including covid!
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>Can I get a refund?</Accordion.Header>
          <Accordion.Body>
            Unfortunately, all sales are final and no refunds will be given. We do this to ensure we have enough money to cover the cost of the winning tickets. Also, rest assured your money will be going to a good cause. A child should never have to experience homelessness!
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="6">
          <Accordion.Header>How do I know the money goes to charity?</Accordion.Header>
          <Accordion.Body>
            After the season has ended we will e-mail all users a copy of proof of donation with receipt.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

    </div>
  );
}