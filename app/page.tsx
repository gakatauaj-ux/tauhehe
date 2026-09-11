import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <main className="min-h-screen bg-gray-100">
      <Head>
        <title>Murphy SMM Panel</title>
        <meta name="description" content="SMM Panel Management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Murphy SMM Panel</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">Services</h2>
            <p className="text-gray-600 mb-4">Browse and order social media services</p>
            <Link href="/services" className="text-blue-600 hover:underline">
              Browse Services →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">Orders</h2>
            <p className="text-gray-600 mb-4">Track your service orders</p>
            <Link href="/orders" className="text-blue-600 hover:underline">
              View Orders →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">Telegram Bot</h2>
            <p className="text-gray-600 mb-4">Order via Telegram</p>
            <a href="https://t.me/murphysmm_bot" className="text-blue-600 hover:underline">
              Start Bot →
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
