import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModel } from "@/features/workspaces/store/use-create-workspace-modal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { Button } from "@/components/ui/button";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
export const WorkspaceSwitcher = () => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const [_open, setOpen] = useCreateWorkspaceModel();
    const { data: workspaces, isLoading: workspacesLoading } = useGetWorkspaces();
    const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId });
    const filteredWorkspaces = workspaces?.filter(
        (workspace) => workspace?._id !== workspaceId
    )

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="rounded-md flex justify-center items-center text-slate-800 font-semibold text-xl size-9 relative overflow-hidden bg-[#ADABAD] hover:bg-[#ADABAD]/80">
                    {workspaceLoading ? (<Loader className="animate-spin size-5 shrink-0" />) : (workspace?.name.charAt(0).toLocaleUpperCase())}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="start" className="w-64">
                <DropdownMenuItem onClick={() => router.push(`/workspace/${workspaceId}`)} className="cursor-pointer flex-col justify-start items-start capitalize">
                    {workspace?.name}
                    <span className="text-xs text-muted-foreground">    
                        Active Workspace
                    </span>
                </DropdownMenuItem>
                {filteredWorkspaces?.map((workspace: any) => (
                    <DropdownMenuItem
                        key={workspace._id}
                        className="cursor-pointer capitalize"
                        onClick={() => router.push(`/workspace/${workspace._id}`)}
                    >
                        <div className="size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2">
                            {workspace?.name.charAt(0).toUpperCase()}
                        </div>
                        {workspace.name}
                    </DropdownMenuItem>
                ))}
                <DropdownMenuItem className="cursor-pointer" onClick={() => setOpen(true)}>
                    <div className="size-9 relative overflow-hidden bg-[#F2F2F2] text-slate-800 font-semibold text-xl rounded-md flex items-center justify-center mr-2"><Plus /></div>
                    Create new Workspace
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
