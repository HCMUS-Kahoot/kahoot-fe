import React from "react";
import {
  HomeOutlined,
  CompassOutlined,
  MenuOutlined,
  PieChartOutlined,
  ShopOutlined,
  TeamOutlined,
  FundOutlined
} from "@ant-design/icons";
import NavLink from "../NavLink";
function Navbar() {
  const isLogged = [
    {
      content: "Home",
      icon: <HomeOutlined />,
    },
    {
      content: "Groups",
      icon: <TeamOutlined />,
      to: "/groups",
    },
    {
      content: "Presentation",
      icon: <FundOutlined />,
      to: "/presentations",
    },
  ];
  return (
    <div className="h-full flex items-center">
      {isLogged.map((data, index) => {
        return (
          <NavLink
            content={data.content}
            icon={data.icon}
            key={index}
            to={data.to}
          />
        );
      })}
    </div>
  );
}
export default Navbar;
