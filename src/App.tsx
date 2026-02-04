import { PlanCountsProvider } from './context/PlanCountsContext'
import Hero from './components/Hero'
import DeviceMockups from './components/DeviceMockups'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import Hardware from './components/Hardware'
import SocialProof from './components/SocialProof'
import UseCases from './components/UseCases'
import Comparison from './components/Comparison'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

function App() {
  return (
    <PlanCountsProvider>
      <div className="bg-gradient" />
      <Hero />
      <DeviceMockups />
      <HowItWorks />
      <Features />
      <Hardware />
      <SocialProof />
      <UseCases />
      <Comparison />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </PlanCountsProvider>
  )
}

export default App
