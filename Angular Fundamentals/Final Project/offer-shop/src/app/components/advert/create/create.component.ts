import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    FormControlName,
    AbstractControl
} from '@angular/forms';
import { AdvertService } from '../../../core/services/advert/advert.service';

@Component({
    selector: 'app-advert-create',
    templateUrl: './create.component.html',
})
export class CreateAdvertComponent implements OnInit {
    public createAdvertForm :FormGroup;
    public title :AbstractControl;
    public price :AbstractControl;
    public description :AbstractControl;

    public selectedLocation :String = null;
    public locations :Array<Object> = null;

    public toggleLocationMenu :boolean = false;

    public uploadForm: FormGroup;
    private allowedTypes = [
        'image/bmp', 'image/gif',
        'image/jpeg', 'image/png',
    ];
    public readonly = [
        null, null, null, null, null, null,
    ];
    public files: Array<File> = [];
    public images = [];
    public uploadsCount: any = 0;
    public error: string = null;
    public currentlyClicked = null;

    constructor(
        public advertService: AdvertService
    ) { }

    openDialog(ev, i) {
        this.currentlyClicked = i;
        document.getElementById('img1').click();
    }

    removeImg(index) {
        if (index >= 0 && index < 6) {
            this.files[index] = null;
            this.images[index] = null;
            this.uploadsCount--;
        }
    }

    onSubmit() {
        const formData: any = new FormData();
        this.files = this.files.filter(f => {
            if (f) {
                return f
            }
        });

        for (let i = 0; i < Math.min(this.files.length, 6); i++) {
            formData.append('images', this.files[i], this.files[i].name);
        }

        let data = {
            title: this.title.value,
            price: this.price.value
        }
        formData.append('data', JSON.stringify(data));

        this.advertService.createAdvert(formData).subscribe(
            (data :any) => {
                console.log(data)
            },
            (err) => {
                console.log(err);
            }
        );
    }

    public async onFileSelected(e) {
        if (e.target.files && e.target.files.length > 0) {
            let file = e.target.files[0];
            let result;
            try {
                result = await this.parseFile(file);
                this.error = null;
                if (this.uploadsCount <= 6) {
                    if (this.currentlyClicked >= 0 && this.currentlyClicked < 6) {
                        this.images[this.currentlyClicked] = result;
                        this.files[this.currentlyClicked] = file;
                        this.uploadsCount++;
                    }
                }
            } catch (err) {
                this.error = 'Allowed extensions - jpeg, jpg, bmp, png, gif';
            }
        }
    }

    parseFile(file) {
        let reader = new FileReader();
        let allowedTypes = this.allowedTypes;

        return new Promise((resolve, reject) => {
            file.onerror = () => {
                file.abort();
                reject(new DOMException('Problem parsing input file.'))
            }

            reader.onload = function (e) {
                if (allowedTypes.includes(file.type)) {
                    console.log('hreaklsfasf');
                } else {
                    reject(new DOMException('Problem parsing input file.'))
                }
                resolve(reader.result);
            }

            reader.readAsDataURL(file);
        });
    }

    selectLocation(location) {
        this.selectedLocation = location;
    }

    diselectLocation() {
        this.selectedLocation = null;
    }
    
    getLocation() {
        this.toggleLocationMenu = !this.toggleLocationMenu;

        if(this.toggleLocationMenu) {
            return this.advertService.getAllLocations({}).subscribe(
                (data :any) => {
                    this.locations = data.locations;
                    console.log(data)
                },
                (err) => {
                    console.log(err)
                }
            )
        }
    }

    searchLocation(event) {
        let searchQuery = {
            name: event.target.value
        };

        return this.advertService.getAllLocations(searchQuery).subscribe(
            (data :any) => {
                this.locations = data.locations;
                console.log(data)
            },
            (err) => {
                console.log(err)
            }
        );
    };
    
    buildForm() {
        this.createAdvertForm = new FormGroup({
            title: new FormControl('', []),
            price: new FormControl(0, []),
            description: new FormControl('', []),
            location: new FormControl('', [])
        });

        this.title = this.createAdvertForm.get('title');
        this.price = this.createAdvertForm.get('price');
    }

    ngOnInit() {
        this.buildForm();
    }
}