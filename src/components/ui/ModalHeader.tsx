function ModalHeader({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-1">
      <h2 className="text-3xl font-semibold text-balance wrap-normal">
        {title}
      </h2>

      {children}
    </div>
  );
}

export default ModalHeader;
