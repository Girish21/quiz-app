import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './component/auth/auth.component';
import {QuizComponent} from './component/core/quiz/quiz.component';
import {AuthGuardService} from './service/auth/auth-guard/auth-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'quiz',
    canActivate: [AuthGuardService],
    component: QuizComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRouting {
}
