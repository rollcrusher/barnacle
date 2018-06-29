import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Feature } from '../../models/feature.model';
import { FeaturesService } from '../../services/features.service';
import { AnalysisService } from '../../services/analysis.service';
import { Animal } from '../../models/animal.model';
import { AnimalsService } from '../../services/animals.service';

@Component({
    selector: 'app-analysis',
    templateUrl: './analysis.component.html',
    styleUrls: ['./analysis.component.scss']
})

export class AnalysisComponent implements OnInit {

    prevalentFeature: Feature;
    appropriateFeatures: Feature[];
    unsuitableFeatures: Feature[];
    relatedAnimals: Animal[];
    conclusion: string;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private featuresService: FeaturesService,
                private analysisService: AnalysisService,
                private animalsService: AnimalsService,) {
    }

    ngOnInit() {
    }

    definePrevalentFeature(): void {
        this.prevalentFeature = null;

        const interrogationData = this.analysisService.getInterrogationData();

        this.featuresService.getFeatureThatMostPrevalent(interrogationData.unsuitableFeatures)
            .subscribe((features) => {
                if (features.length > 0) {
                    this.prevalentFeature = features[0];
                } else {
                    this.conclusion = 'NO_VARIANTS';
                }
            });
    }

    defineRelatedAnimals(): void {
        this.relatedAnimals = null;
        const interrogationData = this.analysisService.getInterrogationData();

        this.animalsService.getAnimalsByFeatures(interrogationData.appropriateFeatures, interrogationData.unsuitableFeatures)
            .subscribe((result) => {
                this.relatedAnimals = result;
            });
    }

    defineStatFeatures(): void {
        const interrogationData = this.analysisService.getInterrogationData();
        this.appropriateFeatures = interrogationData.appropriateFeatures;
        this.unsuitableFeatures = interrogationData.unsuitableFeatures;
    }

    onYes(): void {
        this.analysisService.addAppropriateFeature(this.prevalentFeature);
        this.definePrevalentFeature();
        this.defineRelatedAnimals();
        this.defineStatFeatures();
    }

    onNo(): void {
        this.analysisService.addUnsuitableFeatures(this.prevalentFeature);
        this.definePrevalentFeature();
        this.defineRelatedAnimals();
        this.defineStatFeatures();
    }

    onNew(): void {
        this.resetComponentData();
        this.analysisService.cleanInterrogationData();
        this.definePrevalentFeature();
    }

    resetComponentData(): void {
        this.conclusion = null;
        this.relatedAnimals = null;
        this.appropriateFeatures = null;
        this.unsuitableFeatures = null;
    }

    onSave(name: string): void {
        const interrogationData = this.analysisService.getInterrogationData();

        name = name.trim();

        if (!name) {
            return;
        }

        const animal = new Animal();
        animal.name = name;
        animal.features = interrogationData.appropriateFeatures;

        this.animalsService.createAnimal(animal)
            .subscribe(animal => {
                this.router.navigate(['animals/edit/' + animal.id]);
            });
    }
}
