import React from "react";
import {
  HomeOutlined,
  CompassOutlined,
  MenuOutlined,
  PieChartOutlined,
  ShopOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import NavLink from "../NavLink";
function Navbar() {
  const isLogged = [
    {
      content: "Home",
      icon: <HomeOutlined />,
    },
    {
      content: "Discover",
      icon: <CompassOutlined />,
    },
    {
      content: "Library",
      icon: <MenuOutlined />,
    },
    {
      content: "Reports",
      icon: <PieChartOutlined />,
    },
    {
      content: "Marketplace",
      icon: <ShopOutlined />,
    },
    {
      content: "Groups",
      icon: <TeamOutlined />,
      to: "/groups",
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
