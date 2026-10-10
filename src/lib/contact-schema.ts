import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().min(1, "Please add a subject").max(150),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(2000),
});

export const PORTFOLIO_FILES: { resume: string | null } = { resume: null };