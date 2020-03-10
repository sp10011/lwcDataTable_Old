import { LightningElement,api,track,wire } from 'lwc';
import { getChildRecords } from 'lightning/uiRecordApi';
import CONTACT_NAME_FIELD from '@salesforce/schema/Account.Name';

export default class Lwc_showChildRecords extends LightningElement {

    @track contactRecord;
    @api recordId;

    @wire(getChildRecords, {recordId:'$recordId',fields:[CONTACT_NAME_FIELD]})
    allContactRecord({data,error}){
        if(data){
            debugger;
            this.contactRecord = data;
        }
        else{
            alert('Error',error);
        }
    };
   
}