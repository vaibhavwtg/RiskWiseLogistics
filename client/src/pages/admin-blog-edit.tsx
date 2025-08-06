import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";
import { insertBlogPostSchema, type InsertBlogPost, type BlogPost } from "@shared/schema";
import { z } from "zod";

const categories = [
  "Risk Management",
  "Compliance",
  "Technology",
  "Industry Insights",
  "News",
  "Case Studies",
];

type BlogPostForm = z.infer<typeof insertBlogPostSchema>;

export default function AdminBlogEdit() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const params = useParams();
  const isEditMode = params?.id && params.id !== "new";

  // Check authentication
  const { data: authCheck, isLoading: authLoading } = useQuery({
    queryKey: ["/api/admin/check"],
    retry: false,
  });

  // Get existing post if editing
  const { data: existingPost, isLoading: postLoading } = useQuery<BlogPost>({
    queryKey: ["/api/admin/blog/posts", params?.id],
    enabled: !!(authCheck as any)?.authenticated && !!isEditMode,
  });

  const form = useForm<BlogPostForm>({
    resolver: zodResolver(insertBlogPostSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      imageUrl: "",
      published: false,
    },
  });

  // Update form when existing post loads
  useEffect(() => {
    if (existingPost) {
      form.reset({
        title: existingPost.title,
        slug: existingPost.slug,
        excerpt: existingPost.excerpt,
        content: existingPost.content,
        category: existingPost.category,
        imageUrl: existingPost.imageUrl || "",
        published: existingPost.published === true,
      });
    }
  }, [existingPost, form]);

  // Auto-generate slug from title
  const watchTitle = form.watch("title");
  useEffect(() => {
    if (watchTitle && !isEditMode) {
      const slug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      form.setValue("slug", slug);
    }
  }, [watchTitle, form, isEditMode]);

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async (data: BlogPostForm) => {
      if (isEditMode) {
        return apiRequest("PUT", `/api/admin/blog/posts/${params?.id}`, data);
      } else {
        return apiRequest("POST", "/api/admin/blog/posts", data);
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: `Post ${isEditMode ? "updated" : "created"} successfully!`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog/posts"] });
      setLocation("/admin");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save post",
        variant: "destructive",
      });
    },
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !(authCheck as any)?.authenticated) {
      setLocation("/admin/login");
    }
  }, [authCheck, authLoading, setLocation]);

  if (authLoading || (isEditMode && postLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!(authCheck as any)?.authenticated) {
    return null;
  }

  const onSubmit = (data: BlogPostForm) => {
    saveMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Button
              variant="ghost"
              onClick={() => setLocation("/admin")}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isEditMode ? "Edit Post" : "New Post"}
              </h1>
              <p className="text-gray-600">
                {isEditMode ? "Update your blog post" : "Create a new blog post"}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Post Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  {...form.register("title")}
                  placeholder="Enter post title..."
                />
                {form.formState.errors.title && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.title.message}
                  </p>
                )}
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  {...form.register("slug")}
                  placeholder="url-friendly-slug"
                />
                {form.formState.errors.slug && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.slug.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={form.watch("category")}
                  onValueChange={(value) => form.setValue("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.category && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.category.message}
                  </p>
                )}
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  {...form.register("excerpt")}
                  placeholder="Brief description of the post..."
                  rows={3}
                />
                {form.formState.errors.excerpt && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.excerpt.message}
                  </p>
                )}
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL (optional)</Label>
                <Input
                  id="imageUrl"
                  {...form.register("imageUrl")}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  {...form.register("content")}
                  placeholder="Write your post content in Markdown..."
                  rows={20}
                  className="font-mono text-sm"
                />
                {form.formState.errors.content && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.content.message}
                  </p>
                )}
              </div>

              {/* Published */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={form.watch("published")}
                  onCheckedChange={(checked) => form.setValue("published", checked)}
                />
                <Label htmlFor="published">Published</Label>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLocation("/admin")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saveMutation.isPending}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saveMutation.isPending
                    ? "Saving..."
                    : isEditMode
                    ? "Update Post"
                    : "Create Post"
                  }
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}