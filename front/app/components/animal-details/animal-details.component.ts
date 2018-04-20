import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";

import { Animal } from '../../models/animal.model';
import { AnimalsService } from '../../services/animals.service';

@Component({
    selector: 'app-animal-details',
    templateUrl: './animal-details.component.html',
    styleUrls: ['./animal-details.component.css']
})
export class AnimalDetailsComponent implements OnInit {

    animal: Animal;

    constructor(private route: ActivatedRoute,
                private location: Location,
                private animalsService: AnimalsService) {
    }

    ngOnInit() {
        this.getAnimal();
    }

    getAnimal(): void {
        const animalId = this.route.snapshot.paramMap.get('animal_id');
        this.animalsService.getAnimalById(animalId)
            .subscribe(responce => {
                if (typeof responce.id !== "undefined") {
                    this.animal = responce;
                } else {
                    throw responce;
                }
                console.log(responce);
            });
    }
}
