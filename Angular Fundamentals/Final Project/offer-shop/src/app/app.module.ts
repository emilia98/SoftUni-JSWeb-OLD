import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';
import { UploadComponent } from './upload_images/upload.component';
import { ContactsComponent } from './details/contacts/contacts.component';

import { InputComponent } from './input/input.component';
import { AdminModule } from './components/admin/admin.module';
import { HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
// import { AdminModule } from './admin/admin.module';
// import { AdminComponent } from './admin/admin.component';
@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    UploadComponent,
    ContactsComponent,
    //AdminComponent,


    InputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDR8Z2N52y_yH4WC5O-gw74wfthApE5xRE'
    }),
    AdminModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
