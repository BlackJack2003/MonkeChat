import {
  generateKeyPair,
  publicEncrypt,
  privateDecrypt,
  createHash,
} from "crypto";

export function hashString(str: string) {
  // Create a hash object
  const hash = createHash("sha256");

  // Update the hash object with the string
  hash.update(str);

  // Generate the hash digest in hexadecimal format
  return hash.digest("hex");
}

export function MyGenerateKeyPair(): Promise<{
  publicKey: string;
  privateKey: string;
}> {
  return new Promise((resolve, reject) => {
    generateKeyPair(
      "rsa",
      {
        modulusLength: 4096, // The size of the key in bits
        publicKeyEncoding: {
          type: "pkcs1", // Public Key Cryptography Standards 1
          format: "pem", // Privacy-Enhanced Mail format
        },
        privateKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
      },
      (err: any, publicKey: string, privateKey: string) => {
        if (err) {
          reject(err);
        } else {
          //   function remweirdStartAndEndBits(x: string): string {
          //     var l = x.split("\n");
          //     l.pop();
          //     l = l.slice(1, l.length - 1);
          //     return l.join("");
          //   }
          //   publicKey = remweirdStartAndEndBits(publicKey);
          //   privateKey = remweirdStartAndEndBits(privateKey);
          resolve({ publicKey, privateKey });
        }
      }
    );
  });
}

export function encryptWithPublicKey(publicKey: string, data: string): string {
  const buffer = Buffer.from(data, "utf8");
  const encrypted = publicEncrypt(publicKey, buffer);
  return encrypted.toString("base64");
}

// Decrypt Data with Private Key
export function decryptWithPrivateKey(
  privateKey: string,
  encryptedData: string
): string {
  const buffer = Buffer.from(encryptedData, "base64");
  const decrypted = privateDecrypt(privateKey, buffer);
  return decrypted.toString("utf8");
}

async function deriveKey(
  password: string,
  salt: Uint8Array
): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}

export async function generateSymmetricKey(): Promise<string> {
  const key = await crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true, // Extractable key for exporting to a string
    ["encrypt", "decrypt"]
  );

  // Export the key to a raw format
  const exportedKey = await crypto.subtle.exportKey("raw", key);

  // Convert the raw key to a Base64 string
  return Buffer.from(exportedKey).toString("base64");
}

async function importSymmetricKey(base64Key: string): Promise<CryptoKey> {
  const rawKey = Buffer.from(base64Key, "base64");
  return await crypto.subtle.importKey(
    "raw",
    rawKey,
    { name: "AES-GCM" },
    true,
    ["encrypt", "decrypt"]
  );
}

export async function encryptData(
  keyStr: string,
  data: string
): Promise<string> {
  const key = await importSymmetricKey(keyStr);
  const iv = crypto.getRandomValues(new Uint8Array(12)); // Generate a random 12-byte IV
  const encodedData = new TextEncoder().encode(data);

  const ciphertext = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encodedData
  );

  // Convert IV and ciphertext to Base64 strings and concatenate them
  const ivBase64 = Buffer.from(iv).toString("base64");
  const ciphertextBase64 = Buffer.from(new Uint8Array(ciphertext)).toString(
    "base64"
  );
  return `${ivBase64}:${ciphertextBase64}`; // Concatenate IV and ciphertext
}

export async function decryptData(
  keyStr: string,
  encryptedData: string
): Promise<string> {
  const [ivBase64, ciphertextBase64] = encryptedData.split(":");
  const key = await importSymmetricKey(keyStr);
  const iv = Buffer.from(ivBase64, "base64");
  const ciphertext = Buffer.from(ciphertextBase64, "base64");

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    ciphertext
  );

  return new TextDecoder().decode(decrypted);
}
