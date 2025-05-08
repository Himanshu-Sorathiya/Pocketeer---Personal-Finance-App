import { Link } from "@tanstack/react-router";

import Icon from "./Icon.tsx";

function SummeryHeader({
  to,
  header,
  label,
  onClick,
  headerClass,
  children,
}: {
  to: string;
  header: string;
  label: string;
  onClick: () => void;
  headerClass?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-1">
        <h3 className={`text-text font-semibold ${headerClass}`}>{header}</h3>

        {children}
      </div>

      <Link
        to={to}
        onClick={onClick}
        className="group flex items-center gap-0.5"
      >
        <span className="group-hover:text-primary font-medium text-gray-700 transition-all duration-100">
          {label}
        </span>

        <Icon
          id="arrow-right"
          className="text-text group-hover:fill-primary size-4 fill-current transition-all duration-100"
        />
      </Link>
    </div>
  );
}

export default SummeryHeader;
