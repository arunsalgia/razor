const Instamojo = require("instamojo-payment-nodejs");
const crypto = require("crypto");
const Razorpay = require("razorpay");
var docxConverter = require('docx-pdf');
var router = express.Router();
const PDFDocument = require('pdfkit');



router.use('/', function(req, res, next) {
  // WalletRes = res;
  setHeader(res);
  next('route');
});

var params = {
	amount: 0,
	currency: "INR",
	receipt: "wthcoding001",
	payment_capture: '1'
};

var razorOptions = {
	"key": "rzp_test_UI178Dz1qN1si4",
	//"amount": 0, 		// Example: 2000 paise = INR 20
	//"currency": "INR",
	"order_id": "",
	"name": "APL",
	"description": "APL Wallet",
	"image": "VS.JPG", 
	//"handler": handleRazor,
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
			

router.get('/pdf', async function (req, res) {
  let myFile = process.cwd() + `/public/generate.pdf`;		// getFileName(pname, myProduct[0].versionNumber, ptype);

	const doc = new PDFDocument();
	//doc.addPage();
	doc.image(process.cwd() + '/public/HEADER.JPG', {
    align: 'center'
  });
	doc.fontSize(27).text('This the article for GeeksforGeeks', 100, 100);
	doc.pipe(fs.createWriteStream(myFile));
	doc.end();
	sendok(res, 'OK');
});

router.get('/download/:fName', async function (req, res) {
  setHeader(res);
	var {fName} = req.params;
  console.log("in download");
  
  let myFile = process.cwd() + `/public/test.docx`;		// getFileName(pname, myProduct[0].versionNumber, ptype);
	let outFile = process.cwd() + `/public/${fName}`;	
  console.log(myFile);
	console.log(outFile);

	/*
  if (fs.existsSync(myFile)) {
    res.contentType("application/docx");
		console.log("..............file found", myFile);
    await res.status(200).sendFile(myFile);
  } else
    senderr(res, 601, "Doc not found");  
	*/

	
	let convSuccess = false;
	docxConverter(myFile, outFile, async function(err,result){
		if(err){
			console.log("It is error");
			console.log(err);
			senderr(res, 601, "Doc not found");  
		} else {
			console.log("It is fine");
			console.log(result);
			if (fs.existsSync(outFile)) {
				res.contentType("application/pdf");
				console.log("..............file found", outFile);
				await res.status(200).sendFile(outFile);
				
			} else
				senderr(res, 601, "Doc not found");  
		}
	});
	
})

router.get('/order/:amount', async function( req, res) {
	console.log("Hello");

	var {amount} = req.params;
	params.amount = Number(amount)*100;
	console.log(`Amount ${params.amount}`);
	
	let instance = new Razorpay({
		key_id: "rzp_test_UI178Dz1qN1si4",
		key_secret: "lddjmqqsaZlhycXBjIXdrpnd",
	});

  instance.orders
    .create(params)
    .then((data) => {
			console.log(data);
			razorOptions.order_id = data.id;
      sendok(res, razorOptions);
    })
    .catch((error) => {
			console.log(`Faled`);
      senderr(res, 601, { sub: error, status: "failed" });
    });
});

router.get("/verify/:razorpay_order_id/:razorpay_payment_id/:razorpay_signature", async (req, res) => {
	var {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.params;
	
  body = razorpay_order_id + "|" + razorpay_payment_id;

  var expectedSignature = crypto
    .createHmac("sha256", "rzp_test_UI178Dz1qN1si4")
    .update(body.toString())
    .digest("hex");
		
  console.log("sig:" + razorpay_signature);
  console.log("sig:" + expectedSignature);
	
	if (expectedSignature === razorpay_signature)
		sendok(res, { status: "success" });
	else 
		senderr(res, 601, { status: "success" });
  var response = { status: "failure" };
  
});





function sendok(res, usrmsg) { res.send(usrmsg); }
function senderr(res, errcode, errmsg) { res.status(errcode).send(errmsg); }
function setHeader(res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
}

module.exports = router;
