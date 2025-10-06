import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";

type HeroSlide = {
  imageUrl: string;
  title?: string;
  subtitle?: string;
};

const HeroAdmin = () => {
  const { toast } = useToast();
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch slides from API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        setLoading(true);
        const response = await api.get("/superadmin/banner");
        if (response.data && response.data.images && Array.isArray(response.data.images)) {
          // Map images array to HeroSlide format
          const mappedSlides: HeroSlide[] = response.data.images.map((imgUrl: string) => ({
            imageUrl: imgUrl,
            title: "",
            subtitle: "",
          }));
          setSlides(mappedSlides);
        } else {
          setSlides([]);
        }
      } catch (error) {
        console.error("Failed to load banner slides:", error);
        toast({
          title: "Error",
          description: "Could not fetch banner slides.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, [toast]);

  const addSlide = () => setSlides((prev) => [...prev, { imageUrl: "", title: "", subtitle: "" }]);
  const removeSlide = (index: number) => setSlides((prev) => prev.filter((_, i) => i !== index));
  const updateSlide = (index: number, patch: Partial<HeroSlide>) =>
    setSlides((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)));

  const handleFileSelect = (index: number, file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      updateSlide(index, { imageUrl: result });
    };
    reader.readAsDataURL(file);
  };

   const saveToBackend = async () => {
    try {
      const images = slides.map((s) => s.imageUrl.trim()).filter(Boolean);
      console.log("[HeroAdmin] PUT /superadmin/banner - saving images", images);
      const res = await api.put("/superadmin/banner", { images });
      console.log("[HeroAdmin] PUT /superadmin/banner response", res?.status, res?.data);
      toast({ title: "Banner saved", description: `${images.length} image(s)` });
    } catch (error: any) {
      console.error("[HeroAdmin] PUT /superadmin/banner error", error?.message, error?.response?.data);
      toast({ title: "Save failed", description: error?.response?.data?.message || "Could not save banner", variant: "destructive" });
    }
  };

  const validCount = slides.filter((s) => s.imageUrl.trim() !== "").length;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="mb-4">
        <div className="text-2xl font-semibold">Banner/Hero</div>
        <div className="text-sm text-muted-foreground">Manage homepage hero slides</div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">
          {loading ? "Loading slides..." : `${validCount} slide(s) with images`}
        </div>
        <div className="flex gap-2">
          <Button onClick={addSlide} variant="default">
            Add slide
          </Button>
          <Button onClick={saveToBackend} variant="default">Save to backend</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {slides.map((slide, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-base">Slide #{index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`image-${index}`}>Image URL</Label>
                  <Input
                    id={`image-${index}`}
                    placeholder="https://..."
                    value={slide.imageUrl}
                    onChange={(e) => updateSlide(index, { imageUrl: e.target.value })}
                  />
                  <div className="pt-1 space-y-2">
                    <Label htmlFor={`file-${index}`}>Upload image</Label>
                    <Input
                      id={`file-${index}`}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileSelect(index, e.target.files?.[0] ?? null)}
                    />
                    <div className="text-[11px] text-muted-foreground">
                      Supported: JPG, PNG, GIF, WebP.
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`title-${index}`}>Title (optional)</Label>
                  <Input
                    id={`title-${index}`}
                    placeholder="Headline"
                    value={slide.title ?? ""}
                    onChange={(e) => updateSlide(index, { title: e.target.value })}
                  />
                  <Label htmlFor={`subtitle-${index}`}>Subtitle (optional)</Label>
                  <Input
                    id={`subtitle-${index}`}
                    placeholder="Subheadline"
                    value={slide.subtitle ?? ""}
                    onChange={(e) => updateSlide(index, { subtitle: e.target.value })}
                  />
                </div>
              </div>

              {slide.imageUrl && (
                <div className="mt-4 relative aspect-video w-full overflow-hidden rounded-md border">
                  <img
                    src={slide.imageUrl.replace("/view?usp=drive_link", "/preview")}
                    className="w-full h-full object-cover"
                    alt="preview"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              <div className="mt-4 flex items-center justify-end">
                <Button variant="destructive" onClick={() => removeSlide(index)}>
                  Remove slide
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-6" />
      <div className="text-xs text-muted-foreground">Slides loaded from API.</div>
    </div>
  );
};

export default HeroAdmin;
