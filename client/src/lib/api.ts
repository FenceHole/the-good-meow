import type { Article } from "@shared/schema";

export async function fetchArticles(): Promise<Article[]> {
  const response = await fetch('/api/articles');
  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }
  return response.json();
}

export async function fetchArticleById(id: number): Promise<Article> {
  const response = await fetch(`/api/articles/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch article');
  }
  return response.json();
}

export async function syncSubstackArticles(): Promise<{ success: boolean; synced: number }> {
  const response = await fetch('/api/sync-substack', { method: 'POST' });
  if (!response.ok) {
    throw new Error('Failed to sync Substack articles');
  }
  return response.json();
}
