import About from './components/About'
import Claims from './components/Claims'
import Contact from './components/Contact'
import Description from './components/Description'
import Features from './components/Features'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Navbar from './components/Navbar'
import Process from './components/Process'
import Services from './components/Services'
import Story from './components/Story'

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
      <Features />
      <Claims />
      <Story />
      <Contact />
      <Footer />
    </main>
  )
}

export default App