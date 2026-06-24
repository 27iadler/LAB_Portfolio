import { getPortfolioCompanies } from "../lib/notion";

export const revalidate = 3600; // re-check Notion once an hour

export default async function Home() {
  let companies = [];
  let error: string | null = null;

  try {
    companies = await getPortfolioCompanies();
  } catch (e: any) {
    error = e.message;
  }

  return (
    <main className="page">
      <header className="header">
        <p className="eyebrow">The LAB Miami</p>
        <h1 className="title">Wynwood Tech District</h1>
        <p className="subtitle">
          Companies building real things out of Wynwood, Miami.
        </p>
      </header>

      {error && (
        <div className="empty-state">
          Couldn&apos;t load the portfolio right now. Check that
          NOTION_TOKEN and NOTION_DATABASE_ID are set correctly.
        </div>
      )}

      {!error && companies.length === 0 && (
        <div className="empty-state">
          No companies are checked &quot;On Portfolio List?&quot; yet.
        </div>
      )}

      {!error && companies.length > 0 && (
        <div className="grid">
          {companies.map((company) => (
            <div className="card" key={company.id}>
              <div>
                {company.icon && (
                  <img
                    src={company.icon}
                    alt=""
                    className="card-icon"
                  />
                )}
                <h2 className="card-name">{company.name}</h2>
              </div>
              <p className="card-desc">{company.description}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
