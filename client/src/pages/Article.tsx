import { useRoute } from "wouter";
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { fetchArticleById, fetchArticles } from "@/lib/api";
import type { Article } from "@shared/schema";
import { Link } from "wouter";

export default function ArticlePage() {
  const [match, params] = useRoute("/article/:id");
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!params?.id) return;
    const id = parseInt(params.id);
    if (isNaN(id)) { setError(true); setLoading(false); return; }

    Promise.all([
      fetchArticleById(id),
      fetchArticles()
    ]).then(([art, all]) => {
      setArticle(art);
      setRelatedArticles(all.filter(a => a.id !== art.id).slice(0, 3));
      setLoading(false);
    }).catch(() => {
      setError(true);
      setLoading(false);
    });
  }, [params?.id]);

  if (!match || error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-headline text-6xl font-bold mb-4">404</h1>
            <p className="font-body text-xl text-muted-foreground mb-2">This article has been knocked off the table.</p>
            <p className="font-label text-sm uppercase tracking-wider text-muted-foreground mb-8">As is tradition.</p>
            <Link href="/" className="font-label uppercase text-sm font-bold border-2 border-black px-6 py-3 hover:bg-black hover:text-white transition-colors">
              Back to Front Page
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading || !article) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="font-headline text-4xl font-bold mb-4">Loading...</div>
          <div className="font-body text-muted-foreground">Retrieving field report...</div>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(article.publishedDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const articleUrl = `/article/${article.id}`;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white flex flex-col">
      <Header />

      <main className="flex-grow w-full max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-16">
        
        <div className="flex justify-between items-center mb-8 border-b border-black/20 pb-4">
          <Link href="/" className="font-label uppercase text-xs font-bold tracking-widest flex items-center gap-2 hover:text-accent transition-colors" data-testid="link-back">
            <ArrowLeft className="w-4 h-4" /> Back to Front Page
          </Link>
        </div>

        <article className="mb-16">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <span className="font-label text-accent font-bold uppercase tracking-widest text-sm mb-4 block">
              {article.category}
            </span>
            <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-6" data-testid="text-article-title">
              {article.title}
            </h1>
            <p className="font-body text-xl md:text-2xl text-muted-foreground italic leading-relaxed mb-8">
              {article.excerpt}
            </p>
            <div className="flex justify-center items-center gap-4 font-label text-xs uppercase tracking-wider text-foreground/60 mb-6">
              <span className="font-bold text-foreground">By {article.author}</span>
              <span>•</span>
              <span>{formattedDate}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
            <div className="flex justify-center">
              <ShareButtons title={article.title} url={articleUrl} />
            </div>
          </div>

          {article.imageUrl && (
            <figure className="mb-12 border border-black p-1 bg-white shadow-lg">
              <div className="aspect-[16/9] w-full overflow-hidden grayscale contrast-125">
                <img 
                  src={article.imageUrl} 
                  alt={article.imageCaption || article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {article.imageCaption && (
                <figcaption className="mt-2 p-2 font-label text-xs uppercase tracking-wide text-muted-foreground border-t border-black/10">
                  FIG. 1 — {article.imageCaption}
                </figcaption>
              )}
            </figure>
          )}

          <div className="max-w-3xl mx-auto font-body text-lg md:text-xl leading-loose text-foreground/90 space-y-6 article-content">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          <div className="max-w-3xl mx-auto mt-12 flex justify-center">
            <ShareButtons title={article.title} url={articleUrl} />
          </div>

          <div className="max-w-3xl mx-auto mt-12 border-2 border-black p-8 bg-muted/20 text-center">
            <p className="font-label text-xs uppercase tracking-widest text-muted-foreground mb-3">Want more cat journalism?</p>
            <h3 className="font-headline font-bold text-2xl mb-3">Subscribe on Substack</h3>
            <p className="font-body text-muted-foreground mb-6 max-w-md mx-auto">
              Get the latest investigative reports on human behavior delivered straight to your inbox. No spam. Only the important stuff. Like why the red dot can never be caught.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a 
                href="https://thegoodmeow.substack.com/subscribe" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block bg-black text-white font-label uppercase text-sm px-8 py-3 hover:bg-accent transition-colors font-bold tracking-wider"
                data-testid="link-subscribe-substack"
              >
                Subscribe Free
              </a>
              {article.substackUrl && (
                <a 
                  href={article.substackUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 font-label uppercase text-xs font-bold tracking-wider border-2 border-black px-6 py-3 hover:bg-black hover:text-white transition-colors"
                  data-testid="link-read-on-substack"
                >
                  Read on Substack <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-16 border-t-2 border-b-2 border-black py-8 bg-muted/20 px-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white font-headline text-2xl font-bold">
                {article.author.charAt(0)}
              </div>
              <div>
                <h4 className="font-label font-bold uppercase text-sm mb-1">About the Author</h4>
                <div className="font-headline font-bold text-xl">{article.author}</div>
                <p className="font-body text-sm text-muted-foreground mt-2">
                  A dedicated observer of the human condition. Specializes in nap logistics and avian surveillance.
                </p>
              </div>
            </div>
          </div>
        </article>

        {relatedArticles.length > 0 && (
          <section className="border-t-4 border-black pt-12">
            <h3 className="font-label font-bold text-2xl uppercase mb-8">More Despatches From The Field</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map(a => (
                <div key={a.id} className="group">
                  <Link href={`/article/${a.id}`} className="block" data-testid={`related-article-${a.id}`}>
                    {a.imageUrl && (
                      <div className="mb-3 aspect-[3/2] border border-black overflow-hidden">
                        <img src={a.imageUrl} alt={a.title} className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <span className="font-label text-accent font-bold uppercase tracking-widest text-[10px] mb-1 block">{a.category}</span>
                    <h4 className="font-headline text-xl font-bold leading-tight mb-2 group-hover:underline decoration-2">{a.title}</h4>
                    <p className="font-body text-sm text-muted-foreground line-clamp-2">{a.excerpt}</p>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      <Footer />
    </div>
  );
}
