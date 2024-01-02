module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      from: '0xA114C259b506d8419D17dF8ab949c3De52024Bca',
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
  }
}