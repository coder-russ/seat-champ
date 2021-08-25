import Navbar from './navbar'
import Footer from './footer'
import styles from './layout.module.css'
import useSWR from 'swr'
import { signIn, signOut, useSession } from 'next-auth/client'


const fetcher = (url) => fetch(url).then(res => res.json())

export default function Layout({ children}) {
  const [ session, loading ] = useSession()
  const { data, error } = useSWR(session ? `/api/cart/${session.user.email}` : null, fetcher, { refreshInterval: 200 })

  // if (error) return <div>failed to load</div>
  // if (!data) return <div>loading...</div>

  if (session && data) {
    return (
      <>
        <Navbar numberOfItems={data.length} />
        <main>{children}</main>
      </>
    );
  }
  return (
    <>
      <Navbar numberOfItems={0} />
      <main>{children}</main>
    </>
  );

}