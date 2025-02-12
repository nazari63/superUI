import styled from 'styled-components';
import CopyText from '../utility/CopyText';
import { getAccountsInterface } from '../../../main/services/accountService';

interface Props extends SimpleComponent {
  account?: getAccountsInterface;
}

const AccountDetailModalWrapper = styled.div``;

function AccountDetailModal({ account }: Props) {
  return (
    <AccountDetailModalWrapper>
      <div>
        <div className="flex items-center gap-2">
          <b>Public Key</b>
          <span>{account?.publicKey}</span>
          <CopyText value={account?.publicKey || ''} />
        </div>
        <div className="flex items-center gap-2">
          <b>Private Key</b>
          <span>{account?.privateKey}</span>
          <CopyText value={account?.privateKey || ''} />
        </div>
      </div>
    </AccountDetailModalWrapper>
  );
}

export default AccountDetailModal;
