import { h } from 'preact';
import { useState } from 'preact/hooks';
import Swal from 'sweetalert2';
import { UpdateUser } from '../../common/types/UpdateUser';
import { getAvatar } from '../../common/utils';
import { FunctionExecutor } from '../../common/utils/FunctionExecutor';
import { useObservable } from '../../common/utils/rxjs-helper/useObservable';
import { api } from '../../services';
import { Button } from '../button';
import { Input } from '../input';
import styles from './styles.module.scss';
import 'sweetalert2/src/sweetalert2.scss';

function EditProfile() {
  const user = useObservable(api.userService.userSubject);

  if (!user) {
    return;
  }

  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [avatar, setAvatar] = useState(user.avatar);

  const handleAvatarButtonClick = (index: number) => {
    setAvatar(getAvatarIndex(avatar, index));
  };

  const validatePassword = () => {
    if (password === repeatPassword) {
      return;
    }

    Swal.fire('Error', 'Passwords do not match', 'error');
    throw new Error('Passwords do not match');
  };

  const handleSaveButtonClick = async () => {
    const data: UpdateUser = {};

    user.name !== name && (data.name = name);
    user.avatar !== avatar && (data.avatar = avatar);

    if (password) {
      validatePassword();
      data.password = password;
      data.oldPassword = oldPassword;
    }

    if (!Object.keys(data).length) {
      return;
    }

    await FunctionExecutor.execute(() => api.userService.updateUser(data));
  };

  return (
    <div className={styles.main}>
      <div className={styles.avatarBlock}>
        <img src={getAvatar(avatar)} className={styles.img} />
        <div className={styles.buttons}>
          <div className={styles.button} onClick={() => handleAvatarButtonClick(-1)}>
            {'<'}
          </div>
          <div className={styles.button} onClick={() => handleAvatarButtonClick(1)}>
            {'>'}
          </div>
        </div>
      </div>

      <div className={styles.settingsBlock}>
        <Input item={name} setItem={setName} label={'Username'} />
        <Input item={password} setItem={setPassword} label={'Password'} type={'password'} />

        {password.length ? (
          <>
            <Input item={repeatPassword} setItem={setRepeatPassword} label={'Confirm'} type={'password'} />
            <Input item={oldPassword} setItem={setOldPassword} label={'Old password'} type={'password'} />
          </>
        ) : null}

        <Button label='Save' onClick={() => handleSaveButtonClick()} type={'base'} style={{ marginTop: '5%' }} />
      </div>
    </div>
  );
}

function getAvatarIndex(current: number, index: number) {
  const value = current + index;

  if (value > 4 || value < 0) {
    return value === -1 ? 4 : 0;
  }

  return value;
}

export default EditProfile;
