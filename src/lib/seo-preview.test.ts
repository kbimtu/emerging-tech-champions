import { describe, test } from "node:test";
import assert from "node:assert/strict";
import sharedPreview from "../assets/i2ol-shared-preview.jpg.asset.json";
import { OG_IMAGE_URL, SITE_ORIGIN, competitionPreview, pageHead } from "./seo";

describe("Public sharing previews", () => {
  test("uses a 1200 by 630 image", () => {
    assert.equal(competitionPreview.width, 1200);
    assert.equal(competitionPreview.height, 630);
  });
  test("keeps the image below 300 KB", () => {
    assert.ok(sharedPreview.size > 0 && sharedPreview.size < 300_000);
  });
  test("public pages use the self-hosted absolute HTTPS og image", () => {
    for (const path of ["/", "/about", "/compete", "/news", "/support/school"]) {
      const { meta } = pageHead({ path, title: "Page", description: "Description" });
      assert.equal(meta.find(tag => "property" in tag && tag.property === "og:image")?.content, OG_IMAGE_URL);
      assert.equal(meta.find(tag => "property" in tag && tag.property === "og:image:secure_url")?.content, OG_IMAGE_URL);
      assert.equal(meta.find(tag => "name" in tag && tag.name === "twitter:image")?.content, OG_IMAGE_URL);
    }
    assert.ok(OG_IMAGE_URL.startsWith(`${SITE_ORIGIN}/`));
    assert.ok(!OG_IMAGE_URL.includes("lovable.app"));
  });
  test("private editor pages do not receive a public sharing image", () => {
    const { meta } = pageHead({ path: "/news/editor", title: "Editor", description: "Private", noindex: true });
    assert.equal(meta.some(tag => "property" in tag && tag.property === "og:image"), false);
  });
  test("explicit verified image addresses override the default og image", () => {
    const image = { url: "https://images.example.org/home.jpg", width: 1200, height: 630, mimeType: "image/jpeg" };
    const { meta } = pageHead({ path: "/", title: "Unchanged", description: "Unchanged", image });
    for (const property of ["og:image", "og:image:secure_url"]) {
      assert.equal(meta.find(tag => "property" in tag && tag.property === property)?.content, image.url);
    }
    assert.equal(meta.find(tag => "name" in tag && tag.name === "twitter:image")?.content, image.url);
  });
});
