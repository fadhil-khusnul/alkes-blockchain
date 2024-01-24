module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*",
      gas: 30000000,
      from: '0x4d4f606e355cdf93f95555C1dd6BdBEB9ef835FF',
      // from: '0xde3950B20eae369a8d53cf31B123CadAB44AAbb5',
      // type: "ganache",
      // blockTime: 1, // Adjust block time as needed
      // gasLimit: 8000000,
      // allowUnlimitedContractSize: true,
      // eip1559: true, // Enable EIP-1559 support
    },
  },
  contracts_directory: './contracts/',
  contracts_build_directory: './src/build/',
  compilers: {
    solc: {
      version: "0.8.0",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  },
  mocha: {
    useColors: true
  }
}