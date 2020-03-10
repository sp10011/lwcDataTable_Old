import { LightningElement,wire, track } from 'lwc';
import {getListUi} from 'lightning/uiListApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import setExperienceId from '@salesforce/apex/LightningLoginFormController.setExperienceId';
export default class MyLWC01 extends LightningElement {
    
    @track myAccounts;

    @wire(getListUi, {objectApiName: ACCOUNT_OBJECT, listViewApiName: 'AllAccounts'})
    accountResult({data,error}){
        if(data){
            debugger;
            console.log('hello its data');
            //this.myAccounts = data;
        }
        else if(error){
            console.log('hello its error');
            debugger;
        }
    }
    

}