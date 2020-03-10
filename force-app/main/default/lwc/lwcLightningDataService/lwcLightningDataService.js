import { LightningElement, api, track } from 'lwc';

export default class LwcLightningDataService extends LightningElement {

  @track recordId;
  @track showLDS = false;
  @api objectApiName = 'Contact';

  contactSelected(event) {
    const contactId = event.detail;
    this.recordId = contactId;
    this.showLDS = true;
  }

  handleSuccess(event) {
   // event.detail.id;
   alert('Record updated successfully.');
}
}