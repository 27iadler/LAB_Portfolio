import { Client } from "@notionhq/client";

export type Company = {
  id: string;
  name: string;
  description: string;
  icon: string | null;
};

function getPlainText(richTextArray: any[] | undefined): string {
  if (!richTextArray || richTextArray.length === 0) return "";
  return richTextArray.map((t) => t.plain_text).join("");
}

function getIconUrl(page: any): string | null {
  const icon = page.icon;
  if (!icon) return null;
  if (icon.type === "emoji") return null; // emojis aren't image URLs
  if (icon.type === "external") return icon.external.url;
  if (icon.type === "file") return icon.file.url;
  return null;
}

export async function getPortfolioCompanies(): Promise<Company[]> {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!token || !databaseId) {
    throw new Error(
      "Missing NOTION_TOKEN or NOTION_DATABASE_ID environment variables."
    );
  }

  const notion = new Client({ auth: token });

  const companies: Company[] = [];
  let cursor: string | undefined = undefined;

  do {
    const response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
      filter: {
        property: "On Portfolio List?",
        checkbox: { equals: true },
      },
    });

    for (const page of response.results as any[]) {
      const props = page.properties;

      const nameProp = props["Company"];
      const name = nameProp ? getPlainText(nameProp.title) : "Untitled";

      const descProp = props["What They Do"];
      const description = descProp ? getPlainText(descProp.rich_text) : "";

      companies.push({
        id: page.id,
        name,
        description,
        icon: getIconUrl(page),
      });
    }

    cursor = response.has_more ? (response.next_cursor as string) : undefined;
  } while (cursor);

  return companies;
}
