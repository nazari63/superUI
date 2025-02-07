import { ipcMain } from 'electron';
import { AccountList } from '../../shared/constant/account';
import { getPublicClient } from '../../shared/utils/client';

export type getAccountsResponse = {
  privateKey: string;
  publicKey: `0x${string}`;
  balance: bigint;
}[];

export class AccountService {
  constructor() {
    this.registerEvents();
  }

  registerEvents() {
    // Receive user data from renderer
    // ipcMain.handle(
    //   'save-user',
    //   async (_, user: { id: string; name: string }) => {
    //     this.users[user.id] = user.name;
    //     console.log(`User saved: ${user.id} - ${user.name}`);
    //     return { success: true, message: 'User saved successfully' };
    //   },
    // );

    ipcMain.handle('get-accounts', async (_, chain: any) => {
      try {
        const client = getPublicClient(chain);
        const balances = await Promise.all(
          AccountList.map(async (account) => {
            const balance = await client.getBalance({
              address: account.publicKey,
            });

            return {
              privateKey: account.privateKey,
              publicKey: account.publicKey,
              balance, // You might want to convert it using ethers.utils.formatEther(balance)
            };
          }),
        );

        return balances;
      } catch (error) {
        console.error('Error fetching balances:', error);
      }
    });
  }
}
