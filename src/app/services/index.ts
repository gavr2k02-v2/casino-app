import { APIService } from './APIService';
import { BirdSlotService } from './bird-slot-service/BirdSlotService';
import { CrabSlotService } from './crab-slot-service/CrabSlotService';
import { HistoryService } from './history-service/HistoryService';
import { PayBlockchainService } from './pay-blockchain-service/PayBlockchainService';
import { UserService } from './user-service/UserService';
import { UtyaSlotService } from './utya-slot-service/UtyaSlotService';

export const api: APIService = new APIService(
  new UserService(),
  new BirdSlotService(),
  new CrabSlotService(),
  new UtyaSlotService(),
  new HistoryService(),
  new PayBlockchainService(),
);
