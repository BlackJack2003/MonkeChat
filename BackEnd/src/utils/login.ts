const crypto = require('crypto');

export function hashString(str:String) {
	// Create a hash object
	const hash = crypto.createHash('sha256');

	// Update the hash object with the string
	hash.update(str);

	// Generate the hash digest in hexadecimal format
	return hash.digest('hex');
}
