import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Animal } from '../../models/animal.model';
import { AnimalsService } from '../../services/animals.service';

@Component({
    selector: 'app-animal-details',
    templateUrl: './animal-details.component.html',
    styleUrls: ['./animal-details.component.scss']
})
export class AnimalDetailsComponent implements OnInit {

    animal: Animal;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private animalsService: AnimalsService) {
    }

        ngOnInit() {
            this.getAnimal();
        }

        getAnimal(): void {
            const animalId = this.route.snapshot.paramMap.get('animalId');
            this.animalsService.getAnimalById(animalId)
                .subscribe(responce => {
                    if (typeof responce !== 'undefined') {
                        this.animal = responce;
                    } else {
                        throw responce;
                    }
                    console.log(responce);
                });
        }

    goToEditAnimal(animal: Animal): void {
        if (!animal) {
            return;
        }
        this.router.navigate(['animals/edit/' + animal.id]);
    }

    deleteAnimal(animal: Animal): void {
        this.animalsService.deleteAnimal(animal).subscribe((data) => {
            this.router.navigate(['animals/list']);
        });
    }
}
