import { useState } from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import Loader from '@/components/Loader';
import Cursor from '@/components/Cursor';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import BackgroundGrid from '@/components/BackgroundGrid';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Domains from '@/components/sections/Domains';
import Events from '@/components/sections/Events';
import FeaturedEvent from '@/components/sections/FeaturedEvent';
import Projects from '@/components/sections/Projects';
import Team from '@/components/sections/Team';
import Achievements from '@/components/sections/Achievements';
import Gallery from '@/components/sections/Gallery';
import Community from '@/components/sections/Community';
import Join from '@/components/sections/Join';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

function App() {
  const [loaded, setLoaded] = useState(false);
  useSmoothScroll();

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <div className="grain" />
      <Cursor />
      <ScrollProgress />
      <BackgroundGrid />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Domains />
        <Events />
        <FeaturedEvent />
        <Projects />
        <Team />
        <Achievements />
        <Gallery />
        <Community />
        <Join />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
