import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Feature } from '../../models/feature.model';
import { FeaturesService } from '../../services/features.service';
import { AnalysisService } from '../../services/analysis.service';
import { Animal } from '../../models/animal.model';
import { AnimalsService } from '../../services/animals.service';
import { InterrogationFlow } from '../../models/interrodation-flow.model';

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
    relatedAnimal: Animal;
    flow: InterrogationFlow;

    constructor(private router: Router,
                private featuresService: FeaturesService,
                private analysisService: AnalysisService,
                private animalsService: AnimalsService) {
        this.unsuitableFeatures = null;
        this.relatedAnimal = null;
        this.prevalentFeature = null;
        this.flow = new InterrogationFlow();

    }

    ngOnInit() {
    }


    defineConclusion(): void {
        if (this.relatedAnimals !== null && this.relatedAnimals.length === 1) {
            this.relatedAnimal = this.relatedAnimals[0];
        }

        if (this.relatedAnimals.length === 0) {
            this.flow.setCondition(InterrogationFlow.CONDITION_HAS_NOT_CONCLUSION);
        }
    }

    definePrevalentFeature(): void {
        this.prevalentFeature = null;
        const interrogationData = this.analysisService.getInterrogationData();

        this.featuresService.getFeatureThatMostPrevalent(interrogationData.appropriateFeatures, interrogationData.unsuitableFeatures)
            .subscribe((features) => {
                if (features.length > 0) {
                    this.prevalentFeature = features[0];
                }
            });
    }

    defineRelatedAnimals(): void {
        this.relatedAnimals = null;
        this.relatedAnimal = null;
        const interrogationData = this.analysisService.getInterrogationData();

        this.animalsService.getAnimalsByFeatures(interrogationData.appropriateFeatures, interrogationData.unsuitableFeatures)
            .subscribe((result) => {
                this.relatedAnimals = result;
                this.defineConclusion();
            });
    }

    defineStatFeatures(): void {
        const interrogationData = this.analysisService.getInterrogationData();
        this.appropriateFeatures = interrogationData.appropriateFeatures;
        this.unsuitableFeatures = interrogationData.unsuitableFeatures;
    }

    onYes(): void {
        this.analysisService.addAppropriateFeature(this.prevalentFeature);
        this.defineRelatedAnimals();
        this.definePrevalentFeature();
        this.defineStatFeatures();
    }

    onNo(): void {
        this.analysisService.addUnsuitableFeatures(this.prevalentFeature);
        this.defineRelatedAnimals();
        this.definePrevalentFeature();
        this.defineStatFeatures();
    }

    onNew(): void {
        this.resetComponentData();
        this.analysisService.cleanInterrogationData();
        this.definePrevalentFeature();
        this.flow.setCondition(InterrogationFlow.CONDITION_IN_PROGRESS);
    }

    onCorrect(): void {
        this.relatedAnimal = null;
        this.flow.setCondition(InterrogationFlow.CONDITION_RIGHT_CONCLUSION);
    }

    onIncorrect(): void {
        this.relatedAnimal = null;
        this.flow.setCondition(InterrogationFlow.CONDITION_WRONG_CONCLUSION);
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

    getClassForConclusionBlock(): string {
        return this.flow.getConclusion() === InterrogationFlow.CONDITION_WRONG_CONCLUSION
        || this.flow.getConclusion() === InterrogationFlow.CONDITION_HAS_NOT_CONCLUSION
            ? 'block-display'
            : 'block-hide';
    }

    getClassForRelatedAnimalBlock(): string {
        return this._isRelatedAnimalDisplayable()
            ? 'block-display'
            : 'block-hide';
    }

    getClassForSuccessfulBlock(): string {
        return this.flow.getConclusion() === InterrogationFlow.CONDITION_RIGHT_CONCLUSION
            ? 'block-display'
            : 'block-hide';
    }

    getClassForPrevalentFeatureBlock(): string {
        return this.prevalentFeature !== null && typeof this.prevalentFeature !== 'undefined'
            ? 'block-display'
            : 'block-hide';
    }

    _isRelatedAnimalDisplayable(): boolean {
        return this.relatedAnimal !== null
            && typeof this.relatedAnimal !== 'undefined'
            && this.prevalentFeature === null
            && this.relatedAnimals !== null
            && this.relatedAnimals.length > 0;
    }

    isConclusionButtonsDisplayable(): boolean {
        return this._isRelatedAnimalDisplayable();
    }

    isNewAnimalElementsDisplayable(): boolean {
        return this.flow.getConclusion() === InterrogationFlow.CONDITION_WRONG_CONCLUSION
            || this.flow.getConclusion() === InterrogationFlow.CONDITION_HAS_NOT_CONCLUSION;
    }

    isAnswerButtonDisplayable(): boolean {
        return this.prevalentFeature !== null && typeof this.prevalentFeature !== 'undefined'
    }

    resetComponentData(): void {
        this.relatedAnimals = null;
        this.appropriateFeatures = null;
        this.unsuitableFeatures = null;
        this.relatedAnimal = null;
        this.prevalentFeature = null;
    }
}
