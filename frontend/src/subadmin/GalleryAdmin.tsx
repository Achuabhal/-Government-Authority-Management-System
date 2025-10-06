import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import { resolveImageUrl, getGoogleDriveAlternateUrls } from "@/lib/utils";

type GalleryItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: number;
};

const STORAGE_KEY = "Content.gallery.items";

const DEFAULT_ITEMS: GalleryItem[] = [];

const GalleryAdmin = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [items, setItems] = useState<GalleryItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as GalleryItem[];
        return parsed.length > 0 ? parsed : DEFAULT_ITEMS;
      }
      return DEFAULT_ITEMS;
    } catch {
      return DEFAULT_ITEMS;
    }
  });


  
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      window.dispatchEvent(new Event("Content:gallery:update"));
    } catch {}
  }, [items]);

  // Load gallery items from backend (GET /content/gallery)
  useEffect(() => {
    const load = async () => {
      try {
        console.log("[GalleryAdmin] GET /content/gallery - loading...");
        const res = await api.get("/admin/gallery");
        console.log("[GalleryAdmin] GET /content/gallery response", res?.status, res?.data);
        const arr: any[] = res?.data?.galleryImages || [];
        const mapped: GalleryItem[] = arr.map((g: any, idx: number) => ({
          id: g._id || `${idx}-${g.image}`,
          title: g.title || g.heading || "",
          description: g.description || g.subheading || "",
          imageUrl: resolveImageUrl(g.image || g.imageUrl || ""),
          createdAt: Date.now(),
        }));
        setItems(mapped);
      } catch (error: any) {
        console.error("[GalleryAdmin] GET /content/gallery error", error?.message, error?.response?.data);
      }
    };
    load();
  }, []);

  const addGalleryItem = () => {
    if (!title.trim() || !description.trim() || !imageUrl.trim()) {
      toast({ title: "Missing fields", description: "Please fill all fields correctly." });
      return;
    }

    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const item: GalleryItem = {
      id,
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      createdAt: Date.now(),
    };

    setItems((prev) => [item, ...prev]);

    setTitle("");
    setDescription("");
    setImageUrl("");
    toast({ title: "Image added", description: item.title });
  };

  const removeGalleryItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast({ title: "Removed", description: "Gallery item deleted." });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <div className="mb-4">
        <div className="text-2xl font-semibold">Gallery Manager</div>
        <div className="text-sm text-muted-foreground">Add images with title and description</div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add to Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gallery-title">Title</Label>
              <Input id="gallery-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="gallery-desc">Description</Label>
              <Textarea id="gallery-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" rows={3} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="gallery-image-url">Image URL (Google Drive or direct link)</Label>
              <Input
                id="gallery-image-url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Paste Google Drive or image link"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addGalleryItem}>Add</Button>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.length === 0 && <div className="text-sm text-muted-foreground">No images added yet.</div>}
            {items.map((g) => (
              <div key={g.id} className="rounded-md border p-3 flex gap-3">
                <img
                  src={g.imageUrl}
                  alt={g.title}
                  className="w-28 h-20 object-cover rounded"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    console.warn("[GalleryAdmin] image onError", { src: el.src, title: g.title });
                    const candidates = getGoogleDriveAlternateUrls(g.imageUrl);
                    const currentIndex = candidates.indexOf(el.src);
                    const next = candidates[currentIndex + 1] || candidates[0];
                    if (next && next !== el.src) {
                      console.log("[GalleryAdmin] trying next candidate", next);
                      el.src = next;
                    }
                  }}
                  onLoad={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    console.log("[GalleryAdmin] image onLoad", { src: el.src, title: g.title });
                  }}
                />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{g.title}</div>
                  <div className="text-xs text-muted-foreground line-clamp-2">{g.description}</div>
                </div>
                <div className="flex items-center">
                  <Button variant="destructive" onClick={() => removeGalleryItem(g.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GalleryAdmin;
