export const toPresignRequestFile = (file: File) => ({
  filename: file.name,
  content_type: file.type,
  size: file.size,
});
