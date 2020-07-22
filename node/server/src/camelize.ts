import camelCase from "camelcase";

type Text = string;

// Return the text in camelCase + how many 🐪
// @example "this is an example" -> "thisIsAnExample 🐪🐪🐪"
export function camelize(text: Text): Text {
	const camelCaseText = camelCase(text);
	const matches = camelCaseText.match(/[A-Z]/g) || [];
	const camels = Array.from({ length: matches.length })
		.map(() => "🐪")
		.join("");

	return `${camelCaseText} ${camels}`;
}
