import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import { blogPosts, users, adminSessions, type BlogPost, type InsertBlogPost, type UpdateBlogPost, type User, type InsertUser, type AdminSession, type InsertAdminSession } from "@shared/schema";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export interface IStorage {
  // Blog methods
  getAllBlogPosts(): Promise<BlogPost[]>;
  getAdminBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  getBlogPostById(id: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, updates: UpdateBlogPost): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
  
  // User/Admin methods
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  verifyPassword(user: User, password: string): Promise<boolean>;
  
  // Session methods
  createSession(userId: string): Promise<AdminSession>;
  getSession(sessionId: string): Promise<AdminSession | undefined>;
  deleteSession(sessionId: string): Promise<boolean>;
  cleanupExpiredSessions(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getAllBlogPosts(): Promise<BlogPost[]> {
    const posts = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.createdAt));
    return posts;
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return this.getAllBlogPosts();
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    const posts = await db
      .select()
      .from(blogPosts)
      .orderBy(desc(blogPosts.createdAt));
    return posts;
  }

  async getAdminBlogPosts(): Promise<BlogPost[]> {
    return this.getBlogPosts();
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const [post] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, id));
    return post;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug));
    return post;
  }

  async getBlogPostById(id: string): Promise<BlogPost | undefined> {
    return this.getBlogPost(id);
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db
      .insert(blogPosts)
      .values({
        ...post,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    return newPost;
  }

  async updateBlogPost(id: string, updates: UpdateBlogPost): Promise<BlogPost | undefined> {
    const [updatedPost] = await db
      .update(blogPosts)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, id))
      .returning();
    return updatedPost;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await db
      .delete(blogPosts)
      .where(eq(blogPosts.id, id))
      .returning();
    return result.length > 0;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const [newUser] = await db
      .insert(users)
      .values({
        ...user,
        password: hashedPassword,
      })
      .returning();
    return newUser;
  }

  async verifyPassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  async createSession(userId: string): Promise<AdminSession> {
    const sessionId = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const [session] = await db
      .insert(adminSessions)
      .values({
        id: sessionId,
        userId,
        expiresAt,
      })
      .returning();
    return session;
  }

  async getSession(sessionId: string): Promise<AdminSession | undefined> {
    const [session] = await db
      .select()
      .from(adminSessions)
      .where(eq(adminSessions.id, sessionId));
    
    if (!session || session.expiresAt < new Date()) {
      return undefined;
    }
    
    return session;
  }

  async deleteSession(sessionId: string): Promise<boolean> {
    const result = await db
      .delete(adminSessions)
      .where(eq(adminSessions.id, sessionId))
      .returning();
    return result.length > 0;
  }

  async cleanupExpiredSessions(): Promise<void> {
    await db
      .delete(adminSessions)
      .where(eq(adminSessions.expiresAt, new Date()));
  }

  // Seed initial data
  async seedInitialData(): Promise<void> {
    try {
      // Check if admin user exists
      const existingAdmin = await this.getUserByUsername('admin');
      if (!existingAdmin) {
        await this.createUser({
          username: 'admin',
          password: 'admin123' // You should change this!
        });
      }

      // Check if we have blog posts
      const existingPosts = await this.getAdminBlogPosts();
      if (existingPosts.length === 0) {
        await this.seedBlogPosts();
      }
    } catch (error) {
      console.error('Error seeding initial data:', error);
    }
  }

  private async seedBlogPosts(): Promise<void> {
    const seedPosts: InsertBlogPost[] = [
      {
        title: "Risk Management in International Freight Forwarding",
        slug: "risk-management-international-freight",
        excerpt: "Understanding the critical risk factors that impact international freight operations and how to mitigate them effectively.",
        content: `# Risk Management in International Freight Forwarding

International freight forwarding presents unique challenges that require comprehensive risk management strategies. From regulatory compliance to cargo security, freight forwarders must navigate a complex landscape of potential risks.

## Key Risk Areas

### 1. Regulatory Compliance
Different countries have varying import/export regulations that are constantly evolving. Staying compliant requires:
- Regular monitoring of regulatory changes
- Comprehensive documentation processes
- Strong relationships with customs authorities

### 2. Cargo Security
Protecting cargo throughout the supply chain involves:
- Secure packaging and labeling
- Reliable carrier partnerships
- Real-time tracking and monitoring
- Insurance coverage for high-value shipments

### 3. Documentation Accuracy
Incorrect or incomplete documentation can lead to:
- Customs delays and penalties
- Additional storage costs
- Damaged customer relationships
- Legal complications

## Best Practices for Risk Mitigation

### Technology Integration
Modern freight forwarders leverage technology to reduce risks:
- Automated compliance checking
- Digital documentation systems
- Real-time shipment tracking
- Predictive analytics for route optimization

### Partnership Management
Building strong relationships with:
- Reliable carriers and logistics providers
- Customs brokers and agents
- Insurance providers
- Local partners in key markets

## Conclusion
Effective risk management in international freight forwarding requires a comprehensive approach that combines technology, strong partnerships, and proactive planning. By identifying potential risks early and implementing appropriate mitigation strategies, freight forwarders can protect their operations and deliver superior service to their customers.`,
        category: "Risk Management",
        imageUrl: "https://images.unsplash.com/photo-1586953135850-a7f3c9d8c8e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        published: true,
      },
      {
        title: "Customs Compliance Automation: The Future is Here",
        slug: "customs-compliance-automation",
        excerpt: "How automation is revolutionizing customs compliance and reducing the burden of manual processes for logistics companies.",
        content: `# Customs Compliance Automation: The Future is Here

The logistics industry is experiencing a digital transformation, with customs compliance automation leading the charge. Modern technology is making it easier than ever to manage complex regulatory requirements while reducing costs and improving efficiency.

## The Challenge of Manual Compliance

Traditional customs compliance processes are:
- Time-consuming and prone to human error
- Difficult to scale across multiple jurisdictions
- Expensive to maintain with dedicated staff
- Limited in their ability to adapt to changing regulations

## Automation Solutions

### AI-Powered Classification
Automated systems can now:
- Classify goods based on product descriptions
- Suggest appropriate HS codes
- Flag potential compliance issues
- Learn from past decisions to improve accuracy

### Document Management
Digital platforms provide:
- Automated document generation
- Real-time validation against regulatory requirements
- Secure storage and retrieval
- Integration with customs authorities' systems

### Regulatory Updates
Automated systems keep businesses informed by:
- Monitoring regulatory changes across jurisdictions
- Updating compliance rules automatically
- Sending alerts for relevant changes
- Providing guidance on implementation

## Benefits of Automation

### Cost Reduction
- Reduced manual processing time
- Lower error rates and associated penalties
- Decreased need for specialized compliance staff
- Improved operational efficiency

### Enhanced Accuracy
- Consistent application of compliance rules
- Reduced risk of human error
- Automated cross-checking of requirements
- Real-time validation of submissions

### Scalability
- Easy expansion to new markets
- Handling of increased transaction volumes
- Consistent compliance across all operations
- Reduced complexity in multi-jurisdictional operations

## Future Outlook

The future of customs compliance will likely include:
- Increased use of blockchain for secure document verification
- Greater integration between private systems and government platforms
- Enhanced predictive analytics for risk assessment
- More sophisticated AI algorithms for complex classification tasks

## Conclusion

Customs compliance automation is not just a technological upgrade—it's a strategic necessity for logistics companies looking to compete in the global marketplace. By embracing these tools, businesses can reduce costs, improve accuracy, and focus on what they do best: moving goods efficiently around the world.`,
        category: "Compliance",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        published: true,
      },
      {
        title: "Technology Trends Shaping Logistics Risk Management",
        slug: "technology-trends-logistics-risk-management",
        excerpt: "Exploring the latest technological innovations that are transforming how logistics companies identify, assess, and mitigate operational risks.",
        content: `# Technology Trends Shaping Logistics Risk Management

The logistics industry is rapidly evolving, driven by technological innovations that are fundamentally changing how companies manage risk. From artificial intelligence to blockchain, these technologies are providing new ways to identify, assess, and mitigate operational risks.

## Artificial Intelligence and Machine Learning

### Predictive Risk Analytics
AI algorithms can now:
- Analyze historical data to predict potential disruptions
- Identify patterns that human analysts might miss
- Provide early warning systems for various risk factors
- Continuously learn and improve prediction accuracy

### Automated Decision Making
Machine learning systems enable:
- Real-time risk assessment and response
- Automated routing decisions based on risk profiles
- Dynamic pricing adjustments for high-risk scenarios
- Intelligent resource allocation during disruptions

## Internet of Things (IoT) Integration

### Real-Time Monitoring
IoT devices provide:
- Continuous tracking of cargo conditions
- Environmental monitoring (temperature, humidity, shock)
- Location-based risk assessment
- Immediate alerts for anomalies

### Predictive Maintenance
Smart sensors can:
- Monitor equipment health in real-time
- Predict maintenance needs before failures occur
- Optimize maintenance schedules to reduce disruptions
- Extend equipment lifespan through proactive care

## Blockchain Technology

### Supply Chain Transparency
Blockchain enables:
- Immutable records of cargo movement
- Enhanced visibility across the entire supply chain
- Reduced fraud and counterfeiting risks
- Improved trust between trading partners

### Smart Contracts
Automated contract execution provides:
- Reduced counterparty risk
- Faster settlement of disputes
- Automated compliance checking
- Lower transaction costs

## Digital Twin Technology

### Virtual Risk Simulation
Digital twins allow companies to:
- Model complex supply chain scenarios
- Test risk mitigation strategies virtually
- Optimize operations without real-world consequences
- Improve contingency planning

## Cloud Computing and Data Analytics

### Scalable Risk Management
Cloud platforms provide:
- Massive data processing capabilities
- Real-time analytics across global operations
- Flexible scaling based on business needs
- Cost-effective access to advanced technologies

## Future Implications

The convergence of these technologies will likely lead to:
- More proactive rather than reactive risk management
- Increased automation in risk response
- Better integration between different risk management systems
- More sophisticated scenario planning capabilities

## Challenges and Considerations

While these technologies offer significant benefits, companies must also consider:
- Data privacy and security concerns
- Integration challenges with legacy systems
- Need for skilled personnel to manage new technologies
- Regulatory compliance in different jurisdictions

## Conclusion

Technology is transforming logistics risk management from a reactive discipline to a proactive, data-driven function. Companies that embrace these innovations will be better positioned to manage risks, reduce costs, and deliver superior service to their customers. The key is to develop a comprehensive technology strategy that aligns with business objectives and risk tolerance.`,
        category: "Technology",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        published: true,
      }
    ];

    for (const post of seedPosts) {
      await this.createBlogPost(post);
    }
  }
}

export const storage = new DatabaseStorage();