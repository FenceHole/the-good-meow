import { ExternalLink } from "lucide-react";

export function CoolCatAd() {
  return (
    <div className="border-4 border-double border-black p-6 bg-[#f0f0f0] relative overflow-hidden group">
      {/* Vintage "Advertisement" Label */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white px-4 py-1 font-label text-[10px] uppercase tracking-[0.2em] z-10">
        Paid Propaganda
      </div>

      {/* Content */}
      <div className="text-center relative z-0">
        <h3 className="font-headline font-black text-3xl mb-2 leading-none transform -rotate-1">
          TIRED OF <br/>
          <span className="text-accent underline decoration-4 underline-offset-2">BORING</span> FURNITURE?
        </h3>
        
        <p className="font-body text-sm mb-4 font-bold italic">
          Your humans have terrible taste. Fix it.
        </p>

        <div className="border-2 border-black p-2 mb-4 bg-white rotate-1 shadow-sm">
           <div className="font-label font-black text-4xl uppercase leading-none mb-1">
             COOL<br/>CAT<br/>STUFF
           </div>
           <p className="font-label text-xs uppercase tracking-widest text-muted-foreground">
             .COM
           </p>
        </div>

        <p className="font-body text-xs mb-6 px-2">
          Official supplier of tactical nap gear, high-ground surveillance towers, and scratching posts that are legally distinct from the sofa.
        </p>

        <a 
          href="https://coolcatstuff.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full bg-black text-white font-label font-bold uppercase text-sm py-3 hover:bg-accent hover:scale-105 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
        >
          Seize The Means of Production <ExternalLink className="w-3 h-3" />
        </a>
        
        <p className="mt-3 text-[10px] font-mono text-muted-foreground uppercase">
          (Use human credit card. They owe you.)
        </p>
      </div>

      {/* Halftone texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,black_1px,transparent_1px)] bg-[size:10px_10px] opacity-[0.05] pointer-events-none"></div>
    </div>
  );
}
