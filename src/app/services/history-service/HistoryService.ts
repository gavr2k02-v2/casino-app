import Pubnub from 'pubnub';
import { BehaviorSubject } from 'rxjs';
import { History } from '../../common/types/History';
import { HistoryPayload } from '../../common/types/HistoryPayload';
import { SpinHistory } from '../../common/types/SpinHistory';
import { RestService } from '../rpc-serive/RestService';

export class HistoryService extends RestService<History> {
  public get spinesSubject(): BehaviorSubject<SpinHistory[]> {
    return this.subject as BehaviorSubject<SpinHistory[]>;
  }

  public get spines(): SpinHistory[] {
    return this.subject.getValue() as SpinHistory[];
  }

  constructor() {
    super('history');
  }

  public getHistory(payload: HistoryPayload): Promise<History[]> {
    return this.call('getHistory', payload);
  }

  public getCountPages(limit: number): Promise<number> {
    return this.call('getCountPages', limit);
  }

  public async getLastSpines(limit: number): Promise<void> {
    const spines: SpinHistory[] = await this.call('getLastSpines', limit);
    this.spinesSubject.next(spines);
  }

  public subscribe(channel: string): void {
    this.pubnub.subscribe({ channels: [channel] });
    this.pubnub.addListener({
      message: this.handlePubnubMessage.bind(this),
    });
  }

  public unsubscribe(channel: string): void {
    this.pubnub.unsubscribe({ channels: [channel] });
  }

  private handlePubnubMessage(data: Pubnub.MessageEvent): void {
    const value: SpinHistory = data.message;

    if (this.spines.find((item) => item.time === value.time)) {
      return;
    }

    if (value) {
      const records = [...this.spines];
      records.pop();
      records.unshift(value);
      this.spinesSubject.next(records);
    }
  }
}
