import { h } from 'preact';
import styles from './styles.module.scss';

function Spinner() {
  return <div className={styles.loader}></div>;
}

export default Spinner;
