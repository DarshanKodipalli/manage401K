'use strict'

/**
 * Function Make Payment
 * @param {com.network.manifest.assets.makeMonthlyPayment} paymentData
 * @transaction
 */

 async function makeMonthlyPayment(paymentData){
     var factory = getFactory();
     var NS = "com.network.manifest.assets";
     var assetRegistry = await getAssetRegistry("com.network.manifest.assets.monthlywages");
     var paymentObj;
     var paymentId =new Date().toISOString()+"MKANKLE";
	 paymentObj = factory.newResource(NS, 'monthlywages', paymentId);
     paymentObj.salaryDeposited = paymentData.salaryDeposited;
     paymentObj.contibution401K = paymentData.contibution401K;
     paymentObj.contibutionMargin = paymentData.contibutionMargin;
     await assetRegistry.add(paymentObj);
 }