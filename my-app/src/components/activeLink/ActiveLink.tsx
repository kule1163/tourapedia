import React from "react";
import type { LinkProps } from "react-router-dom";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

const ActiveLink = ({ children, to, ...props }: LinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link
        style={{ textDecoration: "none", color: match ? "#f44336" : "white" }}
        to={to}
        {...props}
      >
        {children}
      </Link>
      {/* {match && " (active)"} */}
    </div>
  );
};

export default ActiveLink;
