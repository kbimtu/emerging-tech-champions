import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { HOME_DESCRIPTION, SITE_ORIGIN, pageHead } from "./seo";

describe("User-requested search identity", () => {
  test("uses the approved primary portal with self-referencing subpages", () => {
    assert.equal(SITE_ORIGIN, "https://www.i2ol.org");
    assert.equal(pageHead({ path: "/compete/submission", title: "Submission", description: "Requirements" }).links[0]?.href,
      "https://www.i2ol.org/compete/submission");
  });
  test("preserves the supplied homepage description", () => {
    assert.equal(HOME_DESCRIPTION, "Practical problem-solving competitions themed around emerging technologies. Submissions are open on a rolling basis. Discover rules, tracks, and entry guidelines.");
  });
});