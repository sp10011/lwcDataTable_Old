import {
    LightningElement,
    track,
    api,
    wire
} from 'lwc';
import Account_Object from '@salesforce/schema/Account';
import {
    getRecord
} from 'lightning/uiRecordApi';


export default class myLWC extends LightningElement {

    @api recordId;
    @track myText;
    @track myRecord;
    @track myError;

    connectedCallback() {
        this.myText = 'Sumit Pandey';
        console.log('I am called first');
    }

    @wire(getRecord, {
        recordId: '$recordId',
        fields: ['Account.Id',
            'Account.Name',
            'Account.Email__c',
            'Account.Industry'
        ]
    })
    allrecord({
        data,
        error
    }) {
        if (data) {
            debugger;
            console.log('In data');
            this.myRecord = data;
        } else if (error) {
            debugger;
            console.log('my error ');
            this.myError = error;
        }

    }
}