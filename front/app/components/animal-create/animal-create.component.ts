import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Animal } from '../../models/animal.model';
import { AnimalsService } from '../../services/animals.service';

@Component({
    selector: 'app-animal-create',
    templateUrl: './animal-create.html',
    styleUrls: ['./animal-create.css']
})

export class AnimalCreateComponent implements OnInit {

    animals: Animal[];

    constructor(private animalService: AnimalsService,
                private location: Location) {
    }

    ngOnInit() {

    }

    add(name: string): void {
        name = name.trim();
        if (!name) {
            return;
        }
        this.animalService.addAnimal({ name } as Animal)
            .subscribe(animal => {
                this.animals.push(animal);
            });
    }

    goBack(): void {
        this.location.back();
    }

    // save(): void {
    //     this.animalService.updateAnimal(this.hero)
    //         .subscribe(() => this.goBack());
    // }
}