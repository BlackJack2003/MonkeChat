import * as CryptoJS from "crypto-js";
import * as forge from "node-forge";

// Hash a string using SHA-256
export function hashString(str: string): string {
  return CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex);
}

// Generate an RSA key pair
export function MyGenerateKeyPair(): Promise<{
  publicKey: string;
  privateKey: string;
}> {
  return new Promise((resolve, reject) => {
    forge.pki.rsa.generateKeyPair(
      { bits: 2048, workers: -1 },
      (err, keypair) => {
        if (err) {
          reject(err);
        } else {
          const publicKey = forge.pki.publicKeyToPem(keypair.publicKey);
          const privateKey = forge.pki.privateKeyToPem(keypair.privateKey);
          resolve({ publicKey, privateKey });
        }
      }
    );
  });
}

// Encrypt data with a public key using RSA
export function encryptWithPublicKey(publicKey: string, data: string): string {
  const publicKeyObj = forge.pki.publicKeyFromPem(publicKey);
  const encrypted = publicKeyObj.encrypt(data, "RSA-OAEP");
  return forge.util.encode64(encrypted);
}

// Decrypt data with a private key using RSA
export function decryptWithPrivateKey(
  privateKey: string,
  encryptedData: string
): string {
  const privateKeyObj = forge.pki.privateKeyFromPem(privateKey);
  const encrypted = forge.util.decode64(encryptedData);
  const decrypted = privateKeyObj.decrypt(encrypted, "RSA-OAEP");
  return decrypted;
}

function generateKeyAndIV(password: string) {
  const salt = CryptoJS.lib.WordArray.random(128 / 8); // Generate a random salt
  const key = CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32, // For AES-256
    iterations: 1000,
  });
  const iv = CryptoJS.lib.WordArray.random(128 / 8); // Generate a random IV
  return { key, iv, salt };
}

// Function to encrypt data with a password
export function encryptData(password: string, plainText: string): string {
  const { key, iv, salt } = generateKeyAndIV(password);
  const encrypted = CryptoJS.AES.encrypt(plainText, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  // Return the concatenated salt, IV, and ciphertext
  var rv = salt.toString() + iv.toString() + encrypted.toString();
  return rv;
}

// Function to decrypt data with a password
export function decryptData(password: string, cipherText: string): string {
  // Extract the salt, IV, and encrypted data from the concatenated string
  const salt = CryptoJS.enc.Hex.parse(cipherText.substr(0, 32)); // 32 hex chars = 16 bytes
  const iv = CryptoJS.enc.Hex.parse(cipherText.substr(32, 32)); // 32 hex chars = 16 bytes
  const encryptedData = cipherText.substring(64); // Rest is the ciphertext
  const key = CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
    iterations: 1000,
  });
  const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypted);
}

export function generateRandomKey(x: number = 32): string {
  return CryptoJS.lib.WordArray.random(x).toString();
}
