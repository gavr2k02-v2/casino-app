import { BehaviorSubject, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

export type ExecutorResult<T> = {
  success: boolean;
  data?: T;
};

export type ExecutorParams = {
  title?: string;
  text?: string;
  needShowLoader?: boolean;
  needShowPopup?: boolean;
};

const DEFAULT_PARAMS: ExecutorParams = {
  needShowLoader: true,
  needShowPopup: true,
};

export abstract class FunctionExecutor {
  private static readonly _loadSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public static async execute<T>(fn: () => Promise<T>, params = DEFAULT_PARAMS): Promise<ExecutorResult<T>> {
    try {
      params.needShowLoader && this._loadSubject.next(true);
      const result = await fn();
      return { success: true, data: result };
    } catch (e) {
      console.warn(e);
      params.needShowPopup &&
        Swal.fire(
          params?.title || DEFAULT_PARAMS.title,
          params?.text || e?.response?.data || DEFAULT_PARAMS.text,
          'error',
        );
      return { success: false, data: undefined };
    } finally {
      params.needShowLoader && this._loadSubject.next(false);
    }
  }

  public static get loadSubject(): Subject<boolean> {
    return FunctionExecutor._loadSubject;
  }
}
