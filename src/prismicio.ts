import * as prismic from "@prismicio/client";

// The Prismic repository name
export const repositoryName = "abcde-website";

// Create a Prismic client for fetching content at build time
export const client = prismic.createClient(repositoryName);
