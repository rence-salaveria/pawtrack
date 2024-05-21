import {HomeHeroSection} from "@/components/home-hero-section.tsx";
import {Navbar} from "@/components/navbar.tsx";
import {Link} from "react-router-dom";


function Home() {
  return (
    <>
      <Navbar type='guest'/>
      <main className="flex flex-col items-center justify-center min-h-screen-minus-navbar" id="">
        <HomeHeroSection/>
        <Link to="/contact">
          <img src="/about.png" alt="" id="about"/>
        </Link>
        <a href="#top">
          <img src="/hero2.png" alt=""/>
        </a>
        <a href="#top">
          <img src="/hero6.png" alt=""/>
        </a>
        <a href="#top">
          <img src="/img2.png" alt=""/>
        </a>
      </main>
      <footer>
        <img src="/footer.png" alt="footer" className="w-full"/>
      </footer>
    </>
  );
}

export default Home;