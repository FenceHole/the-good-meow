import Parser from 'rss-parser';
import { parse } from 'node-html-parser';
import type { InsertArticle } from '@shared/schema';

const parser = new Parser();

const SUBSTACK_RSS_URL = 'https://thegoodmeow.substack.com/feed';

export async function fetchSubstackArticles(): Promise<InsertArticle[]> {
  try {
    const feed = await parser.parseURL(SUBSTACK_RSS_URL);
    
    const articles: InsertArticle[] = feed.items.map((item) => {
      const htmlContent = item['content:encoded'] || item.content || item.contentSnippet || '';
      const root = parse(htmlContent);
      
      const firstImg = root.querySelector('img');
      const imageUrl = firstImg?.getAttribute('src') || null;
      
      const textContent = root.textContent || '';
      const excerpt = textContent.slice(0, 250).trim() + '...';
      
      const category = categorizeArticle(item.title || '', textContent);
      
      return {
        substackId: item.guid || item.link || '',
        title: item.title || 'Untitled',
        excerpt: excerpt,
        content: htmlContent,
        author: item.creator || 'The Editorial Board',
        publishedDate: new Date(item.pubDate || Date.now()),
        substackUrl: item.link || '',
        category: category,
        imageUrl: imageUrl,
        imageCaption: null,
        readTime: estimateReadTime(textContent),
        featured: false,
      };
    });
    
    return articles;
  } catch (error) {
    console.error('Error fetching Substack RSS:', error);
    return [];
  }
}

function categorizeArticle(title: string, content: string): string {
  const combined = `${title} ${content}`.toLowerCase();
  
  if (combined.includes('breaking') || combined.includes('exclusive')) {
    return 'Breaking Mews';
  }
  if (combined.includes('investigation') || combined.includes('report')) {
    return 'Investigation';
  }
  if (combined.includes('opinion') || combined.includes('editorial')) {
    return 'Opinion';
  }
  if (combined.includes('world') || combined.includes('global')) {
    return 'World';
  }
  if (combined.includes('technology') || combined.includes('tech') || combined.includes('robot')) {
    return 'Technology';
  }
  if (combined.includes('market') || combined.includes('stock')) {
    return 'Market';
  }
  
  return 'Human Nonsense';
}

function estimateReadTime(text: string): string {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}
