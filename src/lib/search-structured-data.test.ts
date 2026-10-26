import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { navigationSchema, pageHead, pageStructuredData } from "./seo";
import { collectSitemapPages } from "./sitemap-pages";
import { sitemapXML } from "./sitemap";

describe("Search discovery", () => {
  test("homepage identifies i2OL and its website at the approved origin", () => {
    const schemas = pageStructuredData("/", "Home");
    assert.deepEqual(schemas[0], {
      "@context": "https://schema.org", "@type": "Organization", "@id": "https://www.i2ol.org/#organization",
      name: "i2OL", url: "https://www.i2ol.org/", description: "International Olympiad in Emerging Technologies",
    });
    assert.equal(schemas[1]?.["@type"], "WebSite");
    assert.equal(schemas[1]?.url, "https://www.i2ol.org/");
  });
  test("About breadcrumbs show Home then About without replacing navigation", () => {
    const head = pageHead({ path: "/about", title: "About i2OL", description: "About" });
    assert.deepEqual(JSON.parse(head.scripts[0]?.children ?? "{}"), navigationSchema);
    assert.deepEqual(JSON.parse(head.scripts[1]?.children ?? "{}").itemListElement, [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.i2ol.org/" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://www.i2ol.org/about" },
    ]);
  });
  test("nested pages retain their full breadcrumb path", () => {
    const schema = pageStructuredData("/compete/submission", "Submission")[0];
    assert.deepEqual(schema?.itemListElement?.map(item => item.name), ["Home", "Compete", "Submission"]);
  });
  test("private noindex pages omit structured data", () => {
    assert.equal(pageHead({ path: "/news/editor", title: "Editor", description: "Private", noindex: true }).scripts.length, 0);
  });
  test("sitemap visits multiple batches to completion", async () => {
    const offsets: number[] = [];
    const rows = await collectSitemapPages(async offset => {
      offsets.push(offset);
      return ["one", "two", "three"].slice(offset, offset + 2);
    }, 2);
    assert.deepEqual(rows, ["one", "two", "three"]);
    assert.deepEqual(offsets, [0, 2, 3]);
  });
  test("later batch failures reject instead of returning partial content", async () => {
    await assert.rejects(collectSitemapPages(async offset => {
      if (offset > 0) throw new Error("later batch failed");
      return ["one"];
    }), /later batch failed/);
  });
  test("sitemap uses www.i2ol.org and omits invented lastmod dates", () => {
    const xml = sitemapXML("https://www.i2ol.org", [{ path: "/" }, { path: "/about" }]);
    assert.match(xml, /<loc>https:\/\/www\.i2ol\.org\/about<\/loc>/);
    assert.equal(xml.includes("lastmod"), false);
  });
});