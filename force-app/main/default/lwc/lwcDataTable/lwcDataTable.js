import { LightningElement, wire, api, track } from 'lwc';
import initRecords from '@salesforce/apex/LWCDataTableController.initRecords';

export default class LwcDataTable extends LightningElement {
  @api objectApiName = 'Contact';
  @track data;
  @track columns;

  @wire(initRecords, { ObjectName: '$objectApiName', fieldNamesStr: 'Name,Title,Email,Phone', Orderby: 'Id', OrderDir: 'ASC' })
    wiredContacts({data}) {
        if (data) {
            console.info('my data is -->',data.sobList);
            this.data = data.sobList;
            this.columns = data.ldwList;
        }
    }

    getSelectedName(event) {
        const selectedRows = event.detail.selectedRows;
        if(selectedRows.length > 0) {
           const selectedEvent = new CustomEvent('selected', { detail: selectedRows[0].Id });
           // Dispatches the event.
           this.dispatchEvent(selectedEvent);
        }       
    }
}