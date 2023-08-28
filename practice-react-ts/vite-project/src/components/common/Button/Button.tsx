import { ReactNode, memo } from "react";

interface ButtonProps {
  children?: ReactNode;
  size?: "large" | "medium" | "small";
  kind?: "primary" | "secondary" | "error";
  className?: string;
  type?: "submit" | "button";
  onClick: () => void;
} 

// import { Container } from './styles';

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
