import { Component, OnInit } from '@angular/core';
import {
  FormGroup, 
  FormControl, 
  FormControlName, 
  AbstractControl, 
  Validators
} from '@angular/forms';
import { MakeValidator } from './validators/make.validator';
import { ModelValidator } from './validators/model.validator';
import { YearValidator } from './validators/year.validator';
import { DescriptionValidator } from './validators/description.validator';
import { PriceValidator } from './validators/price.validator';
import { FurnitureService } from '../furnitures.service';
import { CreateModel } from './create.model';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-furniture',
  templateUrl: './create-furniture.component.html',
  styleUrls: ['./create-furniture.component.css']
})
export class CreateFurnitureComponent implements OnInit {
  public createForm : FormGroup;
  public make : AbstractControl;
  public model : AbstractControl;
  public year : AbstractControl;
  public description : AbstractControl;
  public price : AbstractControl;
  public imageUrl : AbstractControl;
  public material : AbstractControl;

  constructor(
    private furnitureService :FurnitureService,
    private toastr :ToastrService,
    private router :Router
  ) { }


  buildForm() {
    this.createForm = new FormGroup({
      make : new FormControl('', [
        MakeValidator.shouldHaveGivenLength
      ]),
      model : new FormControl('', [
        ModelValidator.shouldHaveGivenLength
      ]),
      year : new FormControl('', [
        YearValidator.isValidYear
      ]),
      description : new FormControl('', [
        DescriptionValidator.shouldHaveGivenLength
      ]),
      price : new FormControl('', [
        PriceValidator.isValidPrice
      ]),
      imageUrl : new FormControl(''),
      material : new FormControl(null)
    });

    this.make = this.createForm.get('make');
    this.model = this.createForm.get('model');
    this.year = this.createForm.get('year');
    this.description = this.createForm.get('description');
    this.price = this.createForm.get('price');
    this.imageUrl = this.createForm.get('imageUrl');
    this.material = this.createForm.get('material');
  }

  validate(e) {
    console.log(e);
  }

  create() {
    let readyForm = new CreateModel(
      this.make.value, this.model.value,
      this.year.value, this.description.value,
      this.price.value, this.imageUrl.value,
      this.material.value === '' ? null : this.material.value
    );

    this.furnitureService.createFurniture(readyForm).subscribe(
      (data) => {
        this.toastr.success(data.message);
        this.router.navigate(['/furniture/all']);
      },
      (err) => {
        console.log(err)
      }
    )
  }

  ngOnInit() {
    this.buildForm();
  }




}
