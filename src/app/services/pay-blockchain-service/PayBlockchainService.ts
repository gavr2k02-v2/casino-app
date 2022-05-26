import { CASINO_ABI } from '../ABIs/Casino';
import { ContractFactory } from '../conract-factory/ContractFactory';
import { Contract } from 'web3-eth-contract';
import { api } from '..';

export class PayBlockchainService {
  private _contract: Contract;
  private _price: number;

  constructor() {}

  public async withdrawCoins(amount: number) {
    const contract = this.getContract();
    const from = await ContractFactory.getAccount();

    await api.userService.withdraw(amount, from);

    const params = { from };
    const key = 123;
    await contract.methods.withdrawCoins(amount, key).send(params);
  }

  public async buyCoins(count: number): Promise<void> {
    const contract = this.getContract();

    const price = await this.getPrice();
    const from = await ContractFactory.getAccount();

    const params = { value: price * count, from };
    await contract.methods.buyCoins(api.userService.user.uid).send(params);
    await this.syncBalance();
  }

  public async syncBalance(): Promise<void> {
    const info = await this.getPayInfo();
    await api.userService.syncPayInfo(info);
  }

  public async getPrice(): Promise<number> {
    if (this._price) {
      return this._price;
    }

    const contract = this.getContract();
    this._price = await contract.methods.getPrice().call();

    return this._price;
  }

  private async getPayInfo(): Promise<string> {
    const contract = this.getContract();
    return contract.methods.getAllByUid(api.userService.user.uid).call();
  }

  private getContract(): Contract {
    if (this._contract) {
      return this._contract;
    }

    this._contract = ContractFactory.getContract(CASINO_ABI.abi, '0xf54848f73029bA4A0B2230C3AfC3f3D9Ebae6C3B');
    return this._contract;
  }
}
