import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.clp.biznet{
   export class Member extends Participant {
      fistName: string;
      lastName: string;
      AccountNumber: string;
      email: string;
      phoneNumber: string;
      points: number;
   }
   export class Partner extends Participant {
      id: string;
      name: string;
   }
   export class EarnPoints extends Transaction {
      points: number;
      member: Member;
      partner: Partner;
   }
   export class UsePoints extends Transaction {
      points: number;
      member: Member;
      partner: Partner;
   }
// }
