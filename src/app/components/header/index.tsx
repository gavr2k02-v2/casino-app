import h from 'react';
import styles from './styles.module.scss';
import wallet from '../../../assets/imgs/wallet.svg';
import home from '../../../assets/imgs/home.svg';
import controller from '../../../assets/imgs/controller.svg';
import login from '../../../assets/imgs/login.svg';
import { Link } from 'react-router-dom';
import { Pathes } from '../../common/enums/pathes';
import { useObservable } from '../../common/utils/rxjs-helper/useObservable';
import { api } from '../../services';
import { getAvatar } from '../../common/utils';

function Header() {
  const user = useObservable(api.userService.userSubject);

  return (
    <div className={styles.header}>
      {!user ? (
        <Link to={Pathes.AUTH}>
          <div className={`${styles.item} ${styles.loginBlock}`}>
            <img src={login} className={styles.loginIcon} />
            <div className={styles.label}>Login/SignUp</div>
          </div>
        </Link>
      ) : (
        <>
          <Link to={Pathes.PROFILE} className={`${styles.item} ${styles.profileBlock}`}>
            <img src={getAvatar(user.avatar)} className={styles.profileIcon} />
          </Link>

          <Link to={Pathes.WALLET} className={`${styles.item} ${styles.coinsBlock}`}>
            <img src={wallet} className={styles.coinsIcon} />
            <div className={styles.coins}>{prepareCoinsSring(user.balance)}</div>
          </Link>
        </>
      )}

      <Link to={Pathes.HOME}>
        <div className={`${styles.item} ${styles.linkBlock2}`}>
          <img src={home} className={styles.linkIcon2} />
          <div className={styles.link}>Home</div>
        </div>
      </Link>
      <Link to={Pathes.SLOTS}>
        <div className={`${styles.item} ${styles.linkBlock}`}>
          <img src={controller} className={styles.linkIcon} />
          <div className={styles.link}>Games</div>
        </div>
      </Link>
    </div>
  );
}
function prepareCoinsSring(coins = 0) {
  return `${coins}`.length > 9 ? `${`${coins}`.slice(0, 9)}...` : String(coins).padStart(9, '0');
}

export default Header;
