import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@shared/schema";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow">
      <Link href={`/blog/${post.slug}`}>
        <div className="cursor-pointer">
          {post.imageUrl && (
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-48 object-cover"
            />
          )}
          <CardContent className="p-6 space-y-4">
            <Badge variant="secondary" className="text-rw-red bg-red-50">
              {post.category}
            </Badge>
            <h3 className="text-xl font-semibold text-rw-navy hover:text-rw-red transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-rw-gray line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="text-sm text-rw-gray">
                {formatDate(post.createdAt!)}
              </span>
              <span className="text-rw-red font-medium hover:underline">
                Read More
              </span>
            </div>
          </CardContent>
        </div>
      </Link>
    </Card>
  );
}
