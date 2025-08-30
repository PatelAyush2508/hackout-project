// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HydrogenCredit {
    struct Credit {
        uint256 id;
        address owner;
        uint256 amount;
        string batchId;
        string metadataHash;
        bool retired;
    }

    uint256 public nextId;
    mapping(uint256 => Credit) public credits;

    event CreditIssued(uint256 id, address owner, uint256 amount, string batchId, string metadataHash);
    event CreditTransferred(uint256 id, address from, address to, uint256 amount);
    event CreditRetired(uint256 id, address owner, uint256 amount, string reason);

    function issueCredits(address to, uint256 amount, string memory batchId, string memory metadataHash) public {
        credits[nextId] = Credit(nextId, to, amount, batchId, metadataHash, false);
        emit CreditIssued(nextId, to, amount, batchId, metadataHash);
        nextId++;
    }

    function transfer(uint256 creditId, address to, uint256 amount) public {
        Credit storage c = credits[creditId];
        require(!c.retired, "Credit already retired");
        require(c.owner == msg.sender, "Not the owner");
        require(c.amount >= amount, "Insufficient credits");

        c.amount -= amount;
        credits[nextId] = Credit(nextId, to, amount, c.batchId, c.metadataHash, false);
        emit CreditTransferred(nextId, msg.sender, to, amount);
        nextId++;
    }

    function retire(uint256 creditId, uint256 amount, string memory reason) public {
        Credit storage c = credits[creditId];
        require(c.owner == msg.sender, "Not the owner");
        require(!c.retired, "Credit already retired");
        require(c.amount >= amount, "Insufficient credits");

        c.amount -= amount;
        if (c.amount == 0) {
            c.retired = true;
        }

        emit CreditRetired(creditId, msg.sender, amount, reason);
    }
}