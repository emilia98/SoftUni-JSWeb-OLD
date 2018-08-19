import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertRoutingModule } from './advert.routing';
import { CreateAdvertComponent } from './create/create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdvertService } from '../../core/services/advert/advert.service';

@NgModule({
    declarations: [
        CreateAdvertComponent
    ],
    imports: [
        CommonModule,
        AdvertRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [],
    providers: [
        AdvertService
    ]
})
export class AdvertModule {};
