export const truncateText = (text: string, maxLength = 25) => {
  if (!text) return;

  const trimmedText = text.trimEnd();

  if (trimmedText.length < maxLength) return trimmedText;

  const truncatedText = trimmedText.slice(0, maxLength).trimEnd();

  return `${truncatedText}...`;
};
