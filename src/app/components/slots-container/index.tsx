import { h } from 'preact';
import { Slot } from '../../common/types/Slot';
import SlotPreview from '../slot-preview';
import styles from './styles.module.scss';

interface ISlotsContaierProps {
  slots: Slot[];
}

function SlotsContainer({ slots }: ISlotsContaierProps) {
  return (
    <div className={styles.main}>
      {slots?.map((slot) => (
        <SlotPreview slot={slot} />
      ))}
    </div>
  );
}

export default SlotsContainer;
