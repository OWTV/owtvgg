export interface Page<T> {
	items?: Array<T>;
	start?: number;
	end?: number;
}

/// Repeatedly call a function that retrieves a page of results until all
/// results are exhausted, indicated by a smaller page than requested. Yields
/// each page lazily.
export async function* paginate<T>(
	f: (offset?: number, limit?: number) => Promise<Page<T>>,
): AsyncIterable<Array<T>> {
	let page = await f();

	// Going forward, we'll request the same number of items we received in the
	// first response. This might be fewer than the page size, in which case
	// the subsequent response should have zero items.
	const limit = page.items?.length ?? 0;

	// Repeat, yielding items in the current page then requesting a new one if
	// we received as many items as we expected.
	let offset = 0;
	while (page.items?.length) {
		yield page.items;
		if (page.items.length === limit) {
			offset += limit;
			page = await f(offset, limit);
		} else {
			break;
		}
	}
}

/// Yields individual elements from `paginate`.
export async function* collate<T>(
	f: (offset?: number, limit?: number) => Promise<Page<T>>,
): AsyncIterable<T> {
	for await (const page of paginate(f)) {
		yield* page;
	}
}
