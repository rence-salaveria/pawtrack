import {HomeHeroSection} from "@/components/home-hero-section.tsx";
import {Navbar} from "@/components/navbar.tsx";


function Home() {
  return (
    <>
      <Navbar type='guest'/>
      <main className="flex flex-col items-center justify-center min-h-screen-minus-navbar">
        <HomeHeroSection/>
      </main>
    </>
  );
}

export default Home;