import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { fetchSubstackArticles } from "./substack-sync";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/articles", async (req, res) => {
    try {
      const articles = await storage.getArticles();
      res.json(articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  app.get("/api/articles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const article = await storage.getArticleById(id);
      
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      
      res.json(article);
    } catch (error) {
      console.error("Error fetching article:", error);
      res.status(500).json({ error: "Failed to fetch article" });
    }
  });

  app.post("/api/sync-substack", async (req, res) => {
    try {
      const substackArticles = await fetchSubstackArticles();
      
      const syncedArticles = await Promise.all(
        substackArticles.map(article => storage.upsertArticle(article))
      );
      
      res.json({ 
        success: true, 
        synced: syncedArticles.length,
        articles: syncedArticles 
      });
    } catch (error) {
      console.error("Error syncing Substack articles:", error);
      res.status(500).json({ error: "Failed to sync Substack articles" });
    }
  });

  app.get("/api/articles/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const articles = await storage.getArticlesByCategory(category);
      res.json(articles);
    } catch (error) {
      console.error("Error fetching articles by category:", error);
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  fetchSubstackArticles().then(async (substackArticles) => {
    try {
      await Promise.all(substackArticles.map(article => storage.upsertArticle(article)));
      console.log(`✅ Synced ${substackArticles.length} articles from Substack on startup`);
    } catch (error) {
      console.error("❌ Failed to sync Substack articles on startup:", error);
    }
  });

  setInterval(async () => {
    try {
      const substackArticles = await fetchSubstackArticles();
      await Promise.all(substackArticles.map(article => storage.upsertArticle(article)));
      console.log(`✅ Auto-synced ${substackArticles.length} articles from Substack`);
    } catch (error) {
      console.error("❌ Substack auto-sync failed:", error);
    }
  }, 30 * 60 * 1000);

  return httpServer;
}
