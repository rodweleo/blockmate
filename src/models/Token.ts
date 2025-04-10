
import { BaseContract, ethers } from "ethers";
import { TokenType, TokenOptions } from "../types";
import { getFungibleTokenContractArtifact } from "../utils/functions/get_fungible_token_contract";
import { eduTestnetProvider } from "../utils/educhain_providers";
import * as dotenv from "dotenv"
import { getNftContractArtifact } from "../utils/functions/get_nft_contract";

dotenv.config()

class Token {
    private name: string;
    private symbol: string;
    private decimals?: number;
    private initialSupply?: number;
    private maxSupply?: number;
    private type?: TokenType;
    private baseURI?: string

    constructor(options: TokenOptions) {
        this.name = options.name;
        this.symbol = options.symbol;
        this.initialSupply = options.initialSupply;
        this.decimals = options.decimals;
        this.maxSupply = options.maxSupply;
        this.type = options.type;
        this.baseURI = options.baseURI;
    }

    public async deploy(signer?: string): Promise<BaseContract> {
        
        try{
            if (!signer) {
                console.log("Using the default account owner to deploy token...")
            }

            if(!this.type){
                //by default, deploy a fungible token
                const contract = await this.deployFungibleToken();
                return contract
            }

            //deploy an NFT.
            const contract = await this.deployNFT();
            return contract


        }catch(e){
            throw e;
        }

    }

    private async deployFungibleToken(signer?: string): Promise<BaseContract> {

        try {
            if (!signer) {
                console.log("Using the default account owner to deploy token...")
            }


            const DEFAULT_ACCOUNT_OWNER_PRIVATE_KEY = process.env.EDUCHAIN_OPERATOR_PRIVATE_KEY!

            const wallet = new ethers.Wallet(signer || DEFAULT_ACCOUNT_OWNER_PRIVATE_KEY, eduTestnetProvider)
            const tokenArtifact = getFungibleTokenContractArtifact()
            const tokenFactory = new ethers.ContractFactory(tokenArtifact.abi, tokenArtifact.bytecode, wallet)

            const contract = await tokenFactory.deploy(this.name, this.symbol, this.initialSupply, this.decimals, this.maxSupply);

            return contract

        } catch (e) {
            throw e;
        }

    }
    private async deployNFT(signer?: string): Promise<BaseContract> {

        try {
            if (!signer) {
                console.log("Using the default account owner to deploy NFT...")
            }


            const DEFAULT_ACCOUNT_OWNER_PRIVATE_KEY = process.env.EDUCHAIN_OPERATOR_PRIVATE_KEY!

            const wallet = new ethers.Wallet(signer || DEFAULT_ACCOUNT_OWNER_PRIVATE_KEY, eduTestnetProvider)
            const tokenArtifact = getNftContractArtifact()
            const tokenFactory = new ethers.ContractFactory(tokenArtifact.abi, tokenArtifact.bytecode, wallet)

            const contract = await tokenFactory.deploy(this.name, this.symbol, this.baseURI);

            return contract

        } catch (e) {
            throw e;
        }

    }

    // Setters
    setName(name: string) {
        this.name = name;
    }

    setSymbol(symbol: string) {
        this.symbol = symbol;
    }

    setInitialSupply(supply: number) {
        this.initialSupply = supply;
    }

    setDecimals(decimals: number) {
        this.decimals = decimals;
    }

    setMaxSupply(maxSupply: number) {
        this.maxSupply = maxSupply;
    }

    // Getters
    getName() {
        return this.name;
    }

    getSymbol() {
        return this.symbol;
    }

    getInitialSupply() {
        return this.initialSupply;
    }

    getDecimals() {
        return this.decimals;
    }

    getMaxSupply() {
        return this.maxSupply;
    }

    // Get as an array for deployment args
    toArgs() {
        return [
            this.name,
            this.symbol,
            this.initialSupply,
            this.decimals,
            this.maxSupply,
            this.type
        ];
    }

    // For logging or AI preview
    toJSON() {
        return {
            name: this.name,
            symbol: this.symbol,
            initialSupply: this.initialSupply,
            decimals: this.decimals,
            maxSupply: this.maxSupply,
            type: this.type
        };
    }
}

export default Token;
