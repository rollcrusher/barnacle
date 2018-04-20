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

    addAnimal(animal: Animal): Observable<Animal> {
        return this.http.post<Animal>(`${this.animalsUrl}/add`, animal, httpOptions)
            .pipe(
                tap(animals => this.log(`added animal [id: ${animal.id}]`)),
                catchError(this.handleError<Animal>(`addAnimal`))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    private log(message: string) {
        console.log('AnimalService: ' + message);
    }

    updateAnimal(hero: any) {

    }
}
