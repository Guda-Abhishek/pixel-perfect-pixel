import { describe, expect, it } from "vitest";
import { parseViewer, projectOrder, sectionOrder } from "@/lib/viewer-profiles";
import { PROJECTS, SKILLS } from "@/lib/portfolio-data";

describe("Viewer emphasis without hiding content", () => {
  it("prioritizes education and experience for recruiters", () => {
    expect(sectionOrder("recruiter").slice(0, 2)).toEqual(["about", "experience"]);
  });
  it("prioritizes engineering projects and skills for developers", () => {
    expect(sectionOrder("developer").slice(0, 2)).toEqual(["projects", "skills"]);
    expect(PROJECTS[projectOrder("developer")[0] ?? -1]?.title).toBe("TKR IT Department Portal");
  });
  it("prioritizes AI projects and certifications for specialists", () => {
    expect(sectionOrder("ai").slice(0, 2)).toEqual(["projects", "certifications"]);
    expect(PROJECTS[projectOrder("ai")[0] ?? -1]?.title).toBe("NEO AI — Enterprise AI Product Interface");
  });
  it("keeps every content group for every profile", () => {
    for (const profile of ["recruiter", "developer", "ai", "guest"] as const) {
      expect(sectionOrder(profile).sort()).toEqual(["about", "certifications", "experience", "projects", "skills"]);
      expect(projectOrder(profile).sort()).toEqual([0, 1, 2, 3]);
    }
  });
  it("defaults invalid profile values to guest", () => {
    expect(parseViewer("administrator")).toBe("guest");
    expect(parseViewer(undefined)).toBe("guest");
    expect(parseViewer("ai")).toBe("ai");
  });
  it("keeps NEO AI impact approximate", () => {
    expect(PROJECTS[2].overview).toContain("approximately 25%");
  });
  it("labels LangChain as concepts rather than claimed experience", () => {
    expect(SKILLS[2]?.items).toContain("LangChain concepts");
  });
});