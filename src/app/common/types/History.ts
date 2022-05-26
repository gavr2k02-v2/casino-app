import { GameId } from '../enums/GameId';

export type History = {
  action: GameId;
  amount: number;
  time: Date;
};
