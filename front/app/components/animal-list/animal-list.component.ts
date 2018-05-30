import { Component, OnInit } from '@angular/core';

import { Animal } from '../../models/animal.model';
import { AnimalsService } from '../../services/animals.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-animal-list',
    templateUrl: './animal-list.component.html',
    styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent implements OnInit {
    animals: Animal[];

    constructor(private router: Router,
                private animalsService: AnimalsService) {
    }

    ngOnInit() {
        this.getAnimals();
    }

    getAnimals(): void {
        this.animalsService.getAnimals()
            .subscribe(animals => this.animals = animals);
    }

    goToAnimalCreate(): void {
        this.router.navigate(['animals/create']);
    }

    goToAnimalDetails(animal: Animal): void {
        this.router.navigate(['animals/' + animal.id]);
    }
}
