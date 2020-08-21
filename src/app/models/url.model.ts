export class Url {
  private _assignee: string;
  private _createdAt: string;
  private _id;
  private _issue: string;
  private _issue_id;
  private _nextActionSteps;
  private _resolution: string;​
  private _resolution_id;
  private _title: string;
  private _url: string;

  constructor() {}

  get assignee(): string {
    return this._assignee;
  }

  set assignee(value: string) {
    this._assignee = value;
  }

  get createdAt(): string {
    return this._createdAt;
  }

  set createdAt(value: string) {
    this._createdAt = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get issue(): string {
    return this._issue;
  }

  set issue(value: string) {
    this._issue = value;
  }

  get issue_id(): string {
    return this._issue_id;
  }

  set issue_id(value: string) {
    this._issue_id = value;
  }

  get nextActionSteps(): string {
    return this._nextActionSteps;
  }

  set nextActionSteps(value: string) {
    this._nextActionSteps = value;
  }

  get resolution(): string {
    return this._resolution;
  }

  set resolution(value: string) {
    this._resolution = value;
  }

  get resolution_id(): string {
    return this._resolution_id;
  }

  set resolution_id(value: string) {
    this._resolution_id = value;
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }
}
