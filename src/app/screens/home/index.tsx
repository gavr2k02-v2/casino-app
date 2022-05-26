import { h } from 'preact';
import LiveSpines from '../../components/live-spines';
import styles from './styles.module.scss';

function Home() {
  return (
    <div className={styles.main}>
      <LiveSpines />
    </div>
  );
}

export default Home;
