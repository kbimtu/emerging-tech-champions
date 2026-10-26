import { describe, expect, test } from "bun:test";
import { HOME_DESCRIPTION, SITE_ORIGIN, pageHead } from "./seo";

describe("User-requested search identity", () => {
  test("uses the approved primary portal with self-referencing subpages", () => {
    expect(SITE_ORIGIN).toBe("https://www.i2ol.org");
    expect(pageHead({ path: "/compete/submission", title: "Submission", description: "Requirements" }).links[0]?.href)
      .toBe("https://www.i2ol.org/compete/submission");
  });
  test("preserves the supplied homepage description", () => {
    expect(HOME_DESCRIPTION).toBe("Practical problem-solving competitions themed around emerging technologies. Submissions are open on a rolling basis. Discover rules, tracks, and entry guidelines.");
  });
});