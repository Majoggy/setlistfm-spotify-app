export const getSetlistIdFromUrl = (url: string): string | null => {
  const lastSegment = url.split("-").pop();

  if (!lastSegment) {
    return null;
  }

  return lastSegment.replace(".html", "");
};
