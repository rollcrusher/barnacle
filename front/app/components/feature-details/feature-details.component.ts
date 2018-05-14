import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Feature } from '../../models/feature.model';
import { FeaturesService } from '../../services/features.service';

@Component({
    selector: 'app-feature-details',
    templateUrl: './feature-details.component.html',
    styleUrls: ['./feature-details.component.scss']
})

export class FeatureDetailsComponent implements OnInit {
    feature: Feature;

    constructor(private route: ActivatedRoute,
                private location: Location,
                private featuresService: FeaturesService) {
    }

    ngOnInit() {
        this.getFeature();
    }

    getFeature(): void {
        const featureId = this.route.snapshot.paramMap.get('featureId');
        this.featuresService.getFeatureById(featureId)
            .subscribe(responce => {
                if (typeof responce.id !== 'undefined') {
                    this.feature = responce;
                } else {
                    throw responce;
                }
                console.log(responce);
            });
    }
}
