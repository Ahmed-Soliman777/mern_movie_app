import Hero from '../components/Hero'
import CardList from '../components/CardList'
import Footer from '../components/Footer'

export default function Homepage() {
  return (
    <div className='p-5'>
      <Hero />
      <CardList />
      <CardList />
      <CardList />
      <Footer />
    </div>
  )
}
