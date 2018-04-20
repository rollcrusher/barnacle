import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimalListComponent }      from './components/animal-list/animal-list.component';
import { AnimalDetailsComponent } from "./components/animal-details/animal-details.component";

import { FeatureListComponent }      from './components/feature-list/feature-list.component';
import { FeatureDetailsComponent } from "./components/feature-details/feature-details.component";


const routes: Routes = [
    { path: '', redirectTo: 'animals/list', pathMatch: 'full' },

    { path: 'animals/list', component: AnimalListComponent },
    { path: 'animals/:animal_id', component: AnimalDetailsComponent },

    { path: 'features/list', component: FeatureListComponent },
    { path: 'features/:feature_id', component: FeatureDetailsComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
