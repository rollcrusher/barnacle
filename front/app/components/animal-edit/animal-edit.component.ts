import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Animal } from '../../models/animal.model';
import { AnimalsService } from '../../services/animals.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Feature } from "../../models/feature.model";
import { FeaturesService } from "../../services/features.service";

@Component({
    selector: 'app-animal-edit',
    templateUrl: './animal-edit.html',
    styleUrls: ['./animal-edit.css']
})

export class AnimalEditComponent implements OnInit {

    animal: Animal;

    featureNameCriteria: string;
    features: Feature[];
    selectedFeatures: Feature[];

    message: string;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private animalsService: AnimalsService,
                private featuresService: FeaturesService,
                private location: Location) {
        this.animal = new Animal();
    }

    ngOnInit() {
        this.features = [];
        this.selectedFeatures = [];
        this.message = '';
        this.defineAnimal();
        this.defineFeaturesList();
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
        if (typeof this.selectedFeatures.find(f => f.id === feature.id) == 'undefined') {
            this.selectedFeatures.push(feature);
        }

        this.defineFeaturesList();
    }

    saveAnimal(): void {
        this.animal.features = this.selectedFeatures;

        this.animalsService.updateAnimal(this.animal)
            .subscribe(data => {
                this.router.navigate(['animals/' + this.animal.id]);
            });
    }
}
