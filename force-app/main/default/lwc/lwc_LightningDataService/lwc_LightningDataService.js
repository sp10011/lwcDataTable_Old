import { LightningElement,api,wire,track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';

export default class Lwc_lightningDataService extends LightningElement {
    @api recordId;
    @track record;

    @wire(getRecord, {recordId: '$recordId', fields:[ACCOUNT_NAME_FIELD]})
    myAccountRecord({data,error}){
        if (data) {
            debugger;
            this.record = data;
            //this.error = undefined;
        } else if (error) {
            debugger;
            //this.error = error;
            //this.record = undefined;
        }

    }

  
  
  
   
  
}