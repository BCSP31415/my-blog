export async function getPosts() {
  const modules = import.meta.glob('./posts/*.md', { eager: true, query: '?raw', import: 'default' });
  const posts = [];

  console.log("Loading posts from modules (eager):", modules);

  for (const path in modules) {
    try {
      let content = modules[path];
      if (typeof content !== 'string' && content.default) {
        content = content.default;
      }

      console.log("Loaded content for", path, typeof content);

      if (typeof content !== 'string') {
        console.warn("Content is not a string:", content);
        continue;
      }

      // Improved frontmatter parser to handle different line endings and optional whitespace
      const match = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/);

      if (match) {
        const frontmatterRaw = match[1];
        const body = match[2];
        const attributes = {};

        // Split by any newline variation
        frontmatterRaw.split(/\r?\n/).forEach(line => {
          const separatorIndex = line.indexOf(':');
          if (separatorIndex !== -1) {
            const key = line.slice(0, separatorIndex).trim();
            const value = line.slice(separatorIndex + 1).trim();
            if (key) {
              // Remove quotes if present
              attributes[key] = value.replace(/^['"](.*)['"]$/, '$1');
            }
          }
        });

        const slug = path.split('/').pop().replace('.md', '');

        posts.push({
          id: slug,
          slug,
          ...attributes,
          content: body
        });
      }
    } catch (e) {
      console.error("Error loading post:", path, e);
    }
  }

  return posts.sort((a, b) => {
    // Check for pinned status (handle string 'true')
    const isPinnedA = a.pinned === 'true';
    const isPinnedB = b.pinned === 'true';

    if (isPinnedA && !isPinnedB) return -1;
    if (!isPinnedA && isPinnedB) return 1;

    // Default to date sort
    return new Date(b.date) - new Date(a.date);
  });
}

export async function getPostBySlug(slug) {
  const posts = await getPosts();
  return posts.find(post => post.slug === slug);
}
