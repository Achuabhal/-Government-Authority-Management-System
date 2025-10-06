import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Image, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Calendar,
  Eye
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import api from "@/lib/api";
import { resolveImageUrl, getGoogleDriveAlternateUrls } from "@/lib/utils";

interface PhotoGalleryItem {
  id: string;
  image: string;
  heading: string;
  subheading: string;
  createdAt: string;
  updatedAt: string;
}

interface PhotoGallerySectionProps {
  title?: string;
  subtitle?: string;
  maxItems?: number;
  showViewAll?: boolean;
}

const PhotoGallerySection = ({ 
  title = "Photo Gallery", 
  subtitle = "Explore our collection of images",
  maxItems = 6,
  showViewAll = true
}: PhotoGallerySectionProps) => {
  const [photos, setPhotos] = useState<PhotoGalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoGalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Load photos from backend (GET /content/gallery)
  useEffect(() => {
    const loadPhotos = async () => {
      setIsLoading(true);
      try {
        console.log("[PhotoGallerySection] GET /content/gallery - loading...");
        const res = await api.get("/content/gallery");
        console.log("[PhotoGallerySection] GET /content/gallery response", res?.status, res?.data);
        const arr = res?.data?.galleryImages || res?.data?.images || [];
        const mapped: PhotoGalleryItem[] = arr.map((g: any, idx: number) => ({
          id: g._id || `${idx}-${g.image}`,
          image: resolveImageUrl(g.image),
          heading: g.title || g.heading || "",
          subheading: g.description || g.subheading || "",
          createdAt: g.createdAt || new Date().toISOString(),
          updatedAt: g.updatedAt || new Date().toISOString(),
        }));
        setPhotos(mapped.slice(0, maxItems));
      } catch (error) {
        console.error("[PhotoGallerySection] GET /content/gallery error", error);
        setPhotos([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadPhotos();
    const handler = () => loadPhotos();
    window.addEventListener("bvp:gallery:update", handler);
    return () => window.removeEventListener("bvp:gallery:update", handler);
  }, [maxItems]);

  const handlePhotoClick = (photo: PhotoGalleryItem, index: number) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
    setIsDialogOpen(true);
  };

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    setCurrentIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-lg text-gray-600">{subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-64 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (photos.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-lg text-gray-600 mb-8">{subtitle}</p>
            <p className="text-gray-500">No photos available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-lg text-gray-600">{subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <Card 
                key={photo.id} 
                className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300"
                onClick={() => handlePhotoClick(photo, index)}
              >
                <div className="relative">
                  <img
                    src={photo.image}
                    alt={photo.heading}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      console.warn("[PhotoGallerySection] image onError", { src: el.src, heading: photo.heading });
                      const candidates = getGoogleDriveAlternateUrls(photo.image);
                      const currentIndex = candidates.indexOf(el.src);
                      const next = candidates[currentIndex + 1] || candidates[0];
                      if (next && next !== el.src) {
                        console.log("[PhotoGallerySection] trying next candidate", next);
                        el.src = next;
                        return;
                      }
                    }}
                    onLoad={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      console.log("[PhotoGallerySection] image onLoad", { src: el.src, heading: photo.heading });
                    }}
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Overlay with heading and subheading */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center text-white p-4">
                      <h3 className="text-lg font-semibold mb-2">{photo.heading}</h3>
                      {photo.subheading && (
                        <p className="text-sm opacity-90">{photo.subheading}</p>
                      )}
                    </div>
                  </div>

                  {/* View icon overlay */}
                  <div className="absolute top-3 right-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{photo.heading}</h3>
                  {photo.subheading && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{photo.subheading}</p>
                  )}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(photo.createdAt)}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Gallery
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {showViewAll && photos.length >= maxItems && (
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                View All Photos
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Photo Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-center">
              {selectedPhoto?.heading}
            </DialogTitle>
          </DialogHeader>
          
          {selectedPhoto && (
            <div className="space-y-4">
              {/* Image with navigation */}
              <div className="relative">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.heading}
                  className="w-full h-96 object-cover rounded-lg"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    console.warn("[PhotoGallerySection] modal image onError", { src: el.src, heading: selectedPhoto.heading });
                    const candidates = getGoogleDriveAlternateUrls(selectedPhoto.image);
                    const currentIndex = candidates.indexOf(el.src);
                    const next = candidates[currentIndex + 1] || candidates[0];
                    if (next && next !== el.src) {
                      console.log("[PhotoGallerySection] modal trying next candidate", next);
                      el.src = next;
                    }
                  }}
                  onLoad={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    console.log("[PhotoGallerySection] modal image onLoad", { src: el.src, heading: selectedPhoto.heading });
                  }}
                  referrerPolicy="no-referrer"
                />
                
                {/* Navigation buttons */}
                {photos.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100"
                      onClick={handlePrevious}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100"
                      onClick={handleNext}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </>
                )}

                {/* Photo counter */}
                {photos.length > 1 && (
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                    {currentIndex + 1} / {photos.length}
                  </div>
                )}
              </div>

              {/* Photo details */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{selectedPhoto.heading}</h3>
                  {selectedPhoto.subheading && (
                    <p className="text-gray-600">{selectedPhoto.subheading}</p>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Added on {formatDate(selectedPhoto.createdAt)}</span>
                  </div>
                  {selectedPhoto.updatedAt !== selectedPhoto.createdAt && (
                    <Badge variant="secondary" className="text-xs">
                      Updated
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PhotoGallerySection;