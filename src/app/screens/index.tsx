import { FunctionExecutor } from '../common/utils/FunctionExecutor';
import { useObservable } from '../common/utils/rxjs-helper/useObservable';
import { Route, Routes } from 'react-router-dom';
import Header from '../components/header';
import Spinner from '../components/spinner';
import Home from './home';
import Slots from './slots';
import { Pathes } from '../common/enums/pathes';
import styles from './styles.module.scss';
import { h } from 'preact';
import Game from './game';
import { Auth } from './auth';
import { useEffect } from 'preact/hooks';
import { api } from '../services';
import { Profile } from './profile';
import { Wallet } from './wallet';

function App() {
  const load = useObservable(FunctionExecutor.loadSubject);
  const user = useObservable(api.userService.userSubject);

  useEffect(() => {
    !user && FunctionExecutor.execute(() => api.userService.loginByToken(), { needShowPopup: false });
    api.userService.subscribe(`user-${user?.uid}`);
    return () => {
      api.userService.unsubscribe(`user-${user?.uid}`);
    };
  }, [user]);

  return (
    <div className={styles.main}>
      {load && <Spinner />}
      <Header />
      <Routes>
        <Route path='/*' element={<Home />} />
        <Route path={Pathes.HOME} element={<Home />} />
        <Route path={Pathes.AUTH} element={<Auth />} />
        <Route path={Pathes.SLOTS} element={<Slots />} />
        <Route path={Pathes.SLOT} element={<Game />} />
        <Route path={Pathes.PROFILE} element={<Profile />} />
        <Route path={Pathes.WALLET} element={<Wallet />} />
      </Routes>
    </div>
  );
}

export default App;
