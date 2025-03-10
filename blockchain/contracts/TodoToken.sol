// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TodoToken
 * @dev ERC20 Token for To-Do list rewards on Polygon
 */
contract TodoToken is ERC20, Ownable {
    // Event to track reward distributions
    event UserRewarded(address indexed user, uint256 amount);

    /**
     * @dev Constructor that gives the msg.sender all existing tokens.
     */
    constructor(address initialOwner) 
        ERC20("TodoToken", "TD") 
        Ownable(initialOwner)
    {
        // Mint 1,000,000 tokens to the contract owner (with 18 decimals)
        _mint(initialOwner, 1_000_000 * 10 ** decimals());
    }

    /**
     * @dev Function to reward users for completing tasks
     * @param user Address of the user to reward
     * @param amount Amount of tokens to reward
     */
    function rewardUser(address user, uint256 amount) external onlyOwner {
        require(user != address(0), "Cannot reward zero address");
        require(amount > 0, "Reward amount must be greater than zero");
        
        // Transfer tokens from owner to user
        _transfer(owner(), user, amount);
        
        // Emit event for tracking
        emit UserRewarded(user, amount);
    }

    /**
     * @dev Function to mint more tokens (only owner can call this)
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
} 