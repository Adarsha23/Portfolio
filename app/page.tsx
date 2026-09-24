import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Peel from "@/components/Peel";
import CommandPalette from "@/components/CommandPalette";

export default function Home() {
  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <Peel />
      </main>
      <CommandPalette />
    </>
  );
}
