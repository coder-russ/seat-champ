import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'

export default function PurchaseModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      style={{color:'black'}}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Purchase Complete!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>What now?</h4>
        <p>
          Congratulations you have purchased a potential ticket to the Super Bowl! If your selected team makes it to the Super Bowl, you will receive your e-tickets to your e-mail at <span className='text-warning'>{props.email}</span> within 24 hours.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Link href='/signin' passHref>
          <Button >Go to purchases</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
}