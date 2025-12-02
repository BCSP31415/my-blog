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

      // Simple frontmatter parser
      const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

      if (match) {
        const frontmatterRaw = match[1];
        const body = match[2];
        const attributes = {};

        frontmatterRaw.split('\n').forEach(line => {
          const [key, ...value] = line.split(':');
          if (key && value) {
            attributes[key.trim()] = value.join(':').trim().replace(/^['"](.*)['"]$/, '$1');
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

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getPostBySlug(slug) {
  const posts = await getPosts();
  return posts.find(post => post.slug === slug);
}
