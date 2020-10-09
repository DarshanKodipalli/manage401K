const uuidv1 = require('uuid/v1');
var appConfig = require("../config/config");
const crypto = require('crypto')
var cryptoUtilities = require("../utils/cryptoUtil");
var moment = require('moment');
var nodemailer = require('nodemailer');

// const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
// const namespace = "com.network.manifest.assets";

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ride7.share7@gmail.com',
        pass: 'BZYbf68JEWsXGDC'
       }
   });

var currentTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

exports.companyLogin = async function(request, response){
	console.log("Company Login Called");
	console.log(request.body);
	if(request.body.username){
		searchRecord = "select * from manage401K.company_details where c_contact_email = '"+request.body.username+"';";
		var companyPasswordHash = crypto.createHash('md5').update(request.body.password).digest("hex");
		var loginToken = uuidv1();
		let emailHash = crypto.createHash('md5').update(request.body.username).digest("hex");
		let tokenHash = crypto.createHash('md5').update(loginToken).digest("hex");
		console.log(companyPasswordHash);
		appConfig.con.query(searchRecord, function(error, recordDetail){
			if(!error){
		  		console.log(recordDetail);
		  		if(companyPasswordHash === recordDetail[0].c_password){
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
							console.log("Info:"+info);
							var loginRecord = "insert into manage401K.login(l_email_id, l_access_token, l_login_date, l_otp) values ('"+emailHash+"','"+tokenHash+"','"+currentTimestamp+"','"+otp+"')";
							appConfig.con.query(loginRecord, function(error, loginResult){
								if(!error){
									  console.log("loginResult: ");
									  response.send({message:"Login Successful", status:1, loginToken:loginToken, role:"company", companyName:recordDetail[0].c_name});
								  }else{
									  console.log(error);
								  }
							})						
						}
		             });													
		  		}
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
			if(searchResult[0].l_otp == request.body.otp){
				console.log("Correct OTP");
				response.send({message:"Correct OTP", status:1});				
			}
		}
	})
}

exports.addEmployee = async function(request, response){
	console.log(request.body);
	console.log("Add Employee Called!");
	// var enEmployeeName = cryptoUtilities.encryptData(request.body.email,request.body.name);
	// var enEmployeeNumber = cryptoUtilities.encryptData(request.body.email,request.body.number);
	// var enEmployeeEmail = cryptoUtilities.encryptData(request.body.email,request.body.email);
	// var enEmployeeSSN = cryptoUtilities.encryptData(request.body.email,request.body.ssn);
	// var enEmployeeAddress = cryptoUtilities.encryptData(request.body.email,request.body.address);
	// var enEmployeeDept = cryptoUtilities.encryptData(request.body.email,request.body.dept);
	// var enEmployeeSalary = cryptoUtilities.encryptData(request.body.email,request.body.salary.toString());
	var randomString = Math.random().toString(36).substring(7);
	var haCompanyPassword = crypto.createHash('md5').update(randomString).digest("hex");
	// var renEmployeeName;
	// var renEmployeeNumber;
	// var renEmployeeEmail;
	// var renEmployeeSSN;
	// var renEmployeeAddress;
	// var renEmployeeDept;
	// var renEmployeeSalary;


	var companyID;
	var companyName;
	var getCompanyData = "select * from manage401K.company_details where c_contact_email = '"+request.body.loginData.username+"';";
	appConfig.con.query(getCompanyData, function(err, companyData){
		if(!err){
			console.log(companyData);
			companyID = companyData[0].c_cin;
			companyName = companyData[0].c_name;
			insertCompanyQuery = "insert into manage401K.employee_details (e_name,e_company_id,e_ssn,e_address,e_salary,e_contact_number,e_contact_email,e_password,e_401K_contribution,e_company_name,e_created_date,e_created_by,e_status,e_dept) values ('"+request.body.name+"','"+companyID+"','"+request.body.ssn+"','"+request.body.address+"','"+request.body.salary+"','"+request.body.number+"','"+request.body.email+"','"+haCompanyPassword+"','"+5.00+"','"+companyName+"','"+currentTimestamp+"','"+"Darshan.kodipalli@gmail.com"+"','"+1+"','"+request.body.dept+"');";
			console.log("________________");
			console.log(insertCompanyQuery);
			console.log("________________");
			appConfig.con.query(insertCompanyQuery, function(err,employeeAdded){
				if(!err){
					console.log("Employee Added");
					const mailOptions = {
						from: 'ride7.share7@gmail.com', // sender address
						to: request.body.email, // list of receivers Add BCC too
						subject: 'Salary Account Created!', // Subject line
						html: "<p>To update your 401K contribution from your salary, Login into your portal with your temporary password: </p><span style='font-weight:bolder;'>"+randomString+"</span><p> Please login with this password and Manage your account</p>"// plain text body
					  };
					  transporter.sendMail(mailOptions, function (err, info) {
						if(err)
						  console.log(err)
						else
						  console.log(info);
					 });													
					response.send({message:"Employee Added Successfully!", status:1, tempPasswordCreated:randomString});					
				}
			})
		}
	})

	// try{
	// 	appConfig.con.query(insertCompanyQuery, function(error, insertResult){
	// 		if(!error){
	// 			const mailOptions = {
	// 				from: 'ride7.share7@gmail.com', // sender address
	// 				to: request.body.email, // list of receivers Add BCC too
	// 				subject: 'Temporary Password to access Application', // Subject line
	// 				html: "<p>Here is your temporary password to access your applications : </p><span style='font-weight:bolder;'>"+randomString+"</span><p> Please login with this password and dont forget to login and Update your password</p>"// plain text body
	// 			  };
	// 			  transporter.sendMail(mailOptions, function (err, info) {
	// 				if(err)
	// 				  console.log(err)
	// 				else
	// 				  console.log(info);
	// 			 });													
	// 			console.log(insertResult);
	// 			response.send({message:"Company Added Successfully!", status:1, tempPasswordCreated:randomString});
	// 		}
	// 	})
	// }catch(error){
	// 	console.log(error)
	// }
// 	Promise.resolve(enEmployeeName).then(function(value){
// 		console.log(value);
// 		renEmployeeName = value;
// 		Promise.resolve(enEmployeeNumber).then(function(value){
// 			console.log(value);
// 			renEmployeeNumber = value;
// 			Promise.resolve(enEmployeeEmail).then(function(value){
// 				console.log(value);
// 				renEmployeeEmail = value;
// 				Promise.resolve(enEmployeeSSN).then(function(value){
// 					console.log(value);
// 					renEmployeeSSN = value;
// 					Promise.resolve(enEmployeeAddress).then(function(value){
// 						console.log(value);
// 						renEmployeeAddress = value;
// 						Promise.resolve(enEmployeeDept).then(function(value){
// 							console.log(value);
// 							renEmployeeDept = value;
// 							Promise.resolve(enEmployeeSalary).then(function(value){
// 								console.log(value);
// 								renEmployeeSalary = value;
// 								Promise.resolve(enEmployeeSalary).then(function(value){
// 									console.log(value);
// 									enEmployeeSalary = value;
// 									Promise.resolve(haCompanyPassword).then(function(value){
// 										console.log(value);
// 										rhaCompanyPassword = value;
// /*										insertCompanyQuery = "insert into manage401K.employee_details (c_name,c_SSN,c_address,c_owner,c_contact_number,c_contact_email,c_password,c_industry_type,c_created_date,c_status,c_created_by,c_zip) values ('"+renEmployeeName+"','"+renEmployeeSSN+"','"+renEmployeeAddress+"','"+renEmployeeOwner+"','"+renEmployeeNumber+"','"+request.body.email+"','"+rhaCompanyPassword+"','"+renEmployeeIndustry+"','"+currentTimestamp+"','"+1+"','"+"Darshan.kodipalli@gmail.com"+"','"+renEmployeeZIP+"');";*/
// 										insertCompanyQuery = "insert into manage401K.employee_details (e_name,e_company_id,e_ssn,e_address,e_salary,e_contact_number,e_contact_email,e_password,e_401K_contribution,e_company_name,e_created_date,e_created_by,e_status,e_dept) values ('"+request.body.name+"','"+request.body.cin+"','"+request.body.address+"','"+request.body.owner+"','"+request.body.number+"','"+request.body.email+"','"+rhaCompanyPassword+"','"+request.body.industry+"','"+currentTimestamp+"','"+1+"','"+"Darshan.kodipalli@gmail.com"+"','"+request.body.zip+"');";										
// 										console.log("________________");
// 										console.log(insertCompanyQuery);
// 										console.log("________________");
// 										try{
// 											appConfig.con.query(insertCompanyQuery, function(error, insertResult){
// 												if(!error){
// 										            const mailOptions = {
// 										                from: 'ride7.share7@gmail.com', // sender address
// 										                to: request.body.email, // list of receivers Add BCC too
// 										                subject: 'Temporary Password to access Application', // Subject line
// 										                html: "<p>Here is your temporary password to access your applications : </p><span style='font-weight:bolder;'>"+randomString+"</span><p> Please login with this password and dont forget to login and Update your password</p>"// plain text body
// 										              };
// 										              transporter.sendMail(mailOptions, function (err, info) {
// 										                if(err)
// 										                  console.log(err)
// 										                else
// 										                  console.log(info);
// 										             });													
// 													console.log(insertResult);
// 													response.send({message:"Company Added Successfully!", status:1, tempPasswordCreated:randomString});
// 												}
// 											})
// 										}catch(error){
// 											console.log(error)
// 										}
// 									})
// 								})
// 							})
// 						})
// 					})
// 				})
// 			})
// 		})
// 	})
}

exports.getAllEmployees = async function(request, response){
	getAllCompaniesList = "select * from manage401K.employee_details where e_company_name='"+request.body.companyName+"';";
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

exports.makeMonthlyPayment = async function(request,response){
	console.log("Make monthly payments called")
	console.log(request.body);
	makeMonthlyPayment = "insert into manage401K.monthly_wages (m_company_name,m_company_id,m_employee_ssn,m_salary,m_contribution_to_401k,m_created_date,m_created_by,e_email,e_name,m_status,m_salary_monthly) values ('"+request.body.m_company_name+"','"+request.body.m_company_id+"','"+request.body.m_employee_ssn+"','"+request.body.m_salary+"','"+request.body.m_contribution_to_401k+"','"+currentTimestamp+"','"+"Darshan.kodipalli@gmail.com"+"','"+request.body.e_email+"','"+request.body.e_name+"','"+1+"','"+request.body.m_salary_monthly+"');";	
	console.log(makeMonthlyPayment);
	try{
		appConfig.con.query(makeMonthlyPayment, function(error, fetchResult){
			if(!error){
				console.log(fetchResult.insertId);
				response.send({message:"Payment Recorded!", status:1});								
			}else{
				console.log(error);
			}
		})	
	}catch(error){
		console.log(error);
	}
}
exports.getMonthlyPaymentsMade = async function(request, response){
	getAllPayments = "select * from manage401K.monthly_wages where m_company_name='"+request.body.companyName+"' order by m_created_date desc;";
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

exports.getUsersContribution = async function(request, response){
	getUsersContributionQuery = "select e_name, sum(m_contribution_to_401k) as contri from manage401K.monthly_wages where m_company_name='"+request.body.companyName+"' group by e_name ;";
	console.log(getUsersContributionQuery);
	try{
		appConfig.con.query(getUsersContributionQuery, function(error, fetchResult1){
			if(!error){
				console.log(fetchResult1);
				response.send({message:"401k Wages List!", status:1, data:fetchResult1});
			}
		})
	}catch(error){
		console.log(error)
	}			
}

exports.getDeptEmployeeLists = async function(request, response){
	getDeptEmployeeListsQuery = "select e_dept, count(*) as count from manage401K.employee_details where e_company_name='"+request.body.companyName+"' group by e_dept;";
	console.log(getDeptEmployeeListsQuery);
	try{
		appConfig.con.query(getDeptEmployeeListsQuery, function(error, fetchResult1){
			if(!error){
				console.log(fetchResult1);
				response.send({message:"401k Wages List!", status:1, data:fetchResult1});
			}
		})
	}catch(error){
		console.log(error)
	}			
}

exports.getEmployeeCompanyList = async function(request, response){
	getEmployeeCompanyListQuery = "select count(*) as empCount, e_company_name from manage401K.employee_details group by e_company_name;";
	console.log(getEmployeeCompanyListQuery);
	try{
		appConfig.con.query(getEmployeeCompanyListQuery, function(error, fetchResult1){
			if(!error){
				console.log(fetchResult1);
				response.send({message:"401k Company Employee!", status:1, data:fetchResult1});
			}
		})
	}catch(error){
		console.log(error)
	}			
}

exports.getMonthWisePayment = async function(request, response){
	getMonthlyPaymentsCompanyListQuery = "select count(*) as count, DATE_FORMAT(m_created_date, '%e %b, %Y') as date from manage401K.monthly_wages where m_company_name = '"+request.body.companyName+"' group by m_created_date";
	console.log(getMonthlyPaymentsCompanyListQuery);
	try{
		appConfig.con.query(getMonthlyPaymentsCompanyListQuery, function(error, fetchResult1){
			if(!error){
				console.log(fetchResult1);
				response.send({message:"401k Company MonthlyRecords!", status:1, data:fetchResult1});
			}
		})
	}catch(error){
		console.log(error)
	}			
}

exports.getEmployeeCompany401KContriList = async function(request, response){
	console.log(request.body)
	getEmployeeCompany401KContriListQuery = "select m_company_name, sum(m_contribution_to_401k) as contri, sum(m_salary_monthly) as monthlyPayments from manage401K.monthly_wages where e_email = '"+request.body.companyName+"'  group by m_company_name;";
	console.log(getEmployeeCompany401KContriListQuery);
	try{
		appConfig.con.query(getEmployeeCompany401KContriListQuery, function(error, fetchResult1){
			if(!error){
				console.log(fetchResult1);
				response.send({message:"401kContri Company MonthlyRecords!", status:1, data:fetchResult1});
			}
		})
	}catch(error){
		console.log(error)
	}			
}