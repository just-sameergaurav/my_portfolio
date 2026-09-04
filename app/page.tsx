import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Journey from "@/components/Journey";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FluidCursor from "@/components/FluidCursor";

export default function Home() {
  return (
    <>
      <FluidCursor />
      <main className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
