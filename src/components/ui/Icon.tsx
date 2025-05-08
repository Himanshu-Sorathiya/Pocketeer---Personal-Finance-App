function Icon({
  id,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  id: string;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <use href={`/src/assets/icons/ui_icons_sprite.svg#${id}`}></use>
    </svg>
  );
}

export default Icon;
