import { describe, expect, it } from "vitest";
import { CONTACT, MISSIONS, MILESTONES, PROJECTS } from "@/lib/portfolio-data";
import { contactSchema, PORTFOLIO_FILES } from "@/lib/contact-schema";

describe("Portfolio factual and contact rules", () => {
  it("does not guess social profile URLs", () => {
    expect(CONTACT.linkedin).toBeNull();
    expect(CONTACT.github).toBeNull();
    expect(CONTACT.socialName).toBe("Guda-Abhishek");
  });
  it("does not enable a resume without a real file", () => {
    expect(PORTFOLIO_FILES.resume).toBeNull();
  });
  it("uses the supplied contact information", () => {
    expect(CONTACT.email).toBe("abhishek.guda123@gmail.com");
    expect(CONTACT.phone).toBe("+91 9391732446");
    expect(CONTACT.location).toBe("Hyderabad, India");
  });
  it("keeps the supplied internship dates", () => {
    expect(MISSIONS.map(m => m.period)).toEqual(["May 2026 – Present", "Feb 2025 – Apr 2025"]);
  });
  it("preserves the approximate 25 percent impact", () => {
    expect(MISSIONS[1]?.projects[0]?.points.some(p => p.includes("approximately 25%"))).toBe(true);
  });
  it("preserves honest leadership impact", () => {
    expect(MILESTONES[0]?.[2]).toContain("around 15%");
    expect(MILESTONES[1]?.[2]).toContain("250");
    expect(MILESTONES[3]?.[2]).toContain("two innovation projects");
  });
  it("identifies the marketplace as a concept", () => {
    expect(PROJECTS[0].overview).toContain("concept");
  });
  it("rejects empty, malformed, and overlong drafts", () => {
    const valid = { name: "Recruiter", email: "recruiter@example.com", subject: "Opportunity", message: "Let's discuss a role." };
    expect(contactSchema.safeParse(valid).success).toBe(true);
    expect(contactSchema.safeParse({ ...valid, name: " " }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, subject: " " }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, message: " " }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, message: "x".repeat(2001) }).success).toBe(false);
  });
});