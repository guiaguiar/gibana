import { Icon } from "@iconify/react";

interface IconButtonProps {
  icon: string;
  width?: number;
  height?: number;
  onClick?: () => void;
  className?: string;
  "aria-label"?: string;
}

export default function IconButton({
  icon,
  width = 32,
  height = 32,
  onClick,
  className = "",
  "aria-label": ariaLabel,
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center hover:opacity-80 transition-opacity ${className} cursor-pointer`}
      aria-label={ariaLabel}
    >
      <Icon icon={icon} width={width} height={height} />
    </button>
  );
}
