const uuidv1 = require('uuid/v1');
var appConfig = require("../config/config");
const crypto = require('crypto')
var cryptoUtilities = require("../utils/cryptoUtil");
var moment = require('moment');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ride7.share7@gmail.com',
        pass: 'BZYbf68JEWsXGDC'
       }
   });

var currentTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

exports.EmployeeLogin = async function(request, response){
	console.log("Employee Login Called");
	console.log(request.body);
	var companyPasswordHash = crypto.createHash('md5').update(request.body.password).digest("hex");
	if(request.body.username){
		searchRecord = "select * from manage401K.employee_details where e_contact_email = '"+request.body.username+"'and e_password = '"+companyPasswordHash+"';";
		var loginToken = uuidv1();
		let emailHash = crypto.createHash('md5').update(request.body.username).digest("hex");
		let tokenHash = crypto.createHash('md5').update(loginToken).digest("hex");
		console.log(companyPasswordHash);
		console.log(searchRecord);
		appConfig.con.query(searchRecord, function(error, recordDetail){
			if(!error){
					console.log(recordDetail);
		  			var otp = Math.floor(100000 + Math.random() * 900000)
		            const mailOptions = {
		                from: 'ride7.share7@gmail.com', // sender address
		                to: request.body.username, // list of receivers Add BCC too
		                subject: 'OTP to Login', // Subject line
		                html: "<p>Here is your OTP to access your applications : </p><span style='font-weight:bolder;'>"+otp+"</span><p> Please login with this OTP</p>"// plain text body
		              };
		              transporter.sendMail(mailOptions, function (err, info) {
		                if(err)
		                  console.log(err)
		                else{
							console.log(info);
							var loginRecord = "insert into manage401K.login(l_email_id, l_access_token, l_login_date, l_otp) values ('"+emailHash+"','"+tokenHash+"','"+currentTimestamp+"','"+otp+"')";
							console.log(loginRecord);
							appConfig.con.query(loginRecord, function(error, loginResult){
								if(!error){
									  console.log(loginResult);
									  response.send({message:"Login Successful", status:1, loginToken:loginToken, role:"employee"});
								  }
							})						
						}
		             });													
		  	}
		})
	}
}
exports.checkOTP = async function(request, response){
	console.log("checkOTP");
	var emailHash = crypto.createHash('md5').update(request.body.username).digest("hex");
	var searchRecord = "Select * from manage401K.login where l_email_id = '"+emailHash+"'";
	console.log(searchRecord);
	appConfig.con.query(searchRecord, function(error,searchResult){
		if(!error){
			console.log(searchResult[0].l_otp + " "+request.body.otp);
			if(searchResult[0].o_otp == request.body.otp){
				console.log("Correct OTP");
				response.send({message:"Correct OTP", status:1});				
			}
		}
	})
}
exports.getAllEmployees = async function(request,response){
	getAllCompaniesList = "select * from manage401K.employee_details where e_contact_email='"+request.body.emailID+"';";
	console.log(getAllCompaniesList);
	try{
		appConfig.con.query(getAllCompaniesList, function(error, fetchResult){
			if(!error){
				console.log(fetchResult);
				response.send({message:"Employee List!", status:1, data:fetchResult});
			}
		})
	}catch(error){
		console.log(error)
	}			
}
exports.getAllEmployeePayments = async function(request,response){
	getAllPayments = "select * from manage401K.monthly_wages where e_email='"+request.body.companyName+"';";
	console.log(getAllPayments);
	try{
		appConfig.con.query(getAllPayments, function(error, fetchResult){
			if(!error){
				console.log(fetchResult);
				response.send({message:"Monthly Wages List!", status:1, data:fetchResult});
			}
		})
	}catch(error){
		console.log(error)
	}				
}

exports.updateEmployeeRecord = async function(request, response){
	updateRecord = "update manage401K.employee_details set e_401K_contribution = '"+request.body.e_401K_contribution+"' where e_contact_email='"+request.body.e_email+"' and e_company_name = '"+request.body.e_companyName+"';";
	console.log(updateRecord);
	try{
		appConfig.con.query(updateRecord, function(error, fetchResult){
			if(!error){
				console.log(fetchResult);
				response.send({message:"Updated!", status:1});
			}
		})
	}catch(error){
		console.log(error)
	}				
}