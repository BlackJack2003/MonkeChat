import mongoose from "mongoose";
import User from "../schemas/User";
import Chat from "../schemas/Chat";
import {
  MyGenerateKeyPair,
  encryptWithPublicKey,
  generateRandomKey,
} from "./login";
import { binarySearchContacts, insertContact, insertMember } from "./general";

//Add b to a's contact list and add matching chat
export async function addContact(a: string, b: string): Promise<boolean> {
  var chatA = null;
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
    // let i = userA.contacts.find((item: any) => item.cid == userB._id);
    let i = binarySearchContacts(userA.contacts, userB._id);
    var existingContact = i != -1 ? userA.contacts[i] : null;
    if (existingContact) {
      console.log(`User: ${b} already exists in contacts of ${a}`);
      return true;
    }

    // Create a new chat
    chatA = new Chat();
    chatA.people = insertMember(chatA.people, {
      pid: userA._id,
      encKey: encryptWithPublicKey(userA.public_key, randKey),
    });
    // chatA.people.push({
    //   pid: userA._id,
    //   encKey: encryptWithPublicKey(userA.public_key, randKey),
    // });
    chatA.people = insertMember(chatA.people, {
      pid: userB._id,
      encKey: encryptWithPublicKey(userB.public_key, randKey),
    });
    // chatA.people.push({
    //   pid: userB._id,
    //   encKey: encryptWithPublicKey(userB.public_key, randKey),
    // });
    await chatA.save();

    // Create a new contact object for 'a's contacts
    const newContactA = {
      cid: userB._id,
      chat: chatA._id,
    };
    // userA.contacts.push(newContactA);
    userA.contacts = insertContact(userA.contacts, newContactA);
    const newContactB = {
      cid: userA._id,
      chat: chatA._id,
    };
    // Insert the new contact into 'b's contacts array maintaining lexicographic order
    // userB.contacts.push(newContactB);
    // Save the updated 'a' user document
    userB.contacts = insertContact(userB.contacts, newContactB);
    await userA.save();
    await userB.save();
    return true;
  } catch (e: any) {
    console.error(e.message);
    if (chatA != null) chatA.delete();
    return false;
  }
}
