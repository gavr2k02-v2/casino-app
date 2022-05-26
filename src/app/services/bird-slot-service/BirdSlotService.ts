import { User } from '../../common/types/User';
import { SlotResponse, SpinPayload } from '../../screens/game/games-components/types';
import { RestService } from '../rpc-serive/RestService';

export class BirdSlotService extends RestService<User> {
  constructor() {
    super('bird');
  }

  public async spin(payload: SpinPayload): Promise<SlotResponse> {
    return this.call('spin', payload);
  }
}
