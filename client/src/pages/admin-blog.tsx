import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import BlogEditor from "@/components/blog/blog-editor";
import { BlogPost } from "@shared/schema";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function AdminBlog() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/admin/blog/posts"],
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/admin/blog/posts/${id}`),
    onSuccess: () => {
      toast({ title: "Blog post deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog/posts"] });
    },
    onError: () => {
      toast({ title: "Failed to delete blog post", variant: "destructive" });
    },
  });

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setShowEditor(true);
  };

  const handleCreate = () => {
    setEditingPost(null);
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setEditingPost(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rw-red mx-auto"></div>
          <p className="text-rw-gray">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-rw-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold text-rw-navy">Blog Management</CardTitle>
            <Button 
              onClick={handleCreate}
              className="bg-rw-red text-white hover:bg-red-600"
            >
              <Plus className="mr-2" size={20} />
              Create New Post
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-rw-navy font-semibold">Title</TableHead>
                    <TableHead className="text-rw-navy font-semibold">Category</TableHead>
                    <TableHead className="text-rw-navy font-semibold">Status</TableHead>
                    <TableHead className="text-rw-navy font-semibold">Date</TableHead>
                    <TableHead className="text-rw-navy font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts?.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium max-w-xs truncate">
                        {post.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-rw-red bg-red-50">
                          {post.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={post.published ? "default" : "secondary"}
                          className={post.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
                        >
                          {post.published ? "Published" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(post.createdAt!)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(post)}
                            className="text-rw-navy hover:text-rw-red"
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(post.id)}
                            className="text-red-600 hover:text-red-800"
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {!posts || posts.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-rw-gray">No blog posts found. Create your first post!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {showEditor && (
        <BlogEditor
          post={editingPost || undefined}
          onClose={handleCloseEditor}
          onSave={() => {
            // Optional: refresh data or handle success
          }}
        />
      )}
    </div>
  );
}
