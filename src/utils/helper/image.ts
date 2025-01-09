export function sanitizeFileName(fileName: string): string {
  return fileName.replace(/\s+/g, '_').replace(/[^\w.\-]/g, '');
}
