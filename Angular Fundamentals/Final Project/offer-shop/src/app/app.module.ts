import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { AppRouterModule } from './app.routing';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AdminModule } from './components/admin/admin.module';
import { InternalServerErrorComponent } from './components/errors/error-500/500.component';
import { ConnectionErrorComponent } from './components/errors/error-0/connection-error.component';
import { AccountModule } from './components/authentication/account.module';
import { RegisterComponent } from './components/authentication/register/register.component';
import { AdvertModule } from './components/advert/advert.module';

@NgModule({
  declarations: [
    AppComponent,
    InternalServerErrorComponent,
    ConnectionErrorComponent,
    // RegisterComponent
    //DetailsComponent,
    //UploadComponent,
    //ContactsComponent,
    //AdminComponent,

    //InputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDR8Z2N52y_yH4WC5O-gw74wfthApE5xRE'
    }),
    RouterModule,
    AppRouterModule,
    AdminModule,
    AccountModule,
    AdvertModule,
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
