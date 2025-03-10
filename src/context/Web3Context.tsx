import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { ethers } from 'ethers';

// ABI for the TodoToken contract
const TodoTokenABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function rewardUser(address user, uint256 amount) external",
  "event UserRewarded(address indexed user, uint256 amount)"
];

// Contract address
const TODOTOKEN_CONTRACT_ADDRESS = '0xeE5FBaD6d95f152871409d987C4Da7FFb00347c6';
const POLYGON_RPC_URL = 'https://polygon-rpc.com';

interface Web3ContextType {
  connectWallet: () => Promise<void>;
  userAddress: string | null;
  tokenBalance: string;
  isConnected: boolean;
  rewardTaskCompletion: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [contract, setContract] = useState<any>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [tokenBalance, setTokenBalance] = useState<string>('0');
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const fetchTokenBalance = useCallback(async (address: string, contractToUse: any = contract) => {
    if (!contractToUse) return;
    
    try {
      const balance = await contractToUse.balanceOf(address);
      const formattedBalance = ethers.utils.formatUnits(balance, 18);
      setTokenBalance(formattedBalance);
    } catch (error) {
      console.error("Error fetching token balance", error);
    }
  }, [contract]);

  const connectWallet = async () => {
    if (!provider) {
      console.log("Web3 provider not initialized");
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        setUserAddress(accounts[0]);
        setIsConnected(true);
        await fetchTokenBalance(accounts[0]);
      }
    } catch (error) {
      console.error("Failed to connect wallet", error);
    }
  };

  useEffect(() => {
    const initEthers = async () => {
      if (window.ethereum) {
        try {
          const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(web3Provider);

          const todoTokenContract = new ethers.Contract(
            TODOTOKEN_CONTRACT_ADDRESS,
            TodoTokenABI,
            web3Provider
          );
          
          setContract(todoTokenContract);

          const accounts = await web3Provider.listAccounts();
          if (accounts.length > 0) {
            setUserAddress(accounts[0]);
            setIsConnected(true);
            await fetchTokenBalance(accounts[0], todoTokenContract);
          }
        } catch (error) {
          console.error("Failed to initialize ethers", error);
        }
      } else {
        console.log("Please install MetaMask or another Web3 wallet");
      }
    };

    initEthers();
  }, [fetchTokenBalance]);

  const rewardTaskCompletion = async () => {
    if (!contract || !userAddress || !provider) {
      console.log("Contract or user address not available");
      return;
    }

    try {
      const signer = provider.getSigner();
      const contractWithSigner = contract.connect(signer);
      
      const amount = ethers.utils.parseUnits("1.0", 18);
      
      console.log("Rewarding user for task completion...");
      
      const tx = await contractWithSigner.rewardUser(userAddress, amount);
      await tx.wait();
      
      await fetchTokenBalance(userAddress);
      
      console.log("User rewarded for task completion!");
    } catch (error) {
      console.error("Error rewarding user", error);
      alert("Error rewarding user. Note: Only the contract owner can reward users.");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setUserAddress(accounts[0]);
          setIsConnected(true);
          fetchTokenBalance(accounts[0]);
        } else {
          setUserAddress(null);
          setIsConnected(false);
          setTokenBalance('0');
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, [fetchTokenBalance]);

  return (
    <Web3Context.Provider
      value={{
        connectWallet,
        userAddress,
        tokenBalance,
        isConnected,
        rewardTaskCompletion
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = (): Web3ContextType => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}; 