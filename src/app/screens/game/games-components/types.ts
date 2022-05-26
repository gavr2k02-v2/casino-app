export enum MessageTypes {
  SPIN = 'spin',
  UPDATE_BALANCE = 'updateBalance',
}

export enum SlotGameTypes {
  WIN = 'win',
  LOSE = 'lose',
  BIG_WIN = 'big_win',
}

export type SlotResponse = { type: SlotGameTypes; symbol: number; count: number; multi: number };

export type SpinPayload = CrabSpinPayload | BirdSpinPayload;

export type CrabSpinPayload = { bet: number; line: number; index: number };
export type BirdSpinPayload = { bet: number };
