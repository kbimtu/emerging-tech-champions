import { describe, test } from "node:test";
import assert from "node:assert/strict";
import sharedPreview from "../assets/i2ol-shared-preview.jpg.asset.json";
import { competitionPreview, pageHead } from "./seo";

describe("Public sharing previews", () => {
  test("uses a 1200 by 630 image", () => {
    assert.equal(competitionPreview.width, 1200);
    assert.equal(competitionPreview.height, 630);
  });
  test("keeps the image below 300 KB", () => {
    assert.ok(sharedPreview.size > 0 && sharedPreview.size < 300_000);
  });
  test("public pages and news use the same absolute HTTPS fallback", () => {
    for (const path of ["/", "/compete", "/support/organizing", "/news/example"]) {
      const { meta } = pageHead({ path, title: "Page", description: "Description" });
      assert.equal(meta.find(tag => "property" in tag && tag.property === "og:image")?.content, `https://www.i2ol.org${sharedPreview.url}`);
      assert.equal(meta.find(tag => "name" in tag && tag.name === "twitter:image")?.content, competitionPreview.url);
    }
  });
  test("private editor pages do not receive a public sharing image", () => {
    const { meta } = pageHead({ path: "/news/editor", title: "Editor", description: "Private", noindex: true });
    assert.equal(meta.some(tag => "property" in tag && tag.property === "og:image"), false);
  });
});