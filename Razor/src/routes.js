/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
// import BubbleChart from "@material-ui/icons/BubbleChart";
import GroupIcon from '@material-ui/icons/Group';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TimelineIcon from '@material-ui/icons/Timeline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import Statistics from "views/Statistics/Statistics.js"
import Logout from "views/Login/Logout.js"
import Auction from "views/Auction/Auction.js";
import MyTeam from "views/MyTeam/MyTeam.js"
import Captain from "views/Captain/Captain.js"
import Group from "views/Group/Group.js"
import UpcomingMatch from "views/UpcomingMatch/UpcomingMatch.js"


const dashboardRoutes = [
  {
    path: "/mygroup",
    name: "My Group",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: Group,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Auction",
    rtlName: "ملف تعريفي للمستخدم",
    icon: AttachMoneyIcon,
    component: Auction,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "My Team",
    rtlName: "قائمة الجدول",
    icon: GroupIcon,
    component: MyTeam ,
    layout: "/admin"
  },
  {
    path: "/captain",
    name: "My Captain",
    rtlName: "قائمة الجدول",
    icon: GroupIcon,
    component: Captain,
    layout: "/admin"
  },
  {
    path: "/statistics",
    name: "Statistics",
    rtlName: "طباعة",
    icon: TimelineIcon,
    component: Statistics,
    layout: "/admin"
  },
  {
    path: "/upcomingmatch",
    name: "UpcomingMatch",
    rtlName: "طباعة",
    icon: TimelineIcon,
    component: UpcomingMatch,
    layout: "/admin"
  },
  {
    path: "/Logout",
    name: "Logout",
    rtlName: "طباعة",
    icon: ExitToAppIcon,
    component: Logout,
    layout: "/admin"
  }
 
];

export default dashboardRoutes;
