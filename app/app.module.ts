import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { StartscreenComponent } from './startscreen/startscreen.component';

import { PlayerService } from './player.service';
import { PointsService } from './points.service';
import { AuthGuard } from './auth.guard';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { LoginComponent } from './login/login.component';
import { PlayComponent } from './play/play.component';

@NgModule({
  declarations: [
    AppComponent,
    StartscreenComponent,
    ScoreboardComponent,
    LoginComponent,
    PlayComponent,
      AuthGuard
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
      RouterModule.forRoot([
          {
              path: 'play',
              component: PlayComponent,
              canActivate: [AuthGuard]
          },
          {
              path: 'scoreboard',
              component: ScoreboardComponent
          },
          {
              path: '',
              component: StartscreenComponent
          }

      ])
  ],
  providers: [PlayerService,PointsService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
