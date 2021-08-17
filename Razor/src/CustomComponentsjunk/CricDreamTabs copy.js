import React, { useEffect } from 'react';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import GroupIcon from '@material-ui/icons/Group';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu'; 
import {red, blue, green} from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import {cdRefresh, specialSetPos, upGradeRequired} from "views/functions.js"
/// cd items import
import Dash from "views/Dashboard/Dashboard"
import Stats from "views/Statistics/Statistics"
import MyTeam from "views/MyTeam/MyTeam"
import Auction from "views/Auction/Auction"
import Captain from "views/Captain/Captain"
import Match from "views/UpcomingMatch/UpcomingMatch"
import Group from "views/Group/Group"
import Wallet from "views/Wallet/Wallet.js"
import Profile from "views/Profile/Profile.js"
import ChangePassword from "views/Login/ChangePassword.js"
import About from "views/APL/About.js"
import Home from "views/APL/Home.js"
import ContactUs from "views/APL/ContactUs.js"
import SU_Tournament from "views/SuperUser/Tournament.js" 
import SU_Player from "views/SuperUser/Player.js" 
import SU_Image from "views/SuperUser/Image.js" 
import NewGroup from "views/Group/NewGroup.js"
import JoinGroup from "views/Group/JoinGroup.js"
import GroupDetails from "views/Group/GroupDetails.js"
import { BlankArea } from './CustomComponents';
import Modal from 'react-modal';
//import {upGradeRequired} from "views/functions";


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    // marginRight: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  icon : {
    color: '#FFFFFF',
    marginRight: theme.spacing(0),
    marginLeft: theme.spacing(0),
  },
  dashButton: {
    // marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  statButton: {
    //marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  teamButton: {
    marginRight: theme.spacing(0),
    marginLeft: theme.spacing(0),
  },
  new: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightBold,
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    margin: theme.spacing(0),
    // backgroundColor: theme.palette.secondary.main,
    // width: theme.spacing(10),
    // height: theme.spacing(10),
  
  },

}));

export function setTab(num) {
  //myTabPosition = num;
  //console.log(`Menu pos ${num}`);
  localStorage.setItem("menuValue", num);
  cdRefresh();
}

export function CricDreamTabs() {
  const classes = useStyles();
  // for menu 
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // for group menu
  const [grpAuth, setGrpAuth] = React.useState(true);
  const [grpAnchorEl, setGrpAnchorEl] = React.useState(null);
  const grpOpen = Boolean(grpAnchorEl);
  const [value, setValue] = React.useState(parseInt(localStorage.getItem("menuValue")));
  const [upgrade, setUpgrade] = React.useState(false);
  const [modalIsOpen,setIsOpen] = React.useState(true);
  const [userGroup, setUserGroup] = React.useState([]);

  useEffect(() => {       
    const testUpgrade = async () => {
      //console.log("about to call upgrade");
      let upg = await upGradeRequired();
      //console.log("After chkupgrade");
      setUpgrade(upg);
      //console.log(upg);
      setIsOpen(true);
    }
    testUpgrade();
}, []);


  async function getMyGroups() {
    let allGroups=[]
    try {
      var myUrl = `${process.env.REACT_APP_AXIOS_BASEPATH}/group/memberof/${localStorage.getItem("uid")}`;
      const response = await axios.get(myUrl);
      allGroups = response.data[0].groups;
      if (allGroups.length > 0) {
        let tmp = allGroups.find(x => x.defaultGroup == true);
        if (!tmp) {
          tmp = allGroups[0];
          tmp.defaultGroup = true;
          localStorage.setItem("gid", tmp.gid.toString());
          localStorage.setItem("groupName", tmp.groupName);
          localStorage.setItem("tournament", tmp.tournament);
          localStorage.setItem("admin", tmp.admin);
        } 
      }
    } catch(e) {
      console.log(e);
    }
    return allGroups;
  }
  //console.log(`in Tab function  ${localStorage.getItem("menuValue")}`);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  function handleGrpMenu(event) {
    console.log(event.currentTarget);
    setGrpAnchorEl(event.currentTarget);
    var myUrl = `${process.env.REACT_APP_AXIOS_BASEPATH}/group/memberof/${localStorage.getItem("uid")}`;
    axios.get(myUrl).then((response) => {
      let allGroups = response.data[0].groups;
      if (allGroups.length > 0) {
        let tmp = allGroups.find(x => x.defaultGroup == true);
        if (!tmp) {
          tmp = allGroups[0];
          tmp.defaultGroup = true;
          localStorage.setItem("gid", tmp.gid.toString());
          localStorage.setItem("groupName", tmp.groupName);
          localStorage.setItem("tournament", tmp.tournament);
          localStorage.setItem("admin", tmp.admin);
          setUserGroup(allGroups);
          console.log(myGroup);      
          console.log('Everything is awesome.');
        }
      }
    }).catch((error) => {
      console.warn('Not good man :(');
      console.log(error);
      setUserGroup([]);
    })
  };

  function handleGroupSelect(index) {
    console.log(`group no ${index} selected`);
  }
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGrpClose = () => {
    setGrpAnchorEl(null);
  };

  function setMenuValue(num) {
    setValue(num);
    handleClose();
    localStorage.setItem("menuValue", num);
  }

  const handleDash = () => { setMenuValue(1);  }
  const handleStat = () => { setMenuValue(2);  }
  const handleTeam = () => { setMenuValue(3);  }
  const handleHome = () => { setMenuValue(4);  }
  const handleMatch = () => { handleClose(); setMenuValue(101);}
  const handleAuction = () => { handleClose(); setMenuValue(102);}
  const handleCaptain = () => { handleClose(); setMenuValue(103);}
  const handleGroup = () => { handleGrpClose(); setMenuValue(104);}
  const handleWallet = () => { handleClose(); setMenuValue(105);}
  const handleProfile = () => { handleClose(); setMenuValue(106);}
  const handlePassword = () => { handleClose(); setMenuValue(107);}
  const handleHelpDesk = () => { handleClose(); setMenuValue(201);}
  const handleContactUs = () => { handleClose(); setMenuValue(202);}
  const handleSuTournament = () => { handleClose(); setMenuValue(301);}
  const handleSuPlayer = () => { handleClose(); setMenuValue(302);}
  const handleSuImage = () => { handleClose(); setMenuValue(303);}

  const handleGroupNew = () => { handleGrpClose(); setMenuValue(1001);}
  const handleGroupJoin = () => { handleGrpClose(); setMenuValue(1002);}
  const handleGroupDetails = () => { handleGrpClose(); setMenuValue(1003);}

  const handleLogout = () => {
    handleClose();
    localStorage.setItem("uid", "");
    //localStorage.setItem("menuValue", process.env.REACT_APP_DASHBOARD);
    cdRefresh();  
  };

  function Show_Supervisor_Options() {
    if (localStorage.getItem("userPlan") == process.env.REACT_APP_SUPERUSER) {  
      return (
        <div>
        <MenuItem onClick={handleSuTournament}>SU Tournament</MenuItem>
        <MenuItem onClick={handleSuPlayer}>SU Player</MenuItem>
        {/* <MenuItem onClick={handleSuImage}>SU Load Image</MenuItem> */}
        </div>)
    } else {
      return (<div></div>)
    }
  }

  function DisplayCdItems() {
    switch(value) {
      case 1: return <Dash/>; 
      case 2: return <Stats/>;
      case 3: return <MyTeam />;
      case 4: return <Home />;
      case 101: return <Match />;
      case 102: return <Auction />;
      case 103: return <Captain />;
      case 104: return <Group />;
      case 105: return <Wallet />;
      case 106: return <Profile />;
      case 107: return <ChangePassword />;
      case 201: return <About />;
      case 202: return <ContactUs />;
      case 301: return <SU_Tournament />;
      case 302: return <SU_Player />;
      case 303: return <SU_Image />;
      case 1001: return <NewGroup />;
      case 1002: return <JoinGroup />;
      case 1003: return <GroupDetails />;
      default: return  <div></div>;
    }
  }

  function handleUpgrade() {
    //console.log("upgrade requested");
    closeModal();
  }

  function openModal() { setIsOpen(true); }
 
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }
 
  function closeModal(){ setIsOpen(false); }

  function DisplayUpgrade() {
    //console.log(`Upgrate: ${upgrade} Menu Item:   ${value}`)
    if (upgrade && (value === 1))
      return(
        <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Typography className={classes.new} align="center">
          Whats's New
        </Typography>
        <BlankArea/>
        <Typography>Ver 2.0</Typography>
        <Button key="upgrade" variant="contained" color="primary" size="small"
        className={classes.dashButton} onClick={handleUpgrade}>Update Now
        </Button>
      </Modal>
      )
    else
      return(<BlankArea/>)
  }

  function ShowGroupMenu() {
    return (
      <div>
      <IconButton
        aria-label="account of current group"
        aria-controls="group-appbar"
        aria-haspopup="true"
        onClick={handleGrpMenu}
        color="inherit"
      >
        <GroupIcon className={classes.icon}/>
      </IconButton>
      {userGroup.map((item, index) => {
        <MenuItem onClick={() => handleGroupSelect(index)}>x.groupName</MenuItem>
      })}
      <Menu
        id="group-appbar"
        anchorEl={grpAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={grpOpen}
        onClose={handleGrpClose}
      >
        <MenuItem onClick={handleGroup}>Group</MenuItem>
        <MenuItem onClick={handleGroupDetails}>Group Details</MenuItem>
        <MenuItem onClick={handleGroupJoin}>Join Group</MenuItem>
        <MenuItem onClick={handleGroupNew}>New Group</MenuItem>
      </Menu>
    </div>
)
  }

  let mylogo = `${process.env.PUBLIC_URL}/APLLOGO1.ICO`;
  return (
    <div className={classes.root}>
      {/* <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
      <AppBar position="static">
        <Toolbar>
          {/* <Avatar variant="square" className={classes.avatar}  src={mylogo}/> */}
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon className={classes.icon}/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleMatch}>Match</MenuItem>
                <MenuItem onClick={handleCaptain}>Captain</MenuItem>
                <MenuItem onClick={handleAuction}>Auction</MenuItem>
                <Divider />
                {/* <MenuItem onClick={handleGroup}>Group</MenuItem>
                <Divider/> */}
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handlePassword}>Password</MenuItem>
                <MenuItem onClick={handleWallet}>Wallet</MenuItem>
                <Show_Supervisor_Options/>
                <Divider/>
                <MenuItem onClick={handleHelpDesk}>How to play</MenuItem>
                <MenuItem onClick={handleContactUs}>Contact Us</MenuItem>       
                <Divider/>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleHome}
            color="inherit"
          >
            <HomeIcon className={classes.icon}/>
          </IconButton>
          <Button color="inherit" className={classes.dashButton} onClick={handleDash}>DashBoard</Button>
          <Button color="inherit" className={classes.statButton} onClick={handleStat}>Stats</Button>
          {/* <Button color="inherit" className={classes.statButton} onClick={handleAuction}>Auction</Button> */}
          <Button color="inherit" className={classes.teamButton} onClick={handleTeam}>Team</Button>
         {/* <div> */}
          <IconButton
            aria-label="account of current group"
            aria-controls="group-appbar"
            aria-haspopup="true"
            onClick={handleGrpMenu}
            color="inherit"
          >
            <GroupIcon className={classes.icon}/>
          </IconButton>
          <Menu
            id="group-appbar"
            anchorEl={grpAnchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={grpOpen}
            onClose={handleGrpClose}
          >
            <MenuItem onClick={handleGroup}>Group</MenuItem>
            <MenuItem onClick={handleGroupDetails}>Group Details</MenuItem>
            <MenuItem onClick={handleGroupJoin}>Join Group</MenuItem>
            <MenuItem onClick={handleGroupNew}>New Group</MenuItem>
          </Menu>
        {/* </div> */}
       </Toolbar>
      </AppBar>
      <DisplayCdItems/>
      <DisplayUpgrade/>
    </div>
  );
}