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
    conclusion: string;
    animalName: string;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private featuresService: FeaturesService,
                private analysisService: AnalysisService,
                private animalsService: AnimalsService,) {
    }

    ngOnInit() {
    }

    getPrevalentFeature(): void {
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

    onYes(): void {
        this.analysisService.addAppropriateFeature(this.prevalentFeature);
    }

    onNo(): void {
        this.analysisService.addUnsuitableFeatures(this.prevalentFeature);
        this.prevalentFeature = null;
        this.getPrevalentFeature();
    }

    onNew(): void {
        this.resetComponentData();
        this.analysisService.cleanInterrogationData();
        this.getPrevalentFeature();
    }

    resetComponentData(): void {
        this.conclusion = null;
        this.unsuitableFeatures = null;
        this.appropriateFeatures = null;
    }

    onSave(name: string): void {
        name = name.trim();

        if (!name) {
            return;
        }

        const animal = new Animal();
        animal.name = name;
        animal.features = this.appropriateFeatures;

        this.animalsService.createAnimal(animal)
            .subscribe(animal => {
                this.router.navigate(['animals/edit/' + animal.id]);
            });
    }
}
