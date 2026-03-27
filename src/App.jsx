import About from './components/About'
import Contact from './components/Contact'
import Description from './components/Description'
import Features from './components/Features'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Navbar from './components/Navbar'
import Story from './components/Story'

const App = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <Navbar />
      <Hero />
      <Marquee />
      <Description />
      <About />
      <Features />
      <Story />
      <Contact /> 
      <Footer />
    </main>
  )
}

export default App