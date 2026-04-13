import { Twitter, Facebook, Linkedin, Link2, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  url: string;
  compact?: boolean;
}

export function ShareButtons({ title, url, compact = false }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${url}` : url;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = fullUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=ItsTheGoodMeow`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  if (compact) {
    return (
      <div className="flex items-center gap-2" onClick={(e) => e.preventDefault()}>
        <span className="font-label text-[9px] uppercase tracking-widest text-muted-foreground mr-1">Share:</span>
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6 border border-black/30 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            aria-label={`Share on ${link.name}`}
            data-testid={`share-${link.name.toLowerCase()}`}
            onClick={(e) => e.stopPropagation()}
          >
            <link.icon className="w-3 h-3" />
          </a>
        ))}
        <button
          onClick={(e) => { e.stopPropagation(); e.preventDefault(); copyLink(); }}
          className="w-6 h-6 border border-black/30 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
          aria-label="Copy link"
          data-testid="share-copy-link"
        >
          {copied ? <Check className="w-3 h-3 text-green-600" /> : <Link2 className="w-3 h-3" />}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3" onClick={(e) => e.preventDefault()}>
      <span className="font-label text-xs uppercase tracking-widest font-bold mr-2">Share This Report:</span>
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors group"
          aria-label={`Share on ${link.name}`}
          data-testid={`share-${link.name.toLowerCase()}`}
          onClick={(e) => e.stopPropagation()}
        >
          <link.icon className="w-4 h-4" />
        </a>
      ))}
      <button
        onClick={(e) => { e.stopPropagation(); e.preventDefault(); copyLink(); }}
        className="w-9 h-9 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
        aria-label="Copy link"
        data-testid="share-copy-link"
      >
        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Link2 className="w-4 h-4" />}
      </button>
      {copied && (
        <span className="font-label text-xs uppercase text-green-700 font-bold animate-pulse">Link copied!</span>
      )}
    </div>
  );
}
