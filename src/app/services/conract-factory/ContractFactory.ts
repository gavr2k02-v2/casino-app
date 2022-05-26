import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Torus from '@toruslabs/torus-embed';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
export abstract class ContractFactory {
  private static _web3: Web3;

  constructor() {}

  public static getContract(ABI: any, address: string) {
    return new ContractFactory._web3.eth.Contract(ABI, address);
  }

  public static getAccounts(): Promise<string[]> {
    return ContractFactory._web3.eth.requestAccounts();
  }

  public static async getAccount(): Promise<string> {
    if (!ContractFactory._web3) {
      return;
    }
    const [address] = await ContractFactory._web3.eth.getAccounts();
    return address;
  }

  public static async initWeb3() {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: 'INFURA_ID',
        },
      },
      torus: {
        package: Torus,
        networkParams: {
          host: 'https://localhost:8545',
          chainId: 1337,
          networkId: 1337,
        },
        config: {
          buildEnv: 'development',
        },
      },
      coinbasewallet: {
        package: CoinbaseWalletSDK,
        options: {
          appName: 'My Awesome App',
          infuraId: 'INFURA_ID',
          rpc: '',
          chainId: 1,
          darkMode: false,
        },
      },
    };

    const web3Modal = new Web3Modal({
      theme: 'dark',
      providerOptions,
    });

    const provider = await web3Modal.connect();
    ContractFactory._web3 = new Web3(provider);
  }
}
