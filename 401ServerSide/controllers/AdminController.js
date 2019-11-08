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
        pass: 'rideShareAccount@7'
       }
});

var currentTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

exports.adminLogin = async function(request, response){
	console.log("Admin Login Called");
	console.log(request.body);
	if(request.body.username){
		if(request.body.username === "Darshan.kodipalli@gmail.com"){
			if(request.body.password === "password"){
				console.log("Correct Credentials");
				var loginToken = uuidv1();
				let emailHash = crypto.createHash('md5').update(request.body.username).digest("hex");
				let tokenHash = crypto.createHash('md5').update(loginToken).digest("hex");
				var otp = 12345;
				var insertLoginData = "insert into manage401K.login(l_email_id, l_access_token, l_login_date, o_otp) values ('"+emailHash+"','"+tokenHash+"','"+currentTimestamp+"','"+otp+"');";
				console.log(insertLoginData);
				try{
					appConfig.con.query(insertLoginData, function(error, loginResult){
						if(!error){
					  		console.log(loginResult);
					  		response.send({message:"Login Successful", status:1, loginToken:loginToken, role:"admin"});
					  	}
					})
				}catch(err){
					console.log("Error in executing the query");
					console.log(err);
				}
			}			
		}
	}
}

exports.adminLogout = async function(request,response){
	console.log("Admin Logout Called!");
	if(request.body.username){
		emailHash = crypto.createHash('md5').update(request.body.username).digest('hex');
		logoutQuery = "delete from manage401K.login where l_email_id = '"+emailHash+"'";
		console.log(logoutQuery);
		try{
			appConfig.con.query(logoutQuery, function(error, logoutResult){
				if(!error){
					console.log(logoutResult);
					response.send({message:"Logout Successful!", status:1});
				}
			})
		}catch(error){
			console.log(error);
		}
	}
}

exports.addCompany = async function(request, response){
	console.log(request.body);
	console.log("Add Company Called!");
	var enCompanyName = cryptoUtilities.encryptData(request.body.email,request.body.companyName);
	var enCompanyNumber = cryptoUtilities.encryptData(request.body.email,request.body.number);
	var enCompanyEmail = cryptoUtilities.encryptData(request.body.email,request.body.email);
	var enCompanyCIN = cryptoUtilities.encryptData(request.body.email,request.body.cin);
	var enCompanyAddress = cryptoUtilities.encryptData(request.body.email,request.body.address);
	var enCompanyOwner = cryptoUtilities.encryptData(request.body.email,request.body.owner);
	var enCompanyIndustry = cryptoUtilities.encryptData(request.body.email,request.body.industry);
	var enCompanyZIP = cryptoUtilities.encryptData(request.body.email,(request.body.zip).toString());
	var randomString = Math.random().toString(36).substring(7);
	var haCompanyPassword = crypto.createHash('md5').update(randomString).digest("hex");
	var renCompanyName;
	var renCompanyNumber;
	var renCompanyEmail;
	var renCompanyCIN;
	var renCompanyAddress;
	var renCompanyOwner;
	var renCompanyIndustry;
	var renCompanyZIP;
	var rhaCompanyPassword;

	Promise.resolve(enCompanyName).then(function(value){
		console.log(value);
		renCompanyName = value;
		Promise.resolve(enCompanyNumber).then(function(value){
			console.log(value);
			renCompanyNumber = value;
			Promise.resolve(enCompanyEmail).then(function(value){
				console.log(value);
				renCompanyEmail = value;
				Promise.resolve(enCompanyCIN).then(function(value){
					console.log(value);
					renCompanyCIN = value;
					Promise.resolve(enCompanyAddress).then(function(value){
						console.log(value);
						renCompanyAddress = value;
						Promise.resolve(enCompanyOwner).then(function(value){
							console.log(value);
							renCompanyOwner = value;
							Promise.resolve(enCompanyIndustry).then(function(value){
								console.log(value);
								renCompanyIndustry = value;
								Promise.resolve(enCompanyZIP).then(function(value){
									console.log(value);
									renCompanyZIP = value;
									Promise.resolve(haCompanyPassword).then(function(value){
										console.log(value);
										rhaCompanyPassword = value;
/*										insertCompanyQuery = "insert into manage401K.company_details (c_name,c_cin,c_address,c_owner,c_contact_number,c_contact_email,c_password,c_industry_type,c_created_date,c_status,c_created_by,c_zip) values ('"+renCompanyName+"','"+renCompanyCIN+"','"+renCompanyAddress+"','"+renCompanyOwner+"','"+renCompanyNumber+"','"+request.body.email+"','"+rhaCompanyPassword+"','"+renCompanyIndustry+"','"+currentTimestamp+"','"+1+"','"+"Darshan.kodipalli@gmail.com"+"','"+renCompanyZIP+"');";*/
										insertCompanyQuery = "insert into manage401K.company_details (c_name,c_cin,c_address,c_owner,c_contact_number,c_contact_email,c_password,c_industry_type,c_created_date,c_status,c_created_by,c_zip) values ('"+request.body.companyName+"','"+request.body.cin+"','"+request.body.address+"','"+request.body.owner+"','"+request.body.number+"','"+request.body.email+"','"+rhaCompanyPassword+"','"+request.body.industry+"','"+currentTimestamp+"','"+1+"','"+"Darshan.kodipalli@gmail.com"+"','"+request.body.zip+"');";										
										console.log("________________");
										console.log(insertCompanyQuery);
										console.log("________________");
										try{
											appConfig.con.query(insertCompanyQuery, function(error, insertResult){
												if(!error){
										            const mailOptions = {
										                from: 'ride7.share7@gmail.com', // sender address
										                to: request.body.email, // list of receivers Add BCC too
										                subject: 'Temporary Password to access Application', // Subject line
										                html: "<p>Here is your temporary password to access your applications : </p><span style='font-weight:bolder;'>"+randomString+"</span><p> Please login with this password and dont forget to login and Update your password</p>"// plain text body
										              };
										              transporter.sendMail(mailOptions, function (err, info) {
										                if(err)
										                  console.log(err)
										                else
										                  console.log(info);
										             });													
													console.log(insertResult);
													response.send({message:"Company Added Successfully!", status:1, tempPasswordCreated:randomString});
												}
											})
										}catch(error){
											console.log(error)
										}
									})
								})
							})
						})
					})
				})
			})
		})
	})
}

exports.getAllCompanies = async function(request, response){
	getAllCompaniesList = "select * from manage401K.company_details;"
	try{
		appConfig.con.query(getAllCompaniesList, function(error, fetchResult){
			if(!error){
				console.log(fetchResult);
				response.send({message:"Companies List!", status:1, data:fetchResult});
			}
		})
	}catch(error){
		console.log(error)
	}	
}