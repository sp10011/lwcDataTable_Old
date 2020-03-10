import { LightningElement, wire, api, track } from "lwc";
import getAccountData from "@salesforce/apex/Customer360_Alert.getAlertDetail";

export default class Customer360_Alert extends LightningElement {
  @track alertData;
  @api recordId;
  @wire(getAccountData, {recordId: "$recordId"})
  wiredRecord({ error, data }) {
    if (error) {
      let message = "Unknown error";
      if (Array.isArray(error.body)) {
        message = error.body.map(e => e.message).join(", ");
      } else if (typeof error.body.message === "string") {
        message = error.body.message;
      }
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Error loading contact",
          message,
          variant: "error"
        })
      );
    } else if (data) {
      this.alertData = data;
    }
  }
}
