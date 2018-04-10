import {NgModule}       from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {FormsModule}    from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {Router} from '@angular/router';

import {AppComponent}            from './app.component';
import {AppRoutingModule}        from './app-routing.module';

import {AnimalListComponent} from  './components/animal-list/animal-list.component';
import {AnimalDetailsComponent} from  './components/animal-details/animal-details.component';
import {AnimalsService} from  './services/animals.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
    ],
    declarations: [
        AppComponent,
        AnimalListComponent,
        AnimalDetailsComponent
    ],
    providers: [AnimalsService],
    bootstrap: [AppComponent]
})
export class AppModule {
    // Diagnostic only: inspect router configuration
    constructor(router: Router) {
        console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
    }
}
