import { PlanCountsProvider } from './context/PlanCountsContext'
import Hero from './components/Hero'
import DeviceMockups from './components/DeviceMockups'
import HowItWorks from './components/HowItWorks'
import Comparison from './components/Comparison'
import Features from './components/Features'
import Hardware from './components/Hardware'
import SocialProof from './components/SocialProof'
import ScaleWithBusiness from './components/ScaleWithBusiness'
import Pricing from './components/Pricing'
import UseCases from './components/UseCases'
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
      <Comparison />
      <Features />
      <Hardware />
      <SocialProof />
      <ScaleWithBusiness />
      <Pricing />
      <UseCases />
      <FAQ />
      <FinalCTA />
      <Footer />
    </PlanCountsProvider>
  )
}

export default App
