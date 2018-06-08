import { Injectable } from '@angular/core';
import { PersistenceService } from './persistence.service';
import { Feature } from '../models/feature.model';
import { InterrogationData } from '../models/interrogation-data.model';

@Injectable()
export class AnalysisService {

    interrogationData: InterrogationData;

    constructor(private persistenceService: PersistenceService) {
    }

    getInterrogationData(): InterrogationData {
        this.interrogationData = this.persistenceService.get('INTERROGATION_DATA');
        if (this.interrogationData === null) {
            this.interrogationData = new InterrogationData();
        }
        return this.interrogationData;
    }

    addAppropriateFeature(feature: Feature): void {
        this.interrogationData = this.getInterrogationData();
    }

    addUnsuitableFeatures(feature: Feature): void {
        this.interrogationData = this.getInterrogationData();
        this.interrogationData.unsuitableFeatures.push(feature.id);
        this.persistenceService.set('INTERROGATION_DATA', this.interrogationData);
    }

    cleanInterrogationData(): void {
        this.interrogationData = new InterrogationData();
        this.persistenceService.set('INTERROGATION_DATA', this.interrogationData);
    }
}
