import styles from './styles.module.scss';

interface IButtonProps {
  onClick: () => Promise<void> | void;
  label: string;
  type: string;
  disabled?: boolean;
  style?: Record<string, string>;
}

export function Button({ onClick, label, type, disabled, style }: IButtonProps) {
  return (
    <div class={styles.item}>
      <button
        class={`${styles[disabled ? 'disabled' : type]} ${styles.button}`}
        onClick={() => onClick()}
        disabled={disabled}
        style={style}
      >
        {label}
      </button>
    </div>
  );
}
