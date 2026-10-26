// Fetch every batch before returning, so a later failure cannot serve partial XML.
export async function collectSitemapPages<T>(fetchPage: (offset: number, pageSize: number) => Promise<T[]>, pageSize = 1000): Promise<T[]> {
  const rows: T[] = [];
  for (let offset = 0; ; ) {
    const batch = await fetchPage(offset, pageSize);
    if (batch.length === 0) return rows;
    rows.push(...batch);
    offset += batch.length;
  }
}