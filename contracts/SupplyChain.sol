// SPDX-License-Identifier: MIT

// pragma solidity >=0.6.6 <=0.8.23;
pragma solidity ^0.8.0;

pragma experimental ABIEncoderV2;

import "./RawAlkes.sol";


contract SupplyChain {
    address Owner;

    constructor() public {
        Owner = msg.sender;
    }

    modifier onlyOwner() {
        require(Owner == msg.sender);
        _;
    }

    modifier checkUser(address addr) {
        require(addr == msg.sender);
        _;
    }

    enum roles {
        noRole,
        manufaktur,
        distributor,
        kemenkes,
        rumah_sakit,
        customer
        
    }

    //////////////// Events ////////////////////

    event UserRegister(address indexed _address, bytes32 name);
    event buyEvent(
        address buyer,
        address indexed seller,
        address packageAddr,
        uint indexed timestamp
    );
    event respondEvent(
        address indexed buyer,
        address seller,
        address packageAddr,
        bytes signature,
        uint indexed timestamp
    );
    event sendEvent(
        address seller,
        address buyer,
        address indexed packageAddr,
        bytes signature,
        uint indexed timestamp
    );
    event receivedEvent(
        address indexed buyer,
        address seller,
        address packageAddr,
        bytes signature,
        uint indexed timestamp
    );

    //////////////// Event functions (All entities) ////////////////////

    function requestProduct(
        address buyer,
        address seller,
        address packageAddr
    ) public {
        emit buyEvent(buyer, seller, packageAddr, block.timestamp);
    }

    function respondToEntity(
        address buyer,
        address seller,
        address packageAddr,
        bytes memory signature
    ) public {
        emit respondEvent(buyer, seller, packageAddr, signature, block.timestamp);
    }

    function sendPackageToEntity(
        address buyer,
        address seller,
        address packageAddr,
        bytes memory signature
    ) public {
        emit sendEvent(seller, buyer, packageAddr, signature, block.timestamp);
    }

    /////////////// Users (Only Owner Executable) //////////////////////

    struct userData {
        bytes32 name;
        bytes32 email;
        bytes32 noTelp;
        roles role;
        address userAddr;
    }

    mapping(address => userData) public userInfo;

    function registerUser(
        bytes32 name,
        bytes32 email,
        bytes32 noTelp,
        uint role,
        address _userAddr
    ) public onlyOwner {
        userInfo[_userAddr].name = name;
        userInfo[_userAddr].email = email;
        userInfo[_userAddr].noTelp = noTelp;
        // userInfo[_userAddr].userLoc = loc;
        userInfo[_userAddr].role = roles(role);
        userInfo[_userAddr].userAddr = _userAddr;

        emit UserRegister(_userAddr, name);
    }

    function changeUserRole(
        uint _role,
        address _addr
    ) public onlyOwner returns (string memory) {
        userInfo[_addr].role = roles(_role);
        return "Role Updated!";
    }

    function getUserInfo(
        address _address
    ) public view returns (userData memory) {
        return userInfo[_address];
    }
    

    /////////////// Manufaktur //////////////////////

    mapping(address => address[]) public supplierRawMaterials;

    function createAlkesManufaktur(
       
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
     
    ) public returns (address) {
        RawAlkes rawMaterial = new RawAlkes(
            msg.sender,
            address(bytes20(sha256(abi.encodePacked(msg.sender, block.timestamp)))),
            _namaAlkes,
            _deskripsiAlkes,
            _klasifikasiAlkes,
            _tipeAlkes,
            _kelasAlkes,
            _kelasResiko,
            _noIzinEdar,
            _distributorAddr,
            _kemenkesAddr,
            _rumahSakitAddr
        );

        supplierRawMaterials[msg.sender].push(address(rawMaterial));
        return address(rawMaterial);
    }

    function getNoOfPackagesOfSupplier() public view returns (uint) {
        return supplierRawMaterials[msg.sender].length;
    }

    function getAllPackages() public view returns (address[] memory) {
        uint len = supplierRawMaterials[msg.sender].length;
        address[] memory ret = new address[](len);
        for (uint i = 0; i < len; i++) {
            ret[i] = supplierRawMaterials[msg.sender][i];
        }
        return ret;
    }

      function getAllPackagesData()
        public
        view
        returns (address[] memory, bytes32[] memory, bytes32[] memory)
    {
        uint len = supplierRawMaterials[msg.sender].length;
        address[] memory retAddresses = new address[](len);
        bytes32[] memory retDescriptions = new bytes32[](len);
        bytes32[] memory retQuantities = new bytes32[](len);

        for (uint i = 0; i < len; i++) {
            address rawMaterialAddr = supplierRawMaterials[msg.sender][i];
            RawAlkes rawMaterialNew = RawAlkes(rawMaterialAddr);

            // console.log(rawMaterialNew);
            retAddresses[i] = rawMaterialAddr;
            retDescriptions[i] = rawMaterialNew.getNamaAlkes();
            retQuantities[i] = rawMaterialNew.getKlasifikasiALkes();
        }

        return (retAddresses, retDescriptions, retQuantities);
    }
}
