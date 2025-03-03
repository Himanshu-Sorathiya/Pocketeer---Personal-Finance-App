import { Link } from '@tanstack/react-router';

import { Route as dashboardRoute } from '../../routes/app/dashboard.tsx';

import WordLogoLight from "../logo/WordLogoLight.tsx";

function SidebarLogo() {
  return (
    <div>
      <Link to={dashboardRoute.to}>
        <WordLogoLight className="h-20 w-[216px]" />
      </Link>
    </div>
  );
}

export default SidebarLogo;
