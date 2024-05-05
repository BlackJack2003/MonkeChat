"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashString = void 0;
const crypto = require('crypto');
function hashString(str) {
    // Create a hash object
    const hash = crypto.createHash('sha256');
    // Update the hash object with the string
    hash.update(str);
    // Generate the hash digest in hexadecimal format
    return hash.digest('hex');
}
exports.hashString = hashString;
