import { LightningElement, track } from 'lwc';
import findAccounts from '@salesforce/apex/AccountController.findAccounts';

/** The delay used when debouncing event handlers before invoking Apex. */


export default class searchAccountRecord extends LightningElement {
@track accounts;
@track error;
handleKeyChange(event) {
    const searchKey = event.target.value;
    findAccounts({ searchKey })
            .then(result => {
                this.accounts = result;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.accounts = undefined;
            });
    
}
}