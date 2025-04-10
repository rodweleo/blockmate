import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

export const eduTestnetProvider = new ethers.JsonRpcProvider(process.env.TESTNET_EDUCHAIN_RPC_URL!)

export const eduMainnetProvider = new ethers.JsonRpcProvider(process.env.MAINNET_EDUCHAIN_RPC_URL!)