import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { auth } from "@/firebase/server";
import { DecodedIdToken } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UpdatePasswordForm from "./UpdatePasswordForm";
import DeleteAccountButton from "./DeleteAccountButton";

async function AccountPage(){
  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  if (!token) {
    redirect("/")
  }

  let decodedToken: DecodedIdToken;

  try {
    decodedToken = await auth.verifyIdToken(token);
  } catch (e) {
    console.log("Token was invalid")
    redirect("/");
  }

  const user = await auth.getUser(decodedToken.uid);
  const isPasswordProvider = !!user.providerData.find(provider => provider.providerId === "password");

  return (
    <div className="max-w-screen-md mx-auto">
        <Card className="mt-10">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              My Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label>Email</Label>
            <div>{decodedToken.email}</div>
            {!!isPasswordProvider && <UpdatePasswordForm />}
          </CardContent>
          {!decodedToken.admin && 
            <CardFooter className="flex flex-col items-start">
              <h2 className="text-red-600 text-1xl font-bold mb-2">Danger Zone</h2>
              <DeleteAccountButton />
            </CardFooter>
          }
        </Card> 
    </div>

  )
}

export default AccountPage