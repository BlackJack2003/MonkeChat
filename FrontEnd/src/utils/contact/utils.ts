import '@/app/(chat)/contacts/interfaces'
import { ContactInterface } from '@/app/(chat)/contacts/interfaces';
import { Session } from 'next-auth';

export const getPanel:(userName:string)=>ContactInterface=function(userName="1")
{
	try {
		return {
		  userName: userName,
		};
	  } catch (e) {
		return {};
	  }
};

export const getContacts: (session: Session) => ContactInterface[] =
  function (session: Session) {
    if (session?.user == undefined) return [];
    else return [
      {
        userName:"kim-il-sung",
	},
    {
          userName:"kim-jong-un",
    }
  ];
  };