// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract Signer {

    struct document {
        bool exists;
        string uid;
        string imageURL;
        string name;
        string description;
        string  uploaderUID;
        address uploaderAddr;
        string [] signerUID;
        address [] signerAddr;
    }

    struct user {
        bool exists;
        string uid;
        address addr;
        string name;
        string description;
        string imageURL;
        string [] uploadedDocumentsUID;
        string [] signedDocumentsUID;
        bool verified;
    }


    mapping(string => user) public users;
    mapping(address => user) public usersAdddrs;

    mapping (string => document)  public documents;

    address public owner;

    uint256 totalDocuments= 0;

    constructor() {
        owner = msg.sender;
    }

    function createUser(
        string memory uid,
        string memory name,
        string memory description,
        string memory imageURL
        ) public {
            require(!usersAdddrs[msg.sender].exists);
            require(!users[uid].exists);
            string[] memory emptyArr;

            user memory newUser = user(
                true,
                uid,
                msg.sender,
                name,
                description,
                imageURL,
                emptyArr,
                emptyArr,
                false
            );
            usersAdddrs[msg.sender] = newUser;
            users[uid]= newUser;
    }


    function uploadDocument(
        string memory uid,
        string memory name,
        string memory description,
        string memory imageURL
        ) public  {
            require (usersAdddrs[msg.sender].exists);
            require(!documents[uid].exists);
            string[] memory emptyArr;
            address[] memory emptyArrAddr;

            document memory newDocument = document(
                true,
                uid,
                imageURL,
                name,
                description,
                usersAdddrs[msg.sender].uid,
                msg.sender,
                emptyArr,
                emptyArrAddr
            );
            documents[uid]= newDocument;
            usersAdddrs[msg.sender].uploadedDocumentsUID.push(uid);
            users[usersAdddrs[msg.sender].uid].uploadedDocumentsUID.push( uid);
    }


    function sign(string memory documentUID) public {
        require (usersAdddrs[msg.sender].exists);
        require (documents[documentUID].exists);
        usersAdddrs[msg.sender].signedDocumentsUID.push(documentUID);
        users[usersAdddrs[msg.sender].uid].signedDocumentsUID.push(documentUID);
        documents[documentUID].signerUID.push (usersAdddrs[msg.sender].uid);
        documents[documentUID].signerAddr.push (msg.sender);
    }

    function getUploadedDocumentUID(string memory uid) public view returns (string [] memory) {
        require (users[uid].exists);
        return (users[uid].uploadedDocumentsUID);
    }

       function getsignedDocumentsUID(string memory uid) public view returns (string [] memory) {
        require (users[uid].exists);
        return (users[uid].signedDocumentsUID);
    }
    
    function getSignedBy (string memory uid) public view returns  (string [] memory) {
        require (documents[uid].exists) ;
        return (documents[uid].signerUID);
    }

    function verifyUser (string memory uid) public {
        require(msg.sender == owner);
        bool newState= !users[uid].verified;
        users[uid].verified= newState;
        usersAdddrs[users[uid].addr].verified= newState;
    }
}

