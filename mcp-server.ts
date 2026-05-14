import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import fs from "fs";
import path from "path";

const DECK_PATH = path.join(process.cwd(), "public", "deck.json");

const server = new Server({ name: "pitch-deck-strategic", version: "3.0.0" }, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "create_pitch_deck",
        description: "Creates a strategic pitch deck following VC/Sales blueprints (TAM/SAM/SOM, Matrix, Ask, Charts).",
        inputSchema: {
          type: "object",
          properties: {
            slides: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  type: { enum: ["hero", "content", "split", "grid", "quote", "chart", "team", "pricing", "tam", "matrix", "ask"] },
                  title: { type: "string" },
                  subtitle: { type: "string" },
                  content: { type: "string" },
                  theme: { enum: ["aurora", "snow", "slate"] },
                  imageKeyword: { type: "string" },
                  notes: { type: "string", description: "Speaker notes following the [HOOK][POINT][TRANSITION] pattern" },
                  tamData: { 
                    type: "object", 
                    properties: { tam: { type: "string" }, sam: { type: "string" }, som: { type: "string" } } 
                  },
                  matrixData: {
                    type: "object",
                    properties: {
                      xLabel: { type: "string" },
                      yLabel: { type: "string" },
                      points: { type: "array", items: { type: "object", properties: { name: { type: "string" }, x: { type: "number" }, y: { type: "number" }, isUs: { type: "boolean" } } } }
                    }
                  },
                  askData: {
                    type: "object",
                    properties: {
                      amount: { type: "string" },
                      usage: { type: "array", items: { type: "object", properties: { label: { type: "string" }, value: { type: "number" } } } }
                    }
                  },
                  chartType: { enum: ["bar", "line", "pie"] },
                  chartData: { type: "array", items: { type: "object", properties: { name: { type: "string" }, value: { type: "number" } } } }
                },
                required: ["id", "type", "title"]
              },
            },
          },
          required: ["slides"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "create_pitch_deck") {
    const { slides } = request.params.arguments as { slides: any[] };
    try {
      if (!fs.existsSync(path.dirname(DECK_PATH))) fs.mkdirSync(path.dirname(DECK_PATH), { recursive: true });
      fs.writeFileSync(DECK_PATH, JSON.stringify(slides, null, 2));
      return { content: [{ type: "text", text: `Strategic Pitch Deck updated. View live at your dashboard.` }] };
    } catch (error: any) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }], isError: true };
    }
  }
  throw new Error("Tool not found");
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Pitch Deck Strategic MCP running");
}

main().catch(console.error);
