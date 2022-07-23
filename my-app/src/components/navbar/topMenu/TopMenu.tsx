import React, { useEffect, useRef } from "react";
import "./styles.scss";
import MenuItems from "../menuItems/MenuItems";

interface TopMenuProps {
  menuHeight: number | undefined;
  setMenuHeight: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const TopMenu = ({ menuHeight, setMenuHeight }: TopMenuProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setMenuHeight(ref.current?.clientHeight);
    }
  }, [menuHeight]);

  return (
    <div ref={ref}>
      <div className="top-menu-container">
        <MenuItems />
      </div>
    </div>
  );
};

export default TopMenu;
