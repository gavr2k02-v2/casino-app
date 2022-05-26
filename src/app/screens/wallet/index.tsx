import { h } from 'preact';
import styles from './styles.module.scss';
import { api } from '../../services';
import { FunctionExecutor } from '../../common/utils/FunctionExecutor';
import { Button } from '../../components/button';
import { useState } from 'preact/hooks';
import { ContractFactory } from '../../services/conract-factory/ContractFactory';
import { Input } from '../../components/input';

export function Wallet() {
  const [account, setAccount] = useState<string>();
  const [coinsToPay, setCoinsToPay] = useState<string>();
  const [coinsToWithdrawal, setCoinsToWithdrawal] = useState<string>();
  const [price, setPrice] = useState<number>();

  const handleBuyCoinsClick = () => {
    FunctionExecutor.execute(() => api.payBlockchainService.buyCoins(+coinsToPay));
  };

  const handleWithdrawCoinsClick = () => {
    FunctionExecutor.execute(() => api.payBlockchainService.withdrawCoins(+coinsToWithdrawal));
  };

  const handleConnectButtonClick = async () => {
    await FunctionExecutor.execute(() => ContractFactory.initWeb3());
    init();
  };

  const init = async () => {
    const accountResult = await FunctionExecutor.execute(() => ContractFactory.getAccount());
    if (!accountResult.success) {
      return;
    }

    setAccount(accountResult.data);

    const priceResult = await FunctionExecutor.execute(() => api.payBlockchainService.getPrice());
    priceResult.success && setPrice(priceResult.data);
  };

  const validateCoins = (value: string, handler: (value: string) => void) => {
    if (!/^\d+$/.test(value) && value.length !== 0) {
      return;
    }

    handler(value);
  };

  return (
    <div className={styles.main}>
      <div class={styles.container}>
        {!account ? (
          <Button label='Connect to wallet' onClick={() => handleConnectButtonClick()} type={'base'} />
        ) : (
          <>
            <div class={styles.account}>Address: {prepareAccountString(account)}</div>
            <div class={styles.label}>Wallet:</div>
            <div className={styles.blocks}>
              <div className={styles.block}>
                <Input
                  item={coinsToPay}
                  setItem={(value: string) => validateCoins(value, setCoinsToPay)}
                  label={'Coins to pay'}
                  type={'number'}
                />
                <Button label='Pay' onClick={() => handleBuyCoinsClick()} type={'base'} style={{ marginTop: '5%' }} />

                {!!coinsToPay && (
                  <div className={styles.price}>Amount: {preparePriceCoinsString(+coinsToPay, price)} Eth</div>
                )}
              </div>
              <div className={styles.block}>
                <Input
                  item={coinsToWithdrawal}
                  setItem={(value: string) => validateCoins(value, setCoinsToWithdrawal)}
                  label={'Coins to withdrawal'}
                  type={'number'}
                />
                <Button
                  label='Withdrawal'
                  onClick={() => handleWithdrawCoinsClick()}
                  type={'danger'}
                  style={{ marginTop: '5%' }}
                />
                {!!coinsToWithdrawal && (
                  <div className={styles.price}>Amount: {preparePriceCoinsString(+coinsToWithdrawal, price)} Eth</div>
                )}
              </div>
            </div>
            <div class={styles.description}>One coins price: {preparePriceString(price)} Eth</div>
          </>
        )}
      </div>
    </div>
  );
}

function preparePriceCoinsString(coins: number, price: number): string {
  return (coins * preparePriceString(price)).toFixed(4);
}

function preparePriceString(price: number) {
  return price / Math.pow(10, 18);
}

function prepareAccountString(account: string): string {
  return account.substr(0, 6) + '...' + account.substr(account.length - 4, 4);
}
