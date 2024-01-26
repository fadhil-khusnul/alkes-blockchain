// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./RawAlkes.sol";
import "./DataGeneratedId.sol";

contract SupplyChain {
    address public immutable owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Not the owner");
        _;
    }

    enum Roles {
        NoRole,
        Manufaktur,
        Distributor,
        Kemenkes,
        RumahSakit,
        Customer
    }

    struct UserData {
        bytes name;
        bytes email;
        bytes noTelp;
        Roles role;
        address userAddr;
    }

    struct SupplyChainAlkesDetails {
        bytes namaAlkes;
        bytes deskripsiAlkes;
        bytes kategori_alkes;
        bytes subkategori_alkes;
        bytes klasifikasiAlkes;
        bytes tipeAlkes;
        bytes kelasResiko;
        bytes kuantitas;
        bytes noIzinEdar;
    }
    struct DataGeneratedIdSupply {
        // address id_informasi;
        bytes id_produk;
    }

    mapping(address => UserData) public userInfo;

    event UserRegister(address indexed _address, bytes name);
    event RequestEvent(
        address indexed distributor,
        address indexed manufaktur,
        address alkesAddr,
        uint indexed timestamp
    );
    event IzinEvent(
        address indexed distributor,
        address indexed kemenkes,
        address alkesAddr,
        uint indexed timestamp
    );
    event RsEvent(
        address rs,
        address indexed distributor,
        address alkesAddr,
        uint indexed timestamp
    );
    event PasienEvent(
        address pasien,
        address indexed faskes,
        address alkesAddr,
        uint indexed timestamp
    );

    function requestProduct(
        address distributor,
        address manufaktur,
        address packageAddr
    ) public {
        emit RequestEvent(
            distributor,
            manufaktur,
            packageAddr,
            block.timestamp
        );
    }

    function izinRequest(
        address distributor,
        address kemenkes,
        address alkesAddr
    ) public {
        emit IzinEvent(distributor, kemenkes, alkesAddr, block.timestamp);
    }

    function reqAlkesRs(
        address rs,
        address distributor,
        address alkesAddr
    ) public {
        emit RsEvent(rs, distributor, alkesAddr, block.timestamp);
    }

    function reqAlkesPasien(
        address pasien,
        address faskes,
        address alkesAddr
    ) public {
        emit PasienEvent(pasien, faskes, alkesAddr, block.timestamp);
    }

    function registerUser(
        bytes memory name,
        bytes memory email,
        bytes memory noTelp,
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
    // mapping(address => address[]) public dataGeneratedIds;

    function createAlkesManufaktur(
        SupplyChainAlkesDetails memory alkesDetails,
        address distributorAddr,
        address kemenkesAddr,
        address rumahSakitAddr,
        address pasieAddr
        // DataGeneratedIdSupply[] memory generatedIds
    )
        public
        returns (
            // GeneratedIdsData memory generatedIds
            address
        )
    {
        bytes20 alkesId = bytes20(
            sha256(abi.encodePacked(msg.sender, block.timestamp))
        );
        RawAlkes alkes = new RawAlkes(
            msg.sender,
            address(alkesId),
            RawAlkes.AlkesDetails({
                namaAlkes: alkesDetails.namaAlkes,
                deskripsiAlkes: alkesDetails.deskripsiAlkes,
                kategori_alkes: alkesDetails.kategori_alkes,
                subkategori_alkes: alkesDetails.subkategori_alkes,
                klasifikasiAlkes: alkesDetails.klasifikasiAlkes,
                tipeAlkes: alkesDetails.tipeAlkes,
                kelasResiko: alkesDetails.kelasResiko,
                kuantitas: alkesDetails.kuantitas,
                noIzinEdar: alkesDetails.noIzinEdar
            }),
            distributorAddr,
            kemenkesAddr,
            rumahSakitAddr,
            pasieAddr
        );
        address alkesAddress = address(alkes);
        dataAlkesManufaktur[msg.sender].push(address(alkes));

        // for (uint i = 0; i < generatedIds.length; i++) {
        //     DataGeneratedId data = new DataGeneratedId(
        //         alkesAddress,
        //         generatedIds[i].id_produk,
        //         alkesAddress
        //     );
        //     dataGeneratedIds[msg.sender].push(address(data));
        // }

        return address(alkesAddress);
    }

    function getNoOfPackagesOfSupplier() public view returns (uint) {
        return dataAlkesManufaktur[msg.sender].length;
    }

    function getAllPackages() public view returns (address[] memory) {
        return dataAlkesManufaktur[msg.sender];
    }

    // function getAllId()
    //     public
    //     view
    //     returns (address[] memory addr,address[] memory id_informasi, bytes[] memory id_produk)
    // {
    //     uint len = dataGeneratedIds[msg.sender].length;
    //     addr = new address[](len);
    //     id_informasi = new address[](len);
    //     id_produk = new bytes[](len);

    //     for (uint i = 0; i < len; i++) {
    //         address addrId = dataGeneratedIds[msg.sender][i];
    //         DataGeneratedId data = DataGeneratedId(addrId);
    //         // console.log(alkesNew);
    //         addr[i]= addrId;
    //         id_informasi[i] = data.getInformasi();
    //         id_produk[i] = data.getProduk();
    //     }

    //     return (addr, id_informasi, id_produk);
    // }

    function getAllPackagesData()
        public
        view
        returns (
            address[] memory retAddress,
            bytes[] memory retNamaAlkes,
            bytes[] memory retKlasifikasi
        )
    {
        uint len = dataAlkesManufaktur[msg.sender].length;
        retAddress = new address[](len);
        retNamaAlkes = new bytes[](len);
        retKlasifikasi = new bytes[](len);

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
