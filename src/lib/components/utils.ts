export function getParentByTagName(node: Element | string, tagName: string): Element | null {
	if (typeof node === "string") {
		const el = document.getElementById(node);
		if (!el) return null;
		node = el;
	}

	let p = node.parentElement;
	const tn = tagName.toLowerCase();

	while (p && p.nodeName.toLowerCase() !== tn) {
		p = p.parentElement;
	}

	return p && p.nodeName.toLowerCase() === tn ? p : null;
}

