import React, { useState ,useContext} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import red from '@material-ui/core/colors/red';
import { SettingsCellOutlined } from '@material-ui/icons';
import axios from "axios";
import useScript from './useScript';

import VsPagination from "components/Pagination/VsPagination"

//const crypto = require("crypto");
//const Razorpay = require("razorpay");

const RAZORSCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

const useStyles = makeStyles((theme) => ({
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


export default function Razor() {
	useScript(RAZORSCRIPT);
  const classes = useStyles();
	
  const [amount, setAmount] = useState(0);

	const [razOpt, setRazOpt] = useState({});
	
	const [orderId, setOrderId] = useState("");
	const [payId, setPayId] = useState("");
	const [signId, setSignId] = useState("");
	
	const [disableCheckout, setDisableCheckout] = useState(true);
	const [disableVerify, setDisableVerify] = useState(true);
	
	const [current, setCurrent] = useState(1);
	const [left, setLeft] = useState(1);

  const selectAmount = async() => {
		if (amount <= 0)  {
			alert("Invalid Amount entered");
			return;
		}
		try {
			let  response = await axios.get(`${process.env.REACT_APP_AXIOS_BASEPATH}/razor/order/${amount}`);	
			console.log(response.data);
			
			setRazOpt(response.data);
			
			setOrderId(response.data.order_id);
			setPayId("");
			setSignId("");
			
			setDisableCheckout(false);
			setDisableVerify(true);
			
		} catch (e) {
			console.log("Checkout failure");
		}
	}
	
	function handleRazor (response)  {
		console.log("in razor response");
		console.log(response);
		if (orderId == response.razorpay_order_id) {
				setPayId(response.razorpay_payment_id);
				setSignId(response.razorpay_signature);
				setDisableVerify(false);
		} else {
			alert("Order Id mismatch");
		}
	}

	const handleCheckout = async() => {
		console.log("in checkout");
		/**
		var options = 
		{
			//"key": "rzp_live_PWqtTU1HrN1C5M",
			"key": "<%= key %>",
			"currency": "INR",
			"name": "WTH Coding",
			"description": "WtH Coding Transaction",
			"order_id": orderId,
			"handler": handleRazor,
			"theme": { "color": "#0EB9F2" }
		};
		var razorOptions = {
			"key": "rzp_test_UI178Dz1qN1si4",
			//"amount": 0, 		// Example: 2000 paise = INR 20
			//"currency": "INR",
			"order_id": orderId,
			"name": "APL",
			"description": "APL Wallet",
			"image": "VS.JPG",    // COMPANY LOGO
			"handler": handleRazor,
			"prefill": {
				"name": "Arun Salgia", 		// pass customer name
				"email": 'arunsalgia@gmail.com',		// customer email
				"contact": '8080820084' 	//customer phone no.
			},
			"notes": {
				"address": "address" //customer address 
			},
			"theme": {
				"color": "#15b8f3" // screen color
			}
};
**/	
		
		//setRazOpt({handler: handleRazor});
		
		let myOpt = razOpt;
		myOpt["handler"] = handleRazor;
		console.log(myOpt);
		try {
			var rzp1 = new Razorpay(myOpt);
			rzp1.open();
		} catch (e)	{
			//e.preventDefault();
			console.log("Razor error");
			console.log(e);
		}
	}

	const handleVerify = async() => {
		
		if ((orderId != "") && (payId != "") && (signId != ""))  {
			try {
				let  response = await axios.get(`${process.env.REACT_APP_AXIOS_BASEPATH}/razor/verify/${orderId}/${payId}/${signId}`);	
				console.log(response.data);
				alert("Verify Success");		
			} catch (e) {
				alert("Verify Failed");
			}
		} else
			alert("Blank Id found");
	}
	
	const handleSubmit = async() => {
			console.log("in submit");
	}
	
	function handleClear() {
		setAmount(0);
		setDisableCheckout(true);
		setDisableVerify(true);
		setOrderId("");
		setPayId("");
		setSignId("");
	}
	
function newPage(pageNum) {
	setCurrent(pageNum);
	console.log(pageNum);
}

	function myLeft(num) {
		console.log("left is ",num);
		setLeft(num);	
	}

  return (
    <Container component="main" maxWidth="lg">
	  <VsPagination showStart showEnd count={50} left={left} setLeft={setLeft} current={current} onClick={newPage} />
      <CssBaseline />
      <div className={classes.paper}>
      <Typography component="h1" variant="h5">Razor Testing</Typography>
      <br/>
      <ValidatorForm className={classes.form} onSubmit={handleSubmit}>
      <TextValidator
          variant="outlined"
          required
          fullWidth
          multiline      
          label="Amount"
          onChange={(event) => setAmount(event.target.value)}
          name="Amount"
          type="Feedback"
          value={amount}
      />
      <Button
        onClick={selectAmount}
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Create Order
			</Button>
			<br />
			<Typography className={classes.textData}>Order Id: {orderId}</Typography>
			<Button
        onClick={handleCheckout}
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
				disabled={disableCheckout}
      >
        Checkout
			</Button>
			<Typography className={classes.textData}>Order Id: {orderId}</Typography>
			<Typography className={classes.textData}>Pay   Id: {payId}</Typography>
			<Typography className={classes.textData}>Sign  Id: {signId}</Typography>
			<Button
        onClick={handleVerify}
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
				disabled={disableVerify}
      >
        Verify
			</Button>
			<Button
        onClick={handleClear}
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Clear All
			</Button>
    </ValidatorForm>
    </div>  
    </Container>
  );
}
