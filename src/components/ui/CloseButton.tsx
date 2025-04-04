function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <svg
      className="hover:bg-shade-95 absolute top-1 right-1 size-7 cursor-pointer rounded-full p-1"
      onClick={onClick}
    >
      <use href="/src/assets/icons/ui_icons_sprite.svg#close"></use>
    </svg>
  );
}

export default CloseButton;
