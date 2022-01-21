import React, { useEffect, useState ,useContext} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import red from '@material-ui/core/colors/red';
import { SettingsCellOutlined } from '@material-ui/icons';
import axios from "axios";
import fileDownload  from 'js-file-download';

const RAZORSCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

const useStyles = makeStyles((theme) => ({
  bgImage: {
    BackgroundImage: url("https://media.geeksforgeeks.org/wp-content/uploads/rk.png"),
    backgroundSize: "cover",
    height: "100%",
    width: '100%',
    //margin-top: -70px;
    //font-size:50px;
    backgroundRepeat: 'none', 
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error:  {
      // right: 0,
      fontSize: '12px',
      color: red[700],
      // position: 'absolute',
      alignItems: 'center',
      marginTop: '0px',
  },
  textData: {
    fontSize: '14px',
    margin: theme.spacing(0),
  },
}));

const BackgroundImage = `${process.env.PUBLIC_URL}/image/SKY.JPG`;

export default function SignIn() {
  const classes = useStyles();
	
		
  useEffect(() => {		
  }, []);


  return (
    <div className={classes.bgImage} >
    	<Typography>Downloading</Typography>
    </div>
  );
}
