import { Button } from "./button";
import { ArrowRight } from "lucide-react";

type ButtonWithArrowProps = {
  title:string;
  onClick? : () => void;
}

export default function ButtonWithArrow({title, onClick}: ButtonWithArrowProps) {
  return (
    <Button className="group my-3" onClick={onClick} type="submit">
      {title}
      <ArrowRight
        className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
        size={16}
        strokeWidth={2}
        aria-hidden="true"
      />
    </Button>
  );
}
