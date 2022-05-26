import { h } from 'preact';
import { Slot } from '../../common/types/Slot';
import SlotsContainer from '../../components/slots-container';
import styles from './styles.module.scss';
import fire from '../../../assets/imgs/fire.svg';

import birdSlot from '../../../assets/imgs/bird-slot.png';
import crabSlot from '../../../assets/imgs/crab-slot.png';
import utyaSlot from '../../../assets/imgs/utya-slot.png';
import { GameId } from '../../common/enums/GameId';

const slot: Slot = {
  name: 'Crypto Pocker',
  id: 'pocker',
  img: 'https://xcitedevelop.azureedge.net/files%2Fdev-nikita%2F54434ed1-fba1-4cc2-b756-c4b899146fab%2Fapps.43597.13634281287263458.0a311ac9-1e1b-4975-ba05-031ed5171a21.dcc27f33-2d2f-401b-91a7-c1d4dea0e984.jpg',
};

const slots: Slot[] = [
  {
    id: GameId.BIRD_SLOT,
    name: 'Bird Slot',
    img: birdSlot,
  },
  {
    id: GameId.CRAB_SLOT,
    name: 'Crab Slot',
    img: crabSlot,
  },
  {
    id: GameId.UTYA_SLOT,
    name: 'Utya Slot',
    img: utyaSlot,
  },
];

function Slots() {
  return (
    <div className={styles.main}>
      <div className={styles.hotLabelBlock}>
        <img className={styles.fireIcon} src={fire} alt='fire' />
        <div className={styles.hotLabel}>Hot</div>
      </div>
      <SlotsContainer slots={slots} />
    </div>
  );
}

export default Slots;
