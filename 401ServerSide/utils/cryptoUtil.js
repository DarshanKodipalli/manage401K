const Cryptr = require('cryptr');

exports.encryptData = async function(key,dataToEncrypt){
	const cryptr = new Cryptr(key);
	const encryptedString = cryptr.encrypt(dataToEncrypt);
	return encryptedString;
}

exports.decryptData = async function(dataToDecrypt){
	let iv = Buffer.from(dataToDecrypt.iv, 'hex');
	let encryptedText = Buffer.from(dataToDecrypt.encryptedData, 'hex');
	let decipher = crypto.createDecipheriv(encryption_algorithm, Buffer.from(key), iv);
	let decrypted = decipher.update(encryptedText);
	decrypted = Buffer.concat([decrypted, decipher.final()]);
	return decrypted.toString();	
}