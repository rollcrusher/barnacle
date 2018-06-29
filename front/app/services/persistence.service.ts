import { Injectable } from '@angular/core';
import { InterrogationData } from '../models/interrogation-data.model';

@Injectable()
export class PersistenceService {

    constructor() {}

    set(key: string, data: any): void {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error('Error saving to localStorage', e); //todo: use a logger
        }
    }

    get(key: string): InterrogationData {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            console.error('Error getting data from localStorage', e);
            return null;
        }
    }
}
