import styles from './styles.module.scss';

interface IInputProps {
  setItem?: (value: string) => void;
  item: string;
  label: string;
  disabled?: boolean;
  type?: string;
}

export function Input({ setItem = () => {}, item, label, disabled, type = 'input' }: IInputProps) {
  return (
    <div class={styles.item}>
      <div class={`${styles.form__group} ${styles.field}`}>
        <input
          type={type}
          class={styles.form__field}
          placeholder={label}
          name={label}
          id={label}
          onInput={(e) => setItem((e.target as HTMLInputElement).value)}
          value={item}
          disabled={disabled}
          style={disabled ? { color: '#11998e' } : {}}
        />
        <label for={label} class={styles.form__label}>
          {label}
        </label>
      </div>
    </div>
  );
}
