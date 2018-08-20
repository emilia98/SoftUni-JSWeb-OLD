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
import { CategoryService } from '../../../../core/services/admin/category.service';
import { CategoryTitleValidator } from '../validations/title.validator';
import { CategorySlugValidator } from '../validations/slug.validator';
import { CategoryModel } from '../../../../core/models/admin/category.model';

@Component({
    selector: 'app-create-category',
    templateUrl: './create-category.component.html',
    styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
    public createForm;
    public hasParent: boolean = false;
    public selectedCategory :Object = null;
    private title :AbstractControl;
    private slug :AbstractControl;
    private icon :AbstractControl;

    public toggleMenuCategories :boolean = false;
    public categories :Array<Object> = null;
    
    constructor(
        private categoryService: CategoryService
    ) { }

    create(event) {
        
        /*
        this.categoryService.createCategory().subscribe(
            (data) => {
                console.log(data);
            },
            (err) => {
                console.log(err);
            }
        ) */
        // console.log('creataasfasfasf');
    }

    onSubmit(event) {
        event.preventDefault();
        let data = new CategoryModel(
            this.title.value,
            this.slug.value,
            this.selectedCategory,
            this.icon.value.length === 0 ? null : this.icon.value
        );

        console.log(data);
        console.log('submitted');
    }

    /*
    searchCategory(event) {
        let searchQuery = {
            name: event.target.value
        };

        return this.categoryService.getAllCategories(searchQuery).subscribe(
            (data :any) => {
                this.categories = data.categories;
                console.log(data)
            },
            (err) => {
                console.log(err)
            }
        );
    }
    */
    
    selectCategory(category) {
        this.selectCategory = category;
    }

    removeSelection() {
        this.selectedCategory = null;
    }

    getCategory() {
        this.toggleMenuCategories = !this.toggleMenuCategories;

        if(this.toggleMenuCategories) {
            this.categoryService.getAllCategories().subscribe(
                (data :any) => {
                    this.categories = data.categories;
                    console.log(data)
                }, 
                (err) => {
                    console.log(err)
                }
            );
        }
    }

    clicked() {
        this.hasParent = !this.hasParent;
    }

    buildForm() {
        this.createForm = new FormGroup({
            title: new FormControl('', [
                Validators.required,
                CategoryTitleValidator.isValidTitleLength,
                CategoryTitleValidator.isValidFormat
            ]),
            categorySlug: new FormControl('', [
                Validators.required,
                CategorySlugValidator.isValidSlugLength,
                CategorySlugValidator.isValidFormat
            ]),
            icon: new FormControl('')
        });

        this.title = this.createForm.get('title');
        this.slug = this.createForm.get('categorySlug');
        this.icon = this.createForm.get('icon');
    }

    ngOnInit() {
        this.buildForm();
        
    }
}