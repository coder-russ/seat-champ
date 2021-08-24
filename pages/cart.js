import useSWR from 'swr'
import axios from 'axios'

const fetcher = (url) => fetch(url).then((res) => res.json());

 export default function Cart() {
   const { data, error } = useSWR('/api/cart', fetcher, { refreshInterval: 500 })

   if (error) return <div>failed to load</div>
   if (!data) return <div>loading...</div>

   const removeItem = (id) => {
     axios.delete(`/api/cart/${id}`)
   }

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
          {data.map((item) =>
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.team}</td>
              <td>{item.event}</td>
              <td>{item.date}</td>
              <td>{`$${item.price}`}</td>
              <td>{item.quantity}</td>
              <td>{`$${item.total}`}</td>
              <td>{item.email}</td>
              <button type="button" className="btn btn-danger" style={{backgroundColor: 'red'}} onClick={() => removeItem(item.id)}>Remove</button>
            </tr>
          )}
          </>
        </tbody>
        <tfoot>
            <tr>
              <th scope="row">Totals</th>
              <td>loading</td>
              <td>loading</td>
            </tr>
        </tfoot>
      </table>
    );

 }