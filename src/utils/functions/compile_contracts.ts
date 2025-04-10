
import { execSync } from "child_process";

export const compileContracts = () => {
    try {
        console.log("🔨 Compiling contracts...");
        execSync("npx hardhat compile", { stdio: "inherit" });
        console.log("✅ Compilation complete.\n");
    } catch (err) {
        console.error("Compilation failed:", err);
        process.exit(1);
    }
}