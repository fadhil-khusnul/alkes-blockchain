// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import './RawAlkes.sol';

contract SupplyChain {
    address public immutable owner;

    constructor()  {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Not the owner");
        _;
    }

    enum Roles { NoRole, Manufaktur, Distributor, Kemenkes, RumahSakit, Customer }

    struct UserData {
        bytes32 name;
        bytes32 email;
        bytes32 noTelp;
        Roles role;
        address userAddr;
    }

    struct SupplyChainAlkesDetails {
        bytes32 namaAlkes;
        bytes32 deskripsiAlkes;
        bytes32 klasifikasiAlkes;
        bytes32 tipeAlkes;
        bytes32 kelasAlkes;
        bytes32 kelasResiko;
        bytes32 noIzinEdar;
    }

    

    mapping(address => UserData) public userInfo;

    event UserRegister(address indexed _address, bytes32 name);
    event RequestEvent(address indexed distributor, address indexed manufaktur, address alkesAddr, uint indexed timestamp);
    event IzinEvent(address indexed distributor, address indexed kemenkes, address alkesAddr, uint indexed timestamp);
    event RsEvent(address rs, address indexed distributor, address alkesAddr, uint indexed timestamp);

    function requestProduct(address distributor, address manufaktur, address packageAddr) public {
        emit RequestEvent(distributor, manufaktur, packageAddr, block.timestamp);
    }

    function izinRequest(address distributor, address kemenkes, address alkesAddr) public {
        emit IzinEvent(distributor, kemenkes, alkesAddr, block.timestamp);
    }

    function reqAlkesRs(address rs, address distributor, address alkesAddr) public {
        emit RsEvent(rs, distributor, alkesAddr, block.timestamp);
    }

    function registerUser(
        bytes32 name,
        bytes32 email,
        bytes32 noTelp,
        uint8 role,
        address userAddr
    ) public onlyOwner {
        userInfo[userAddr] = UserData({
            name: name,
            email: email,
            noTelp: noTelp,
            role: Roles(role),
            userAddr: userAddr
        });

        emit UserRegister(userAddr, name);
    }

    function changeUserRole(uint8 role, address addr) public onlyOwner {
        userInfo[addr].role = Roles(role);
    }

    function getUserInfo(address addr) public view returns (UserData memory) {
        return userInfo[addr];
    }

    mapping(address => address[]) public dataAlkesManufaktur;

    function createAlkesManufaktur(
        SupplyChainAlkesDetails memory alkesDetails,
        address distributorAddr,
        address kemenkesAddr,
        address rumahSakitAddr
    ) public returns (address) {
        bytes20 alkesId = bytes20(sha256(abi.encodePacked(msg.sender, block.timestamp)));
        RawAlkes alkes = new RawAlkes(
            msg.sender,
            address(alkesId),
            RawAlkes.AlkesDetails({
                namaAlkes: alkesDetails.namaAlkes,
                deskripsiAlkes: alkesDetails.deskripsiAlkes,
                klasifikasiAlkes: alkesDetails.klasifikasiAlkes,
                tipeAlkes: alkesDetails.tipeAlkes,
                kelasAlkes: alkesDetails.kelasAlkes,
                kelasResiko: alkesDetails.kelasResiko,
                noIzinEdar: alkesDetails.noIzinEdar
            }),
            distributorAddr,
            kemenkesAddr,
            rumahSakitAddr
        );

        dataAlkesManufaktur[msg.sender].push(address(alkes));
        return address(alkes);
    }

    function getNoOfPackagesOfSupplier() public view returns (uint) {
        return dataAlkesManufaktur[msg.sender].length;
    }

    function getAllPackages() public view returns (address[] memory) {
        return dataAlkesManufaktur[msg.sender];
    }


       function getAllPackagesData()
        public
        view
        returns (address[] memory retAddress, bytes32[] memory retNamaAlkes, bytes32[] memory retKlasifikasi)
    {
        uint len = dataAlkesManufaktur[msg.sender].length;
        retAddress = new address[](len);
        retNamaAlkes = new bytes32[](len);
        retKlasifikasi = new bytes32[](len);

        for (uint i = 0; i < len; i++) {
            address alkesAddr = dataAlkesManufaktur[msg.sender][i];
            RawAlkes alkesNew = RawAlkes(alkesAddr);

            // console.log(alkesNew);
            retAddress[i] = alkesAddr;
            retNamaAlkes[i] = alkesNew.getNamaAlkes();
            retKlasifikasi[i] = alkesNew.getKlasifikasiALkes();
        }

        return (retAddress, retNamaAlkes, retKlasifikasi);
    }
}
