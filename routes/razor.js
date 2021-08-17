const Instamojo = require("instamojo-payment-nodejs");
const crypto = require("crypto");
const Razorpay = require("razorpay");

var router = express.Router();


// live keys
//const RAZOR_API_KEY = "rzp_live_PWqtTU1HrN1C5M";
//const RAZOR_AUTH_KEY = "jbV2ARMEfXPCNZUZ84GUnQQ9";

// test keys
const RAZOR_API_KEY = "rzp_test_UI178Dz1qN1si4";
const RAZOR_AUTH_KEY = "lddjmqqsaZlhycXBjIXdrpnd";

const instance = new Razorpay({
  key_id: RAZOR_API_KEY,
  key_secret: RAZOR_AUTH_KEY,
});


router.use('/', function(req, res, next) {
  // WalletRes = res;
  setHeader(res);
	console.log("Hell Mian");
  next('route');
});

var params = {
	amount: 0,
	currency: "INR",
	receipt: "wthcoding001",
	payment_capture: '1'
};

var razorOptions = {
	"key": RAZOR_API_KEY,
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
			
router.get('/order/:amount', async function( req, res) {
	console.log("Hello");

	var {amount} = req.params;
	params.amount = Number(amount)*100;
	console.log(`Amount ${params.amount}`);
	
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
    .createHmac("sha256", "lddjmqqsaZlhycXBjIXdrpnd")
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
