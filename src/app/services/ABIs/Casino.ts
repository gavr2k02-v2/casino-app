export const CASINO_ABI = {
  abi: [
    {
      inputs: [],
      name: 'getPrice',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '_uid',
          type: 'string',
        },
      ],
      name: 'getAllByUid',
      outputs: [
        {
          components: [
            {
              internalType: 'address',
              name: 'wallet',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'time',
              type: 'uint256',
            },
            {
              internalType: 'int256',
              name: 'coins',
              type: 'int256',
            },
          ],
          internalType: 'struct Casino.PayData[]',
          name: '',
          type: 'tuple[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '_uid',
          type: 'string',
        },
      ],
      name: 'buyCoins',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_amount',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_key',
          type: 'uint256',
        },
      ],
      name: 'withdrawCoins',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
  ],
};
