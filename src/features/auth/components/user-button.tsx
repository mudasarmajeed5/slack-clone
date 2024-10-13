'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "../api/use-current-user";
import { Loader, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
export const UserButton = () => {
    const router = useRouter();
    const { signOut } = useAuthActions();
    const sign_Out = () => {
        signOut().finally(() => {
            router.refresh();
        });
    }
    const { data, isLoading } = useCurrentUser();
    if (isLoading) {
        return <Loader className="size-4 animate-spin text-muted-foreground" />
    };
    if (!data) return null;
    const { name, image } = data;
    const avatarFallback = name!.charAt(0).toUpperCase()
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative">
                <Avatar className="size-10 hover:opacity-75 transition">
                    <AvatarImage alt={name} src={image} />
                    <AvatarFallback className="text-white bg-sky-700">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" side="right" className="w-60">
                <DropdownMenuItem onClick={() => sign_Out()} className="h-10">
                    <LogOut className="size-4 mr-2" />Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};



