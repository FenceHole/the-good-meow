import { useRoute } from "wouter";
import { ARTICLES } from "@/lib/dummy-data";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArticleCard } from "@/components/ui/ArticleCard";
import NotFound from "./not-found";
import { ArrowLeft, Printer, Share2 } from "lucide-react";

export default function ArticlePage() {
  const [match, params] = useRoute("/article/:id");
  const article = ARTICLES.find((a) => a.id === params?.id);

  if (!match || !article) {
    return <NotFound />;
  }

  // Find related articles (excluding current)
  const relatedArticles = ARTICLES.filter(a => a.id !== article.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white flex flex-col">
      <Header />

      <main className="flex-grow w-full max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-16">
        
        {/* Navigation & Tools */}
        <div className="flex justify-between items-center mb-8 border-b border-black/20 pb-4">
          <a href="/" className="font-label uppercase text-xs font-bold tracking-widest flex items-center gap-2 hover:text-accent transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Front Page
          </a>
          <div className="flex gap-4">
            <button className="hover:text-accent transition-colors" aria-label="Print article">
              <Printer className="w-4 h-4" />
            </button>
            <button className="hover:text-accent transition-colors" aria-label="Share article">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Article Header */}
        <article className="mb-16">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <span className="font-label text-accent font-bold uppercase tracking-widest text-sm mb-4 block">
              {article.category}
            </span>
            <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-6">
              {article.title}
            </h1>
            <p className="font-body text-xl md:text-2xl text-muted-foreground italic leading-relaxed mb-8">
              {article.excerpt}
            </p>
            <div className="flex justify-center items-center gap-4 font-label text-xs uppercase tracking-wider text-foreground/60">
              <span className="font-bold text-foreground">By {article.author}</span>
              <span>•</span>
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
          </div>

          {/* Main Image */}
          {article.image && (
            <figure className="mb-12 border border-black p-1 bg-white shadow-lg">
              <div className="aspect-[16/9] w-full overflow-hidden grayscale contrast-125">
                 <img 
                  src={article.image} 
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

          {/* Article Content */}
          <div className="max-w-3xl mx-auto font-body text-lg md:text-xl leading-loose text-foreground/90 space-y-6 article-content">
             <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          {/* Author Bio Box */}
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

        {/* Read Next */}
        <section className="border-t-4 border-black pt-12">
          <h3 className="font-label font-bold text-2xl uppercase mb-8">Related Despatches</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map(a => (
              <ArticleCard key={a.id} article={a} variant="standard" />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
