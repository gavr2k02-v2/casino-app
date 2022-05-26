import { h } from 'preact';
import styles from './styles.module.scss';
import EditProfile from '../../components/edit-profile';
import History from '../../components/history';
import { useEffect, useState } from 'preact/hooks';
import { FunctionExecutor } from '../../common/utils/FunctionExecutor';
import { api } from '../../services';

export function Profile() {
  const [page, setPage] = useState(0);
  const [pagesCount, setPagesCount] = useState(1);

  useEffect(() => {
    getCountPages();
  }, []);

  const getCountPages = async () => {
    const result = await FunctionExecutor.execute(() => api.historyService.getCountPages(30));
    result.data && setPagesCount(result.data);
  };

  const handlePageButtonClick = (index: number) => {
    setPage(getPageIndex(page, index, pagesCount));
  };

  return (
    <div className={styles.main}>
      <div class={styles.container}>
        <div class={styles.label}>Profile</div>
        <EditProfile />
        <div class={styles.label}>History</div>
        <History page={page} />
        <div className={styles.pages}>
          <div className={styles.button} onClick={() => handlePageButtonClick(-1)}>
            {'<'}
          </div>
          <div>
            {getPageSymbols(page, pagesCount).map((symbol) => (
              <span className={page + 1 === symbol && styles.current}>{symbol} </span>
            ))}
          </div>
          <div className={styles.button} onClick={() => handlePageButtonClick(1)}>
            {'>'}
          </div>
        </div>
      </div>
    </div>
  );
}

function getPageSymbols(page: number, count: number) {
  page += 1;

  if (count <= 5) {
    return [...Array(count).keys()].map((item) => item + 1);
  }

  if (count - page >= count - 3) {
    return [1, 2, 3, '...', count];
  }

  if (count - page < 3) {
    return [1, '...', count - 2, count - 1, count];
  }

  if (count > 1) {
    return [1, '...', page, '...', count];
  }

  return [1];
}

function getPageIndex(current: number, index: number, limit: number) {
  const value = current + index;

  if (value >= limit || value < 0) {
    return value === -1 ? limit - 1 : 0;
  }

  return value;
}
