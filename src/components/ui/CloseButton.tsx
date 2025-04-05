function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <svg
      className="hover:bg-shade-95 absolute top-4 right-4 size-8 cursor-pointer rounded-full p-1"
      onClick={onClick}
    >
      <use href="/src/assets/icons/ui_icons_sprite.svg#close"></use>
    </svg>
  );
}

export default CloseButton;
