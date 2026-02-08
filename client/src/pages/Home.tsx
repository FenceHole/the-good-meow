import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { CoolCatAd } from "@/components/ui/CoolCatAd";
import { CertifiedGoodSpot } from "@/components/ui/CertifiedGoodSpot";
import { useLocation } from "wouter";
import { ExternalLink } from "lucide-react";
import { fetchArticles } from "@/lib/api";
import type { Article } from "@shared/schema";

export default function Home() {
  const [location, setLocation] = useLocation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles()
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch articles:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="font-headline text-4xl font-bold mb-4">Loading...</div>
          <div className="font-body text-muted-foreground">Fetching the latest cat journalism</div>
        </div>
      </div>
    );
  }

  const leadStory = articles.find(a => a.featured) || articles[0];
  const remaining = articles.filter(a => a.id !== leadStory?.id);
  const breakingStories = remaining.filter(a => a.category === "Breaking Mews");
  const nonsenseStories = remaining.filter(a => a.category === "Human Nonsense");
  const investigationStories = remaining.filter(a => a.category === "Investigation");
  const otherStories = remaining.filter(a => 
    !["Breaking Mews", "Human Nonsense", "Investigation"].includes(a.category)
  );

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white flex flex-col">
      <Header />
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
        
        {/* Lead Story Section - Hero */}
        {leadStory && (
          <section className="mb-12 border-b-4 border-black pb-12">
            <ArticleCard article={leadStory} variant="lead" />
          </section>
        )}

        {/* Newspaper Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-12 relative">
          
          {/* Left Column: Human Nonsense */}
          <div id="section-human-nonsense" className="lg:col-span-3 border-r-0 lg:border-r border-black/20 pr-0 lg:pr-8 scroll-mt-8">
            <h4 className="font-label font-black text-2xl uppercase border-b-4 border-black mb-6 pb-2">
              Human Nonsense
            </h4>
            <div className="flex flex-col gap-8">
              {breakingStories[0] && (
                <ArticleCard article={breakingStories[0]} variant="standard" className="border-b-4 border-black pb-4" />
              )}
              {nonsenseStories.slice(0, 4).map(article => (
                <ArticleCard key={article.id} article={article} variant="compact" className="border-b border-black/20 pb-4" />
              ))}
              
              {/* Insert Ad Here for Visibility */}
              <div className="mt-8">
                <CoolCatAd />
              </div>
            </div>
          </div>

          {/* Center Column: Investigations & World */}
          <div id="section-investigations" className="lg:col-span-6 px-0 lg:px-4 scroll-mt-8">
             <h4 className="font-label font-black text-2xl uppercase border-b-4 border-black mb-6 pb-2 text-center text-accent">
              Deep Dives & Investigations
            </h4>
            
            <div className="grid grid-cols-1 gap-12">
              {investigationStories.slice(0, 2).map(article => (
                <ArticleCard key={article.id} article={article} variant="standard" />
              ))}

              {otherStories.slice(0, 1).map(article => (
                 <ArticleCard key={article.id} article={article} variant="standard" />
              ))}

              {/* Substack Blog Promo */}
               <div id="section-subscribe" className="border-t-4 border-black pt-8 mt-4 scroll-mt-8">
                  <h4 className="font-label font-black text-xl uppercase mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                    From The Blog
                  </h4>
                  <a 
                    href="https://thegoodmeow.substack.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group block bg-white border border-black p-4 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                    data-testid="link-substack-blog"
                  >
                    <p className="font-label text-xs uppercase text-muted-foreground mb-1">Latest on Substack</p>
                    <h3 className="font-headline font-bold text-lg mb-2 group-hover:text-accent">
                      Read More Cat Journalism
                    </h3>
                    <p className="font-body text-sm text-muted-foreground mb-3">
                      Subscribe to our Substack for all the latest investigative reports on human behavior.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                      Visit Substack <ExternalLink className="w-3 h-3" />
                    </div>
                  </a>
               </div>
            </div>
          </div>

          {/* Right Column: The Wire / Sidebar */}
          <div id="section-the-wire" className="lg:col-span-3 border-l-0 lg:border-l border-black/20 pl-0 lg:pl-8 scroll-mt-8">
            <h4 className="font-label font-black text-2xl uppercase border-b-4 border-black mb-6 pb-2">
              The Wire
            </h4>
            <div className="flex flex-col gap-6">
              {otherStories.slice(1, 5).map(article => (
                <ArticleCard key={article.id} article={article} variant="compact" />
              ))}
              
              {/* Google Maps Badge */}
              <div className="mt-6">
                 <CertifiedGoodSpot />
              </div>

              {/* "Ron Burgundy" Style Quote Box */}
              <div className="mt-8 border-4 border-black p-6 bg-muted relative">
                <div className="absolute -top-3 -left-3 bg-accent text-white font-label font-bold px-2 py-1 text-xs">
                  QUOTE OF THE DAY
                </div>
                <p className="font-headline font-bold text-xl italic mb-4">
                  "I'm not saying the dog is stupid. I'm saying he chased a parked car and lost."
                </p>
                <div className="font-label font-bold uppercase text-xs text-right">
                  — Anchorman Whiskerberg
                </div>
              </div>

              {/* Fake Ad - Replaced generic with Cool Cat Mini Ad */}
              <div className="mt-8 border-2 border-dashed border-black p-4 text-center bg-[#fff8e1]">
                <span className="font-label text-[10px] uppercase block mb-2 text-muted-foreground">Classifieds</span>
                <h5 className="font-headline font-bold text-xl mb-2">CoolCatStuff.com</h5>
                <p className="font-body text-sm mb-4">We are legally obligated to tell you they are good.</p>
                <a 
                  href="https://coolcatstuff.com" 
                  target="_blank" 
                  className="inline-block bg-black text-white font-label uppercase text-xs px-4 py-2 hover:bg-accent hover:scale-105 transition-all cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
                  data-testid="link-coolcatstuff-sidebar"
                >
                  Investigate
                </a>
              </div>
            </div>
          </div>

        </section>

      </main>

      <Footer />
    </div>
  );
}
