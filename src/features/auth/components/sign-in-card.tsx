import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { SignInFlow } from "../types";
import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
interface SignInCardProps{
    setState : (setState:SignInFlow) => void;
};
export const SignInCard = ({setState}:SignInCardProps) => {
    const router = useRouter();
    const {signIn} = useAuthActions();
    const [email, setEmail] = useState('');
    const [pending, setPending] = useState(false);
    const [error,setError]=useState("");
    const [password, setPassword] = useState('');
    const onPasswordSignIn = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setPending(true);
        signIn("password",{email,password,flow:"signIn"})
        .catch(()=>{
            setError("Invalid Email or Password");
        })
        .finally(()=>{
            setPending(false);
            router.refresh();
        })
    }
    const onProviderSignIn = (value:"github"|"google")=>{
        setPending(true);
        signIn(value)
        .finally(()=>{
            setPending(false);
            router.refresh();
        })
    }
    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>Login to continue</CardTitle>
                <CardDescription className="px-0 pt-0">Use your email or another service to continue
                </CardDescription>
            </CardHeader>
            {!!error && (<div className="bg-destructive/40 p-3 rounded-md flex items-center gap-x-2 font-semibold text-sm text-destructive mb-6"><TriangleAlert className="size-4"/><p>{error}</p></div>)}
            <CardContent className="space-y-5 px-2 pb-0">
                <form onSubmit={onPasswordSignIn} className="space-y-2.5">
                    <Input
                        disabled={pending}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        value={email}
                        type="email"
                        required>
                    </Input>
                    <Input
                        disabled={pending} value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                        required>
                    </Input>
                    <Button type="submit" className="w-full" size="lg">
                        Continue
                    </Button>
                </form>
                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    <Button className="w-full relative"
                        disabled={pending}
                        onClick={() => onProviderSignIn("google")}
                        variant="outline"
                        size="lg"
                    >
                        <FcGoogle className="size-5 absolute top-3 left-2.5" />
                        Continue with Google
                    </Button>
                    <Button className="w-full relative"
                        disabled={pending}
                        onClick={() => onProviderSignIn("github")}
                        variant="outline"
                        size="lg"
                    >
                        <FaGithub className="size-5 absolute top-3 left-2.5" />
                        Continue with Github
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                    Don&apos;t have an account? <span className="text-sky-700 hover:underline cursor-pointer" onClick={()=>setState("signUp")}>Sign up</span>
                </p>
            </CardContent>
        </Card>
    )
}