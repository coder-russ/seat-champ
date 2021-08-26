import useSWR from 'swr'
import axios from 'axios'
import { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import PurchaseModal from '../components/purchaseModal'

const fetcher = (url) => fetch(url).then((res) => res.json());

 export default function Cart() {
   const [ session, loading ] = useSession()
   const { data, error } = useSWR(session ? `/api/cart/${session.user.email}` : null, fetcher, { refreshInterval: 1000 })
   const [spinner, setSpinner] = useState(false);
   const [modalShow, setModalShow] = useState(false);

   const removeItem = (id) => {
     setSpinner(true);
     axios.delete(`/api/cart/${id}`)
      .then((response) => {
        console.log('item deleted')
        setTimeout(() => setSpinner(false), 2000);
      })
      .catch((err) => console.log('unable to delete', err));
    }

    const handlePurchase = (email) => {
      setSpinner(true);
      axios.post(`api/cart/${email}`)
        .then(() => {
          setSpinner(false);
          setModalShow(true);
        })
    }

   if (!session) {
     return <div className='container'>
       <h1>Cart</h1>
       Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
      </div>
    }
   if (error) return <div>failed to load</div>
   if (!data && session) return <div>loading...</div>

    if(session && data) {
      return (
        <div className="container">
          <PurchaseModal show={modalShow} email={session.user.email} onHide={() => setModalShow(false)}/>
          {spinner && <div className="spinner-border position-absolute start-50" role="status"><span className="visually-hidden">Loading...</span></div>}
          <h1>Cart</h1>
          <table className="table container">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Team</th>
                <th scope="col">Event</th>
                <th scope="col">Date</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">E-mail</th>
              </tr>
            </thead>
            <tbody>
              <>
              {data && data.length > 0 && data.map((item, i) =>
                <tr key={i}>
                  <td>{item._id.toString()}</td>
                  <td>{item.team}</td>
                  <td>{item.event}</td>
                  <td>{item.date}</td>
                  <td>{`$${item.price}`}</td>
                  <td>{item.quantity}</td>
                  <td>{item.email}</td>
                  <td><button type="button" className="btn btn-danger" style={{backgroundColor: 'red'}} onClick={() => removeItem(item._id.toString())}>Remove</button></td>
                </tr>
              )}
              </>
            </tbody>
            <tfoot>
                <tr>
                  <th scope="row">Totals</th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{data && data.length > 0 && `$${data.reduce((a, b) => a + Number(b.price), 0).toFixed(2)}`}</td>
                  <td><button type="button" className="btn btn-dark" style={{backgroundColor: 'black'}} onClick={() => handlePurchase(session.user.email)}>Purchase</button></td>
                </tr>
            </tfoot>
          </table>
        </div>
      );
    }

 }