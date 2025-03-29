
import { OpenAI } from "langchain/llms/openai";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
import axios from "axios";

// Instagram API configuration
const INSTAGRAM_API_BASE = "https://graph.facebook.com/v16.0";
const ACCESS_TOKEN = "YOUR_ACCESS_TOKEN"; // Replace with your access token
const CLUB_INSTAGRAM_IDS = [
  "club1_instagram_id", // Replace with actual Instagram user IDs
  "club2_instagram_id",
  // Add more club Instagram IDs
];

// Initialize Llama 3.1 (Nemotron) via LangChain
const llm = new OpenAI({
  model: "text-davinci-003", // Replace with Llama 3.1 if supported
  temperature: 0.7,
  maxTokens: 500,
});

// Define a prompt template for extracting event details
const promptTemplate = new PromptTemplate({
  inputVariables: ["caption"],
  template: `
    Analyze the following Instagram caption and extract event details:
    Caption: {caption}
    Output format:
    - Title:
    - Date:
    - Time:
    - Location:
    - Description:
  `,
});

// Fetch recent posts from a club's Instagram account
async function fetchInstagramPosts(instagramId) {
  const url = `${INSTAGRAM_API_BASE}/${instagramId}/media?fields=id,caption,media_type,media_url,timestamp&access_token=${ACCESS_TOKEN}`;
  try {
    const response = await axios.get(url);
    return response.data.data; // Array of posts
  } catch (error) {
    console.error(`Error fetching posts for Instagram ID ${instagramId}:`, error.message);
    return [];
  }
}

// Process posts using LangChain and Llama 3.1
async function processPosts(posts) {
  const chain = new LLMChain({ llm, prompt: promptTemplate });
  const events = [];

  for (const post of posts) {
    if (post.caption) {
      try {
        const result = await chain.call({ caption: post.caption });
        const event = parseEventOutput(result.text);
        if (event) {
          events.push(event);
        }
      } catch (error) {
        console.error("Error processing post:", error.message);
      }
    }
  }

  return events;
}

// Parse the output from the LLM into a structured event object
function parseEventOutput(output) {
  const lines = output.split("\n").map((line) => line.trim());
  const event = {};

  lines.forEach((line) => {
    if (line.startsWith("- Title:")) event.title = line.replace("- Title:", "").trim();
    if (line.startsWith("- Date:")) event.date = line.replace("- Date:", "").trim();
    if (line.startsWith("- Time:")) event.time = line.replace("- Time:", "").trim();
    if (line.startsWith("- Location:")) event.location = line.replace("- Location:", "").trim();
    if (line.startsWith("- Description:")) event.description = line.replace("- Description:", "").trim();
  });

  return event.title ? event : null; // Return only if a title is found
}

// Main function to scrape Instagram and create events
async function scrapeInstagramForEvents() {
  const allEvents = [];
  for (const instagramId of CLUB_INSTAGRAM_IDS) {
    const posts = await fetchInstagramPosts(instagramId);
    const events = await processPosts(posts);
    allEvents.push(...events);
  }
  console.log("Scraped Events:", allEvents);
  // TODO: Add logic to save events to your database or trigger event creation
}

// Run the agent
scrapeInstagramForEvents();
