import Pubnub from 'pubnub';
import { RxjsService } from '../rxjs-service/RxjsService';

export abstract class NotificationService<T> extends RxjsService<T> {
  private readonly _pubnub: Pubnub;
  private _uuid: string;

  constructor() {
    super();
    this._pubnub = new Pubnub({
      subscribeKey: 'sub-c-853c8ce2-095a-11ec-8f04-0664d1b72b66',
      uuid: this._uuid || 'not_uuid',
    });
  }

  protected get pubnub(): Pubnub {
    return this._pubnub;
  }
}
