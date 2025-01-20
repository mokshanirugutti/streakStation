import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useId, useState } from "react";

type GetDetailsPopUpProps = {
  title: string;
};
export default function GetDetailsPopUp({title}:GetDetailsPopUpProps) {
  const [Username, setUsername] = useState<string>('')
    const [AuthToken, setAuthToken] = useState<string>('')

    const handleSave = () => {
        localStorage.setItem(`${title}Username`, Username)
        localStorage.setItem(`${title}AuthToken`, AuthToken)

    }
    
  const id = useId();
  return (
    <div className="my-3">

    <Dialog >
      <DialogTrigger asChild >
        <Button variant="outline">Configure {title}</Button>
      </DialogTrigger>
      <DialogContent className="p-3 rounded-lg text-sm">

        <form className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`${id}-${title}-username`}>{title === 'Github' ? 'Github Username' : 'CSRF Token'}</Label>
              <Input id={`${id}-${title}-username`} 
                placeholder={title === 'Github' ? 'Github Username' : 'CSRF Token'} 
                type="text" 
                required 
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-${title}-AuthToken`}>AuthToken</Label>
              <Input
                id={`${id}-${title}-AuthToken`}
                placeholder={`${title} AuthToken`}
                type="password"
                onChange={(e) => setAuthToken(e.target.value)}
                required
                />
            </div>
          </div>
          <Button type="submit" className="w-full" onClick={handleSave}> 
            Save
          </Button>
        </form>

        </DialogContent>
      </Dialog>
    </div>
  );
}
