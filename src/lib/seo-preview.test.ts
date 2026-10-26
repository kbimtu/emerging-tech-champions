import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { competitionPreview, pageHead } from "./seo";

describe("Public sharing previews", () => {
  test("uses a 1200 by 630 image", () => {
    assert.equal(competitionPreview.width, 1200);
    assert.equal(competitionPreview.height, 630);
    const jpg = readFileSync(new URL("../../public/assets/og-image.jpg", import.meta.url));
    let offset = 2;
    let dimensions: number[] = [];
    while (offset < jpg.length) {
      const marker = jpg[offset + 1];
      const size = jpg.readUInt16BE(offset + 2);
      if (marker === 0xc0 || marker === 0xc2) {
        dimensions = [jpg.readUInt16BE(offset + 7), jpg.readUInt16BE(offset + 5)];
        break;
      }
      offset += size + 2;
    }
    assert.deepEqual(dimensions, [1200, 630]);
  });
  test("keeps the image below 300 KB", () => {
    assert.ok(readFileSync(new URL("../../public/assets/og-image.jpg", import.meta.url)).byteLength < 300_000);
  });
  test("public pages and news use the same absolute HTTPS fallback", () => {
    for (const path of ["/", "/compete", "/support/organizing", "/news/example"]) {
      const { meta } = pageHead({ path, title: "Page", description: "Description" });
      assert.equal(meta.find(tag => "property" in tag && tag.property === "og:image")?.content, "https://www.i2ol.org/assets/og-image.jpg");
      assert.equal(meta.find(tag => "name" in tag && tag.name === "twitter:image")?.content, competitionPreview.url);
    }
  });
  test("private editor pages do not receive a public sharing image", () => {
    const { meta } = pageHead({ path: "/news/editor", title: "Editor", description: "Private", noindex: true });
    assert.equal(meta.some(tag => "property" in tag && tag.property === "og:image"), false);
  });
});