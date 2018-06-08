import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PageHeaderComponent } from './components/page-header/page-header.component';

import { AnimalsService } from './services/animals.service';
import { FeaturesService } from './services/features.service';
import { PersistenceService } from './services/persistence.service';
import { AnalysisService } from './services/analysis.service';

import { AnimalListComponent } from './components/animal-list/animal-list.component';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';
import { AnimalCreateComponent } from './components/animal-create/animal-create.component';
import { AnimalEditComponent } from './components/animal-edit/animal-edit.component';

import { FeatureDetailsComponent } from './components/feature-details/feature-details.component';
import { FeatureListComponent } from './components/feature-list/feature-list.component';

import { AnalysisComponent } from './components/analysis/analysis.component';

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
        PageHeaderComponent,

        AnimalListComponent,
        AnimalDetailsComponent,
        AnimalCreateComponent,
        AnimalEditComponent,

        FeatureListComponent,
        FeatureDetailsComponent,

        AnalysisComponent
    ],

    providers: [
        AnimalsService,
        FeaturesService,
        PersistenceService,
        AnalysisService
    ],

    bootstrap: [AppComponent]
})

export class AppModule {
    constructor(router: Router) {
        console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
    }
}
