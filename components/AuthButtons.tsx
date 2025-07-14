"use client"

import { useAuth } from "@/context/auth";
import Link from "next/link";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger,
    DropdownMenuItem 
} from "./ui/dropdown-menu";
import Image from "next/image";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useRouter } from "next/navigation";

const AuthButtons = () => {
    const auth = useAuth();
    const router = useRouter();

    return (
        <div>
            {!!auth?.currentUser && (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            {!!auth.currentUser.photoURL && (
                                <Image 
                                    src={auth.currentUser.photoURL} 
                                    alt={`${auth.currentUser.displayName} avatar`}
                                    width={70}
                                    height={70}
                                /> 
                            )}
                            <AvatarFallback>
                                {(auth.currentUser.displayName || auth.currentUser.email)?.[0]}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>
                            <div>{auth.currentUser.displayName}</div>
                            <div className="font-normal text-xs">
                                {auth.currentUser.email}
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {!!auth.customClaims?.admin && (
                            <DropdownMenuItem asChild>
                                <Link href="/admin-dashboard">
                                    Admin Dashboard
                                </Link>
                            </DropdownMenuItem>
                        )}
                        {!auth.customClaims?.admin && (
                            <DropdownMenuItem asChild>
                                <Link href="/account/watch-list">
                                    Watch List
                                </Link>
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={async () => {
                            await auth.logout();
                            router.push("/");
                        }}>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
            {!auth?.currentUser && 
                <div className="flex gap-2 items-center uppercase">
                    <Link href="/login">Login</Link>
                    <Link href="/register">Register</Link>
                </div>
            }
        </div>
    )
}

export default AuthButtons