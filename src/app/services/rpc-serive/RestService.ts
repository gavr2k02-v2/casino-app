import axios from 'axios';
import { NotificationService } from '../notification-service/PubnubService';

const URL = 'http://localhost:7071/api/';

export abstract class RestService<T> extends NotificationService<T> {
  constructor(private readonly _serviceName: string) {
    super();
  }

  protected call<R, T>(method: string, data?: T): Promise<R> {
    return this.request<R, T>(method, { data });
  }

  private async request<R = string, T = void>(method: string, { data }: IRequestConfig<T>): Promise<R> {
    const fetchInit: IFetchRequestInit<T> = {
      method: 'post',
      headers: {},
      data: [method, data as T],
    };

    fetchInit.headers.Authorization = localStorage.getItem('secret-token');
    const response = await axios(`${URL}${this._serviceName}`, fetchInit);
    return response.data as R;
  }
}

export interface IRequestConfig<T> {
  data?: T;
}

export interface IFetchRequestInit<T> {
  method: 'post';
  data: Array<string | T>;
  headers: Record<string, string>;
}
