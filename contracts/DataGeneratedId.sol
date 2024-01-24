// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;
import "./Transactions.sol";

contract DataGeneratedId {
    address public immutable id_informasi;
    bytes public id_produk;

    address public txnContractAddress;

    constructor(address _id_informasi, bytes memory _id_produk, address _addr) {
        id_informasi = _id_informasi;
        id_produk = _id_produk;
        initializeTxnContract(_addr);
    }

    function initializeTxnContract(address addr) internal {
        Transactions txnContract = new Transactions(addr);
        txnContractAddress = address(txnContract);
    }

    function getId() public view returns (address, bytes memory) {
        return (id_informasi, id_produk);
    }

     function getInformasi() public view returns (address) {
        return id_informasi;
    }
     function getProduk() public view returns (bytes memory) {
        return id_produk;
    }

    
}
