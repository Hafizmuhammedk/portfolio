import Hero from '@/components/Hero';
import RadialProjects from '@/components/RadialProjects';
import About from '@/components/About';
import Experience from '@/components/Experience';
import TechBlueprint from '@/components/TechBlueprint';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollTransitions from '@/components/ScrollTransitions';

export default function Home() {
  return (
    <main>
      <ScrollTransitions />
      <Hero />
      <RadialProjects />
      <About />
      <Experience />
      <TechBlueprint />
      <Contact />
      <Footer />
    </main>
  );
}
