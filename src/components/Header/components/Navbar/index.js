import React from "react";
import { HomeOutlined, CompassOutlined, MenuOutlined, PieChartOutlined, ShopOutlined } from "@ant-design/icons";
import NavLink from "../NavLink";
function Navbar(){
  const isLogged=[{
    content: "Home",
    icon: <HomeOutlined />,
  },
  {
    content: "Discover",
    icon: <CompassOutlined />,
  },
  {
    content: "Library",
    icon: <MenuOutlined />
  },
  {
    content: "Reports",
    icon: <PieChartOutlined />
  },
  {
    content: "Marketplace",
    icon: <ShopOutlined />
  }
]
  return(<div className="h-full flex items-center">
    {isLogged.map(data=>{
      return(<NavLink content={data.content} icon={data.icon} />)
    })}
  </div>)
}
export default Navbar;