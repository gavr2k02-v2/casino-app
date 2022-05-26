import { BehaviorSubject } from 'rxjs';
import { AuthRespose } from '../../common/types/AuthRespose';
import { SignUpPayload } from '../../common/types/SignUpPayload';
import { User } from '../../common/types/User';
import { RestService } from '../rpc-serive/RestService';
import Pubnub from 'pubnub';
import { UpdateUser } from '../../common/types/UpdateUser';

export class UserService extends RestService<User> {
  constructor() {
    super('user');
  }

  public get userSubject(): BehaviorSubject<User> {
    return this.subject as BehaviorSubject<User>;
  }

  public get user(): User {
    return this.subject.getValue() as User;
  }

  public getPayInfo(): Promise<any> {
    return this.call('getPayInfo');
  }

  public updateUser(payload: UpdateUser): Promise<void> {
    return this.call('updateUser', payload);
  }

  public async loginByToken(): Promise<void> {
    const response: AuthRespose = await this.call('loginByToken');
    return this.initUser(response);
  }

  public async loginByPassword(payload: SignUpPayload): Promise<void> {
    const response: AuthRespose = await this.call('loginByPassword', payload);
    return this.initUser(response);
  }

  public async signup(payload: SignUpPayload): Promise<void> {
    const response: AuthRespose = await this.call('signup', payload);
    return this.initUser(response);
  }

  public async syncPayInfo(payData: string): Promise<void> {
    await this.call('syncPayInfo', payData);
  }

  public async withdraw(amount: number, wallet: string): Promise<void> {
    await this.call('withdraw', { amount, wallet });
  }

  public updateBalance(balance: number): void {
    const user = { ...this.user, balance };
    this.next(user);
  }

  private initUser({ user, token }: AuthRespose): void {
    this.next(user);
    this.setToken(token);
  }

  private setToken(token: string): void {
    localStorage.setItem('secret-token', token);
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
    const value: User = data.message;
    value && this.userSubject.next(value);
  }
}
