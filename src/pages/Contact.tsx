import {ContactUsForm} from "@/components/contact-us-form.tsx";
import {Link} from "react-router-dom";
import {LuDog} from "react-icons/lu";

function Contact() {
  return (
    <>
      <header key="1" className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link className="flex items-center gap-2 text-lg font-semibold" to="/">
          <LuDog className="w-8 h-8 text-primary-500"/>
          <span className="">Pawtrack</span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center justify-center">
            <Link to="/contact" className="text-sm font-medium hover:underline underline-offset-4 ml-4">
              Contact
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex flex-col items-center justify-center min-h-screen-minus-navbar">
        <ContactUsForm/>
      </main>
    </>
  );
}

export default Contact;