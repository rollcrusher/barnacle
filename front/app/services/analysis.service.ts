import { Injectable } from '@angular/core';
import { PersistenceService } from '../persistence.service';

@Injectable()
export class AnalysisService {

    constructor(private persistenceService: PersistenceService) {}

    putInterrogationData(): void {
        const interrogationData = { appropriateFeatures: [], unsuitableFeatures: [] };
        this.persistenceService.set('INTERROGATION_DATA', interrogationData);
    }

    getInterrogationData(): void {
        return this.persistenceService.get('INTERROGATION_DATA');
    }
}
