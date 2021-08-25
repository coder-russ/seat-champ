import useSWR from 'swr'
import axios from 'axios'
import { signIn, signOut, useSession } from 'next-auth/client'

const fetcher = (url) => fetch(url).then((res) => res.json());

 export default function Cart() {
   const [ session, loading ] = useSession()
   console.log(session);
   const { data, error } = useSWR(session ? `/api/cart/${session.user.email}` : null, fetcher, { refreshInterval: 500 })

   if (!session) return <> Not signed in <br /> <button onClick={() => signIn()}>Sign in</button></>
   if (error) return <div>failed to load</div>
   if (!data) return <div>loading...</div>

   const removeItem = (id) => {
     axios.delete(`/api/cart/${id}`)
      .then((response) => console.log('item deleted', response))
      .catch((err) => console.log('unable to delete', err));
   }
    if(session) {
      return (
        <table className="table container">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Team</th>
              <th scope="col">Event</th>
              <th scope="col">Date</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
              <th scope="col">E-mail</th>
            </tr>
          </thead>
          <tbody>
            <>
            {data && data.map((item, i) =>
              <tr key={i}>
                <td>{item._id.toString()}</td>
                <td>{item.team}</td>
                <td>{item.event}</td>
                <td>{item.date}</td>
                <td>{`$${item.price}`}</td>
                <td>{item.quantity}</td>
                <td>{`$${item.total}`}</td>
                <td>{item.email}</td>
                <button type="button" className="btn btn-danger" style={{backgroundColor: 'red'}} onClick={() => removeItem(item._id.toString())}>Remove</button>
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
                <td>{`$${data.reduce((a, b) => a + Number(b.price), 0).toFixed(2)}`}</td>
                <button type="button" className="btn btn-dark" style={{backgroundColor: 'black'}}>Purchase</button>
              </tr>
          </tfoot>
        </table>
      );
    }

    return <div>loading...</div>
 }

//  export async function getStaticProps(context) {
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }