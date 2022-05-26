import avatar1 from '../../../assets/imgs/avatar1.svg';
import avatar2 from '../../../assets/imgs/avatar2.svg';
import avatar3 from '../../../assets/imgs/avatar3.svg';
import avatar4 from '../../../assets/imgs/avatar4.svg';
import avatar5 from '../../../assets/imgs/avatar5.svg';

export function getAvatar(index: number) {
  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];
  return avatars[index];
}
