// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

/// @title EduChain ERC-20 FungibleToken
/// @dev A Fungible ERC-20 token for EduChain deployment.
contract FungibleToken is ERC20, ERC20Burnable, Ownable {
    uint8 private immutable _decimals;
    uint256 public immutable MAX_SUPPLY;

    string public constant version = "1.0.0";
    string public constant chain = "EduChain";

    // The Transfer event helps off-chain applications understand
    // what happens within your contract.
    // event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event TokenMinted(address indexed to, uint256 amount);
    event TokenBurned(address indexed from, uint256 amount);

    /// @notice Constructor to initialize the token
    /// @param name_ The name of the token
    /// @param symbol_ The symbol of the token
    /// @param initialSupply The initial supply in smallest units (consider decimals)
    /// @param decimals_ The number of decimal places for the token
    /// @param maxSupply_ The maximum supply in smallest units (consider decimals)
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 initialSupply,
        uint8 decimals_,
        uint256 maxSupply_
    ) ERC20(name_, symbol_) Ownable(msg.sender) {
        _decimals = decimals_;
        MAX_SUPPLY = maxSupply_ * 10 ** _decimals;
        _mint(msg.sender, initialSupply * 10 ** decimals_);
    }

    /// @dev Returns the number of decimals the token uses
    function decimals() public view override returns (uint8) {
        return _decimals;
    }

    /// @notice Mint new tokens (only the owner can mint)
    /// @param to The address to receive the newly minted tokens
    /// @param amount The amount of tokens to mint (consider decimals)
    function mint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Invalid recipient");
        uint256 mintAmount = amount * 10 ** _decimals;
        _mint(to, mintAmount);
        emit TokenMinted(to, mintAmount);

        _mint(to, amount * 10 ** _decimals);
    }

    /// @notice Burn your own tokens
    function burn(uint256 amount) public override {
        uint256 burnAmount = amount * 10 ** _decimals;
        _burn(_msgSender(), burnAmount);
        emit TokenBurned(_msgSender(), burnAmount);
    }
    
}
