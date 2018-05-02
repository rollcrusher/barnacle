import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Animal } from '../../models/animal.model';
import { AnimalsService } from '../../services/animals.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Feature } from '../../models/feature.model';
import { FeaturesService } from '../../services/features.service';

import {ObjectId} from 'mongodb';


@Component({
    selector: 'app-animal-create',
    templateUrl: './animal-create.html',
    styleUrls: ['./animal-create.css']
})

export class AnimalCreateComponent implements OnInit {

    featureNameCriteria: string;
    features: Feature[];
    selectedFeatures: Feature[];

    message: string;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private animalsService: AnimalsService,
                private featuresService: FeaturesService,
                private location: Location) {
    }

    ngOnInit() {
        this.features = [];
        this.selectedFeatures = [];
        this.message = '';
    }

    defineFeaturesList(): void {
        this.features = [];
        this.featuresService.getFeaturesByName(this.featureNameCriteria)
            .subscribe(responce => {
                if (typeof responce !== 'undefined') {
                    this.features = responce.filter(feature => {
                        return typeof this.selectedFeatures.find(f => f.id === feature.id) == 'undefined';
                    });
                } else {
                    throw responce;
                }
            });
    }

    onFeatureNameInputChange(featureName: string): void {
        this.featureNameCriteria = featureName;
        this.defineFeaturesList();
    }

    onFeatureSelect(feature: Feature): void {
        if (typeof this.selectedFeatures.find(f => f.id === feature.id) == 'undefined') {
            this.selectedFeatures.push(feature);
        }

        this.defineFeaturesList();
    }

    onFeatureDelete(feature: Feature): void {
        this.selectedFeatures = this.selectedFeatures.filter(f => f.id !== feature.id);
        this.defineFeaturesList();
    }

    createAnimal(name: string): void {
        name = name.trim();

        if (!name) {
            return;
        }

        let animal = new Animal();
        animal.name = name;
        animal.features = this.selectedFeatures;


        this.animalsService.createAnimal(animal)
            .subscribe(data => {
                this.router.navigate(['animals/list']);
            });
    }

    createFeature(name: string): void {
        name = name.trim();

        if (!name) {
            return;
        }

        this.featuresService.createFeature({ name } as Feature)
            .subscribe(data => {
                this.message = `${name} has been created`;
                this.defineFeaturesList();
            });

    }

    goToAnimalList(): void {
        this.router.navigate(['animals/list']);
    }

    clearMessage(): void {
        this.message = '';
    }
}
