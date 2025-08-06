import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBlogPostSchema, updateBlogPostSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";

// Authentication middleware
const authenticateAdmin = async (req: any, res: any, next: any) => {
  try {
    const sessionId = req.cookies?.adminSession;
    if (!sessionId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const session = await storage.getSession(sessionId);
    if (!session) {
      return res.status(401).json({ message: "Invalid or expired session" });
    }

    req.adminSession = session;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize storage and seed data
  storage.seedInitialData().catch(console.error);
  // Blog routes
  app.get("/api/blog/posts", async (req, res) => {
    try {
      const posts = await storage.getPublishedBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/posts/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post || !post.published) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // Admin authentication routes
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user || !(await storage.verifyPassword(user, password))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const session = await storage.createSession(user.id);
      res.cookie('adminSession', session.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: 'strict'
      });

      res.json({ message: "Login successful" });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.post("/api/admin/logout", async (req, res) => {
    try {
      const sessionId = req.cookies?.adminSession;
      if (sessionId) {
        await storage.deleteSession(sessionId);
      }
      res.clearCookie('adminSession');
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ message: "Logout failed" });
    }
  });

  app.get("/api/admin/check", async (req: any, res) => {
    try {
      const sessionId = req.cookies?.adminSession;
      if (!sessionId) {
        return res.status(401).json({ authenticated: false });
      }

      const session = await storage.getSession(sessionId);
      if (!session) {
        return res.status(401).json({ authenticated: false });
      }

      res.json({ authenticated: true });
    } catch (error) {
      res.status(401).json({ authenticated: false });
    }
  });

  // Protected admin blog routes
  app.get("/api/admin/blog/posts", authenticateAdmin, async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/admin/blog/posts/:id", authenticateAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const post = await storage.getBlogPost(id);
      
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.post("/api/admin/blog/posts", authenticateAdmin, async (req, res) => {
    try {
      const validation = insertBlogPostSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid blog post data",
          errors: validation.error.errors 
        });
      }

      const post = await storage.createBlogPost(validation.data);
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to create blog post" });
    }
  });

  app.put("/api/admin/blog/posts/:id", authenticateAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const validation = updateBlogPostSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid blog post data",
          errors: validation.error.errors 
        });
      }

      const post = await storage.updateBlogPost(id, validation.data);
      
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to update blog post" });
    }
  });

  app.delete("/api/admin/blog/posts/:id", authenticateAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteBlogPost(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json({ message: "Blog post deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
