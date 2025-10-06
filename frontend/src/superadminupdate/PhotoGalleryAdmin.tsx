import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { resolveImageUrl, getGoogleDriveAlternateUrls } from "@/lib/utils";
import { 
  Image, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Save, 
  X,
  ImageIcon,
  Type,
  AlignLeft,
  Link as LinkIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";

interface PhotoGalleryItem {
  id: string;
  image: string;
  heading: string;
  subheading: string;
  createdAt: string;
  updatedAt: string;
}

const PhotoGalleryAdmin = () => {
  const { toast } = useToast();
  const [photos, setPhotos] = useState<PhotoGalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<PhotoGalleryItem | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    heading: "",
    subheading: "",
    image: ""
  });

  // Load photos from backend (GET /content/gallery)
  useEffect(() => {
    const load = async () => {
      console.log("[PhotoGalleryAdmin] GET /content/gallery - loading...");
      try {
        const res = await api.get("/content/gallery");
        console.log("[PhotoGalleryAdmin] GET /content/gallery response", res?.status, res?.data);
        const doc = res?.data;
        const arr = (doc?.images || doc?.galleryImages || []);
        const mapped: PhotoGalleryItem[] = arr.map((g: any) => ({
          id: g._id || String(Date.now()),
          image: g.image,
          heading: g.title || g.heading || "",
          subheading: g.description || g.subheading || "",
          createdAt: g.createdAt || new Date().toISOString(),
          updatedAt: g.updatedAt || new Date().toISOString(),
        }));
        setPhotos(mapped);
      } catch (error: any) {
        console.error("[PhotoGalleryAdmin] GET /content/gallery error", error?.message, error?.response?.data);
        toast({ title: "Load failed", description: "Could not load gallery images" });
      }
    };
    load();
  }, [toast]);

  // Save photos to backend (PUT /content/gallery)
  const savePhotos = async (updatedPhotos: PhotoGalleryItem[]) => {
    console.log("[PhotoGalleryAdmin] PUT /content/gallery - saving...", updatedPhotos);
    const galleryImages = updatedPhotos.map(p => ({
      image: p.image,
      title: p.heading,
      description: p.subheading,
    }));
    console.log("[PhotoGalleryAdmin] Payload to backend (galleryImages):", galleryImages);
    try {
      const res = await api.put("/content/gallery", { galleryImages });
      console.log("[PhotoGalleryAdmin] PUT /content/gallery response", res?.status, res?.data);
      const arr = res?.data?.gallery?.galleryImages || res?.data?.galleryImages || [];
      const mapped: PhotoGalleryItem[] = arr.map((g: any) => ({
        id: g._id || String(Math.random()),
        image: g.image,
        heading: g.title || "",
        subheading: g.description || "",
        createdAt: g.createdAt || new Date().toISOString(),
        updatedAt: g.updatedAt || new Date().toISOString(),
      }));
      setPhotos(mapped);
      try {
        window.dispatchEvent(new Event("bvp:gallery:update"));
      } catch {}
      toast({ title: "Gallery saved", description: `Items: ${mapped.length}` });
    } catch (error: any) {
      console.error("[PhotoGalleryAdmin] PUT /content/gallery error", error?.message, error?.response?.data);
      toast({ title: "Save failed", description: error?.response?.data?.error || "Could not save gallery", variant: "destructive" });
      throw error;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Note: Upload removed. Use direct image URL (e.g., Google Drive link) instead.

  const resetForm = () => {
    setFormData({
      heading: "",
      subheading: "",
      image: ""
    });
    setPreviewImage(null);
    setEditingPhoto(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("=== Photo Submit Started ===");
    console.log("Form Data:", formData);
    console.log("Editing Photo:", editingPhoto);
    console.log("Current Photos Count:", photos.length);
    
    setIsLoading(true);

    try {
      // Validate form
      console.log("Validating form data...");
      
      if (!formData.image) {
        console.log("❌ Validation failed: No image");
        toast({
          title: "Image Required",
          description: "Please upload an image",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (!formData.heading.trim()) {
        console.log("❌ Validation failed: No heading");
        toast({
          title: "Heading Required",
          description: "Please enter a heading",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      console.log("✅ Form validation passed");

      // Enforce URL (avoid base64 payloads to backend)
      if (formData.image.startsWith("data:")) {
        toast({ title: "Use Image URL", description: "Paste a public image URL (e.g., Google Drive)", variant: "destructive" });
        setIsLoading(false);
        return;
      }

      const now = new Date().toISOString();
      console.log("Current timestamp:", now);

      if (editingPhoto) {
        console.log("🔄 Updating existing photo:", editingPhoto.id);
        
        // Update existing photo
        const updatedPhotos = photos.map(photo => 
          photo.id === editingPhoto.id 
            ? {
                ...photo,
                heading: formData.heading.trim(),
                subheading: formData.subheading.trim(),
                image: formData.image,
                updatedAt: now
              }
            : photo
        );
        
        console.log("Updated photos array:", updatedPhotos);
        await savePhotos(updatedPhotos);

        toast({
          title: "Photo Updated",
          description: "Photo gallery item has been updated successfully",
        });
        
        console.log("✅ Photo updated successfully");
      } else {
        console.log("➕ Adding new photo");
        
        // Add new photo
        const newPhoto: PhotoGalleryItem = {
          id: (typeof crypto !== 'undefined' && 'randomUUID' in crypto) ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
          heading: formData.heading.trim(),
          subheading: formData.subheading.trim(),
          image: formData.image,
          createdAt: now,
          updatedAt: now
        };

        console.log("New photo object:", newPhoto);

        const updatedPhotos = [...photos, newPhoto];
        console.log("Updated photos array with new photo:", updatedPhotos);
        
        await savePhotos(updatedPhotos);

        toast({
          title: "Photo Added",
          description: "New photo has been added to the gallery",
        });
        
        console.log("✅ Photo added successfully");
      }

      console.log("Resetting form and closing dialog...");
      resetForm();
      setIsDialogOpen(false);
      console.log("=== Photo Submit Completed Successfully ===");

    } catch (error) {
      console.error("❌ Error in handleSubmit:", error);
      console.error("Error details:", {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        formData,
        editingPhoto,
        photosLength: photos.length
      });
      
      toast({
        title: "Error",
        description: "Failed to save photo. Please try again.",
        variant: "destructive",
      });
    } finally {
      console.log("Setting loading to false");
      setIsLoading(false);
    }
  };

  const handleEdit = (photo: PhotoGalleryItem) => {
    setEditingPhoto(photo);
    setFormData({
      heading: photo.heading,
      subheading: photo.subheading,
      image: photo.image
    });
    setPreviewImage(photo.image);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const updatedPhotos = photos.filter(photo => photo.id !== id);
    savePhotos(updatedPhotos);
    
    toast({
      title: "Photo Deleted",
      description: "Photo has been removed from the gallery",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <div className="text-2xl font-semibold flex items-center gap-2">
          <Image className="w-6 h-6" />
          Photo Gallery Management
        </div>
        <div className="text-sm text-muted-foreground">
          Add, edit, and manage photos for the gallery with custom headings and subheadings
        </div>
      </div>

      {/* Add Photo Button */}
      <div className="mb-6">
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Photo
            </Button>
          </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {editingPhoto ? (
                  <>
                    <Edit className="w-5 h-5" />
                    Edit Photo
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Add New Photo
                  </>
                )}
              </DialogTitle>
              <DialogDescription className="sr-only" id="photo-gallery-admin-desc">
                Add or edit a photo gallery item by pasting a public image URL and providing heading details.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image URL */}
              <div className="space-y-2">
                <Label htmlFor="image" className="flex items-center gap-2"><LinkIcon className="w-4 h-4" /> Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  type="url"
                  placeholder="Paste public image URL (Google Drive link supported)"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                />
                {formData.image && (
                  <div className="relative">
                    {(() => {
                      const previewSrc = resolveImageUrl(formData.image);
                      return (
                        <img
                          src={previewSrc}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const el = e.currentTarget as HTMLImageElement;
                            console.warn("[PhotoGalleryAdmin] preview onError", el.src);
                            const candidates = getGoogleDriveAlternateUrls(formData.image);
                            const currentIndex = candidates.indexOf(el.src);
                            const next = candidates[currentIndex + 1] || candidates[0];
                            if (next && next !== el.src) {
                              console.log("[PhotoGalleryAdmin] preview trying next candidate", next);
                              el.src = next;
                            }
                          }}
                          onLoad={(e) => {
                            const el = e.currentTarget as HTMLImageElement;
                            console.log("[PhotoGalleryAdmin] preview onLoad", el.src);
                          }}
                        />
                      );
                    })()}
                  </div>
                )}
              </div>

              {/* Heading */}
              <div className="space-y-2">
                <Label htmlFor="heading" className="flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  Heading
                </Label>
                <Input
                  id="heading"
                  name="heading"
                  placeholder="Enter photo heading"
                  value={formData.heading}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Subheading */}
              <div className="space-y-2">
                <Label htmlFor="subheading" className="flex items-center gap-2">
                  <AlignLeft className="w-4 h-4" />
                  Subheading
                </Label>
                <Textarea
                  id="subheading"
                  name="subheading"
                  placeholder="Enter photo subheading (optional)"
                  value={formData.subheading}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <Alert>
                <AlertDescription>
                  The heading and subheading will be displayed as an overlay on the image in the gallery.
                </AlertDescription>
              </Alert>

              <div className="flex gap-3 pt-4">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? (
                    "Saving..."
                  ) : editingPhoto ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Update Photo
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Photo
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Photos Grid */}
      {photos.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Photos Yet</h3>
            <p className="text-muted-foreground mb-4">
              Start building your photo gallery by adding your first photo
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add First Photo
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <Card key={photo.id || `${index}-${photo.image}`} className="overflow-hidden">
              <div className="relative">
                <img
                  src={resolveImageUrl(photo.image)}
                  alt={photo.heading}
                  className="w-full h-48 object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    console.warn("[PhotoGalleryAdmin] grid image onError", el.src);
                    const candidates = getGoogleDriveAlternateUrls(photo.image);
                    const currentIndex = candidates.indexOf(el.src);
                    const next = candidates[currentIndex + 1] || candidates[0];
                    if (next && next !== el.src) {
                      console.log("[PhotoGalleryAdmin] grid trying next candidate", next);
                      el.src = next;
                    }
                  }}
                  onLoad={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    console.log("[PhotoGalleryAdmin] grid image onLoad", el.src);
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <h3 className="text-lg font-semibold mb-2">{photo.heading}</h3>
                    {photo.subheading && (
                      <p className="text-sm opacity-90">{photo.subheading}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Heading</h4>
                    <p className="text-sm text-muted-foreground">{photo.heading}</p>
                  </div>
                  
                  {photo.subheading && (
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Subheading</h4>
                      <p className="text-sm text-muted-foreground">{photo.subheading}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Added: {formatDate(photo.createdAt)}</span>
                    {photo.updatedAt !== photo.createdAt && (
                      <Badge variant="secondary" className="text-xs">
                        Updated
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(photo)}
                      className="flex-1"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(photo.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Stats */}
      {photos.length > 0 && (
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Total Photos: <span className="font-semibold">{photos.length}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Last Updated: {photos.length > 0 ? formatDate(photos[0].updatedAt) : "Never"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGalleryAdmin;
