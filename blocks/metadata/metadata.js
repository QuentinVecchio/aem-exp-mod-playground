export default function decorate(block) {
  const meta = {};
  const rows = block.querySelectorAll(':scope > div');
  rows.forEach((row) => {
    const cols = row.querySelectorAll(':scope > div');
    if (cols.length >= 2) {
      const key = cols[0].textContent.trim().toLowerCase();
      const value = cols[1].textContent.trim();
      meta[key] = value;
    }
  });

  // Apply metadata to document head if not already present
  Object.entries(meta).forEach(([key, value]) => {
    if (key === 'title' && value) {
      document.title = value;
    } else if (value) {
      let metaTag = document.querySelector(`meta[name="${key}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', key);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', value);
    }
  });

  // Hide the metadata block
  block.closest('.section').style.display = 'none';
}
