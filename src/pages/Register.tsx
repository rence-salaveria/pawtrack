import {Navbar} from "@/components/navbar.tsx";
import {RegisterForm} from "@/components/register-form.tsx";

function Register() {
  return (
    <>
      <Navbar type='guest'/>
      <main className="flex flex-col items-center justify-center min-h-screen-minus-navbar">
        <RegisterForm/>
      </main>
    </>
  );
}

export default Register;