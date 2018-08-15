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
import { ActivatedRoute, Router } from '@angular/router';
import { ILocation } from '../../../../core/interfaces/location.interface';

@Component({
    selector: 'app-edit-location',
    templateUrl: './edit-location.component.html',
    styleUrls: ['./edit-location.component.css']
})
export class EditLocationComponent implements OnInit {
    public hasResult: boolean = false;
    public location: ILocation = null;

    public editForm: FormGroup;
    private name: AbstractControl;
    private type: AbstractControl;
    private postCode: AbstractControl;
    private latitude: AbstractControl;
    private longitude: AbstractControl;

    public errors: Object = {};
    public errorsCount: Object = {};
    public hasErrors: boolean = false;

    constructor(
        private locationService: LocationService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    /*

    public title :string = 'Google Maps Api';
    public lat :number = 42.8707915;
    public lng :number =  25.3168769;
    public zoom :number = 5;

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

    onSubmit(event) {
        event.preventDefault();

        let location = new LocationModel(
            this.name.value,
            this.type.value,
            this.postCode.value,
            this.latitude.value,
            this.longitude.value
        );

        let locationId = this.location._id;
        this.locationService.editLocation(locationId, location).subscribe(
            (data) => {
                this.toastr.success(
                    'You have edited this location successfully!',
                    'Successfully edited');
                this.hasErrors = false;
                this.router.navigate(['/admin/locations']);
            },
            (err) => {
                this.hasErrors = err.error.hasErrors;
                this.errors = err.error.errors;
               
                for (let field in this.errors) {
                    let count = Object.values(this.errors[field]).length;
                    this.errorsCount[field] = count;
                }
            }
        )
        
    }

    buildForm() {
        this.editForm = new FormGroup({
            name: new FormControl(this.location.name, [
                LocationNameValidator.isValidNameLength,
                LocationNameValidator.isValidFormat
            ]),
            postCode: new FormControl(this.location.postCode, [
                Validators.required,
                PostCodeValidator.isValidPostCode
            ]),
            type: new FormControl(this.location.locationType, [
                Validators.required
            ]),
            latitude: new FormControl(this.location.latitude, [
                Validators.required, LatitudeValidator.isValidLatitude
            ]),
            longitude: new FormControl(this.location.longitude, [
                Validators.required, LongitudeValidator.isValidLongitude
            ])
        });

        this.name = this.editForm.get('name');
        this.type = this.editForm.get('type');
        this.postCode = this.editForm.get('postCode');
        this.latitude = this.editForm.get('latitude');
        this.longitude = this.editForm.get('longitude');
       
        console.log(this.type);
    }

    ngOnInit() {
        let params = this.route.snapshot.params;
        let id = params.id;
        let name = params.name;

        this.locationService.getSingleLocation(id).subscribe(
            (data: any) => {
                this.hasResult = true;
                

                this.location = data.location;
                console.log(this.location);
                this.buildForm();
            },
            (err) => {
                this.hasResult = true;

                if (err.status === 0) {
                    this.toastr.error('Cannot connect to the server!', 'Connection Error');
                    this.router.navigate(['/connection-error']);
                }
                console.log(err)
            }
        );
    }
}