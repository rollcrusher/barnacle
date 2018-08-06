import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimalListComponent } from './components/animal-list/animal-list.component';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';
import { AnimalCreateComponent } from './components/animal-create/animal-create.component';
import { AnimalEditComponent } from './components/animal-edit/animal-edit.component';

import { FeatureListComponent } from './components/feature-list/feature-list.component';
import { FeatureDetailsComponent } from './components/feature-details/feature-details.component';

import { AnalysisComponent } from './components/analysis/analysis.component';

const routes: Routes = [
    { path: '', redirectTo: 'animals/list', pathMatch: 'full' },

    { path: 'animals/create', component: AnimalCreateComponent },
    { path: 'animals/list', component: AnimalListComponent },
    { path: 'animals/:animalId', component: AnimalDetailsComponent },
    { path: 'animals/edit/:animalId', component: AnimalEditComponent },

    { path: 'features/list', component: FeatureListComponent },
    { path: 'features/:featureId', component: FeatureDetailsComponent },

    { path: 'analysis/interrogation', component: AnalysisComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
