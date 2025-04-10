
import path from 'path';
import fs from "fs"

export const getNftContractArtifact = () => {
    const artifactPath = path.join("./src/artifacts/src/contracts/NFT.sol/NFT.json")
    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

    return artifact;
}