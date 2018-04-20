import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Feature } from "../models/feature.model";

@Injectable()
export class FeaturesService {

    private featuresUrl = 'http://localhost:3000/api/features';

    constructor(private http: HttpClient) {
    }

    getFeatures(): Observable<Feature[]> {
        return this.http.get<Feature[]>(this.featuresUrl + '/list')
            .pipe(
                tap(features => this.log(`fetched features`)),
                catchError(this.handleError('getFeatures', []))
            );
    }

    getFeatureById(id: string): Observable<Feature> {
        return this.http.get<Feature>(`${this.featuresUrl}/${id}`)
            .pipe(
                tap(features => this.log(`fetched feature by id ${id}`)),
                catchError(this.handleError<Feature>(`getFeatureById ${id}`))
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
