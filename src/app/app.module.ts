import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AuthComponent } from './component/auth/auth.component';
import { QuizComponent } from './component/core/quiz/quiz.component';
import { HeaderComponent } from './component/core/header/header.component';
import {AppRouting} from './app.routing';
import {FormsModule} from '@angular/forms';
import {AuthService} from './service/auth/auth.service';
import {AuthGuardService} from './service/auth/auth-guard/auth-guard.service';
import {QuizService} from './service/quiz.service';
import {HttpModule} from '@angular/http';
import { ClickHandlerDirective } from './directive/click/click-handler.directive';
import {SpecialClickService} from './service/special-click.service';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    QuizComponent,
    HeaderComponent,
    ClickHandlerDirective
  ],
  imports: [
    AppRouting,
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [AuthService, AuthGuardService, QuizService, SpecialClickService],
  bootstrap: [AppComponent]
})
export class AppModule { }
