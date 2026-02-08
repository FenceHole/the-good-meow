import { type User, type InsertUser, type Article, type InsertArticle } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { users, articles } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getArticles(): Promise<Article[]>;
  getArticleById(id: number): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  upsertArticle(article: InsertArticle): Promise<Article>;
  getFeaturedArticles(): Promise<Article[]>;
  getArticlesByCategory(category: string): Promise<Article[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getArticles(): Promise<Article[]> {
    return await db.select().from(articles).orderBy(desc(articles.publishedDate));
  }

  async getArticleById(id: number): Promise<Article | undefined> {
    const result = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
    return result[0];
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const result = await db.insert(articles).values(article).returning();
    return result[0];
  }

  async upsertArticle(article: InsertArticle): Promise<Article> {
    const existing = await db.select().from(articles).where(eq(articles.substackId, article.substackId)).limit(1);
    
    if (existing[0]) {
      const updated = await db
        .update(articles)
        .set({ ...article, updatedAt: new Date() })
        .where(eq(articles.substackId, article.substackId))
        .returning();
      return updated[0];
    } else {
      return await this.createArticle(article);
    }
  }

  async getFeaturedArticles(): Promise<Article[]> {
    return await db.select().from(articles).where(eq(articles.featured, true)).orderBy(desc(articles.publishedDate));
  }

  async getArticlesByCategory(category: string): Promise<Article[]> {
    return await db.select().from(articles).where(eq(articles.category, category)).orderBy(desc(articles.publishedDate));
  }
}

export const storage = new DatabaseStorage();
