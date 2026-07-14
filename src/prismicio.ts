import * as prismic from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import type { ClientConfig } from "@prismicio/client";

// The Prismic repository name
export const repositoryName = "abcde-website";

// Create a Prismic client for fetching content
// Uses createClient pattern to support preview/live editing via enableAutoPreviews
export const createClient = (config: ClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    fetchOptions: {
      next: { tags: ["prismic"] },
      cache: "force-cache",
    },
    ...config,
  });

  // Enable automatic preview support (reads preview cookies in dev mode)
  enableAutoPreviews({ client });

  return client;
};

// Backward-compatible export for any code still using `client` directly
export const client = createClient();
