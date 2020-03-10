import { LightningElement, track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getEncodedpdf from '@salesforce/apex/ResumeBuilder.fetchAttachment';
export default class LWC_ResumeBuilder extends NavigationMixin(LightningElement) {
    fullName;
    @track showPdf = false;
    @track hideResumeTemplate = true;
    emailAddress;
    @track phoneNumber = '+91';
    totalExp;
    releventExp;
    jobRole;
    certificationValue = '';
    @track pills = [];
    skills;
    @track placeholderText = 'Please enter your Certification';
    tempArr = [];
    @track pictureSrc = 'https://s3-us-west-1.amazonaws.com/sfdc-demo/image-placeholder.png';
    
    
    addInPills(event){
        if(event.keyCode === 13){
          this.tempArr = this.pills;
          this.tempArr.push({'label':event.target.value,
                        'id':event.target.value}); 
          this.pills = this.tempArr;              
        }
    }

    showInPdf(event){
        var resumeBodyObject = this.template.innerHTML;//this.template.querySelector('.resumeBody');
        var objJsonStr = JSON.stringify(resumeBodyObject);
        getEncodedpdf({resumeBody : resumeBodyObject})
            .then(result => {
                debugger;
                console.log('==apex data=='+result);
                this.template.querySelector("iframe").contentWindow.postMessage(btoa('testsumit'), "*");
            })
            .catch(error => {
                this.error = error;
        });
        //let encoded = btoa(JSON.stringify(resumeBodyObject));
        this.showPdf = true;
        //this.hideResumeTemplate = false;
        //debugger;
            
        }
    

    onRemovePill(event){
        for(var key in this.pills){
            if(this.pills[key].id === event.target.name){
                this.pills.pop(this.pills[key]);
            }
        }
    }

    onDragOver(event){
        event.preventDefault();
    }

    onDrop(event){
        var temp = {};
        temp = this;
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
        var file = event.dataTransfer.files[0];
        if (file.length>1) {
            return alert("You can only upload one profile picture");
        }
        
        if (!file.type.match(/(image.*)/)) {
            return alert('Image file not supported');
        }
        var reader = new FileReader();
        var dataURL;
        reader.onloadend = function() {
            dataURL = reader.result;
            console.log(dataURL);
            temp.pictureSrc = dataURL;
            
        };
        
        reader.readAsDataURL(file);
    }

    handleChange(event){
        this[event.target.name] = event.target.value;
    }

    createSkillArray(event){
        //var tempString = cmp.get('v.skills');
        //var tempskillArray = tempString.split(';');
        //var skillArray1 = [];
        //var skillArray2 = [];
        /* Eliminate Last String value as it is blank */
        /*for(var i=0; i<tempskillArray.length-1; i++){
            if (i%2 == 0)
                skillArray1.push(tempskillArray[i]);
            else
                skillArray2.push(tempskillArray[i]);
        }
        cmp.set('v.skillset1',skillArray1);
        cmp.set('v.skillset2',skillArray2);*/
   }

    
}