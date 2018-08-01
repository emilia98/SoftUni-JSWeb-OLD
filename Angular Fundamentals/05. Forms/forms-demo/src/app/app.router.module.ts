import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsComponent } from './reactive-forms/reactive-forms.component';
import { CustomValidationsComponent } from './custom-validations/custom-validations.component';
import { TemplateDrivenFormComponent } from './template-driven-form/template-driven-form.component';
import { NgModule } from '@angular/core';

const routes :Routes = [
    { path: 'reactive-form', component: ReactiveFormsComponent}, 
    { path: 'custom-validations', component: CustomValidationsComponent},
    { path: 'template-driven-forms', component: TemplateDrivenFormComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutesModule {}