import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/lib/api";

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

const NewsDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        console.log("[NewsDetail] Fetching item", { id });
        const res = await api.get(`/content/news/${id}`);
        console.log("[NewsDetail] GET /content/news/:id response", res?.status, res?.data);
        const n = res?.data;
        if (n && n.title) {
          console.log("[NewsDetail] Item found", n);
          setItem({
            id: n._id || String(id),
            title: n.title,
            description: n.description,
            category: n.category,
            imageUrl: n.imageUrl,
            month: n.month,
            year: typeof n.year === 'number' ? n.year : Number(n.year),
          });
        } else {
          console.warn("[NewsDetail] Item missing or invalid", n);
          setItem(null);
        }
      } catch (e) {
        console.error("[NewsDetail] Error fetching item", e);
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          const items = raw ? (JSON.parse(raw) as NewsItem[]) : [];
          const found = items.find((n) => n.id === id) || null;
          console.log("[NewsDetail] Fallback localStorage match", { found: !!found });
          setItem(found);
        } catch {
          console.warn("[NewsDetail] LocalStorage fallback failed");
          setItem(null);
        }
      }
    };
    load();
  }, [id]);

  if (!item) return <Navigate to="/news" replace />;
  return (
    <div className="container mx-auto px-4 py-10">
        <Link to="/news" className="text-sm text-primary">← Back to News</Link>
        <h1 className="text-4xl sm:text-5xl font-bold mt-4 leading-tight tracking-tight">{item.title}</h1>
        <div className="mt-3 text-base text-muted-foreground">{item.category} · {item.month} {item.year}</div>

        <div className="mt-8 overflow-hidden rounded-lg border bg-white">
        {(() => {
          const utils = require("@/lib/utils");
          const src = utils.resolveImageUrl(item.imageUrl);
          console.log("[NewsDetail] render image", { original: item.imageUrl, resolved: src, title: item.title });
          return (
            <img
              src={src}
                alt={item.title}
                className="w-full h-auto object-cover"
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement;
                console.warn("[NewsDetail] image onError", { src: el.src, title: item.title });
                const candidates = utils.getGoogleDriveAlternateUrls(item.imageUrl);
                const currentIndex = candidates.indexOf(el.src);
                const next = candidates[currentIndex + 1] || candidates[0];
                if (next && next !== el.src && !el.src.endsWith("/placeholder.svg")) {
                  console.log("[NewsDetail] trying next candidate", next);
                  el.src = next;
                  return;
                }
                if (el.src.endsWith("/placeholder.svg")) return;
                el.src = "/placeholder.svg";
              }}
              onLoad={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                console.log("[NewsDetail] image onLoad", { src: el.src, title: item.title });
              }}
              referrerPolicy="no-referrer"
            />
          );
        })()}
        </div>

        <article className="mt-8">
          <div className="prose prose-lg max-w-none text-gray-800">
            <p className="whitespace-pre-wrap">{item.description}</p>
          </div>
        </article>
    </div>
  );
};

export default NewsDetail;


