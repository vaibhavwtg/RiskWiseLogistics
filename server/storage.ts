import { type User, type InsertUser, type BlogPost, type InsertBlogPost, type UpdateBlogPost } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Blog post methods
  getBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, updates: UpdateBlogPost): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private blogPosts: Map<string, BlogPost>;

  constructor() {
    this.users = new Map();
    this.blogPosts = new Map();
    this.seedBlogPosts();
  }

  private seedBlogPosts() {
    const posts: BlogPost[] = [
      {
        id: "1",
        title: "5 Critical Risk Factors in International Freight Forwarding",
        slug: "5-critical-risk-factors-international-freight-forwarding",
        excerpt: "Understanding and mitigating the key risks that can impact your international shipping operations and bottom line.",
        content: `# 5 Critical Risk Factors in International Freight Forwarding

International freight forwarding involves numerous complexities that can expose businesses to significant risks. Understanding and mitigating these risks is crucial for maintaining profitable and compliant operations.

## 1. Documentation and Compliance Risk

Proper documentation is the foundation of successful freight forwarding. Missing or incorrect paperwork can lead to delays, penalties, and shipment rejection.

**Key mitigation strategies:**
- Implement automated documentation systems
- Regular compliance training for staff
- Partner with experienced customs brokers
- Maintain updated regulatory databases

## 2. Carrier Performance Risk

Reliability of carriers directly impacts delivery timelines and cargo safety. Poor carrier performance can damage customer relationships and increase costs.

**Risk factors to monitor:**
- On-time delivery rates
- Cargo damage statistics
- Financial stability of carriers
- Insurance coverage adequacy

## 3. Currency and Financial Risk

Fluctuating exchange rates and payment terms can significantly impact profitability, especially for long-term contracts.

**Protection measures:**
- Currency hedging strategies
- Clear payment terms
- Credit insurance
- Regular financial health checks of partners

## 4. Cargo Security and Loss Prevention

Theft, damage, and loss of cargo remain persistent challenges in international shipping.

**Security protocols:**
- GPS tracking systems
- Sealed container procedures
- Vetted transportation partners
- Comprehensive insurance coverage

## 5. Regulatory and Political Risk

Changes in trade regulations, sanctions, and political instability can disrupt shipping routes and increase costs.

**Stay ahead with:**
- Regular regulatory monitoring
- Diversified shipping routes
- Strong government relations
- Flexible operational procedures

By proactively addressing these risk factors, freight forwarders can maintain competitive advantage while protecting their operations and customers.`,
        category: "Risk Management",
        imageUrl: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        published: true,
        createdAt: new Date("2024-03-15"),
        updatedAt: new Date("2024-03-15"),
      },
      {
        id: "2",
        title: "New Customs Regulations: What Brokers Need to Know",
        slug: "new-customs-regulations-brokers-need-know",
        excerpt: "Navigate the latest regulatory changes affecting customs broking operations and ensure continued compliance.",
        content: `# New Customs Regulations: What Brokers Need to Know

The customs landscape continues to evolve with new regulations designed to enhance security and streamline trade processes. Staying informed and compliant is essential for customs brokers.

## Recent Regulatory Updates

### Enhanced Security Measures
New security protocols require additional documentation and screening procedures for high-risk shipments.

### Digital Documentation Requirements
Many jurisdictions are mandating electronic submission of customs documents with enhanced data requirements.

### Updated Duty Classifications
Recent changes to harmonized tariff schedules affect duty calculations for various product categories.

## Compliance Strategies

### 1. Technology Investment
Invest in automated compliance systems that can adapt to regulatory changes quickly.

### 2. Staff Training
Regular training programs ensure your team stays current with regulatory requirements.

### 3. Partner Collaboration
Work closely with shipping lines and freight forwarders to ensure coordinated compliance efforts.

### 4. Documentation Standards
Maintain rigorous documentation standards that exceed minimum requirements.

## Looking Ahead

The regulatory environment will continue to evolve, making adaptability and proactive compliance management more important than ever.`,
        category: "Compliance",
        imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        published: true,
        createdAt: new Date("2024-03-12"),
        updatedAt: new Date("2024-03-12"),
      },
      {
        id: "3",
        title: "AI-Powered Risk Assessment in Logistics",
        slug: "ai-powered-risk-assessment-logistics",
        excerpt: "How artificial intelligence is transforming risk identification and mitigation strategies in modern logistics operations.",
        content: `# AI-Powered Risk Assessment in Logistics

Artificial intelligence is revolutionizing how logistics companies identify, assess, and mitigate risks across their operations.

## The AI Advantage

### Predictive Analytics
AI systems can analyze historical data patterns to predict potential disruptions before they occur.

### Real-time Monitoring
Continuous monitoring of multiple data streams enables immediate risk detection and response.

### Pattern Recognition
Machine learning algorithms identify subtle patterns that human analysts might miss.

## Key Applications

### 1. Route Optimization
AI analyzes traffic patterns, weather conditions, and historical data to recommend optimal shipping routes.

### 2. Carrier Selection
Automated scoring systems evaluate carrier performance across multiple metrics.

### 3. Demand Forecasting
Predictive models help optimize inventory levels and reduce stockout risks.

### 4. Fraud Detection
AI systems identify suspicious patterns in documentation and transactions.

## Implementation Best Practices

### Data Quality
Ensure high-quality, consistent data inputs for accurate AI predictions.

### Human Oversight
Maintain human review processes for critical decisions.

### Continuous Learning
Regularly update AI models with new data and feedback.

### Integration
Seamlessly integrate AI tools with existing logistics management systems.

The future of logistics risk management lies in the intelligent combination of human expertise and AI capabilities.`,
        category: "Technology",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        published: true,
        createdAt: new Date("2024-03-10"),
        updatedAt: new Date("2024-03-10"),
      }
    ];

    posts.forEach(post => {
      this.blogPosts.set(post.id, post);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.published)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const now = new Date();
    const blogPost: BlogPost = {
      ...post,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  async updateBlogPost(id: string, updates: UpdateBlogPost): Promise<BlogPost | undefined> {
    const existingPost = this.blogPosts.get(id);
    if (!existingPost) return undefined;

    const updatedPost: BlogPost = {
      ...existingPost,
      ...updates,
      updatedAt: new Date(),
    };
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    return this.blogPosts.delete(id);
  }
}

export const storage = new MemStorage();
