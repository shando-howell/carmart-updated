import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import RegisterForm from "./RegisterForm"
import Link from "next/link"

const Register = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-white font-bold">
          Register
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter>
        Already have an account?
        <Link href="/login" className="pl-2 underline">
          Log in here.
        </Link>
      </CardFooter>
    </Card>
  )
}

export default Register