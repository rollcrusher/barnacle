import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Feature } from '../../models/feature.model';
import { FeaturesService } from '../../services/features.service';
import { PersistenceService } from '../../services/persistence.service';

@Component({
    selector: 'app-analysis',
    templateUrl: './analysis.component.html',
    styleUrls: ['./analysis.component.scss']
})

export class AnalysisComponent implements OnInit {

    prevalentFeature: Feature;
    appropriateFeatures: Feature[];
    unsuitableFeatures: Feature[];

    constructor(private router: Router,
                private route: ActivatedRoute,
                private featuresService: FeaturesService,
                private persistenceService: PersistenceService) {
    }

    ngOnInit() {
        this.getPrevalentFeature();
    }

    getPrevalentFeature(): void {
        this.featuresService.getFeatureThatMostPrevalent('test')
            .subscribe((features) => {
                if (features.length > 0) {
                    this.prevalentFeature = features[0];
                }
            });
    }

    yesAnswer(): void {

    }

    noAnswer(): void {

    }
}
