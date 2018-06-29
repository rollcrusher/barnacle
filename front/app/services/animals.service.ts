import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';

import { Animal } from '../models/animal.model';
import { Feature } from '../models/feature.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AnimalsService {

    private animalsUrl = 'http://localhost:3000/api/animals';

    constructor(private http: HttpClient) {
    }

    getAnimals(): Observable<Animal[]> {
        return this.http.get<Animal[]>(this.animalsUrl + '/search/all')
            .pipe(
                tap(animals => AnimalsService.log(`fetched animals`)),
                catchError(this.handleError('getAnimals', []))
            );
    }

    getAnimalById(id: string): Observable<Animal> {
        return this.http.get<Animal>(`${this.animalsUrl}/search/propagated/id/${id}`)
            .pipe(
                tap(animal => AnimalsService.log(`fetched animal by id ${id}`)),
                catchError(this.handleError<Animal>(`getAnimalById ${id}`))
            );
    }

    getAnimalsByFeatures(includeFeatures: Feature[], excludeFeatures: Feature[]): Observable<Animal[]> {

        const includeFeatureIds = AnimalsService.extractIdsFromObjects(includeFeatures);
        const excludeFeatureIds = AnimalsService.extractIdsFromObjects(excludeFeatures);

        return this.http.get<Animal[]>(
            `${this.animalsUrl}/search/by/features`
            + `?includeFeatures=${JSON.stringify(includeFeatureIds)}`
            + `&excludeFeatures=${JSON.stringify(excludeFeatureIds)}`)
            .pipe(
                tap(animals => AnimalsService.log(`fetched animals`)),
                catchError(this.handleError<Animal[]>('getAnimalsByFeatures'))
            );
    }

    createAnimal(animal: Animal): Observable<Animal> {
        const featureIds = [];
        if (animal.features !== null) {
            animal.features.forEach(feature => {
                featureIds.push(feature.id);
            });
            animal.features = featureIds;
        }

        return this.http.put<Animal>(`${this.animalsUrl}/create`, JSON.stringify(animal), httpOptions)
            .pipe(
                tap(animals => AnimalsService.log(`added animal [id: ${animal.id}]`)),
                catchError(this.handleError<Animal>(`addAnimal`))
            );
    }

    deleteAnimal(animal: Animal | number): Observable<Animal> {
        const id = typeof animal === 'number' ? animal : animal.id;
        const url = `${this.animalsUrl}/delete/${id}`;

        return this.http.delete<Animal>(url, httpOptions).pipe(
            tap(_ => AnimalsService.log(`deleted animal id=${id}`)),
            catchError(this.handleError<Animal>('deleteAnimal'))
        );
    }

    updateAnimal(animal: Animal): Observable<any> {
        return this.http.post<Animal>(`${this.animalsUrl}/edit`, JSON.stringify(animal), httpOptions)
            .pipe(
                tap(_ => AnimalsService.log(`updated animal [id: ${JSON.stringify(animal)}]`)),
                catchError(this.handleError<Animal>(`updateAnimal`))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            AnimalsService.log(`${operation} failed: ${error.message}`);
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
        console.log('AnimalService: ' + message);
    }
}
