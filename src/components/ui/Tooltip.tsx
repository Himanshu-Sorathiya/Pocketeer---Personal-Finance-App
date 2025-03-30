import { useState } from "react";

function Tooltip({
  id,
  text1,
  text2,
  className,
}: {
  id: string;
  text1: string;
  text2?: string;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <svg
        id={id}
        className={`cursor-pointer font-bold ${className}`}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onClick={() => setVisible(!visible)}
      >
        <use href={`/src/assets/icons/ui_icons_sprite.svg#${id}`}></use>
      </svg>

      {visible && (
        <div className="bg-shade-100 text-text absolute bottom-full left-1/2 z-10 w-64 -translate-x-1/2 -translate-y-2 rounded-md px-3 py-2 text-center text-sm font-medium whitespace-normal shadow-md">
          <p>{text1}</p>

          {text2 && <p className="mt-1">{text2}</p>}

          <div className="border-t-shade-100 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-6 border-transparent"></div>
        </div>
      )}
    </div>
  );
}

export default Tooltip;
