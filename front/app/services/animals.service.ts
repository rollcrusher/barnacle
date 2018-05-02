import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';

import { Animal } from '../models/animal.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AnimalsService {

    private animalsUrl = 'http://localhost:3000/api/animals';

    constructor(private http: HttpClient) {
    }

    getAnimals(): Observable<Animal[]> {
        return this.http.get<Animal[]>(this.animalsUrl + '/list')
            .pipe(
                tap(animals => this.log(`fetched animals`)),
                catchError(this.handleError('getAnimals', []))
            );
    }

    getAnimalById(id: string): Observable<Animal> {
        return this.http.get<Animal>(`${this.animalsUrl}/${id}`)
            .pipe(
                tap(animals => this.log(`fetched animal by id ${id}`)),
                catchError(this.handleError<Animal>(`getAnimalById ${id}`))
            );
    }

    createAnimal(animal: Animal): Observable<Animal> {
        let featureIds = [];
        animal.features.forEach(feature => {
            featureIds.push(feature.id);
        });
        animal.features = featureIds;

        return this.http.put<Animal>(`${this.animalsUrl}/create`, JSON.stringify(animal), httpOptions)
            .pipe(
                tap(animals => this.log(`added animal [id: ${animal.id}]`)),
                catchError(this.handleError<Animal>(`addAnimal`))
            );
    }

    deleteAnimal (animal: Animal | number): Observable<Animal> {
        const id = typeof animal === 'number' ? animal : animal.id;
        const url = `${this.animalsUrl}/delete/${id}`;

        return this.http.delete<Animal>(url, httpOptions).pipe(
            tap(_ => this.log(`deleted animal id=${id}`)),
            catchError(this.handleError<Animal>('deleteAnimal'))
        );
    }

    updateAnimal(animal: Animal): Observable<any> {
        console.log(">>animal");
        console.log(animal);
        return this.http.post<Animal>(`${this.animalsUrl}/edit`, JSON.stringify(animal), httpOptions)
            .pipe(
                tap(_ => this.log(`updated animal [id: ${JSON.stringify(animal)}]`)), //todo: getid
                catchError(this.handleError<Animal>(`updateAnimal`))
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
        console.log('AnimalService: ' + message);
    }
}
