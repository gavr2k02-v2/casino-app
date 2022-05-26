import { GameId } from '../enums/GameId';

export type SpinHistory = {
  action: GameId;
  amount: number;
  time: Date;
  username: string;
};
