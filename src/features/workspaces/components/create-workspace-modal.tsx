import React, { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspaceModel } from "../store/use-create-workspace-modal";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { useRouter } from "next/navigation";
export const CreateWorkspaceModal = () => {
  const router = useRouter();
  const [open, setOpen] = useCreateWorkspaceModel();
  const [name,setName] = useState("");
  const { mutate,isPending } = useCreateWorkspace();
  const handleClose = () => {
    setOpen(false);
    setName("");
  }
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await mutate({
        name,
      }, {
        onSuccess(id) {
          router.push(`/workspaces/${id}`);
          handleClose();
          toast.success("Workspace created!")
        },
        onError(error) {
          
        },
      })
    } catch (error) {

    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a workspace</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={name}
            disabled={isPending}
            onChange={(e)=>setName(e.target.value)}
            required
            autoFocus
            minLength={3}
            placeholder="Workspace Name e.g. 'Personal', 'work', 'home'"
          />
          <div className="flex justify-end">
            <Button disabled={isPending}>
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
