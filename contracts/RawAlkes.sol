// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./Transactions.sol";

contract RawAlkes {
    address public immutable owner;

    enum PackageStatus {
        AtManufacturer,
        AtDistributor,
        AtKemenkes,
        AtRumahSakit
    }

    struct AlkesDetails {
        bytes32 namaAlkes;
        bytes32 deskripsiAlkes;
        bytes32 klasifikasiAlkes;
        bytes32 tipeAlkes;
        bytes32 kelasAlkes;
        bytes32 kelasResiko;
        bytes32 noIzinEdar;
    }

    address public immutable productid;
    address public distributor;
    address public immutable manufakturer;
    address public kemenkes;
    address public rumahSakit;

    AlkesDetails public alkesDetails;
    PackageStatus public status;
    address public txnContractAddress;

    constructor(
        address _creatorAddr,
        address _productid,
        AlkesDetails memory _alkesDetails,
        address _distributorAddr,
        address _kemenkesAddr,
        address _rumahSakitAddr
    ) {
        require(
            _creatorAddr != address(0) &&
                _productid != address(0) &&
                _distributorAddr != address(0) &&
                _kemenkesAddr != address(0) &&
                _rumahSakitAddr != address(0)
        );
        // require(_productid != address(0) );
        // require(_distributorAddr != address(0));
        // require(_kemenkesAddr != address(0));
        // require(_rumahSakitAddr != address(0));

        owner = _creatorAddr;
        productid = _productid;
        alkesDetails = _alkesDetails;
        manufakturer = _creatorAddr;
        distributor = _distributorAddr;
        kemenkes = _kemenkesAddr;
        rumahSakit = _rumahSakitAddr;
        status = PackageStatus.AtManufacturer;
        initializeTxnContract(_distributorAddr);
    }

    function initializeTxnContract(address distributorAddr) internal {
        Transactions txnContract = new Transactions(distributorAddr);
        txnContractAddress = address(txnContract);
    }

    function getRawAlkes()
        public
        view
        returns (
            address,
            AlkesDetails memory,
            address,
            address,
            address,
            address,
            address
        )
    {
        return (
            productid,
            alkesDetails,
            manufakturer,
            distributor,
            kemenkes,
            rumahSakit,
            txnContractAddress
        );
    }

    function getNamaAlkes() public view returns (bytes32) {
        return alkesDetails.namaAlkes;
    }

    function getKlasifikasiALkes() public view returns (bytes32) {
        return alkesDetails.klasifikasiAlkes;
    }

    function getRawAlkesStatus() public view returns (uint) {
        return uint(status);
    }

    function updatedistributorAddress(address addr) public {
        require(addr != address(0), "Invalid address");

        distributor = addr;
        status = PackageStatus.AtDistributor;
    }

    function distributorToKemenkes(address addr) public {
        require(addr != address(0), "Invalid address");

        kemenkes = addr;
    }

    function izinEdarApprove(bytes32 nomor, address addr) public {
        alkesDetails.noIzinEdar = nomor;
        require(addr != address(0), "Invalid address");
        kemenkes = addr;
        status = PackageStatus.AtKemenkes;
    }

    function distributorToRs(address addr) public {
        require(addr != address(0), "Invalid address");
        rumahSakit = addr;
        status = PackageStatus.AtRumahSakit;
    }
}
