import { useState } from 'react'
import About from './components/About'
import Claims from './components/Claims'
import Contact from './components/Contact'
import Description from './components/Description'
import Products from './components/Products'
import Footer from './components/Footer'
import Hero from './components/Hero'
import LoadingScreen from './components/LoadingScreen'
import Marquee from './components/Marquee'
import Navbar from './components/Navbar'
import Process from './components/Process'
import Services from './components/Services'
import Testimonials from './components/Testimonials'

const App = () => {
  const [loading, setLoading] = useState(true)

  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      {/* Loading screen sits fixed on top; whole app renders behind it so
          the hero is already loaded when the overlay fades out.            */}
      {loading && (
        <LoadingScreen onComplete={() => setLoading(false)} />
      )}

      <Navbar />
      <Hero />
      <Description />
      <About />
      <Services />
      <Marquee />
      <Process />
      <Products />
      <Claims />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}

export default App