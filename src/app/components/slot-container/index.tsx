import { h } from 'preact';
import { Link } from 'react-router-dom';
import { Slot } from '../../common/types/Slot';
import styles from './styles.module.scss';

interface ISlotContaierProps {
  slot: Slot;
}

function SlotContainer({ slot }: ISlotContaierProps) {
  return (
    <Link to={`/slot/${slot.id}`}>
      <div className={styles.main}>
        <img className={styles.img} src={slot.img} alt={slot.name} />
        <div className={styles.label}>{slot.name}</div>
      </div>
    </Link>
  );
}

export default SlotContainer;
