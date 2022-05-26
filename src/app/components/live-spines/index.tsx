import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { FunctionExecutor } from '../../common/utils/FunctionExecutor';
import { useObservable } from '../../common/utils/rxjs-helper/useObservable';
import { api } from '../../services';
import styles from './styles.module.scss';

import birdSlot from '../../../assets/imgs/bird-slot.png';
import crabSlot from '../../../assets/imgs/crab-slot.png';
import utyaSlot from '../../../assets/imgs/utya-slot.png';
import { GameId } from '../../common/enums/GameId';

function LiveSpines() {
  const spines = useObservable(api.historyService.spinesSubject);

  useEffect(() => {
    init();
    api.historyService.subscribe(`live-spines`);
    return () => {
      api.historyService.unsubscribe(`live-spines`);
    };
  }, []);

  const init = async () => {
    await FunctionExecutor.execute(() => api.historyService.getLastSpines(10));
  };

  return (
    <div className={styles.main}>
      <div className={styles.label}>Live spines</div>
      <div className={styles.blocks}>
        {spines?.map((item) => (
          <div className={styles.item}>
            <img className={styles.img} src={getImgByGameId(item.action)} />
            <div className={styles.username}>{item.username}</div>
            <div className={styles.amount}>
              Amount:
              <span style={{ color: item.amount >= 0 ? '#11998e' : 'rgb(255, 7, 58)', marginLeft: '5px' }}>
                {item.amount}
              </span>
            </div>
            <div className={styles.time}>{new Date(item.time).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getImgByGameId(gameId: GameId) {
  const imgs = {
    [GameId.BIRD_SLOT]: birdSlot,
    [GameId.CRAB_SLOT]: crabSlot,
    [GameId.UTYA_SLOT]: utyaSlot,
  };

  return imgs[gameId];
}

export default LiveSpines;
