import GoogleButton from "@/components/GoogleButton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const LoginPage = () => {
  return (
    <div className="flex justify-center mt-12">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <GoogleButton />
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage;