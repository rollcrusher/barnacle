import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Animal } from '../../models/animal.model';
import { AnimalsService } from '../../services/animals.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Feature } from '../../models/feature.model';
import { FeaturesService } from '../../services/features.service';
import { PersistenceService } from '../../services/persistence.service';

@Component({
    selector: 'app-animal-edit',
    templateUrl: './animal-edit.html',
    styleUrls: ['./animal-edit.scss']
})

export class AnimalEditComponent implements OnInit {

    animal: Animal;

    featureNameCriteria: string;
    features: Feature[];
    inputFeatureName: string;
    selectedFeatures: Feature[];
    excludedFeatures: Feature[];

    message: string;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private animalsService: AnimalsService,
                private featuresService: FeaturesService,
                private persistenceService: PersistenceService) {
        this.animal = new Animal();
    }

    ngOnInit() {
        this.features = [];
        this.selectedFeatures = [];
        this.excludedFeatures = [];
        this.message = '';
        this.defineExcludedFeaturesList();
        this.defineAnimal();
        this.defineFeaturesList();
    }

    defineExcludedFeaturesList(): void {

        const interrogationData = this.persistenceService.get('INTERROGATION_DATA');
        if (interrogationData === null) {
            return;
        }

        this.featuresService.getFeaturesByIds(interrogationData.unsuitableFeatures)
            .subscribe(responce => {
                if (typeof responce !== 'undefined') {
                    this.excludedFeatures = responce;
                } else {
                    throw responce;
                }
            });
    }

    defineFeaturesList(): void {
        this.features = [];
        this.featuresService.getFeaturesByName(this.featureNameCriteria)
            .subscribe(responce => {
                if (typeof responce !== 'undefined') {
                    this.features = this.filterSelectedFeatures(responce);
                    this.features = this.filterExcludedFeatures(this.features);
                } else {
                    throw responce;
                }
            });
    }

    filterSelectedFeatures(features: Feature[]): Feature[] {
        return features.filter(feature => {
            return typeof this.selectedFeatures.find(f => f.id === feature.id) === 'undefined';
        });
    }

    filterExcludedFeatures(features: Feature[]): Feature[] {
        return features.filter(feature => {
            return typeof this.excludedFeatures.find(f => f.id === feature.id) === 'undefined';
        });
    }

    defineAnimal(): void {
        const animalId = this.route.snapshot.paramMap.get('animalId');
        this.animalsService.getAnimalById(animalId)
            .subscribe(responce => {
                if (typeof responce.id !== 'undefined') {
                    this.animal = responce;
                    this.selectedFeatures = this.animal.features;
                } else {
                    throw responce;
                }
            });
    }

    onFeatureDelete(feature: Feature): void {
        this.selectedFeatures = this.selectedFeatures.filter(f => f.id !== feature.id);
        this.defineFeaturesList();
    }

    onFeatureNameInputChange(featureName: string): void {
        this.featureNameCriteria = featureName;
        this.defineFeaturesList();
    }

    onFeatureSelect(feature: Feature): void {
        if (typeof this.selectedFeatures.find(f => f.id === feature.id) === 'undefined') {
            this.selectedFeatures.push(feature);
        }

        this.defineFeaturesList();
    }

    onSaveAnimal(): void {
        const featureArr = [];
        this.selectedFeatures.forEach(function (feature) {
            featureArr.push(feature.id);
        });
        this.animal.features = featureArr;

        this.animalsService.updateAnimal(this.animal)
            .subscribe(data => {
                this.router.navigate(['animals/' + this.animal.id]);
            });
    }

    onCreateFeature(name: string): void {
        name = name.trim();

        if (!name) {
            return;
        }

        this.featuresService.createFeature({ name } as Feature)
            .subscribe(data => {
                this.message = `${name} has been created`;
                this.inputFeatureName = null;
                this.defineFeaturesList();
            });

    }

    goToAnimalDetails(): void {
        this.router.navigate(['animals/' + this.animal.id]);
    }
}
