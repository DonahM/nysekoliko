export function encodeId(id: any): string {
  if (id === null || id === undefined) return id;
  try {
    return btoa(id.toString());
  } catch (error) {
    console.error('Erreur lors du cryptage', error);
    return id.toString();
  }
}

export function decodeId(encodedId: string): string {
  if (!encodedId) return encodedId;
  try {
    return atob(encodedId);
  } catch (error) {
    console.error('Erreur lors du décryptage', error);
    return encodedId;
  }
}
