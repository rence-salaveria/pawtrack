import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Link} from "react-router-dom";
import {useState} from "react";
import {supabase} from "@/lib/supabase.ts";
import {useNavigate} from 'react-router-dom';
import toast from "react-hot-toast";


export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const {data} = await toast.promise(
      supabase.auth.signInWithPassword({
        email,
        password
      }).then((response) => {
        if (response.error) {
          throw new Error(response.error.message);
        }
        return response;
      }),
      {
        loading: "Logging in...",
        success: "Logged in successfully",
        error: (error) => `Error: ${error.message}`
      }
    )

    if (data) {
      navigate("/u/pets")
    }
  }

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-10 shadow-lg dark:bg-gray-900">
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-gray-500 dark:text-gray-400">Enter your credentials to access your account.</p>
        </div>
        <form className="space-y-4" onSubmit={login}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email"
                   placeholder="example@email.com"
                   required
                   type="email"
                   name="email"
                   onChange={(e) => setEmail(e.target.value)}
                   />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              required
              type="password"
              placeholder="Enter password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <Button className="w-full" type="submit">
            Sign In
          </Button>
        </form>
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?
          <Link className="font-medium underline" to="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}
