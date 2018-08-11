import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    FormControlName,
    AbstractControl,
    Validator,
    Validators
}
    from '@angular/forms';
import { LatitudeValidator, LongitudeValidator } from '../validations/coordinates.validator';
import { PostCodeValidator } from '../validations/post-code.validator';
import { LocationNameValidator } from '../validations/name.validators';
import { LocationModel } from '../../../../core/models/admin/location.model';
import { LocationService } from '../../../../core/services/admin/location.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-create-location',
    templateUrl: './create-location.component.html',
    styleUrls: [ './create-location.component.css' ]
})
export class CreateLocationComponent implements OnInit {
    public createForm :FormGroup;
    private name :AbstractControl;
    private type :AbstractControl;
    private postCode :AbstractControl;
    private latitude :AbstractControl;
    private longitude :AbstractControl;

    public title :string = 'Google Maps Api';
    public lat :number = 42.8707915;
    public lng :number =  25.3168769;
    public zoom :number = 5;

    public errors :Object = {};
    public errorsCount :Object = {};
    public hasErrors :boolean = false;

    constructor(
        private locationService :LocationService,
        private toastr :ToastrService
    ) {}

    create() {
        // console.log('creataasfasfasf');
    }

    onSubmit(event) {
        console.log(this.createForm);
        event.preventDefault();

        let location = new LocationModel(
            this.name.value, 
            this.type.value,
            this.postCode.value,
            this.latitude.value,
            this.longitude.value
        );

        this.locationService.createLocation(location).subscribe(
            (data) => {
                this.toastr.success(
                    'You have created a new location.',
                    'Successfully added');
                this.hasErrors = false;
                // console.log(data)
                // console.log(this.hasErrors);
            }, 
            (err) => {
                this.hasErrors = err.error.hasErrors;
                this.errors = err.error.errors;
                // console.log(err);

                for(let field in this.errors) {
                    let count = Object.values(this.errors[field]).length;
                    this.errorsCount[field] = count;
                }

                // console.log(this.errorsCount);
            }
        )
    }

    clicked(event) {
        //console.log(this.type);
        // console.log(event);
    }

    buildForm() {
        this.createForm = new FormGroup({
            name : new FormControl('', [
                LocationNameValidator.isValidNameLength,
                LocationNameValidator.isValidFormat
            ]),
            postCode : new FormControl('', [
                Validators.required,
                PostCodeValidator.isValidPostCode
            ]),
            type : new FormControl('', [
                Validators.required
            ]),
            latitude : new FormControl(42, [
                Validators.required, LatitudeValidator.isValidLatitude
            ]),
            longitude : new FormControl(23, [
                Validators.required, LongitudeValidator.isValidLongitude
            ])
        });

        this.name = this.createForm.get('name');
        this.type = this.createForm.get('type');
        this.postCode = this.createForm.get('postCode');
        this.latitude = this.createForm.get('latitude');
        this.longitude = this.createForm.get('longitude');
        // this.lat = this.latitude.value;

        // this.onChanges();
        console.log(this.createForm)
    }

    /* In case wehave a map
    onChanges() {
        this.latitude.valueChanges.subscribe(val => {
            this.lat = val;
        });

        this.longitude.valueChanges.subscribe(val => {
            this.lng = val;
        })
        
    }
    */

    ngOnInit() {
        this.buildForm();
    }
}