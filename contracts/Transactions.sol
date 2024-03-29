// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

contract Transactions {



    address public immutable creator;




    struct Txns {
        bytes32 txnHash;
        address fromAddr;
        address toAddr;
        bytes32 prevTxn;
        uint timestamp;
    }

    mapping(uint => Txns) public transactions;
    uint public txnCount = 0;

    event TxnCreated(
        bytes32 _txnHash,
        address _from,
        address _to,
        bytes32 _prev,
        uint _timestamp
    );

    constructor(address _creator) {
        require(_creator != address(0));
        creator = _creator;
    }

    // function createTxnEntry(
    //     bytes32 _txnHash,
    //     address _from,
    //     address _to,
    //     bytes32 _prev
    // ) public {
    //     uint _timestamp = block.timestamp;
    //     if (txnCount == 0) {
    //         transactions[txnCount] = Txns(
    //             _txnHash,
    //             _from,
    //             _to,
    //             _prev,
    //             _timestamp
    //         );
    //     } else {
    //         require(
    //             transactions[txnCount - 1].txnHash == _prev,
    //             "Transaction error occurred!"
    //         );
    //         transactions[txnCount] = Txns(
    //             _txnHash,
    //             _from,
    //             _to,
    //             _prev,
    //             _timestamp
    //         );
    //     }
    //     txnCount += 1;
    //     emit TxnCreated(_txnHash, _from, _to, _prev, _timestamp);
    // }

   
    function createTxnEntry(
        bytes32 txnHash,
        address from,
        address to,
        bytes32 prev
    ) 
    
    
    public {
        uint blockNumber = block.number;
        if (txnCount == 0) {
            transactions[txnCount] = Txns(
                txnHash,
                from,
                to,
                prev,
                blockNumber
            );
        } else {
            require(
                transactions[txnCount - 1].txnHash == prev,
                "Transaction error occurred!"
            );
            transactions[txnCount] = Txns(
                txnHash,
                from,
                to,
                prev,
                blockNumber
            );
        }
        txnCount += 1;
        emit TxnCreated(txnHash, from, to, prev, blockNumber);
    }

    function getAllTransactions() public view returns (Txns[] memory) {
        uint len = txnCount;
        Txns[] memory ret = new Txns[](len);
        for (uint i = 0; i < len; i++) {
            ret[i] = transactions[i];
        }
        return ret;
    }
}
