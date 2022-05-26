import { BirdSlotService } from './bird-slot-service/BirdSlotService';
import { CrabSlotService } from './crab-slot-service/CrabSlotService';
import { HistoryService } from './history-service/HistoryService';
import { PayBlockchainService } from './pay-blockchain-service/PayBlockchainService';
import { UserService } from './user-service/UserService';
import { UtyaSlotService } from './utya-slot-service/UtyaSlotService';

export class APIService {
  constructor(
    private readonly _userService: UserService,
    private readonly _slotService: BirdSlotService,
    private readonly _crabSlotService: CrabSlotService,
    private readonly _utyaSlotService: UtyaSlotService,
    private readonly _historyService: HistoryService,
    private readonly _payBlockchainService: PayBlockchainService,
  ) {}

  public get userService(): UserService {
    return this._userService;
  }

  public get birdSlotService(): BirdSlotService {
    return this._slotService;
  }

  public get crabSlotService(): CrabSlotService {
    return this._crabSlotService;
  }

  public get utyaSlotService(): UtyaSlotService {
    return this._utyaSlotService;
  }

  public get historyService(): HistoryService {
    return this._historyService;
  }

  public get payBlockchainService(): PayBlockchainService {
    return this._payBlockchainService;
  }
}
