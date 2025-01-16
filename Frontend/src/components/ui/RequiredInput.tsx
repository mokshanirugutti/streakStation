import { Input } from "./input";
import { Label } from "./label";
import { useId } from "react";

type RequiredInputProps = {
  title: string;
  placehoder: string;
  type: string;
  name: string;
  onChange: (value: string) => void; 
};

export default function RequiredInput({
  title,
  placehoder,
  type,
  name,
  onChange,
}: RequiredInputProps) {
  const id = `${name}-${useId()}`;
  return (
    <div className="space-y-2 my-3">
      <Label htmlFor={id}>
        {title} <span className="text-destructive">*</span>
      </Label>
      <Input
        id={id}
        placeholder={placehoder}
        type={type}
        required
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
