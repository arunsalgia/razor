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


export default function DocView() {
  const classes = useStyles();
	
  const [amount, setAmount] = useState(0);

	const [razOpt, setRazOpt] = useState({});
	
	const [orderId, setOrderId] = useState("");
	const [payId, setPayId] = useState("");
	const [signId, setSignId] = useState("");
	
	const [disableCheckout, setDisableCheckout] = useState(true);
	const [myDoc, setMyDoc] = useState("http://localhost:3000/test.docx");


	let mySrc=`https://docs.google.com/gview?url=${myDoc}&embedded=true`;

		
  useEffect(() => {		
		const genDocument = async () => {		
			//await axios.get();
				// now prepare for download
				let myURL = "http://localhost:4000/razor/download/test.pdf"
				let response = await axios({ 
					method: 'get', url: myURL,
						responseType: 'arraybuffer',
				});
				let myFile = "prescription.pdf";
				console.log(myFile);
				console.log(response.data);
				await fileDownload (response.data, myFile);
		}
		genDocument();
		//getDocumentList()
  }, []);


  return (
	<Typography>Downloading</Typography>
  );
}
