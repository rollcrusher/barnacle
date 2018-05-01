import { Component, OnInit } from '@angular/core';

import { Animal } from '../../models/animal.model';
import { AnimalsService } from '../../services/animals.service';

@Component({
    selector: 'app-animal-list',
    templateUrl: './animal-list.component.html',
    styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent implements OnInit {
    animals: Animal[];

    constructor(private animalsService: AnimalsService) { }

    ngOnInit() {
        this.getAnimals();
    }

    getAnimals(): void {
        this.animalsService.getAnimals()
            .subscribe(animals => this.animals = animals);
    }

    deleteAnimal(animal: Animal): void {
        this.animals = this.animals.filter(h => h !== animal);
        this.animalsService.deleteAnimal(animal).subscribe();
    }
}
