import About from './components/About'
import Claims from './components/Claims'
import Contact from './components/Contact'
import Description from './components/Description'
import Products from './components/Products'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Navbar from './components/Navbar'
import Process from './components/Process'
import Services from './components/Services'
import Testimonials from './components/Testimonials'

const App = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <Navbar />
      <Hero />
      <Marquee />
      <Description />
      <About />
      <Services />
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