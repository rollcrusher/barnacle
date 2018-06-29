import { Injectable } from '@angular/core';
import { PersistenceService } from './persistence.service';
import { Feature } from '../models/feature.model';
import { InterrogationData } from '../models/interrogation-data.model';

@Injectable()
export class AnalysisService {

    constructor(private persistenceService: PersistenceService) {
    }

    getInterrogationData(): InterrogationData {
        let interrogationData = this.persistenceService.get('INTERROGATION_DATA');
        if (interrogationData === null) {
            interrogationData = new InterrogationData();
        }
        return interrogationData;
    }

    addAppropriateFeature(feature: Feature): void {
        let interrogationData = this.getInterrogationData();
        interrogationData.appropriateFeatures.push(feature);
        this.persistenceService.set('INTERROGATION_DATA', interrogationData);
    }

    addUnsuitableFeatures(feature: Feature): void {
        let interrogationData = this.getInterrogationData();
        interrogationData.unsuitableFeatures.push(feature);
        this.persistenceService.set('INTERROGATION_DATA', interrogationData);
    }

    cleanInterrogationData(): void {
        let interrogationData = new InterrogationData();
        this.persistenceService.set('INTERROGATION_DATA', interrogationData);
    }
}
