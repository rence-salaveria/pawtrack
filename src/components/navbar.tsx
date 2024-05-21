import {Link, useNavigate} from "react-router-dom"
import {LuDog} from "react-icons/lu";
import {Button} from "@/components/ui/button.tsx";
import {supabase} from "@/lib/supabase.ts";
import toast from "react-hot-toast";

export function Navbar({type}: { type: 'auth' | 'guest' }) {
  const navigate = useNavigate();
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error logging out:", error.message);
      toast.error("Error logging out: " + error.message);
    } else {
      toast.success("Logged out successfully");
    }
    navigate("/");
  }

  return type === 'guest' ? (
    <header key="1" className="flex h-16 items-center justify-between px-4 md:px-6" id="top">
      <Link className="flex items-center gap-2 text-lg font-semibold" to="/">
        <LuDog className="w-8 h-8 text-primary-500"/>
        <span className="">Pawtrack</span>
      </Link>
      <nav className="flex items-center gap-4 sm:gap-6">
        <div className="flex items-center justify-center">
          <Link to="/" className="text-sm font-medium hover:underline underline-offset-4 ml-4">
            Home
          </Link>
          <a href="/#about" className="text-sm font-medium hover:underline underline-offset-4 ml-4">
            About
          </a>
          <Link to="/contact" className="text-sm font-medium hover:underline underline-offset-4 ml-4">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  ) : type === 'auth' && (
    <header key="2" className="flex h-16 items-center justify-between px-4 md:px-6">
      <Link className="flex items-center gap-2 text-lg font-semibold" to="/">
        <LuDog className="w-8 h-8 text-primary-500"/>
        <span className="">Pawtrack</span>
      </Link>
      <nav className="flex items-center gap-4 sm:gap-6">
        <div className="flex items-center justify-center">
          <Link to="/u/pets" className="text-sm font-medium hover:underline underline-offset-4 ml-4">
            Pets
          </Link>
        </div>
      </nav>
      <Link to="/logout" className="text-sm font-medium hover:underline underline-offset-4 ml-4">
        <Button onClick={logout}>
          Logout
        </Button>
      </Link>
    </header>
  )
}
