import { BehaviorSubject } from 'rxjs';

export abstract class RxjsService<T> {
  private readonly _subject: BehaviorSubject<T | T[]>;

  constructor() {
    this._subject = new BehaviorSubject(null);
  }

  protected next(data: T | T[]): void {
    this._subject.next(data);
  }

  protected get subject(): BehaviorSubject<T | T[]> {
    return this._subject;
  }
}
