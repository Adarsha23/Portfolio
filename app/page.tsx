import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CommandPalette from "@/components/CommandPalette";

export default function Home() {
  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
      </main>
      <CommandPalette />
    </>
  );
}
