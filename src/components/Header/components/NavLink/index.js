import React from "react";
import { Link } from "react-router-dom";
function NavLink({ content, icon, to }) {
  return (
    <div className="h-full">
      <Link
        to={to || "/"}
        className="flex pl-4 h-full w-18 justify-between text-[#333333] hover:text-[#333333]"
      >
        <div className="hover:text-[#864cbf] hover:border-b-4 hover:border-[#864cbf] flex font-bold">
          <div className="mr-1">{icon}</div>
          <div className="pt-1">
            <p>{content}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default NavLink;
