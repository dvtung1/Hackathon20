import { NgModule } from '@angular/core';

import {RouterModule, Routes} from "@angular/router"
import { HomeComponent } from './components/home/home.component';
import { RecommendjobComponent } from './components/recommendjob/recommendjob.component';
import { ResultComponent } from './components/result/result.component';
import { UserinputComponent } from './components/userinput/userinput.component';
import { GuardService } from './services/guard.service';

const routes: Routes = [
    {
        path: "", component: UserinputComponent
    },
    {
        path: "predict", component: UserinputComponent,
    }, 
    {
        path: "result", component: ResultComponent, canActivate: [GuardService]
    },
    {
        path: "job", component: RecommendjobComponent, canActivate: [GuardService]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}