import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useAuthActions } from "@convex-dev/auth/react";
import { Separator } from "@/components/ui/separator";
import { SignInFlow } from "../types";
import { TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
interface SignUpCardProps{
    setState : (setState:SignInFlow) => void;
};
export const SignUpCard = ({setState}:SignUpCardProps) => {
    const router = useRouter();
    const {signIn} = useAuthActions();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [pending, setPending] = useState(false);
    const [error,setError]=useState("");
    const onPasswordSignUp = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if(password !== confirmPassword){
        setError("Password Doesn't match");
        return;
      };
      setPending(true);
      signIn("password",{name,email,password,flow:"signUp"})
      .catch(()=>{
        setError("Something went wrong");
      })
      .finally(()=>{
        setPending(false);
        router.refresh();
      })
    }
    
    const onProviderSignUp = (value:"github"|"google")=>{
        setPending(true);
        signIn(value)
        .finally(()=>{
            setPending(false);
        })
    }
    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>Sign Up to continue</CardTitle>
                <CardDescription className="px-0 pt-0">Use your email or another service to continue
                </CardDescription>
            </CardHeader>
            {!!error && (<div className="bg-destructive/40 p-3 rounded-md flex items-center gap-x-2 font-semibold text-sm text-destructive mb-6"><TriangleAlert className="size-4"/><p>{error}</p></div>)}
            <CardContent className="space-y-5 px-2 pb-0">
                <form onSubmit={onPasswordSignUp} className="space-y-2.5">
                    <Input
                        disabled={pending} value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        type="name"
                        required>
                    </Input>
                    <Input
                        disabled={pending} value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
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
                    <Input
                        disabled={pending} value={confirmPassword}
                        onChange={(e) => setconfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
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
                        onClick={() => onProviderSignUp("google")}
                        variant="outline"
                        size="lg"
                    >
                        <FcGoogle className="size-5 absolute top-3 left-2.5" />
                        Continue with Google
                    </Button>
                    <Button className="w-full relative"
                        disabled={false}
                        onClick={() => onProviderSignUp("github")}
                        variant="outline"
                        size="lg"
                    >
                        <FaGithub className="size-5 absolute top-3 left-2.5" />
                        Continue with Github
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                    Already have an account? <span className="text-sky-700 hover:underline cursor-pointer" onClick={()=>setState("singIn")}>Sign In</span>
                </p>
            </CardContent>
        </Card>
    )
}