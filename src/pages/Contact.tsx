import {Navbar} from "@/components/navbar.tsx";
import {ContactUsForm} from "@/components/contact-us-form.tsx";

function Contact() {
  return (
    <>
      <Navbar type='guest'/>
      <main className="flex flex-col items-center justify-center min-h-screen-minus-navbar">
        <ContactUsForm/>
      </main>
    </>
  );
}

export default Contact;