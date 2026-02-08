import { Star, MapPin } from "lucide-react";

export function CertifiedGoodSpot() {
  return (
    <div className="border-4 border-black p-4 bg-[#fff8e1] relative overflow-hidden group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      {/* Badge Header */}
      <div className="flex items-center gap-3 border-b-2 border-black/20 pb-3 mb-3">
        <div className="bg-black text-white p-2 rounded-full">
          <Star className="w-6 h-6 fill-accent text-accent animate-pulse" />
        </div>
        <div>
          <h4 className="font-label font-black uppercase text-lg leading-none">Certified</h4>
          <span className="font-headline font-bold text-accent text-sm">Good Spot™</span>
        </div>
      </div>

      {/* Content */}
      <div className="text-center mb-4">
         <p className="font-body text-sm font-bold mb-2">
           We are Top 10% Global Food Critics.
         </p>
         <p className="font-label text-xs uppercase text-muted-foreground mb-4">
           (According to Google Maps, who we assume is a very smart cat)
         </p>
         
         <div className="bg-white border-2 border-black p-2 mb-3 rotate-1 transform transition-transform group-hover:rotate-0">
           <div className="flex justify-center mb-1">
             {[1,2,3,4,5].map(i => (
               <Star key={i} className="w-4 h-4 fill-accent text-accent" />
             ))}
           </div>
           <p className="font-headline font-bold text-xs">Level 7 Local Guide</p>
         </div>
      </div>

      <a 
        href="https://maps.app.goo.gl/6rHDaK6qhAL1jEsB7?g_st=ic" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full bg-black text-white font-label font-bold uppercase text-xs py-3 hover:bg-accent transition-colors"
      >
        <MapPin className="w-3 h-3" />
        See Where We Eat
      </a>
    </div>
  );
}
