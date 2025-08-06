import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import { BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const { slug } = useParams();
  
  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog/posts", slug],
  });

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rw-red mx-auto"></div>
          <p className="text-rw-gray">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-rw-navy">Article Not Found</h1>
          <p className="text-rw-gray">The article you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button className="bg-rw-red hover:bg-red-600">
              <ArrowLeft className="mr-2" size={16} />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="py-20 bg-rw-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog">
            <Button variant="ghost" className="mb-8 text-rw-navy hover:text-rw-red">
              <ArrowLeft className="mr-2" size={16} />
              Back to Blog
            </Button>
          </Link>
          
          <div className="space-y-6">
            <Badge variant="secondary" className="text-rw-red bg-red-50">
              {post.category}
            </Badge>
            
            <h1 className="text-3xl lg:text-5xl font-bold text-rw-navy leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center text-rw-gray">
              <Calendar size={16} className="mr-2" />
              {formatDate(post.createdAt!)}
            </div>
            
            <p className="text-xl text-rw-gray leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.imageUrl && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none prose-headings:text-rw-navy prose-a:text-rw-red">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: post.content.replace(/\n/g, '<br>').replace(/# (.*)/g, '<h1>$1</h1>').replace(/## (.*)/g, '<h2>$1</h2>').replace(/### (.*)/g, '<h3>$1</h3>')
              }} 
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-rw-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Ready to Transform Your Risk Management?</h2>
            <p className="text-xl text-gray-300">
              Discover how RiskWise Tech can help your logistics operations stay ahead of risks and maintain compliance.
            </p>
            <Link href="/contact">
              <Button className="bg-rw-red text-white px-8 py-4 rounded-lg hover:bg-red-600 transition-colors font-semibold text-lg">
                Contact Our Experts
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
