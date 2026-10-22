import { describe, expect, it } from "vitest";
import { findProject, projectSlugs } from "@/lib/site-data";
describe("Project detail resolution", () => {
  it("resolves all existing projects without replacing their facts", () => {
    expect(projectSlugs.map((slug) => findProject(slug)?.title)).toEqual([
      "AI Farmer-to-Buyer Marketplace",
      "IoT–AI Disaster Notification & Coastal Safety System",
      "NEO AI — Enterprise AI Product Interface",
      "TKR IT Department Portal",
    ]);
  });
  it("returns no project for an unknown slug", () => {
    expect(findProject("not-a-real-project")).toBeUndefined();
  });
});