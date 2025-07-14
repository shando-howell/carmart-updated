import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import LoginForm from "./LoginForm";
import Link from "next/link";

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
          <LoginForm />
        </CardContent>
        <CardFooter>
          Don&apos;t have an account?
          <Link href="/register" className="underline pl-1">Register here.</Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginPage;