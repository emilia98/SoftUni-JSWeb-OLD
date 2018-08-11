import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    FormControlName,
    AbstractControl,
    Validator
}
    from '@angular/forms';
import { CategoryService } from '../../../../core/services/admin/category.service';

@Component({
    selector: 'app-create-category',
    templateUrl: './create-category.component.html',
    styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
    public createForm;
    public hasParent: boolean = false;
    private title :AbstractControl;
    private slug :AbstractControl;
    private icon :AbstractControl;
    
    constructor(
        private categoryService: CategoryService
    ) { }



    create(event) {
        
        
        this.categoryService.createCategory().subscribe(
            (data) => {
                console.log(data);
            },
            (err) => {
                console.log(err);
            }
        )
        // console.log('creataasfasfasf');
    }

    onSubmit(event) {
        event.preventDefault();
        console.log('submitted');
    }

    clicked() {
        // console.log('clickedasfaf')
        this.hasParent = !this.hasParent;
    }

    buildForm() {
        this.createForm = new FormGroup({
            title: new FormControl(''),
            categorySlug: new FormControl(''),
            // parentCategory: new FormControl(null),
            icon: new FormControl(null)
        });

        this.title = this.createForm.get('title');
        this.slug = this.createForm.get('categorySlug');
        this.icon = this.createForm.get('icon');
        
    }

    ngOnInit() {
        this.buildForm();
        console.log(this.createForm);
    }
}