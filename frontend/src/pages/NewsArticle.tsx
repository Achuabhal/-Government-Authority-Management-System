import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
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

const NewsArticle = () => {
  const { id } = useParams();
  const [item, setItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      try {
        console.log("[NewsArticle] Fetching item", { id });
        const res = await api.get(`/content/news/${id}`);
        console.log("[NewsArticle] GET /content/news/:id response", res?.status, res?.data);
        const n = res?.data;
        if (n && n.title) {
          setItem({
            id: n._id || String(id),
            title: n.title,
            description: n.description,
            category: n.category,
            imageUrl: n.imageUrl,
            month: n.month,
            year: typeof n.year === 'number' ? n.year : Number(n.year),
          });
          setNotFound(false);
        } else {
          setItem(null);
          setNotFound(true);
        }
      } catch (e) {
        console.error("[NewsArticle] Error fetching item", e);
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          const items = raw ? (JSON.parse(raw) as NewsItem[]) : [];
          const found = items.find((n) => n.id === id) || null;
          setItem(found);
          setNotFound(!found);
        } catch {
          setItem(null);
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <p className="text-sm text-muted-foreground">Loading article…</p>
      </div>
    );
  }

  if (notFound) return <Navigate to="/news" replace />;

  return (
    <div className="container mx-auto px-4 py-10">
      <Link to="/news" className="text-sm text-primary">← Back to News</Link>
      <h1 className="text-4xl sm:text-5xl font-bold mt-4 leading-tight tracking-tight">{item.title}</h1>
      <div className="mt-3 text-base text-muted-foreground">{item.category} · {item.month} {item.year}</div>

      <div className="mt-8 overflow-hidden rounded-lg border bg-white">
        <img
          src={resolveImageUrl(item.imageUrl)}
          alt={item.title}
          className="w-full h-auto object-cover"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement;
            const candidates = getGoogleDriveAlternateUrls(item.imageUrl);
            const currentIndex = candidates.indexOf(el.src);
            const next = candidates[currentIndex + 1] || candidates[0];
            if (next && next !== el.src) el.src = next;
          }}
        />
      </div>

      <article className="mt-8">
        <div className="prose prose-lg max-w-none text-gray-800">
          {(item.description || "").split(/\n+/).filter(Boolean).map((line, idx) => (
            <p key={idx} className="py-1 leading-8">{line}</p>
          ))}
        </div>
      </article>
    </div>
  );
};

export default NewsArticle;


