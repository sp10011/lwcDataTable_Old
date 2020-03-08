import { LightningElement, wire, track, api } from 'lwc';
import getContactList from '@salesforce/apex/AllContacts.getContacts';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import ID_FIELD from '@salesforce/schema/Contact.Id';


const COLS = [
    { label: 'First Name', fieldName: 'FirstName', editable: true },
    { label: 'Last Name', fieldName: 'LastName', editable: true },
    { label: 'Title', fieldName: 'Title', editable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' }
];
export default class lwc_DataTable extends LightningElement {

    @track error;
    @track columns = COLS;
    @track draftValues = [];
    @api recordId;
    @track data;
    
    @wire(getContactList,{accountId:'$recordId'})
    contact({error,data}){
        if(data){
            this.data = data;
            console.info('my contact data is ->',JSON.stringify(data));
        }
        else if(error){
            console.info('error -->',error);
        }
    }
    

    handleSave(event) {
        const fields = {};
        var draftValuesStr = JSON.stringify(event.detail.draftValues);
        fields[ID_FIELD.fieldApiName] = event.detail.draftValues[0].Id;
        fields[FIRSTNAME_FIELD.fieldApiName] = event.detail.draftValues[0].FirstName;
        fields[LASTNAME_FIELD.fieldApiName] = event.detail.draftValues[0].LastName;

        const recordInput = {fields};
        //updateRecords({ sobList: this.data, updateObjStr: draftValuesStr, objectName: this.objectApiName })
        updateRecord({ sobList: this.data, updateObjStr: draftValuesStr, objectName: 'Contact' })
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contact updated',
                    variant: 'success'
                })
            );
            // Clear all draft values
            this.draftValues = [];

            // Display fresh data in the datatable
            return refreshApex(this.data);
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }
}