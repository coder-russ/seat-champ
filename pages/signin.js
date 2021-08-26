import { signIn, signOut, useSession } from 'next-auth/client'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Page() {
  const [ session, loading ] = useSession()
  const { data, error } = useSWR(session ? `/api/cart/${session.user.email}/true` : null, fetcher, { refreshInterval: 1000 })
  if (error) return <div>failed to load</div>
  if (!data && session) return <div>loading...</div>

  return <>
    {!session && <div className='container'>
      <h1>User Profile</h1>
      Not signed in <br/>
      <button onClick={() => signIn()}>Sign in</button>
    </div>}
    {session && data && <div className='container'>
      Signed in as {session.user.email} <br/>
      <button className='mb-4' onClick={() => signOut()}>Sign out</button>
      <h1>Purchases</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Team</th>
            <th scope="col">Event</th>
            <th scope="col">Date</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">E-mail</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <>
            {data && data.length > 0 && data.map((item) => {
              return <tr key={item._id}>
                <td>{item._id.toString()}</td>
                <td>{item.team}</td>
                <td>{item.event}</td>
                <td>{item.date}</td>
                <td>{`$${item.price}`}</td>
                <td>{item.quantity}</td>
                <td>{item.email}</td>
                <th scope="row">PAID</th>
              </tr>
            })}
          </>
        </tbody>
      </table>

    </div>}
  </>
}