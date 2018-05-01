import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Router } from '@angular/router';

import { AppComponent }            from './app.component';
import { AppRoutingModule }        from './app-routing.module';

import { AnimalsService } from  './services/animals.service';
import { FeaturesService } from  './services/features.service';

import { AnimalListComponent } from  './components/animal-list/animal-list.component';
import { AnimalDetailsComponent } from  './components/animal-details/animal-details.component';
import { AnimalCreateComponent } from  './components/animal-create/animal-create.component';
import { AnimalEditComponent } from  './components/animal-edit/animal-edit.component';

import { FeatureDetailsComponent } from './components/feature-details/feature-details.component';
import { FeatureListComponent } from './components/feature-list/feature-list.component';

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
        AnimalDetailsComponent,
        AnimalCreateComponent,
        AnimalEditComponent,

        FeatureListComponent,
        FeatureDetailsComponent
    ],

    providers: [
        AnimalsService,
        FeaturesService
    ],

    bootstrap: [AppComponent]
})

export class AppModule {
    constructor(router: Router) {
        console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
    }
}
