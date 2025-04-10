// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/// @title EduChain ERC-721 Non-Fungible Token (NFT)
/// @dev An ERC-721 token for EduChain deployment.
contract NFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter = 0;


    string public constant version = "1.0.0";
    string public constant chain = "EduChain";

    // Optional metadata base URI
    string private _baseTokenURI;

    // The Transfer event helps off-chain applications understand
    // what happens within your contract.
    // event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event TokenMinted(address indexed to, uint256 indexed tokenId);

    /// @notice Constructor to initialize the token
    /// @param name_ The name of the token
    /// @param symbol_ The symbol of the token
    /// @param baseURI_ The https home for all the NFT data (like name, image, and description).
    constructor(
        string memory name_,
        string memory symbol_,
        string memory baseURI_
    ) ERC721(name_, symbol_) Ownable(msg.sender) {
        _baseTokenURI = baseURI_;
    }


     /// @notice Mint a new NFT to the specified address
    /// @param recipient Address to receive the NFT
    /// @return tokenId The newly minted token ID
    function mintNFT(address recipient) external onlyOwner returns (uint256) {
        uint256 newTokenId = _tokenIdCounter;
        _tokenIdCounter++;

        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, _baseTokenURI);
        emit TokenMinted(recipient, newTokenId);

        return newTokenId;
    }

    /// @notice Set a new base URI for all token metadata
    function setBaseURI(string memory newBaseURI) public onlyOwner {
        _baseTokenURI = newBaseURI;
    }

     /// @dev Override base URI
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    /// @notice Returns the total number of minted NFTs
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter;
    }
    
}
