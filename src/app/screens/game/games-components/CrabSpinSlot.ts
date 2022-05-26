import { MutableRef } from 'preact/hooks';
import { FunctionExecutor } from '../../../common/utils/FunctionExecutor';
import { api } from '../../../services';
import { MessageTypes, SlotResponse } from './types';

export class CrabSpinSlot {
  constructor(private readonly _girdIframe: MutableRef<HTMLIFrameElement>) {}
  public handleMessage(message: MessageEvent) {
    const functions = {
      [MessageTypes.SPIN]: () => this.spin(message?.data),
      [MessageTypes.UPDATE_BALANCE]: () => api.userService.updateBalance(message?.data?.balance),
    };

    const fn = functions[message?.data?.type];
    return fn && fn();
  }

  private async spin(data): Promise<void> {
    const result = await FunctionExecutor.execute(
      () => api.crabSlotService.spin({ bet: data?.bet || 1, line: data?.line, index: data?.index }),
      {
        needShowLoader: true,
        needShowPopup: true,
      },
    );

    this.sendMessage(result.data);
  }

  private sendMessage(message: SlotResponse): void {
    this._girdIframe.current.contentWindow.postMessage(message, '*');
  }
}
