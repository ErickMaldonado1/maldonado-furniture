export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`];
  if (src.includes('res.cloudinary.com')) {
    const urlParts = src.split('/upload/');
    if (urlParts.length === 2) {
      return `${urlParts[0]}/upload/${params.join(',')}/${urlParts[1]}`;
    }
  }

  const cloudName = 'dwvruzkll';
  if (src.startsWith('http')) {
    return `https://res.cloudinary.com/${cloudName}/image/fetch/${params.join(',')}/${src}`;
  }

  return `${src}?w=${width}`;
}
