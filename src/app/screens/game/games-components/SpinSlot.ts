import { MutableRef } from 'preact/hooks';
import { FunctionExecutor } from '../../../common/utils/FunctionExecutor';
import { api } from '../../../services';
import { MessageTypes, SlotResponse } from './types';

export class SpinSlot {
  constructor(private readonly _girdIframe: MutableRef<HTMLIFrameElement>) {}
  public handleMessage(message: MessageEvent) {
    const functions = {
      [MessageTypes.SPIN]: () => this.spin(message?.data?.bet),
      [MessageTypes.UPDATE_BALANCE]: () => api.userService.updateBalance(message?.data?.balance),
    };

    const fn = functions[message?.data?.type];
    return fn && fn();
  }

  private async spin(bet: number): Promise<void> {
    const result = await FunctionExecutor.execute(() => api.birdSlotService.spin({ bet: bet || 1 }), {
      needShowLoader: false,
      needShowPopup: true,
    });

    this.sendMessage(result.data);
  }

  private sendMessage(message: SlotResponse): void {
    this._girdIframe.current.contentWindow.postMessage(message, '*');
  }
}
