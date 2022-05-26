import { h } from 'preact';
import { Input } from '../../components/input';
import { Toggle } from '../../components/toggle';
import { Button } from '../../components/button';
import styles from './styles.module.scss';
import { useState } from 'preact/hooks';
import { FunctionExecutor } from '../../common/utils/FunctionExecutor';
import { useObservable } from '../../common/utils/rxjs-helper/useObservable';
import { api } from '../../services';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

export function Auth() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [login, setLogin] = useState(true);
  const load = useObservable(FunctionExecutor.loadSubject);

  const handleButtonClick = async () => {
    if (!name.length) {
      return;
    }

    if (!password.length) {
      return;
    }

    const result = await (login ? handleLogin() : handleSignUp());
    result.success && navigate('../slots', { replace: true });
  };

  const handleLogin = () => {
    return FunctionExecutor.execute(() => api.userService.loginByPassword({ name, password }));
  };

  const handleSignUp = () => {
    if (password !== repeatPassword) {
      Swal.fire('Error', 'Password not right', 'error');
      return { success: false };
    }

    return FunctionExecutor.execute(() => api.userService.signup({ name, password }));
  };

  return (
    <div className={styles.main}>
      <div class={styles.container}>
        <div class={styles.label}>{login ? 'Login' : 'Sign Up'}</div>
        <Input item={name} setItem={setName} label={'Username'} />
        <Input item={password} setItem={setPassword} label={'Password'} type={'password'} />
        {!login && (
          <Input item={repeatPassword} setItem={setRepeatPassword} label={'Confirm password'} type={'password'} />
        )}
        <Toggle value={login} setValue={setLogin} label={'Login / Sign Up'} />
        <Button onClick={() => handleButtonClick()} label={login ? 'Login' : 'Sign Up'} type={'base'} disabled={load} />
      </div>
    </div>
  );
}
