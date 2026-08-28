'use client';

import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BarChart3,
  Bell,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Flame,
  Heart,
  Leaf,
  Menu,
  MessageCircle,
  Minus,
  PackageCheck,
  Palette,
  Plus,
  Printer,
  Quote,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Tag,
  Upload,
  Instagram,
  Mail,
  Utensils,
  X,
  Zap,
} from 'lucide-react';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  badge?: string;
  rating: number;
};

const K = 'https://kimi-web-img.kimi.ai/img/';
const productImages: Record<string, string> = {
  'Business Card': K + 'static.vecteezy.com/a4ab30ad475df84e445d921160329afa2992e176.jpg',
  'Classic Business Cards': K + 'img.magnific.com/cd4fbf5c72c38ebbe36b62cd804745cfd1974723.jpg',
  'Standard Business Cards': K + 'staticecp.uprinting.com/9c6ccee92591daa67b96df25adcc7490e9378b6e.png',
  'Premium Business Card': K + 'www.rockdesign.com/9442a390f741553b9e193cb03791844e18b49f61.jpg',
  'Premium Finish Cards': K + 'www.moo.com/aa4e47d2614b500686229397644522be432f5d58.jpg',
  'Metallic Business Card': K + 'image.made-in-china.com/3f4dddd7ae95b092a5e5399bf5c28ca435eb8cde.webp',
  'Spot UV Business Cards': K + 'dp5easx94jyj0.cloudfront.net/6d51e743eec06f60953403545c815cf90a0334e8.jpg',
  'Raised Foil Business Card': K + 'cms.cloudinary.vpsvc.com/1bd76e669066ba0648420729dd608da12c982e9f',
  'Velvet Touch Business Card': K + 'cms.cloudinary.vpsvc.com/60b15c3d50497c34c25d86506e01323ad35d9563',
  'Creative Design Cards': K + 'cdn.logojoy.com/764b1b886902bdf78a3f5e78f67543861d644849.jpg',
  'Texture Business Card': K + 'silkcards.com/86ae8c3b32f2b80cbcfd9ccf9dcfec4645be4570.jpg',
  'Die Cut Business Card': K + 'i.etsystatic.com/91bfa463d41f87a20a60a77b829c5374d427582a.jpg',
  'Foldable Business Card': K + 'img.avery.com/5f8c1adba39a5a1a0842faface479ba9fcffe932',
  'Special Cards': K + 'www.moo.com/b295a9b33429464ff4794acff8c1a75fa76df3ac.jpg',
  'Non-Tearable Business Cards': K + 'm.media-amazon.com/b01f49ba33ee91554b9176e075fbb2ed1b81ca75.jpg',
  'PVC Business Card': K + 'www.rockdesign.com/67c942042fe2067744f7c7b82f44960fbeca57bc.jpg',
  'Custom Printing': K + 'static.gotprint.com/cbf524b84ed19a49ea9536e32a7b4520e3fbfac4.jpg',
  'Custom Card Print': K + 'cdn.shopify.com/ea978f1557a37a454dc6a3db98740b4bd5853599.png',
  'Booklet Menu Card': K + 'm.media-amazon.com/511a052d6fb18980108a919fcd485882da776d17.jpg',
  'Leather Book Menu Card': K + 'd3pyarv4eotqu4.cloudfront.net/1349994df4152f05636755634a17635dae453c94.png',
  'Sunboard Menu Card': K + '5.imimg.com/983d6898ee2b06a3e39b122e6e0532812a102ac1.jpeg',
  'Tent Card Menu': K + 'cdn.mycreativeshop.com/a52f2cf4df60992abe50a132927a3693762379ab.jpg',
  'Wiro Menu Card': K + 'images.ctfassets.net/e6215f6b236e0a1bff4a7d91a0d7bbc8ee97538c.webp',
  'Takeaway Menu': K + 'cdn.bannerbuzz.co.uk/3c7d2dcb78c86cec413542e2afc9a0ac01f7ae2d.jpg',
  'Business Stationery': '/images/products/letterhead.jpg',
  'Letterhead': K + 'i0.wp.com/432d03463ee3ef042eb783c154fb0d0fbcd00c04.png',
  'Premium Letterhead': K + 'www.redpixels.in/876258de1b7b56d493352eef328ed97dae556015.jpg',
  'Envelopes': K + 'smartpress.com/675eb238ae6cfaf9041b5b5d1cb7850a029430ad.jpg',
  'Envelope (Cheque Size)': K + 'www.checkomatic.com/8a7df678b03369c0b07fd4512cad5436ab4a5991.png',
  'Envelope (11x5)': K + 'www.photoland.in/77e69c83f437caeba235de4bc0cd9320bf24ef9d.jpg',
  'Envelope (A4)': K + 'printingo.in/3e0a1497015b4adf6ee17d5101ef000dc5b8b196.jpg',
  'Custom Shape Acrylic Festival ID Card': K + 's.alicdn.com/82c447894e14fb32a7b60ee036bf937904c334b8.jpg',
  'ID Card': '/images/products/pic01.webp',
  'Premium Certificate – Spot UV, Foil & Embossed Finish': K + 'd3pyarv4eotqu4.cloudfront.net/90de15967580a4dadbaa16c8f4c863496ee611d4.jpg',
  'Share Certificate': K + 'www.uniwide.co.uk/0997fc0f7f9b96768441bcb23a60070abc1bcc1f.webp',
  'File / Folder': K + 'static.gotprint.com/8f13b98fc900ed8905542e06f73533d80a668cd3.jpg',
  'Hospital File': K + 'www.timg.com/2f27d8f7fee7e717fdd4c8b0ee6be016288a138a.jpg',
  'Premium Hospital File': K + 'www.8designs.com/0d9b4ef3377831743d770f1b63fb1a69029f05c0.jpg',
  'Presentation Folder': K + 'dldzmxx3p7w78.cloudfront.net/9fa041ac54a0fdbb12271a3c7fb3cfa0cd93f883.jpg',
  'Flyers (B/W)': K + 'www.printit4less.com/d4261f7970a8f6be15edd14bf9a28237dd659c8f.jpg',
  'Bulk Flyers (B/W)': K + 'cms.cloudinary.vpsvc.com/31307a34e55eacdffab4603797b6ada46a5e5724',
  'Flyers (Colors)': K + 's1-ecp.nextdayflyers.com/4352316e7d83646c47307a60bb2e5914dcffcb48.jpg',
  'Bulk Flyers (Colors)': K + 'www.allegramarketingprint.com/20481728339bcfef4200d4a4065507ddc0fc7c81.jpg',
  'Posters': K + 'www.diamondphoto.com.au/bdebd37f072e9eccee395309e10114c86306cd1a.jpg',
  'Corporate Posters': K + 'd1csarkz8obe9u.cloudfront.net/499e1d77c2f878714d2078ae8f8b1a6230ab810b.jpg',
  'Brochures': K + 'brochure-page.smartpress.com/24affc6e72f7edd507c0603cc506e371e6659768.jpg',
  'Bi-Fold Brochures': K + 's3.amazonaws.com/8b9afcf2993fe2a91d0116c8138e5b2368475319.png',
  'Booklet': K + 'printitza.co.za/c6c39376354dd4c209ee9cdaf653d8dd1f75247b.jpg',
  'Center Pin Book': K + 'dubaidigitalprint.ae/0d4f8810b9cb1bd05a9cdcc0ba7a1e680cd031be.jpg',
  'Bulk Center Pin Book': K + 'www.shanlax.com/9fda2723427d326d885c7bd4feaa9865e9499305.jpg',
  'Perfect Binding Booklet': K + 'staticecp.uprinting.com/38722e3b42d4e0336a0ef0458ab4546ce0570d79.jpg',
  'Hard Case Book': K + 'www.printninja.com/2373be51273be4451f5a90c53e5c0cbe85f26816.png',
  'Table Tent Card': K + 'cms.cloudinary.vpsvc.com/7459c84548c696bcb4d37f7bdffc2a313d3d9018',
  'Table Tent Card (Premium)': K + 'cms.cloudinary.vpsvc.com/21d42d96b60ceecd415f15df2aa7e41edd4ef779',
  'Two Side Tent Card (Galley cardboard)': K + 'd183fdjooxsl6t.cloudfront.net/3542b8d3345d615b512f22d6fdd8c06bae95b187.jpg',
  'Bookmark One Side (Die-Cut)': K + 'www.printwow.ca/eb289894ddc31ac2ce7d1deb5e85894d301faaeb.jpg',
  'Bookmark Two Side (Die-Cut)': '/images/products/bookmark-die2.jpg',
  'Custom Danglers': K + 'quapri.in/adf8d2934caad815f21ffcfb732098dfc43f54c5',
  'Gift Voucher Printing': K + 'www.welove2print.com/193f827641fdd1ea5e58354baa830436ed7c9a47.jpg',
  'Membership Card': K + 'shop.eprintonline.com.au/baeb4b0a06a7b102300d1087b870c9be50cb3ee5.jpg',
  'Wall Calendar': K + 'staticecp.uprinting.com/2e1aa7145d2bd405ffacd0e5f955890106f2c2da.jpg',
  'Traditional Wall Calendar': K + 'nagamochishop.com/3b88a6fd25355dd1d57a16a206249c6bd6451d17.jpg',
  'Mouse Pad Calendar': K + 'www.qualitylogoproducts.com/9a76015ff9eff8796cc4533f6285f2f700c5971f.jpg',
  'Stickers': K + 'cms.cloudinary.vpsvc.com/8c20a308b3b45e30c2f2ec025a9c026b8ff46cc1',
  'Custom Size Stickers': K + 'staticecp.48hourprint.com/bc2eec34dba1a0422097aaaf5e82e26f4377a3c0.jpg',
  'Product Label Custom Size': K + 's1-ecp.printrunner.com/8f5f7b77308b3f278ef85357525bdf5f7e5d46cf.jpg',
  'Custom Shape Stickers': K + 'cdn.agilitycms.com/2d70db792a493c61a04805daa284ad61fae36267.jpg',
  '2 Wheeler Parking Sticker': K + 'm.media-amazon.com/aa1c1d9da95bf89d2f41647c2745cae93998cd29.jpg',
  '4 Wheeler Parking Sticker': K + '5.imimg.com/af9af3154e4d3492f2d5da0693cb184d268ea2d3.jpg',
  'Indoor & Outdoor Banner & Vinyl': K + 'cdn.shopify.com/66ad7f3511fc64ab839b4ebe041ac908856a2acc.jpg',
  'Banners (Custom Size)': '/images/products/banners.jpg',
  'Vinyl': '/images/products/vinyl.jpg',
  'One Way Vision': K + 'allprint.co.uk/cc21631b724397e5e4bcca87113451a39c6190b3.webp',
  'Display Products': K + 'signagemumbai.in/4b2a797dd745084c95d829eca6aa0e7c9bb8a7f2.webp',
  'Acrylic Sign Holder': K + 'www.renzelusa.com/7e96490c76bee0b45fde23a16ac24533a9e02f6b.jpg',
  'Acrylic Two-Sided Nameplate': K + 'cdn11.bigcommerce.com/531780050da9780428366ec6f9e9610043372c64.jpg',
  'Customized Acrylic Stand': K + 'www.deflectodisplay.com/29ab3a2966109425ed078d843f463832003b2de3.jpg',
  'Desk Sign Name Plate': K + 'i.etsystatic.com/4107294363a0974369532c8558d8a2db6b57d8ff.jpg',
  'Roll Up Standee': K + 'img.magnific.com/b7f9407b3606dab9393a7ad4661bd96906747416.jpg',
  'Premium Roll Up Standee': K + '5.imimg.com/4337d8455c3f48c56a346f7d23df9721b6fb175b.jpg',
  'Luxury Roll Up Standee': K + 'signagemumbai.in/a39f04f4c2c86974253c897e510191f21d4f23c7.jpg',
  'M/S Standee': K + 'cpimg.tistatic.com/fe14b021b84b256db331b33389a24a198ab57e3e.jpg',
};

const localFallback: Record<string, string> = {
  'Business Card': '/images/products/business-card.jpg',
  'Classic Business Cards': '/images/products/classic-cards.jpg',
  'Standard Business Cards': '/images/products/standard-cards.jpg',
  'Premium Business Card': '/images/products/premium-cards.jpg',
  'Premium Finish Cards': '/images/products/premium-finish.jpg',
  'Metallic Business Card': '/images/products/metallic-cards.jpg',
  'Spot UV Business Cards': '/images/products/spot-uv-cards.jpg',
  'Raised Foil Business Card': '/images/products/raised-foil.jpg',
  'Velvet Touch Business Card': '/images/products/velvet-cards.jpg',
  'Creative Design Cards': '/images/products/creative-cards.jpg',
  'Texture Business Card': '/images/products/texture-cards.jpg',
  'Die Cut Business Card': '/images/products/die-cut-cards.jpg',
  'Foldable Business Card': '/images/products/folded-cards.jpg',
  'Special Cards': '/images/products/special-cards.jpg',
  'Non-Tearable Business Cards': '/images/products/non-tearable.jpg',
  'PVC Business Card': '/images/products/pvc-cards.jpg',
  'Custom Printing': '/images/products/custom-menu.jpg',
  'Custom Card Print': '/images/products/custom-menu.jpg',
  'Booklet Menu Card': '/images/products/booklet-menu.jpg',
  'Leather Book Menu Card': '/images/products/leather-menu.jpg',
  'Sunboard Menu Card': '/images/products/sunboard-menu.jpg',
  'Tent Card Menu': '/images/products/tent-menu.jpg',
  'Wiro Menu Card': '/images/products/wiro-menu.jpg',
  'Takeaway Menu': '/images/products/takeaway-menu.jpg',
  'Business Stationery': '/images/products/letterhead.jpg',
  'Letterhead': '/images/products/letterhead.jpg',
  'Premium Letterhead': '/images/products/premium-letterhead.jpg',
  'Envelopes': '/images/products/envelopes.jpg',
  'Envelope (Cheque Size)': '/images/products/envelope-cheque.jpg',
  'Envelope (11x5)': '/images/products/envelope-11x5.jpg',
  'Envelope (A4)': '/images/products/envelope-a4.jpg',
  'Custom Shape Acrylic Festival ID Card': '/images/products/custom-acrylic.jpg',
  'ID Card': '/images/products/pic01.webp',
  'Premium Certificate – Spot UV, Foil & Embossed Finish': '/images/products/premium-cert.jpg',
  'Share Certificate': '/images/products/share-cert.jpg',
  'File / Folder': '/images/products/presentation-folder.jpg',
  'Hospital File': '/images/products/hospital-file.jpg',
  'Premium Hospital File': '/images/products/premium-hospital.jpg',
  'Presentation Folder': '/images/products/presentation-folder.jpg',
  'Flyers (B/W)': '/images/products/flyers-bw.jpg',
  'Bulk Flyers (B/W)': '/images/products/bulk-flyers-bw.jpg',
  'Flyers (Colors)': '/images/products/flyers-color.jpg',
  'Bulk Flyers (Colors)': '/images/products/bulk-flyers-color.jpg',
  'Posters': '/images/products/posters.jpg',
  'Corporate Posters': '/images/products/corporate-posters.jpg',
  'Brochures': '/images/products/bi-fold.jpg',
  'Bi-Fold Brochures': '/images/products/bi-fold.jpg',
  'Booklet': '/images/products/center-pin.jpg',
  'Center Pin Book': '/images/products/center-pin.jpg',
  'Bulk Center Pin Book': '/images/products/bulk-center-pin.jpg',
  'Perfect Binding Booklet': '/images/products/perfect-binding.jpg',
  'Hard Case Book': '/images/products/hard-case.jpg',
  'Table Tent Card': '/images/products/table-tent.jpg',
  'Table Tent Card (Premium)': '/images/products/table-tent.jpg',
  'Two Side Tent Card (Galley cardboard)': '/images/products/two-side-tent.jpg',
  'Bookmark One Side (Die-Cut)': '/images/products/bookmark-die1.jpg',
  'Bookmark Two Side (Die-Cut)': '/images/products/bookmark-die2.jpg',
  'Custom Danglers': '/images/products/danglers.jpg',
  'Gift Voucher Printing': '/images/products/gift-voucher.jpg',
  'Membership Card': '/images/products/membership-card.jpg',
  'Wall Calendar': '/images/products/wall-calendar.jpg',
  'Traditional Wall Calendar': '/images/products/traditional-wall.jpg',
  'Mouse Pad Calendar': '/images/products/mouse-pad-cal.jpg',
  'Stickers': '/images/products/stickers.jpg',
  'Custom Size Stickers': '/images/products/custom-stickers.jpg',
  'Product Label Custom Size': '/images/products/product-label.jpg',
  'Custom Shape Stickers': '/images/products/custom-shape-stickers.jpg',
  '2 Wheeler Parking Sticker': '/images/products/two-wheeler.jpg',
  '4 Wheeler Parking Sticker': '/images/products/four-wheeler.jpg',
  'Indoor & Outdoor Banner & Vinyl': '/images/products/banners.jpg',
  'Banners (Custom Size)': '/images/products/banners.jpg',
  'Vinyl': '/images/products/vinyl.jpg',
  'One Way Vision': '/images/products/one-way-vision.jpg',
  'Display Products': '/images/products/acrylic-sign.jpg',
  'Acrylic Sign Holder': '/images/products/acrylic-sign.jpg',
  'Acrylic Two-Sided Nameplate': '/images/products/acrylic-nameplate.jpg',
  'Customized Acrylic Stand': '/images/products/custom-acrylic-stand.jpg',
  'Desk Sign Name Plate': '/images/products/desk-nameplate.jpg',
  'Roll Up Standee': '/images/products/roll-up.jpg',
  'Premium Roll Up Standee': '/images/products/premium-roll-up.jpg',
  'Luxury Roll Up Standee': '/images/products/luxury-roll-up.jpg',
  'M/S Standee': '/images/products/ms-standee.jpg',
};

const catalogueGroups: Array<{ category: string; names: string[] }> = [
  { category: 'Business Cards', names: ['Business Card', 'Classic Business Cards', 'Standard Business Cards', 'Premium Business Card', 'Premium Finish Cards', 'Metallic Business Card', 'Spot UV Business Cards', 'Raised Foil Business Card', 'Velvet Touch Business Card', 'Creative Design Cards', 'Texture Business Card', 'Die Cut Business Card', 'Foldable Business Card', 'Special Cards', 'Non-Tearable Business Cards', 'PVC Business Card'] },
  { category: 'Menu Cards', names: ['Custom Printing', 'Custom Card Print', 'Booklet Menu Card', 'Leather Book Menu Card', 'Sunboard Menu Card', 'Tent Card Menu', 'Wiro Menu Card', 'Takeaway Menu'] },
  { category: 'Business Stationery', names: ['Business Stationery', 'Letterhead', 'Premium Letterhead', 'Envelopes', 'Envelope (Cheque Size)', 'Envelope (11x5)', 'Envelope (A4)'] },
  { category: 'ID Cards', names: ['ID Card', 'Custom Shape Acrylic Festival ID Card'] },
  { category: 'Certificates & Files', names: ['Premium Certificate – Spot UV, Foil & Embossed Finish', 'Share Certificate', 'File / Folder', 'Hospital File', 'Premium Hospital File', 'Presentation Folder'] },
  { category: 'Marketing Materials', names: ['Flyers (B/W)', 'Bulk Flyers (B/W)', 'Flyers (Colors)', 'Bulk Flyers (Colors)', 'Posters', 'Corporate Posters'] },
  { category: 'Brochures & Books', names: ['Brochures', 'Bi-Fold Brochures', 'Booklet', 'Center Pin Book', 'Bulk Center Pin Book', 'Perfect Binding Booklet', 'Hard Case Book'] },
  { category: 'Table Tent & Bookmarks', names: ['Table Tent Card', 'Table Tent Card (Premium)', 'Two Side Tent Card (Galley cardboard)', 'Bookmark One Side (Die-Cut)', 'Bookmark Two Side (Die-Cut)'] },
  { category: 'Marketing Collateral', names: ['Custom Danglers', 'Gift Voucher Printing', 'Membership Card'] },
  { category: 'Calendars', names: ['Wall Calendar', 'Traditional Wall Calendar', 'Mouse Pad Calendar'] },
  { category: 'Labels & Packaging', names: ['Stickers', 'Custom Size Stickers', 'Product Label Custom Size', 'Custom Shape Stickers', '2 Wheeler Parking Sticker', '4 Wheeler Parking Sticker'] },
  { category: 'Indoor & Outdoor', names: ['Indoor & Outdoor Banner & Vinyl', 'Banners (Custom Size)', 'Vinyl', 'One Way Vision'] },
  { category: 'Display Products', names: ['Display Products', 'Acrylic Sign Holder', 'Acrylic Two-Sided Nameplate', 'Customized Acrylic Stand', 'Desk Sign Name Plate', 'Roll Up Standee', 'Premium Roll Up Standee', 'Luxury Roll Up Standee', 'M/S Standee'] },
];

const products: Product[] = catalogueGroups.flatMap(({ category, names }, groupIndex) => names.map((name, index) => ({
  id: groupIndex * 20 + index + 1,
  name,
  category,
  price: groupIndex === 0 ? 99 + index * 15 : groupIndex === 6 ? 149 + index * 25 : 149 + groupIndex * 35 + index * 12,
  unit: groupIndex === 0 ? '100 cards' : groupIndex === 6 ? '100 stickers' : 'starting at',
  image: productImages[name] ?? localFallback[name] ?? '/images/placeholder.jpg',
  badge: index === 0 ? (groupIndex === 0 ? 'Bestseller' : 'Popular') : undefined,
  rating: Number((4.6 + ((index + groupIndex) % 4) / 10).toFixed(1)),
})));

const categories = [
  { label: 'Business Cards', count: '16 products', icon: BarChart3, tone: 'orange' },
  { label: 'Menu Cards', count: '8 products', icon: Utensils, tone: 'rose' },
  { label: 'Marketing Materials', count: '6 products', icon: Sparkles, tone: 'blue' },
  { label: 'Labels & Packaging', count: '6 products', icon: PackageCheck, tone: 'green' },
];

const benefits = [
  { icon: Zap, title: 'Fast turnaround', text: 'Same-day options for your urgent jobs.' },
  { icon: Award, title: 'Premium quality', text: 'Colour-accurate printing, every time.' },
  { icon: Palette, title: 'Design support', text: 'Bring an idea or upload your artwork.' },
  { icon: ShieldCheck, title: 'Trusted locally', text: 'Ahmednagar printing, delivered nationwide.' },
];

export default function Home() {
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isQuoteOpen, setQuoteOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [toast, setToast] = useState('');

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesSearch = !term || `${product.name} ${product.category}`.toLowerCase().includes(term);
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const addToCart = (product: Product) => {
    setCart((current) => [...current, product]);
    setToast(`${product.name} added to cart`);
    setCartOpen(true);
    window.setTimeout(() => setToast(''), 2600);
  };

  const cartTotal = cart.reduce((sum, product) => sum + product.price, 0);

  const sendQuote = () => {
    const items = cart.length > 0 ? cart.map((item) => `${item.name} - ₹${item.price}`).join(', ') : 'New printing enquiry';
    const message = `Hi Om Digital, I would like a quote. Items: ${items}. Estimated total: ₹${cartTotal}. Please share the final quote and delivery details.`;
    window.open(`https://wa.me/919421589062?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setQuoteOpen(false);
    setToast('Quote sent to Om Digital on WhatsApp: 94215 89062');
    window.setTimeout(() => setToast(''), 4500);
  };

  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#202020]">
      <div className="top-strip">
        <div className="shell top-strip-inner">
          <span><Clock3 size={14} /> Same-day printing available in Ahmednagar</span>
          <div className="top-links"><a href="#products">Bulk orders</a><a href="https://wa.me/919421589062?text=Hi%20Om%20Digital%2C%20I%20need%20help%20with%20a%20printing%20order." target="_blank" rel="noreferrer">Help centre</a></div>
        </div>
      </div>

      <header className="site-header">
        <div className="shell header-inner">
          <button className="mobile-icon" onClick={() => setMenuOpen(!isMenuOpen)} aria-label="Open menu"><Menu size={22} /></button>
          <a className="brand" href="#top" aria-label="Om Digital home">
            <img className="brand-logo" src="/images/omdigital_logo.png" alt="Om Digital" />
          </a>
          <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
            <a href="#products">Print products <ChevronDown size={14} /></a>
            <a href="#solutions">Business solutions <ChevronDown size={14} /></a>
            <a href="#how-it-works">How it works</a>
            <a href="#about">About Om Digital</a>
          </nav>
          <div className="header-actions">
            <button className="icon-button search-toggle" onClick={() => document.getElementById('search-input')?.focus()} aria-label="Search"><Search size={19} /></button>
            <button className="account-button"><span className="account-avatar">P</span><span>Hi, Pankaj</span><ChevronDown size={14} /></button>
            <button className="cart-button" onClick={() => setCartOpen(true)} aria-label="Open cart"><ShoppingBag size={19} /><span>{cart.length}</span></button>
          </div>
        </div>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-art hero-art-one" />
        <div className="hero-art hero-art-two" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> Ahmednagar's print partner since 2008</div>
            <h1>Make your<br /><em>mark.</em> Make it matter.</h1>
            <p>From first idea to final print, Om Digital makes it easy to create work your customers remember.</p>
            <div className="hero-cta"><a className="button button-primary" href="#products">Explore products <ArrowRight size={17} /></a><button className="text-button" onClick={() => setQuoteOpen(true)}>Get an instant quote <span>→</span></button></div>
            <div className="hero-proof"><div className="avatar-stack"><span>AK</span><span>RS</span><span>MV</span><span>+</span></div><div><div className="stars"><Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" /></div><strong>4.9/5 from 2,000+ happy customers</strong></div></div>
          </div>
          <div className="hero-visual">
            <div className="hero-card hero-card-back"><div className="card-ribbon">YOUR BRAND<br />DESERVES<br /><b>GOOD PRINT.</b></div></div>
            <div className="hero-card hero-card-front"><div className="card-topline"><span>OM</span><span>PRINT / DESIGN / DELIVER</span></div><div className="card-word">Make<br /><b>an impression.</b></div><div className="card-footer"><span>omdigital.in</span><span>Est. 2008</span></div></div>
            <div className="hero-float hero-float-top"><Sparkles size={15} /><span>Premium<br /><b>finish</b></span></div>
            <div className="hero-float hero-float-bottom"><Zap size={15} /><span>Ready in<br /><b>24 hours</b></span></div>
            <div className="hero-scribble">Print with<br />purpose</div>
          </div>
        </div>
      </section>

      <section className="search-section"><div className="shell"><div className="search-box"><Search size={20} /><input id="search-input" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search 120+ printing products" /><span>⌘ K</span></div><div className="search-hints"><span>Popular:</span><button onClick={() => setSearch('Business Cards')}>Business cards</button><button onClick={() => setSearch('Wedding')}>Wedding invitations</button><button onClick={() => setSearch('Banners')}>Banners</button><button onClick={() => setSearch('Stickers')}>Stickers</button></div></div></section>

      <section className="section section-tight"><div className="shell"><div className="section-heading"><div><span className="kicker">Start here</span><h2>What are you printing today?</h2></div><a className="view-all" href="#products">View all products <ArrowRight size={16} /></a></div><div className="category-grid">{categories.map(({ label, count, icon: Icon, tone }) => <button key={label} className={`category-card category-${tone}`} onClick={() => { setActiveCategory(label); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}><span className="category-icon"><Icon size={21} /></span><span><strong>{label}</strong><small>{count}</small></span><ChevronRight size={17} className="category-arrow" /></button>)}</div></div></section>

      <section id="products" className="section products-section"><div className="shell"><div className="section-heading"><div><span className="kicker">Made to be noticed</span><h2>Customer favourites</h2></div><a className="view-all" href="#products">Browse catalogue <ArrowRight size={16} /></a></div><div className="filter-row">{['All', ...Array.from(new Set(products.map((product) => product.category)))].map((category) => <button className={activeCategory === category ? 'filter active' : 'filter'} key={category} onClick={() => setActiveCategory(category)}>{category}</button>)}</div><div className="product-grid">{filteredProducts.map((product) => <article className="product-card" key={product.id}><div className="product-image"><img src={product.image} alt={product.name} loading="lazy" onLoad={(e) => { (e.target as HTMLImageElement).parentElement?.classList.add('loaded'); }} />{product.badge && <span className="product-badge">{product.badge}</span>}<button className="heart-button" aria-label={`Save ${product.name}`}><Heart size={17} /></button><div className="product-hover"><button onClick={() => addToCart(product)}>Quick add <Plus size={16} /></button></div></div><div className="product-details"><div className="product-meta"><span>{product.category}</span><span><Star size={13} fill="currentColor" /> {product.rating}</span></div><h3>{product.name}</h3><div className="product-bottom"><div><small>From</small><strong>₹{product.price.toLocaleString('en-IN')}</strong><span>{product.unit}</span></div><button className="add-button" onClick={() => addToCart(product)}><Plus size={18} /></button></div></div></article>)}</div>{filteredProducts.length === 0 && <div className="empty-state"><Search size={22} /><p>No products match that search yet.</p><button onClick={() => { setSearch(''); setActiveCategory('All'); }}>Clear search</button></div>}</div></section>

      <section id="about" className="story-section"><div className="shell story-grid"><div className="story-image"><img src="https://images.pexels.com/photos/4466116/pexels-photo-4466116.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Premium printed cards on a wooden desk" /><div className="story-stamp"><span>OM</span><small>Made with care<br />in Nagar</small></div></div><div className="story-copy"><span className="kicker">Why Om Digital</span><h2>Small details.<br /><em>Big difference.</em></h2><p>We believe a printed piece should feel as good as it looks. That is why every order gets the same care, whether it is 100 business cards or 10,000 wedding invites.</p><div className="story-list"><div><span><Check size={15} /></span><p><strong>People-first service</strong><small>Talk to a real print expert, not a ticket number.</small></p></div><div><span><Check size={15} /></span><p><strong>Uncompromising colour</strong><small>Proofs you can trust and finishes you can feel.</small></p></div><div><span><Check size={15} /></span><p><strong>Made for your deadline</strong><small>Clear timelines, local pickup and India-wide delivery.</small></p></div></div><button className="text-button" onClick={() => setQuoteOpen(true)}>Get to know us <ArrowRight size={16} /></button></div></div></section>

      <section id="solutions" className="section solutions-section"><div className="shell"><div className="section-heading"><div><span className="kicker">Built around you</span><h2>Print for every chapter</h2></div><p className="heading-note">Whether you are opening a shop, planning a wedding or growing a team, we have a solution that fits.</p></div><div className="solution-grid"><div className="solution-card solution-orange"><div><span className="solution-icon"><Printer size={22} /></span><h3>For your business</h3><p>Cards, packaging, signage and everything in between.</p><a href="#products">Explore business print <ArrowRight size={15} /></a></div><span className="solution-number">01</span></div><div className="solution-card solution-blue"><div><span className="solution-icon"><Heart size={22} /></span><h3>For your big day</h3><p>Invitations and details as memorable as the moment.</p><a href="#products">Explore wedding print <ArrowRight size={15} /></a></div><span className="solution-number">02</span></div><div className="solution-card solution-green"><div><span className="solution-icon"><Leaf size={22} /></span><h3>For your next idea</h3><p>Flexible printing for schools, events and bold ideas.</p><a href="#products">Explore more ways <ArrowRight size={15} /></a></div><span className="solution-number">03</span></div></div></div></section>

      <section id="how-it-works" className="how-section"><div className="shell"><div className="section-heading centered"><div><span className="kicker">Simple by design</span><h2>From idea to impressive</h2></div><p className="heading-note">No confusing steps. No surprise charges. Just great printing.</p></div><div className="steps"><button className="step" onClick={() => setQuoteOpen(true)}><span>01</span><Upload size={22} /><h3>Choose or upload</h3><p>Start with a product or send us your artwork.</p></button><div className="step-line" /><button className="step" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}><span>02</span><Quote size={22} /><h3>Make it yours</h3><p>Pick your paper, finish, size and quantity.</p></button><div className="step-line" /><button className="step" onClick={() => window.open('https://wa.me/919421589062?text=Hi%20Om%20Digital%2C%20I%20am%20ready%20to%20place%20my%20printing%20order.', '_blank')}><span>03</span><PackageCheck size={22} /><h3>We make it real</h3><p>Approve your proof and get it delivered fast.</p></button></div><div className="benefit-row">{benefits.map(({ icon: Icon, title, text }) => <div className="benefit" key={title}><Icon size={19} /><div><strong>{title}</strong><small>{text}</small></div></div>)}</div></div></section>

      <section className="testimonial-section"><div className="shell testimonial-grid"><div><span className="kicker">The Om Digital difference</span><h2>Good work deserves<br /><em>good print.</em></h2><p>Join 2,000+ businesses and families who trust us to make their moments matter.</p><div className="testimonial-controls"><button aria-label="Previous testimonial">←</button><button aria-label="Next testimonial">→</button></div></div><div className="quote-card"><Quote size={30} /><p>“The cards looked even better than the mockup. The finish, the colour, the little details — all perfect. Om Digital is now our go-to for everything.”</p><div className="quote-author"><span>SK</span><div><strong>Shreya Kulkarni</strong><small>Founder, Katha Studio</small></div><div className="quote-stars"><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /></div></div></div></div></section>

      <footer className="site-footer"><div className="shell footer-grid"><div><a className="brand brand-footer" href="#top"><img className="brand-logo" src="/images/omdigital_logo.png" alt="Om Digital" /></a><p>Thoughtful print for ambitious ideas.<br />Ahmednagar, Maharashtra.</p><div className="social-row"><a href="https://www.instagram.com/om_digital_no.1?igsi=MXVhc211cjU4Mmdhcg==" target="_blank" rel="noreferrer" aria-label="Visit Om Digital on Instagram"><Instagram size={16} /></a><a href="https://wa.me/919421589062" target="_blank" rel="noreferrer" aria-label="Chat with Om Digital on WhatsApp"><MessageCircle size={16} /></a><a href="mailto:omdigitalnagar@gmail.com" aria-label="Email Om Digital"><Mail size={16} /></a></div></div><div><h4>Explore</h4><a href="#products">All products</a><a href="#solutions">Business print</a><a href="#products">Wedding print</a><a href="#how-it-works">How it works</a></div><div><h4>Get help</h4><a href="https://wa.me/919421589062?text=Hi%20Om%20Digital%2C%20I%20want%20to%20track%20my%20order." target="_blank" rel="noreferrer">Track your order</a><a href="https://wa.me/919421589062?text=Hi%20Om%20Digital%2C%20please%20help%20with%20delivery%20information." target="_blank" rel="noreferrer">Delivery information</a><a href="https://wa.me/919421589062?text=Hi%20Om%20Digital%2C%20I%20have%20a%20question%20about%20printing." target="_blank" rel="noreferrer">FAQs</a><a href="https://wa.me/919421589062?text=Hi%20Om%20Digital%2C%20I%20would%20like%20to%20contact%20you." target="_blank" rel="noreferrer">Contact us</a></div><div className="footer-contact"><h4>Have a project in mind?</h4><p>Tell us what you are working on. We will help you make it happen.</p><button className="button button-light" onClick={() => setQuoteOpen(true)}>Start a conversation <ArrowRight size={16} /></button><span>94215 89062 · omdigitalnagar@gmail.com</span></div></div><div className="shell footer-bottom"><span>© 2024 Om Digital. All rights reserved.</span><span>Privacy · Terms · Shipping</span><span>Made with care in Ahmednagar</span></div></footer>

      <button className="whatsapp-button" onClick={() => window.open('https://wa.me/919421589062?text=Hi%20Om%20Digital%2C%20I%20would%20like%20to%20know%20more%20about%20your%20printing%20services.', '_blank')} aria-label="Chat on WhatsApp"><MessageCircle size={21} /><span>Chat with us</span></button>
      {toast && <div className="toast"><BadgeCheck size={18} /> {toast}</div>}
      {isCartOpen && <div className="overlay" onClick={() => setCartOpen(false)}><aside className="drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-header"><div><span className="kicker">Your selection</span><h2>Your cart <span>{cart.length}</span></h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label="Close cart"><X size={20} /></button></div>{cart.length === 0 ? <div className="drawer-empty"><ShoppingBag size={28} /><h3>Your cart is waiting</h3><p>Add something beautiful to get started.</p><button className="button button-primary" onClick={() => setCartOpen(false)}>Explore products</button></div> : <><div className="cart-items">{cart.map((item, index) => <div className="cart-item" key={`${item.id}-${index}`}><img src={item.image} alt="" /><div><strong>{item.name}</strong><small>{item.unit}</small><span>₹{item.price.toLocaleString('en-IN')}</span></div><button onClick={() => setCart((current) => current.filter((_, itemIndex) => itemIndex !== index))}><Minus size={15} /></button></div>)}</div><div className="drawer-bottom"><div className="total-row"><span>Estimated total</span><strong>₹{cartTotal.toLocaleString('en-IN')}</strong></div><small>Taxes and delivery calculated at checkout.</small><button className="button button-primary full-width" onClick={() => setQuoteOpen(true)}>Continue to quote <ArrowRight size={16} /></button></div></>}</aside></div>}
      {isQuoteOpen && <div className="overlay" onClick={() => setQuoteOpen(false)}><div className="quote-modal" onClick={(event) => event.stopPropagation()}><button className="close-button modal-close" onClick={() => setQuoteOpen(false)} aria-label="Close quote form"><X size={20} /></button><div className="modal-intro"><span className="kicker">Let's make it happen</span><h2>Tell us about<br /><em>your project.</em></h2><p>Share a few details and our print experts will get back to you with a tailored quote.</p><div className="quote-recipient"><MessageCircle size={15} /> Sent to Om Digital on WhatsApp<br /><strong>94215 89062</strong></div></div><div className="quote-form"><label>Your name<input placeholder="Pankaj Bodke" /></label><label>Phone number<input placeholder="94215 89062" /></label><label>What do you need?<select defaultValue=""><option value="" disabled>Select a product</option><option>Business cards</option><option>Wedding invitations</option><option>Banner printing</option><option>Something else</option></select></label><label>Tell us a little more<textarea placeholder="Quantity, size, deadline or any other details..." rows={3} /></label><button className="button button-primary full-width" onClick={sendQuote}>Send quote to Om Digital <ArrowRight size={16} /></button><small>We usually reply within 30 minutes during business hours.</small></div></div></div>}
    </main>
  );
}
