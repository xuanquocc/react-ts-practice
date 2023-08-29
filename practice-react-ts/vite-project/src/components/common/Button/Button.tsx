import { ReactNode, memo } from "react";
import './button.css'

interface ButtonProps {
  children?: ReactNode;
  size?: "large" | "medium" | "small";
  kind?: "primary" | "outline" | "error";
  className?: string;
  type?: "submit" | "button";
  onClick: () => void;
} 


const Common = ({ children, size, kind, className, onClick }: ButtonProps) => {
  return (
    <>
      <button className={`${size} ${kind} ${className}`} onClick={onClick}>
        {children}
      </button>
    </>
  );
};

export default memo(Common);
