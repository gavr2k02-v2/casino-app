import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { useParams } from 'react-router-dom';
import { GameId } from '../../common/enums/GameId';
import { CrabSpinSlot } from './games-components/CrabSpinSlot';
import { SpinSlot } from './games-components/SpinSlot';
import { UtyaSpinSlot } from './games-components/UtyaSpinSlot';
import styles from './styles.module.scss';

function Game() {
  const { gameId } = useParams();
  const gridIframe = useRef(null);

  useEffect(() => {
    const component = getComponent(gameId as GameId, gridIframe);
    const listener = (message) => component.handleMessage(message);
    window.addEventListener('message', listener);

    return () => {
      window.removeEventListener('message', listener);
    };
  }, []);

  return (
    <div className={styles.main}>
      <iframe className={styles.iframe} ref={gridIframe} src={getLink(gameId)} frameBorder='0' scrolling='no'></iframe>
    </div>
  );
}

function getComponent(gameId: GameId, gridIframe) {
  const classes = {
    [GameId.BIRD_SLOT]: SpinSlot,
    [GameId.CRAB_SLOT]: CrabSpinSlot,
    [GameId.UTYA_SLOT]: UtyaSpinSlot,
  };

  return new classes[gameId](gridIframe);
}

function getLink(gameId: string) {
  const links = {
    [GameId.BIRD_SLOT]: 'http://localhost:8091/',
    [GameId.CRAB_SLOT]: 'http://localhost:8092/',
    [GameId.UTYA_SLOT]: 'http://localhost:8093/',
  };

  return links[gameId];
}

export default Game;
