import { Feature } from './feature.model';
export class InterrogationData {
    appropriateFeatures: Feature[];
    unsuitableFeatures: Feature[];

    constructor () {
        this.unsuitableFeatures = [];
        this.appropriateFeatures = [];
    }
}
