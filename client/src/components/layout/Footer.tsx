import { Youtube, Instagram, Twitter, MapPin, ExternalLink, Ghost, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t-4 border-black bg-background py-12 px-4 md:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <h2 className="font-headline font-black text-4xl mb-4">The GOOD Meow.</h2>
          <p className="font-body text-muted-foreground max-w-md mb-8">
            An independent publication dedicated to the rigorous, unbiased observation of the bipedal species. 
            Funded entirely by found coins and forgotten treats.
          </p>
          
          {/* Social Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 max-w-md">
             <a href="https://www.instagram.com/thegoodmeow" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-label text-xs uppercase font-bold hover:text-accent group">
               <div className="w-8 h-8 border-2 border-black flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-colors">
                 <Instagram className="w-4 h-4" />
               </div>
               Instagram
             </a>
             <a href="https://www.youtube.com/@itsthegoodmeow" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-label text-xs uppercase font-bold hover:text-accent group">
               <div className="w-8 h-8 border-2 border-black flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-colors">
                 <Youtube className="w-4 h-4" />
               </div>
               YouTube
             </a>
             <a href="https://twitter.com/ItsTheGoodMeow" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-label text-xs uppercase font-bold hover:text-accent group">
               <div className="w-8 h-8 border-2 border-black flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-colors">
                 <Twitter className="w-4 h-4" />
               </div>
               Twitter / X
             </a>
             <a href="https://www.linkedin.com/company/thegoodmeow/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-label text-xs uppercase font-bold hover:text-accent group">
               <div className="w-8 h-8 border-2 border-black flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-colors">
                 <Linkedin className="w-4 h-4" />
               </div>
               LinkedIn
             </a>
             <a href="https://www.snapchat.com/add/TheGoodMeow" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-label text-xs uppercase font-bold hover:text-accent group">
               <div className="w-8 h-8 border-2 border-black flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-colors">
                 <Ghost className="w-4 h-4" />
               </div>
               Snapchat
             </a>
             <a href="https://maps.app.goo.gl/6rHDaK6qhAL1jEsB7?g_st=ic" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-label text-xs uppercase font-bold hover:text-accent group">
               <div className="w-8 h-8 border-2 border-black flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-colors">
                 <MapPin className="w-4 h-4" />
               </div>
               Google Maps
             </a>
          </div>

          <div className="border-t border-b border-black/10 py-4 my-6">
            <p className="font-label text-xs uppercase tracking-widest mb-2">Proudly Supported By</p>
            <a href="https://coolcatstuff.com" target="_blank" rel="noopener noreferrer" className="font-headline font-black text-xl hover:text-accent transition-colors flex items-center gap-2">
              COOL CAT STUFF
              <span className="text-xs font-normal font-sans text-muted-foreground align-middle normal-case tracking-normal opacity-70 ml-2">(They have the good nip)</span>
            </a>
          </div>

          <div className="font-label text-xs uppercase tracking-widest">
            © 1972-2026 The Good Meow Press. All rights reserved.
          </div>
        </div>
        
        <div>
          <h4 className="font-label font-bold uppercase tracking-widest mb-4 border-b border-black inline-block pb-1">Sections</h4>
          <ul className="space-y-2 font-label text-sm uppercase tracking-wide text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">Breaking News</a></li>
            <li><a href="#" className="hover:text-foreground">Human Behavior Desk</a></li>
            <li><a href="#" className="hover:text-foreground">Opinion</a></li>
            <li><a href="#" className="hover:text-foreground">Investigations</a></li>
            <li><a href="#" className="hover:text-foreground">Market Watch</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-label font-bold uppercase tracking-widest mb-4 border-b border-black inline-block pb-1">Legal</h4>
          <ul className="space-y-2 font-label text-sm uppercase tracking-wide text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">Privacy Policy (We Watch You)</a></li>
            <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
            <li><a href="#" className="hover:text-foreground">Masthead</a></li>
            <li><a href="#" className="hover:text-foreground">Submit a Tip</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
