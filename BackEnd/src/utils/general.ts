export interface userContact {
  cid: string;
  chat: string;
}

export function insertContact(
  array: userContact[],
  newObject: userContact
): userContact[] {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (array[mid].cid < newObject.cid) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  array.splice(left, 0, newObject);
  return array;
}

export function binarySearchContacts(
  array: userContact[],
  _id: string
): number {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    var midV = array[mid].cid.toString();
    if (midV === _id) {
      return mid;
    } else if (midV < _id) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

export interface chatMember {
  pid: string;
  encKey: string;
}

export function insertMember(
  array: chatMember[],
  newObject: chatMember
): chatMember[] {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (array[mid].pid < newObject.pid) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  array.splice(left, 0, newObject);
  return array;
}

export function binarySearchMember(array: chatMember[], _id: string): number {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    var midV = array[mid].pid.toString();
    if (midV === _id) {
      return mid;
    } else if (midV < _id) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}
