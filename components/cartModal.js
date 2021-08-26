import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'

export default function CartModal(props) {
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
          Item added to cart
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Continue shopping?</h4>
        <p>
          Congratulations you have added your ticket to your cart and are one step closer to going to the Super Bowl!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Continue shopping</Button>
        <Link href='/cart' passHref>
          <Button >Go to cart</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
}