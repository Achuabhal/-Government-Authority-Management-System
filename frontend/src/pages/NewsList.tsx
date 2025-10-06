import { Link, useNavigate } from "react-router-dom"; // import useNavigate
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { resolveImageUrl, getGoogleDriveAlternateUrls } from "@/lib/utils";

type NewsItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  month: string;
  year: number;
};

const STORAGE_KEY = "bvp.news.items";

const NewsList = () => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const navigate = useNavigate(); // initialize navigate

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get("/content/news");
        const arr: any[] = Array.isArray(res?.data?.newsItems) ? res.data.newsItems : [];
        const mapped: NewsItem[] = arr.map((n: any, idx: number) => ({
          id: n._id || `${idx}-${n.title}`,
          title: n.title,
          description: n.description,
          category: n.category,
          imageUrl: n.imageUrl,
          month: n.month,
          year: typeof n.year === 'number' ? n.year : Number(n.year),
        }));
        setItems(mapped);
      } catch (e) {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          setItems(raw ? (JSON.parse(raw) as NewsItem[]) : []);
        } catch {
          setItems([]);
        }
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")} // go back to previous page
        className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6">News & Events</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((n) => (
          <Link key={n.id} to={`/news/${n.id}`} className="block rounded-lg border overflow-hidden bg-white">
            <div className="aspect-video overflow-hidden">
              {(() => {
                const src = resolveImageUrl(n.imageUrl);
                console.log("[NewsList] render image", { original: n.imageUrl, resolved: src, title: n.title });
                return (
                  <img
                    src={src}
                    alt={n.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      console.warn("[NewsList] image onError", { src: el.src, title: n.title });
                      const candidates = getGoogleDriveAlternateUrls(n.imageUrl);
                      const currentIndex = candidates.indexOf(el.src);
                      const next = candidates[currentIndex + 1] || candidates[0];
                      if (next && next !== el.src && !el.src.endsWith("/placeholder.svg")) {
                        console.log("[NewsList] trying next candidate", next);
                        el.src = next;
                        return;
                      }
                      if (el.src.endsWith("/placeholder.svg")) return;
                      el.src = "/placeholder.svg";
                    }}
                    onLoad={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      console.log("[NewsList] image onLoad", { src: el.src, title: n.title });
                    }}
                    referrerPolicy="no-referrer"
                  />
                );
              })()}
            </div>
            <div className="p-4">
              <div className="text-xs text-muted-foreground">{n.category} · {n.month} {n.year}</div>
              <div className="font-medium truncate">{n.title}</div>
              <div className="text-sm text-muted-foreground line-clamp-2">{n.description}</div>
            </div>
          </Link>
        ))}
        {items.length === 0 && <div className="text-sm text-muted-foreground">No news yet.</div>}
      </div>
    </div>
  );
};

export default NewsList;
