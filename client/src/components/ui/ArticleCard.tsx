import { Link } from "wouter";
import { cn } from "@/lib/utils";
import type { Article } from "@shared/schema";
import { ShareButtons } from "./ShareButtons";

interface ArticleCardProps {
  article: Article;
  variant?: "lead" | "standard" | "compact" | "opinion";
  className?: string;
}

export function ArticleCard({ article, variant = "standard", className }: ArticleCardProps) {
  const articleUrl = `/article/${article.id}`;

  const formattedDate = new Date(article.publishedDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  if (variant === "lead") {
    return (
      <div className={cn("group block w-full mb-12", className)}>
        <Link href={articleUrl} className="block" data-testid={`article-card-${article.id}`}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {article.imageUrl && (
              <div className="md:col-span-8 relative aspect-[4/3] md:aspect-[16/9] border border-black overflow-hidden bg-muted">
                <img 
                  src={article.imageUrl} 
                  alt={article.imageCaption || article.title}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
                />
                {article.imageCaption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-2 text-xs font-label uppercase tracking-wider">
                    {article.imageCaption}
                  </div>
                )}
              </div>
            )}
            <div className="md:col-span-4 flex flex-col justify-center h-full border-t md:border-t-0 border-black pt-4 md:pt-0">
              <span className="font-label text-accent font-bold uppercase tracking-widest text-xs mb-3 block">
                {article.category} — Lead Story
              </span>
              <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.95] mb-4 group-hover:underline decoration-4 underline-offset-4 decoration-accent">
                {article.title}
              </h2>
              <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6 line-clamp-4">
                {article.excerpt}
              </p>
              <div className="mt-auto font-label text-xs uppercase tracking-wider text-foreground/60 border-t border-black/20 pt-2 mb-3">
                By {article.author} • {formattedDate}
              </div>
              <ShareButtons title={article.title} url={articleUrl} compact />
            </div>
          </div>
        </Link>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("group block w-full py-4 border-b border-black/20 last:border-0", className)}>
        <Link href={articleUrl} className="block" data-testid={`article-card-${article.id}`}>
          <div className="flex gap-4">
            <div className="flex-1">
              <h3 className="font-headline text-lg font-bold leading-tight mb-2 group-hover:text-accent transition-colors">
                {article.title}
              </h3>
              <div className="font-label text-xs uppercase tracking-wider text-muted-foreground">
                {article.readTime}
              </div>
            </div>
          </div>
        </Link>
        <div className="mt-2">
          <ShareButtons title={article.title} url={articleUrl} compact />
        </div>
      </div>
    );
  }

  if (variant === "opinion") {
    return (
      <div className={cn("group block w-full mb-8 text-center", className)}>
        <Link href={articleUrl} className="block" data-testid={`article-card-${article.id}`}>
          <div className="border-t-4 border-double border-black pt-4 mb-4 mx-auto w-12" />
          <h3 className="font-headline text-2xl font-bold italic mb-3 group-hover:text-accent transition-colors px-4">
            "{article.title}"
          </h3>
          <p className="font-body text-sm text-muted-foreground line-clamp-3 mb-3 px-4">
            {article.excerpt}
          </p>
          <div className="font-label text-xs font-bold uppercase tracking-wider">
            {article.author}
          </div>
        </Link>
        <div className="mt-3 flex justify-center">
          <ShareButtons title={article.title} url={articleUrl} compact />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("group block w-full mb-8 border-b border-black/10 pb-8", className)}>
      <Link href={articleUrl} className="block" data-testid={`article-card-${article.id}`}>
        {article.imageUrl && (
          <div className="mb-4 aspect-[3/2] border border-black overflow-hidden relative">
            <img 
              src={article.imageUrl} 
              alt={article.imageCaption || article.title}
              className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <span className="font-label text-accent font-bold uppercase tracking-widest text-[10px] mb-2 block">
          {article.category}
        </span>
        <h3 className="font-headline text-2xl md:text-3xl font-bold leading-tight mb-3 group-hover:underline decoration-2 underline-offset-2">
          {article.title}
        </h3>
        <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
          {article.excerpt}
        </p>
        <div className="font-label text-xs uppercase tracking-wider text-foreground/60">
          By {article.author}
        </div>
      </Link>
      <div className="mt-3">
        <ShareButtons title={article.title} url={articleUrl} compact />
      </div>
    </div>
  );
}
