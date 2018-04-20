import { Component, OnInit } from '@angular/core';

import { Feature } from '../../models/feature.model';
import { FeaturesService } from '../../services/features.service';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.css']
})
export class FeatureListComponent implements OnInit {
  features: Feature[];

  constructor(private featuresService: FeaturesService) { }

  ngOnInit() {
    this.getFeatures();
  }

  getFeatures(): void {
    this.featuresService.getFeatures()
        .subscribe(features => this.features = features);
  }
}
