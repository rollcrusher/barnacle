export class InterrogationFlow {

    static readonly CONDITION_IN_PROGRESS = 0;
    static readonly CONDITION_HAS_CONCLUSION = 1;
    static readonly CONDITION_HAS_NOT_CONCLUSION = 2;
    static readonly CONDITION_RIGHT_CONCLUSION = 3;
    static readonly CONDITION_WRONG_CONCLUSION = 4;

    private _conclusion: number;

    constructor () {
    }

    setCondition(condition: number): void {
        this._conclusion = condition;
    }

    getConclusion(): number {
        return this._conclusion;
    }
}
