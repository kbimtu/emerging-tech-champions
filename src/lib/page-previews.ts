import preview0 from "@/assets/page-previews/about.jpg.asset.json";
import preview1 from "@/assets/page-previews/donate.jpg.asset.json";
import preview2 from "@/assets/page-previews/eto.jpg.asset.json";
import preview3 from "@/assets/page-previews/home.jpg.asset.json";
import preview4 from "@/assets/page-previews/journal.jpg.asset.json";
import preview5 from "@/assets/page-previews/media.jpg.asset.json";
import preview6 from "@/assets/page-previews/news.jpg.asset.json";
import preview7 from "@/assets/page-previews/privacy.jpg.asset.json";
import preview8 from "@/assets/page-previews/sponsor.jpg.asset.json";
import preview9 from "@/assets/page-previews/compete-accolades.jpg.asset.json";
import preview10 from "@/assets/page-previews/compete-adjudication.jpg.asset.json";
import preview11 from "@/assets/page-previews/compete.jpg.asset.json";
import preview12 from "@/assets/page-previews/compete-qualifier.jpg.asset.json";
import preview13 from "@/assets/page-previews/compete-registration.jpg.asset.json";
import preview14 from "@/assets/page-previews/compete-submission.jpg.asset.json";
import preview15 from "@/assets/page-previews/compete-teams.jpg.asset.json";
import preview16 from "@/assets/page-previews/compete-timeline.jpg.asset.json";
import preview17 from "@/assets/page-previews/connect-alumni.jpg.asset.json";
import preview18 from "@/assets/page-previews/connect-collab.jpg.asset.json";
import preview19 from "@/assets/page-previews/connect-committees.jpg.asset.json";
import preview20 from "@/assets/page-previews/connect.jpg.asset.json";
import preview21 from "@/assets/page-previews/connect-judge.jpg.asset.json";
import preview22 from "@/assets/page-previews/connect-lessons.jpg.asset.json";
import preview23 from "@/assets/page-previews/connect-shape.jpg.asset.json";
import preview24 from "@/assets/page-previews/connect-steam.jpg.asset.json";
import preview25 from "@/assets/page-previews/support-contributing.jpg.asset.json";
import preview26 from "@/assets/page-previews/support.jpg.asset.json";
import preview27 from "@/assets/page-previews/support-organization.jpg.asset.json";
import preview28 from "@/assets/page-previews/support-organizing.jpg.asset.json";
import preview29 from "@/assets/page-previews/support-school.jpg.asset.json";

export const pagePreviews = {
  "/about": { ...preview0, alt: "Ideas That Can Cross the Bridge." },
  "/donate": { ...preview1, alt: "Coming Soon." },
  "/eto": { ...preview2, alt: "Emerging Technologies Olympiad" },
  "/": { ...preview3, alt: "International Olympiad in Emerging Technologies" },
  "/journal": { ...preview4, alt: "Coming Soon." },
  "/media": { ...preview5, alt: "The I2OL Press Desk." },
  "/news": { ...preview6, alt: "Signals from across the network." },
  "/privacy": { ...preview7, alt: "Privacy Policy Statement" },
  "/sponsor": { ...preview8, alt: "Back the Next Practical Breakthrough." },
  "/compete/accolades": { ...preview9, alt: "The Awards of I2OL 2026." },
  "/compete/adjudication": { ...preview10, alt: "Three Stages. Three Distinct Outcomes." },
  "/compete": { ...preview11, alt: "Choose Your Technological Frontier." },
  "/compete/qualifier": { ...preview12, alt: "Compete Locally, Then Represent Internationally." },
  "/compete/registration": { ...preview13, alt: "Build Your Team. Start Your Record." },
  "/compete/submission": { ...preview14, alt: "Make the Idea Legible\u2014and Testable." },
  "/compete/teams": { ...preview15, alt: "The Field Is Still Forming." },
  "/compete/timeline": { ...preview16, alt: "Submission Is on a Rolling Basis." },
  "/connect/alumni": { ...preview17, alt: "Your I2OL Journey Continues." },
  "/connect/collab": { ...preview18, alt: "Networks That Start with a Conversation." },
  "/connect/committees": { ...preview19, alt: "Help Steer the Standard." },
  "/connect": { ...preview20, alt: "A Network Built Person to Person." },
  "/connect/judge": { ...preview21, alt: "Bring Judgment. Build Capability." },
  "/connect/lessons": { ...preview22, alt: "Methods, Mistakes, Breakthroughs." },
  "/connect/shape": { ...preview23, alt: "Social Sciences, Humanities, and the Arts for People and the Economy." },
  "/connect/steam": { ...preview24, alt: "Science, Technology, Engineering, Art, and Mathematics." },
  "/support/contributing": { ...preview25, alt: "Bring I2OL Closer to Your Region." },
  "/support": { ...preview26, alt: "Make Ambitious Work Possible." },
  "/support/organization": { ...preview27, alt: "Put Industry Insight Within Reach." },
  "/support/organizing": { ...preview28, alt: "Season Leadership." },
  "/support/school": { ...preview29, alt: "Give Students a Supported Start." },
} as const;
