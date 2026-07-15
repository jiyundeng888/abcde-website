import { NextResponse } from "next/server";
import { createClient } from "../../../prismicio";
import { cookies } from "next/headers";

// Returns a content hash from Prismic.
// The LivePreview component polls this endpoint every 3 seconds.
// When the hash changes (due to save or publish in Prismic), the page auto-refreshes.
// In preview mode (preview cookie present), draft content is fetched,
// so even unsaved-as-published drafts trigger a refresh.
export async function GET() {
  try {
    const client = createClient();

    // Fetch homepage document.
    // enableAutoPreviews in createClient will automatically use the preview ref
    // when a preview cookie is present, returning draft content.
    const docs = await client.getAllByType("homepage");
    const doc = docs[0];

    if (!doc) {
      return NextResponse.json({
        version: "no-content",
        lastModified: null,
        isPreview: false,
      });
    }

    // Hash the entire document data to detect ANY change (save or publish).
    // This is more reliable than last_publication_date which only changes on publish.
    const dataStr = JSON.stringify(doc.data);
    let hash = 0;
    for (let i = 0; i < dataStr.length; i++) {
      const char = dataStr.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }

    // Check if we're in preview mode
    const cookieStore = await cookies();
    const previewCookie = cookieStore.get("io.prismic.preview");
    const isPreview = !!previewCookie;

    return NextResponse.json(
      {
        version: `${hash}_${doc.last_publication_date || ""}`,
        lastModified: doc.last_publication_date || null,
        isPreview,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { version: "error", error: "Failed to fetch content version" },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  }
}
