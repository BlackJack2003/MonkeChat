import mongoose from "mongoose";
import User from "../schemas/User";
import Chat from "../schemas/Chat";
import {
  MyGenerateKeyPair,
  encryptWithPublicKey,
  generateRandomKey,
} from "./login";

function binarySearch(arr: any[], target: any): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid].cid === target) {
      return mid; // Found the target
    } else if (arr[mid].cid < target) {
      left = mid + 1; // Search in the right half
    } else {
      right = mid - 1; // Search in the left half
    }
  }

  return -1; // Target not found
}

//Add b to a's contact list and add matching chat
export async function addContact(a: string, b: string): Promise<boolean> {
  var chatA = null;
  //   var chatB = null;
  try {
    const randKey = generateRandomKey();
    var userA = await User.findOne({ name: a });

    if (userA == null || userA == undefined) {
      console.log("User:" + a + " not found");
      return false;
    }

    const userB = await User.findOne({ name: b });

    if (userB == null || userB == undefined) {
      console.log("User:" + b + " not found");
      return false;
    }
    // Check if 'b' already exists in 'A's contacts
    let i = userA.contacts.find((item: any) => item.cid == userB._id);
    //  binarySearch(userA.contacts, userB._id);
    var existingContact = i != undefined ? userA.contacts[i] : null;
    if (existingContact) {
      console.log(`User: ${b} already exists in contacts of ${a}`);
      return true;
    }

    // Create a new chat
    chatA = new Chat();
    chatA.people.push({
      pid: userA._id,
      encKey: encryptWithPublicKey(userA.public_key, randKey),
    });
    chatA.people.push({
      pid: userB._id,
      encKey: encryptWithPublicKey(userB.public_key, randKey),
    });
    await chatA.save();

    // Create a new contact object for 'a's contacts
    const newContactA = {
      cid: userB._id,
      chat: chatA._id,
    };
    userA.contacts.push(newContactA);
    const newContactB = {
      cid: userA._id,
      chat: chatA._id,
    };
    // Insert the new contact into 'b's contacts array maintaining lexicographic order
    userB.contacts.push(newContactB);
    // Save the updated 'a' user document
    await userA.save();
    await userB.save();
    return true;
  } catch (e: any) {
    console.error(e.message);
    if (chatA != null) chatA.delete();
    return false;
  }
}
