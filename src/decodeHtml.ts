const decodeHTML = (encodedText: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(encodedText, "text/html");
  return doc.documentElement.textContent;
};

export default decodeHTML;
