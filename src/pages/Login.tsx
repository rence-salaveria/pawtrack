import {Navbar} from "@/components/navbar.tsx";
import {LoginForm} from "@/components/login-form.tsx";

function Login() {
  return (
    <>
      <Navbar type='guest'/>
      <main className="flex flex-col items-center justify-center min-h-screen-minus-navbar">
        <LoginForm/>
      </main>
    </>
  );
}

export default Login;