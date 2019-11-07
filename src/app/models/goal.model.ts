export class Goal {
    private _id;
    private  _title: string;
    private _description;
    private _progress;
    private _isCompleted: boolean;
    private _estimatedWork: number;
    private _remainingWork: number;
    private _justification: string;
    private _isReoccuring: boolean;
    private _priority: number;
    private _idealOutcome: string;
    private _scope: string;
    private _blockingReason: string;
    private _replacement: string;
    private _phase: string;
    private _parentid: string;
    private _dueDate: string;
    private _isDaily: boolean;


    constructor(title, id, description) {
        this.title = title;
        this.id = id;
        this.description = description;
    }

    get title(): string{
        return this._title;
    }

    set title(value: string){
        this._title = value;
    }

    get id(){
        return this._id;
    }

    set id(value){
        this._id = value;
    }

    get description(){
        return this._description;
    }

    set description(value){
        this._description = value;
    }

    get progress(){
        return this._progress;
    }

    set progress(value){
        this._progress = value;
    }

    get isCompleted(): boolean{
        return this._isCompleted;
    }

    set isCompleted(value: boolean){
        this._isCompleted = value;
    }

    get estimatedWork(): number{
        return this._estimatedWork;
    }

    set estimatedWork(value: number){
        this._estimatedWork = value;
    }

    get remainingWork(): number{
        return this._remainingWork;
    }

    set remainingWork(value: number){
        this._remainingWork = value;
    }

    get justification(): string{
        return this._justification;
    }

    set justification(value: string){
        this._justification = value;
    }

    get isReoccuring(): boolean{
        return this._isReoccuring;
    }

    set isReoccuring(value: boolean){
        this._isReoccuring = value;
    }

    get priority(): number{
        return this._priority;
    }

    set priority(value: number){
        this._priority = value;
    }

    get idealOutcome(): string{
        return this._idealOutcome;
    }

    set idealOutcome(value: string){
        this._idealOutcome = value;
    }

    get scope(): string{
        return this._scope;
    }
    
    set scope(value: string){
        this._scope = value;
    }
    
    get blockingReason(): string{
        return this._blockingReason;
    }

    set blockingReason(value: string){
        this._blockingReason = value;
    }

    get replacement(): string{
        return this._replacement;
    }

    set replacement(value: string){
        this._replacement = value;
    }

    get phase(): string{
        return this._phase;
    }

    set phase(value: string){
        this._phase = value;
    }

    get parentid(): string{
        return this._parentid;
    }

    set parenid(value: string) {
        this._parentid = value;
    }

    get dueDate(): string{
        return this._dueDate;
    }
    
    set dueDate(value:string ){
        this._dueDate = value;
    }

    get isDaily(): boolean{
        return this._isDaily;
    }

    set isDaily(value: boolean){
        this._isDaily = value;
    }

}