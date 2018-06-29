import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Feature } from '../models/feature.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FeaturesService {

    private featuresUrl = 'http://localhost:3000/api/features';

    constructor(private http: HttpClient) {
    }

    getFeatures(): Observable<Feature[]> {
        return this.http.get<Feature[]>(this.featuresUrl + '/search/all')
            .pipe(
                tap(features => FeaturesService.log(`fetched features`)),
                catchError(this.handleError('getFeatures', []))
            );
    }

    getFeaturesByName(name: string): Observable<Feature[]> {
        return this.http.get<Feature[]>(`${this.featuresUrl}/search/name/${name}`)
            .pipe(
                tap(features => FeaturesService.log(`fetched feature by name ${name}`)),
                catchError(this.handleError(`getFeaturesByName ${name}`, []))
            );
    }

    getFeatureThatMostPrevalent(unsuitableFeatures: Feature[]): Observable<Feature[]> {
        const featureIds = FeaturesService.extractIdsFromObjects(unsuitableFeatures);
        const featureIdsStr = JSON.stringify(featureIds);
        return this.http.get<Feature[]>(`${this.featuresUrl}/search/prevalent?excludeFeatures=${featureIdsStr}`)
            .pipe(
                tap(features => FeaturesService.log(`fetched feature: ${JSON.stringify(features)}`)),
                catchError(this.handleError(`getFeatureThatMostPrevalent ${featureIdsStr}`, []))
            );
    }

    getFeaturesByIds(featureIds: string[]): Observable<Feature[]> {
        const featureIdsArr = JSON.stringify(featureIds);
        return this.http.get<Feature[]>(`${this.featuresUrl}/search/array/id?ids=${featureIdsArr}`)
            .pipe(
                tap(features => FeaturesService.log(`fetched feature: ${JSON.stringify(features)}`)),
                catchError(this.handleError(`getFeatureThatMostPrevalent ${featureIdsArr}`, []))
            );
    }

    getFeatureById(id: string): Observable<Feature> {
        return this.http.get<Feature>(`${this.featuresUrl}/search/id/${id}`)
            .pipe(
                tap(features => FeaturesService.log(`fetched feature by id ${id}`)),
                catchError(this.handleError<Feature>(`getFeatureById ${id}`))
            );
    }

    createFeature(feature: Feature): Observable<Feature> {
        return this.http.put<Feature>(`${this.featuresUrl}/create`, feature, httpOptions)
            .pipe(
                tap(features => FeaturesService.log(`added feature [id: ${feature.id}]`)),
                catchError(this.handleError<Feature>(`addFeature`))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            FeaturesService.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

    private static extractIdsFromObjects(objArr: any[]): string[] {
        let idArr = [];
        for (let object of objArr) {
            idArr.push(object['id']);
        }
        return idArr;
    }

    private static log(message: string) {
        console.log('FeatureService: ' + message);
    }
}
