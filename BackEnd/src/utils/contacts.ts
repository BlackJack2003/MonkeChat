import mongoose from "mongoose";
import User from "../schemas/User";
import Chat from "../schemas/Chat";

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
  try {
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
    let i = binarySearch(userA.contacts, userB._id);
    var existingContact = i != -1 ? userA.contacts[i] : null;
    if (existingContact) {
      console.log(`User: ${b} already exists in contacts of ${a}`);
      return true;
    }

    // Create a new chat
    const chat = new Chat();
    chat.people.push(userA._id);
    chat.people.push(userB._id);
    await chat.save();

    // Create a new contact object for 'a's contacts
    const newContactA = {
      cid: userB._id,
      chat: chat._id,
    };

    // Insert the new contact into 'a's contacts array maintaining lexicographic order
    let inserted = false;
    for (let i = 0; i < userA.contacts.length; i++) {
      if (String(userA.contacts[i].cid) > String(userB._id)) {
        userA.contacts.splice(i, 0, newContactA);
        inserted = true;
        break;
      }
    }
    if (!inserted) {
      userA.contacts.push(newContactA);
    }
    const newContactB = {
      cid: userA._id,
      chat: chat._id,
    };
    // Insert the new contact into 'b's contacts array maintaining lexicographic order
    inserted = false;
    for (let i = 0; i < userB.contacts.length; i++) {
      if (String(userB.contacts[i].cid) > String(userA._id)) {
        userB.contacts.splice(i, 0, newContactB);
        inserted = true;
        break;
      }
    }
    if (!inserted) {
      userB.contacts.push(newContactB);
    }

    // Save the updated 'a' user document
    await userA.save();
    await userB.save();
    return true;
  } catch (e: any) {
    console.error(e.message);
    return false;
  }
}
