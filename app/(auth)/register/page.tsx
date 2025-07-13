import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import RegisterForm from "./RegisterForm"

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
    </Card>
  )
}

export default Register