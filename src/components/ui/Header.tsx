import { ReactNode } from "react";

interface HeaderProps {
  title: string;
  children?: ReactNode;
}

export default function Header({ title, children }: HeaderProps) {
  return (
    <div className="flex items-center justify-between pb-6">
      <h1 className="text-4xl font-bold text-gray-800">{title}</h1>

      <div>{children}</div>
    </div>
  );
}
