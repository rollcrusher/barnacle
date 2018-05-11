import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import 'rxjs/add/observable/of';

import { AnimalListComponent } from './animal-list.component';
import { AnimalsService } from '../../services/animals.service';

import { HttpClientModule } from '@angular/common/http';

import { Animal } from './../../models/animal.model';
import { Observable } from 'rxjs/Observable';

describe('AnimalListComponent', () => {
    let component: AnimalListComponent;
    let fixture: ComponentFixture<AnimalListComponent>;
    let animalService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AnimalListComponent],
            providers: [AnimalsService],
            imports: [
                HttpClientModule,
                RouterTestingModule
            ],
        })
            .compileComponents();
    }));

    beforeEach(inject([AnimalsService], s => {
        animalService = s;
        fixture = TestBed.createComponent(AnimalListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should init animals', () => {
        const response: Animal[] = [];
        const spy = spyOn(animalService, 'getAnimals').and.returnValue(
            Observable.of(response)
        );
        component.getAnimals();
        expect(component.animals).toEqual(response);
        expect(spy.calls.any()).toEqual(true);
    });
});
