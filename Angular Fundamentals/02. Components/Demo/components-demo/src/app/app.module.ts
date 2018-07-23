import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { InputComponent } from './input/input.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { LivechangeComponent } from './livechange/livechange.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    InputComponent,
    SubscribeComponent,
    LivechangeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
