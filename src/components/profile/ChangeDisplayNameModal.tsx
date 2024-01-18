"use client";

import { Button } from "@/components/ui/button";
import { ButtonLoading } from "@/components/ui/button-loading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateDisplayName, updateUserUsername } from "@/services/userServices";
import { useAuth } from "@/store/useAuthStore";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  defaultDisplayName: string;
  userId: string;
};

export function ChangeDisplayNameModal({ defaultDisplayName, userId }: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const displayName = useAuth((state) => state.displayName);
  const setDisplayName = useAuth((state) => state.setDisplayName);
  const [isChangingDisplayName, setIsChangingDisplayName] =
    useState<boolean>(false);
  const [newDisplayName, setNewDisplayName] =
    useState<string>(defaultDisplayName);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleUploading = async () => {
    setIsChangingDisplayName(true);
    const result = await updateDisplayName(newDisplayName, userId);

    if (!result.success) {
      toast.error(result.message);
      setIsChangingDisplayName(false);
      handleClose();
      return;
    }

    toast.success(result.message);

    setDisplayName(newDisplayName);
    setIsChangingDisplayName(false);
    handleClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-[36px]" variant="outline">
          Edit Display Name
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Change your display name here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="displayName" className="text-center leading-normal">
              Display Name
            </Label>
            <Input
              id="displayName"
              defaultValue={displayName ?? ""}
              onChange={(e) => setNewDisplayName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
            <p>{displayName}</p>
          <ButtonLoading
            onClick={handleUploading}
            isLoading={isChangingDisplayName}
            type="submit"
          >
            Save changes
          </ButtonLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}