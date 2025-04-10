
import { HumanMessage } from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import * as dotenv from "dotenv";
import * as readline from "readline";
import { EduchainAgentKit } from "./agent";
import { createEduchainTools } from "./langchain/tools";

dotenv.config();

function validateEnvironment(): void {
    const missingVars: string[] = [];

    const requiredVars = ["GOOGLE_API_KEY", "EDUCHAIN_OPERATOR_ADDRESS", "EDUCHAIN_OPERATOR_PRIVATE_KEY"];

    requiredVars.forEach((varName) => {
        if (!process.env[varName]) {
            missingVars.push(varName);
        }
    });

    if (missingVars.length > 0) {
        console.error("Error: Required environment variables are not set");
        missingVars.forEach((varName) => {
            console.error(`${varName}=your_${varName.toLowerCase()}_here`);
        });
        process.exit(1);
    }
}

validateEnvironment();

async function initializeAgent() {
    try {

        const llm = new ChatGoogleGenerativeAI({
            model: "gemini-2.0-flash",
            temperature: 0.2
        });

        // Initialize EduchainAgentKit
        const educhainKit = new EduchainAgentKit({
            operatorAddress: process.env.EDUCHAIN_OPERATOR_ADDRESS!,
            privateKey: process.env.EDUCHAIN_OPERATOR_PRIVATE_KEY!,
            network: "testnet"
        });

        // Create the LangChain-compatible tools
        const tools = createEduchainTools(educhainKit);

        // Prepare an in-memory checkpoint saver
        const memory = new MemorySaver();

        // Additional configuration for the agent
        const config = { configurable: { thread_id: "BlockMate" } };

        // Create the React agent
        const agent = createReactAgent({
            llm,
            checkpointSaver: memory,
            tools: tools,
            // Adjustable depending on the scenario
            messageModifier: `
        **General Guidelines**
        You are a helpful agent called BlockMate that can interact with EduChain blockchain. 
        You are empowered to interact on-chain using your tools. If you ever need funds,
        you can request them from a faucet or from the user. 
        If there is a 5XX (internal) HTTP error code, ask the user to try again later. 
        If someone asks you to do something you can't do with your available tools, you 
        must say so, and encourage them to reach out to technical support to discuss further.
        Keep your responses concise and helpful.
        
        **Token Creation Rules**:
        If the user mentions **NFT**, **non-fungible token**, or **unique token**, always use the **educhain_create_non_fungible_token** tool.
        If the user mentions **fungible token**, **FT**, or **decimal-based token**, always use the **educhain_create_fungible_token** tool.
      `,
        });

        return { agent, config };
    } catch (error) {
        console.error("Failed to initialize agent:", error);
        throw error;
    }
}

async function runChatMode(agent: any, config: any) {
    console.log("Starting chat mode... Type 'exit' to end.");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const question = (prompt: string): Promise<string> =>
        new Promise((resolve) => rl.question(prompt, resolve));

    try {
        while (true) {
            const userInput = await question("\nPrompt: ");

            if (userInput.toLowerCase() === "exit") {
                break;
            }

            // for now, isCustodial is based on env, but later it can be changed and passed with a prompt text coming from FE
            const isCustodial = process.env.CUSTODIAL_MODE === "true";
            const stream = await sendPrompt(agent, config, userInput, isCustodial);
            for await (const chunk of stream) {
                if ("agent" in chunk) {
                    console.log(chunk.agent.messages[0].content);
                } else if ("tools" in chunk) {
                    console.log(chunk.tools.messages[0].content);
                }
                console.log("-------------------");
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
        }
        process.exit(1);
    } finally {
        rl.close();
    }
}

async function sendPrompt(agent: any, config: any, userInput: string, isCustodial: boolean) {
    return agent.stream(
        { messages: [new HumanMessage(userInput)] },
        { ...config, configurable: { ...config.configurable, isCustodial: isCustodial } }
    );
}

async function main() {
    try {
        console.log("Launching BlockMate...");
        const { agent, config } = await initializeAgent();
        await runChatMode(agent, config);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
        }
        process.exit(1);
    }
}

if (require.main === module) {
    main().catch((error) => {
        console.error("Fatal error:", error);
        process.exit(1);
    });
}