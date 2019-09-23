import tokens from '@/tokens/tokens-xero.json';
import contracts from '@/contracts/contract-abi-xero.json';
import xero from '@/assets/images/networks/xero.png';

export default {
  name: 'XERO',
  name_long: 'Xerom',
  homePage: 'xerom.org',
  blockExplorerTX: 'https://explorer.xerom.org/tx/[[txHash]]',
  blockExplorerAddr: 'https://explorer.xerom.org/address/[[address]]',
  chainID: 1313500,
  tokens: tokens,
  contracts: contracts,
  icon: xero,
  currencyName: 'XERO'
};
