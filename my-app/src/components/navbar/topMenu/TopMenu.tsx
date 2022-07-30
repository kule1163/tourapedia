import React, { useEffect, useRef } from "react";
import "./styles.scss";
import MenuItems from "../menuItems/MenuItems";
import { useAppSelector } from "../../../app/hooks";

interface TopMenuProps {
  menuHeight: number | undefined;
  setMenuHeight: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const TopMenu = ({ menuHeight, setMenuHeight }: TopMenuProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const displayMenu = useAppSelector((state) => state.tourapp.displayMenu);

  useEffect(() => {
    if (ref.current) {
      setMenuHeight(ref.current?.clientHeight);
    }
  }, [displayMenu]);

  return (
    <div ref={ref}>
      <div className="top-menu-container">
        <MenuItems />
      </div>
    </div>
  );
};

export default TopMenu;
