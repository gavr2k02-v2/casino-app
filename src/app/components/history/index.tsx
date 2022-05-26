import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { FunctionExecutor } from '../../common/utils/FunctionExecutor';
import { api } from '../../services';
import styles from './styles.module.scss';
import { History as HistoryType } from '../../common/types/History';

interface IHistoryProps {
  page: number;
}

function History({ page }: IHistoryProps) {
  const [history, setHistory] = useState<HistoryType[]>([]);

  useEffect(() => {
    getHistory();
  }, [page]);

  const getHistory = async () => {
    const result = await FunctionExecutor.execute(() => api.historyService.getHistory({ page, limit: 30 }));
    result.data && setHistory(result.data);
  };

  return (
    <div className={styles.main}>
      <table>
        <tr>
          <th>Action</th>
          <th>Amount</th>
          <th>Time</th>
        </tr>
        {history.map((item) => (
          <tr>
            <td style={{ color: 'white' }}>{item.action}</td>
            <td style={{ color: item.amount >= 0 ? '#11998e' : 'rgb(255, 7, 58)' }}>{item.amount}</td>
            <td style={{ color: 'white' }}>{new Date(item.time).toLocaleString()}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default History;
