const crypto = require("crypto");

export function hashString(str: String) {
  // Create a hash object
  const hash = crypto.createHash("sha256");

  // Update the hash object with the string
  hash.update(str);

  // Generate the hash digest in hexadecimal format
  return hash.digest("hex");
}

export function generateKeyPair(): Promise<{
  publicKey: string;
  privateKey: string;
}> {
  return new Promise((resolve, reject) => {
    crypto.generateKeyPair(
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
