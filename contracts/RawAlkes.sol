// SPDX-License-Identifier: MIT
// pragma solidity >=0.6.6 <=0.8.23;
pragma solidity ^0.8.0;

pragma experimental ABIEncoderV2;

import "./Transactions.sol";

contract RawAlkes {
    address public Owner;

    enum packageStatus {
        atManufactur,
        atDistributor,
        atKemenkes,
        atRumahSakit
    }

   

    address productid;
    bytes32 namaAlkes;
    bytes32 deskripsiAlkes;
    bytes32 klasifikasiAlkes;
    bytes32 tipeAlkes;
    bytes32 kelasAlkes;
    bytes32 kelasResiko;
    bytes32 noIzinEdar;
    address distributor;
    address manufakturer;
    address kemenkes;
    address rumahSakit;
    packageStatus status;
    address txnContractAddress;

    constructor(
        address _creatorAddr,
        address _productid,
        bytes32 _namaAlkes,
        bytes32 _deskripsiAlkes,
        bytes32 _klasifikasiAlkes,
        bytes32 _tipeAlkes,
        bytes32 _kelasAlkes,
        bytes32 _kelasResiko,
        bytes32 _noIzinEdar,
        address _distributorAddr,
        address _kemenkesAddr,
        address _rumahSakitAddr
    ) public {
        Owner = _creatorAddr;
        productid = _productid;
        namaAlkes = _namaAlkes;
        deskripsiAlkes = _deskripsiAlkes;
        klasifikasiAlkes = _klasifikasiAlkes;
        tipeAlkes = _tipeAlkes;
        kelasAlkes = _kelasAlkes;
        kelasResiko = _kelasResiko;
        noIzinEdar = _noIzinEdar;
        manufakturer = _creatorAddr;
        distributor = _distributorAddr;
        kemenkes = _kemenkesAddr;
        rumahSakit = _rumahSakitAddr;
        status = packageStatus(0);
        Transactions txnContract = new Transactions(_distributorAddr);
        txnContractAddress = address(txnContract);
    }

    function getRawAlkes()
        public
        view
        returns (
            address,
            bytes32,
            bytes32,
            bytes32,
            bytes32,
            bytes32,
            bytes32,
            bytes32,
            address,
            address,
            address,
            address,
            address
        )
    {
        return (
            productid,
            namaAlkes,
            deskripsiAlkes,
            klasifikasiAlkes,
            tipeAlkes,
            kelasAlkes,
            kelasResiko,
            noIzinEdar,
            manufakturer,
            distributor,
            kemenkes,
            rumahSakit,
            txnContractAddress
        );
    }

    function getRawAlkesStatus() public view returns (uint) {
        return uint(status);
    }

    function getNamaAlkes() public view returns (bytes32) {
        return namaAlkes;
    }

    function getKlasifikasiALkes() public view returns (bytes32) {
        return klasifikasiAlkes;
    }

    function updatedistributorAddress(address addr) public {
        distributor = addr;
        status = packageStatus(1);
    }
}
