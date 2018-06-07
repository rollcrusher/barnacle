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
                tap(features => this.log(`fetched features`)),
                catchError(this.handleError('getFeatures', []))
            );
    }

    getFeaturesByName(name: string): Observable<Feature[]> {
        return this.http.get<Feature[]>(`${this.featuresUrl}/search/name/${name}`)
            .pipe(
                tap(features => this.log(`fetched feature by name ${name}`)),
                catchError(this.handleError(`getFeaturesByName ${name}`, []))
            );
    }

    getFeatureThatMostPrevalent(name: string): Observable<Feature[]> {
        return this.http.get<Feature[]>(`${this.featuresUrl}/search/prevalent`)
            .pipe(
                tap(features => this.log(`fetched feature excluding:`)), //todo print ids
                catchError(this.handleError(`getFeatureThatMostPrevalent ${name}`, []))
            );
    }

    getFeatureById(id: string): Observable<Feature> {
        return this.http.get<Feature>(`${this.featuresUrl}/search/id/${id}`)
            .pipe(
                tap(features => this.log(`fetched feature by id ${id}`)),
                catchError(this.handleError<Feature>(`getFeatureById ${id}`))
            );
    }

    createFeature(feature: Feature): Observable<Feature> {
        return this.http.put<Feature>(`${this.featuresUrl}/create`, feature, httpOptions)
            .pipe(
                tap(features => this.log(`added feature [id: ${feature.id}]`)),
                catchError(this.handleError<Feature>(`addFeature`))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

    private log(message: string) {
        console.log('FeatureService: ' + message);
    }
}
