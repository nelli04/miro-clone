import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";
import { DialogTitle } from "@radix-ui/react-dialog";

export const InviteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Invite members
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-lg w-full max-h-[90vh] overflow-y-auto p-4">
        <DialogTitle/>
        <OrganizationProfile routing="hash" />
      </DialogContent>
    </Dialog>
  );
};
