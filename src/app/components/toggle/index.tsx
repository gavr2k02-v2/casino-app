import styles from './styles.module.scss';

interface IToggleProps {
  label: string;
  value: boolean;
  setValue: (value: boolean) => void;
}
export function Toggle({ value, setValue, label }: IToggleProps) {
  return (
    <div class={styles.item}>
      <label class={styles.toggle} for='uniqueID'>
        <input type='checkbox' class={styles.toggle__input} id='uniqueID' onClick={() => setValue(!value)} />
        <span class={styles.toggleTrack}>
          <span class={styles.toggleIndecator}>
            <span class='checkMark'></span>
          </span>
        </span>
        {label}
      </label>
    </div>
  );
}
