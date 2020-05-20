const camelCase = require("camelcase");

/**
 * Return the text in camelCase + how many 🐪
 * 
 * @example "this is an example" -> "thisIsAnExample 🐪🐪🐪"
 * @param text 
 * @returns {string}
 */
function camelize(text) {
  const camelCaseText = camelCase(text);
  const matches = camelCaseText.match(/[A-Z]/g) || [];
  const camels = Array.from({ length: matches.length })
    .map(() => "🐪")
    .join("");

  return `${camelCaseText} ${camels}`;
}

module.exports.camelize = camelize;
