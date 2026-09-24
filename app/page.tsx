import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Peel from "@/components/Peel";
import Relay from "@/components/Relay";
import Corpsec from "@/components/Corpsec";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";

export default function Home() {
  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <Peel />
        <Relay />
        <Corpsec />
        <About />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
    </>
  );
}
