
import path from 'path';
import fs from "fs"

export const getFungibleTokenContractArtifact = () => {
    const artifactPath = path.join("./src/artifacts/src/contracts/FungibleToken.sol/FungibleToken.json")
    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

    return artifact;
}