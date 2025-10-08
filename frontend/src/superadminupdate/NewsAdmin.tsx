import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { resolveImageUrl, getGoogleDriveAlternateUrls } from "@/lib/utils";
import api from "@/lib/api";

type NewsItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  month: string;
  year: number;
  createdAt: number;
};

const NewsAdmin = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState<string>("");

  const [items, setItems] = useState<NewsItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch news from API on component mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get("/content/news");
        const newsData = response?.data?.newsItems || [];
        const formattedItems: NewsItem[] = newsData.map((n: any) => ({
          id: n._id,
          title: n.title,
          description: n.description,
          category: n.category,
          imageUrl: n.imageUrl,
          month: n.month,
          year: n.year,
          createdAt: Date.now(),
        }));
        setItems(formattedItems);
        console.log("[NewsAdmin] Fetched news items:", formattedItems);
      } catch (error) {
        console.error("[NewsAdmin] Failed to fetch news:", error);
        toast({ title: "Error", description: "Failed to load news items." });
      }
    };

    fetchNews();
  }, []);

  const addNews = async () => {
    const yr = parseInt(year, 10);
    if (!title.trim() || !description.trim() || !category.trim() || !imageUrl.trim() || !month.trim() || isNaN(yr)) {
      toast({ title: "Missing fields", description: "Please fill all fields correctly." });
      return;
    }

    const payloadItem = {
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      imageUrl: imageUrl.trim(),
      month: month.trim(),
      year: yr,
    };

    try {
      setIsSubmitting(true);
      await api.put("/content/news", { newsItems: [payloadItem] });

      const newItem: NewsItem = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        ...payloadItem,
        createdAt: Date.now(),
      };

      setItems((prev) => [newItem, ...prev]);
      toast({ title: "News added", description: newItem.title });
        window.location.reload();
      setTitle(""); setDescription(""); setCategory(""); setImageUrl(""); setMonth(""); setYear("");
    } catch (error: any) {
      console.error("[NewsAdmin] Error posting news:", error);
      toast({ title: "Error", description: error?.response?.data?.message || "Failed to add news." });
    } finally {
      setIsSubmitting(false);
    }
  };

 const removeNews = async (id: string) => {
  try {
    // Send request to backend to remove the news
    await api.post("/content/remove", { id });

    // Update frontend state
    setItems((prev) => prev.filter((i) => i.id !== id));

    // Show success toast
    toast({ title: "Removed", description: "News item deleted." });
  } catch (error) {
    console.error("Error removing news:", error);
    toast({ title: "Error", description: "Failed to delete news item.", variant: "destructive" });
  }
};

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <div className="mb-4">
        <div className="text-2xl font-semibold">News Manager</div>
        <div className="text-sm text-muted-foreground">Add news cards for Latest News & Events</div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add news</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Form Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="news-title">Title</Label>
              <Input id="news-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="news-category">Category</Label>
              <Input id="news-category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="news-desc">Description</Label>
              <Textarea id="news-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" rows={4} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="news-month">Month</Label>
              <Input id="news-month" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="e.g., Mar" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="news-year">Year</Label>
              <Input id="news-year" type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="2025" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="news-image-url">Image URL</Label>
              <Input id="news-image-url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Google Drive or image link" />
            </div>
            <div className="flex items-end">
              <Button onClick={addNews} disabled={isSubmitting}>Add</Button>
            </div>
          </div>

          <Separator className="my-4" />

          {/* News List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.length === 0 && <div className="text-sm text-muted-foreground">No news added yet.</div>}
            {items.map((n) => {
              const imgSrc = resolveImageUrl(n.imageUrl);
              return (
                <div key={n.id} className="rounded-md border p-3 flex gap-3">
                  <img
                    src={imgSrc}
                    alt={n.title}
                    className="w-28 h-20 object-cover rounded"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      const candidates = getGoogleDriveAlternateUrls(n.imageUrl);
                      const currentIndex = candidates.indexOf(el.src);
                      const next = candidates[currentIndex + 1] || candidates[0];
                      if (next && next !== el.src) el.src = next;
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium truncate">{n.title}</div>
                    <div className="text-xs text-muted-foreground truncate">{n.category} · {n.month} {n.year}</div>
                    <div className="text-xs text-muted-foreground line-clamp-2">{n.description}</div>
                  </div>
                  <div className="flex items-center">
                    <Button variant="destructive" onClick={() => removeNews(n.id)}>Delete</Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsAdmin;
