import Navbar from './navbar'
import Footer from './footer'
import styles from './layout.module.css'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Layout({ children }) {
  const { data, error } = useSWR('/api/cart', fetcher, { refreshInterval: 500 })

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <>
      <Navbar numberOfItems={data.length} />
      <main>{children}</main>
    </>
  )
}