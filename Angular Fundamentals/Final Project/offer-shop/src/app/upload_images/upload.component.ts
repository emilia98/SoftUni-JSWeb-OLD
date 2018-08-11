import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-file-uploader',
    templateUrl: 'upload.component.html'
})
export class UploadComponent implements OnInit {
    public files :Array<File> = [];
    public images = [];
    public readonly = [ 
        null, null, null, null, null, null, 
        null, null, null, null, null, null
    ]
    constructor() {}

    clicked(file) {
        let formData = new FormData();
        var request = new XMLHttpRequest();
 
        formData.set('file', file);
        request.open("POST", 'https://jsonplaceholder.typicode.com/photos');
        request.send(formData);
    }

    async onFilesSelected(e) {
        console.log(e.target.f);
        if(e.target.files && e.target.files.length > 0) {
           // this.files = e.target.files;
            // this.images = [];
            
            for(let file of e.target.files) {
                this.files.push(file);
                console.log(this.files);
                // console.log('fisrt');
                // console.log(typeof file);
                let result = await this.parseFile(file);
                // console.log(typeof result);
                if(this.images.length < 12) {
                    // console.log(this.images);
                    this.images.push(result);
                }
                
                // console.log(e.target);
                // e.target.files
                // e.target.files.push(file);
                /*
                let reader = new FileReader();
                reader.onload = async (e) => {
                    // console.log(reader.result);
                    this.images.push(await reader.result);
                    console.log(this.images)
                    // console.log(reader.result);
                }

                reader.readAsDataURL(file);*/
                // console.log('here');
                // console.log(file);
                //console.log(file);
            } //console.log('ewasa');
        // console.log(this.images.length);
            // console.log(this.images.length)
            // for(let )
            // this.images.fill()
            for(let index = this.images.length; index < 12; index++) {
                // this.images.push(null);
            }
            // this.images.fill(null, this.images.length, 11);
            // console.log(this.images)
            // console.log('second');

            
            // reader.readAsDataURL(this.files[0]);
        }


    
        //console.log(e.target.files)
        // console.log(e.target.value);
        // console.log(this.files);
    }

      parseFile(file) {
        let reader = new FileReader();

        return new Promise((resolve, reject) => {
            file.onerror = () => {
                file.abort();
                reject(new DOMException('Problem parsing input file.'))
            }

            reader.onload =  function(e) {
                resolve(reader.result);
            }

            reader.readAsDataURL(file);
        });
        
    
    }
 
    ngOnInit() {
        console.log(this.images[0]);
    }
}