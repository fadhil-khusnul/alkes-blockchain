// SPDX-License-Identifier: MIT
// pragma solidity >=0.6.6 <=0.8.23;
pragma solidity ^0.8.0;

pragma experimental ABIEncoderV2;

import "./Transactions.sol";

contract RawAlkes {
    address Owner;

    enum packageStatus {
        atCreator,
        picked,
        delivered
    }

    event ShippmentUpdate(
        address indexed ProductID,
        address indexed Transporter,
        address indexed Manufacturer,
        uint TransporterType,
        uint Status
    );

    address productid;
    bytes32 namaAlkes;
    bytes32 deskripsiAlkes;
    bytes32 klasifikasiAlkes;
    bytes32 tipeAlkes;
    bytes32 kelasAlkes;
    bytes32 kelasResiko;
    address transporter;
    address manufacturer;
    address supplier;
    packageStatus status;
    bytes32 packageReceiverDescription;
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
        address _manufacturerAddr
    ) public {
        Owner = _creatorAddr;
        productid = _productid;
        namaAlkes = _namaAlkes;
        deskripsiAlkes = _deskripsiAlkes;
        klasifikasiAlkes = _klasifikasiAlkes;
        tipeAlkes = _tipeAlkes;
        kelasAlkes = _kelasAlkes;
        kelasResiko = _kelasResiko;
        manufacturer = _manufacturerAddr;
        supplier = _creatorAddr;
        status = packageStatus(0);
        Transactions txnContract = new Transactions(_manufacturerAddr);
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
            supplier,
            manufacturer,
            txnContractAddress
        );
    }

    function getRawMaterialStatus() public view returns (uint) {
        return uint(status);
    }

    function getNamaAlkes() public view returns (bytes32) {
        return namaAlkes;
    }

    function getKlasifikasiALkes() public view returns (bytes32) {
        return klasifikasiAlkes;
    }

    function updateManufacturerAddress(address addr) public {
        manufacturer = addr;
    }

    function pickPackage(address _transporterAddr) public {
        require(
            _transporterAddr == transporter,
            "Only transporter of the package can pick package"
        );
        require(status == packageStatus(0), "Package must be at Supplier.");
        status = packageStatus(1);
        emit ShippmentUpdate(productid, transporter, manufacturer, 1, 1);
    }

    function receivedPackage(address _manufacturerAddr) public {
        require(
            _manufacturerAddr == manufacturer,
            "Only Manufacturer of the package can receieve the package"
        );

        require(status == packageStatus(1), "Product not picked up yet");
        status = packageStatus(2);
        emit ShippmentUpdate(productid, transporter, manufacturer, 1, 2);
    }
}
