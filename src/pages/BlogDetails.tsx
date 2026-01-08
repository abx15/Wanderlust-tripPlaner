import React, { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/data";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  ChevronRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SocialShareButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color: string;
}> = ({ icon, label, onClick, color }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${color}`}
    aria-label={`Share on ${label}`}
  >
    {icon}
    <span className="hidden sm:inline">{label}</span>
  </button>
);

const BlogDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);
  const contentRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug && p.category === post?.category)
    .slice(0, 3);

  useEffect(() => {
    if (!post) return;

    // Hero animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll(".hero-animate"),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    }

    // Content reveal animation
    if (contentRef.current) {
      const paragraphs = contentRef.current.querySelectorAll(
        "p, h2, h3, blockquote, ul, ol"
      );
      gsap.fromTo(
        paragraphs,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, [post]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || "";

    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}`,
      copy: url,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      // Could add a toast notification here
    } else {
      window.open(shareUrls[platform], "_blank", "noopener,noreferrer");
    }
  };

  if (!post) {
    return (
      <MainLayout>
        <section className="section-padding min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-headline mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The article you're looking for doesn't exist.
            </p>
            <Link to="/blog" className="btn-hero">
              Back to Blog
            </Link>
          </div>
        </section>
      </MainLayout>
    );
  }

  // Extended content for the blog post
  const fullContent = `
    <p class="text-lg leading-relaxed mb-6">The world of travel is constantly evolving, and ${post.title.toLowerCase()} represents one of the most exciting developments we've seen in recent years. Whether you're a seasoned explorer or planning your first adventure, understanding these trends can transform your journey from ordinary to extraordinary.</p>

    <h2 class="text-2xl font-display font-semibold mt-10 mb-4">The Art of Mindful Travel</h2>
    <p class="text-lg leading-relaxed mb-6">In our fast-paced world, the concept of slow travel has emerged as a counterbalance to the rush of checking off destinations. It's about immersing yourself in a place, understanding its rhythms, and allowing unexpected discoveries to shape your experience.</p>
    
    <blockquote class="border-l-4 border-accent pl-6 my-8 italic text-xl text-muted-foreground">"Travel is fatal to prejudice, bigotry, and narrow-mindedness." — Mark Twain</blockquote>

    <p class="text-lg leading-relaxed mb-6">When we slow down, we notice things that would otherwise blur past our windows. The elderly couple sharing coffee at a local café, the street artist perfecting their craft, the hidden garden tucked behind an unassuming door. These moments become the true treasures of travel.</p>

    <h2 class="text-2xl font-display font-semibold mt-10 mb-4">Embracing Local Experiences</h2>
    <p class="text-lg leading-relaxed mb-6">The most memorable travel experiences often come from stepping outside our comfort zones and embracing local customs. This might mean participating in a traditional ceremony, learning to cook a regional dish, or simply spending an afternoon in conversation with locals.</p>

    <ul class="list-disc list-inside mb-6 space-y-2 text-lg">
      <li>Visit local markets early in the morning for the freshest produce and authentic interactions</li>
      <li>Learn a few phrases in the local language — even small efforts are appreciated</li>
      <li>Ask locals for their favorite spots, often far from tourist trails</li>
      <li>Participate in community events or festivals when possible</li>
    </ul>

    <h2 class="text-2xl font-display font-semibold mt-10 mb-4">Sustainable Practices for Modern Explorers</h2>
    <p class="text-lg leading-relaxed mb-6">As travelers, we have a responsibility to minimize our impact on the places we visit. This means choosing eco-friendly accommodations, supporting local businesses, and being mindful of our resource consumption.</p>

    <p class="text-lg leading-relaxed mb-6">Consider offsetting your carbon footprint, carrying a reusable water bottle, and choosing experiences that give back to local communities. These small choices, multiplied across millions of travelers, can make a significant difference.</p>

    <h2 class="text-2xl font-display font-semibold mt-10 mb-4">Planning Your Next Adventure</h2>
    <p class="text-lg leading-relaxed mb-6">The best adventures begin with thoughtful planning. Research your destination thoroughly, understand the best times to visit, and leave room for spontaneity. Build a rough itinerary but remain flexible — some of the best experiences are unplanned.</p>

    <p class="text-lg leading-relaxed mb-6">Remember that travel is not about the number of stamps in your passport, but the depth of experiences you collect. One week in a single village can be more transformative than racing through ten cities in the same time.</p>

    <h3 class="text-xl font-display font-semibold mt-8 mb-4">Essential Tips for Your Journey</h3>
    <ol class="list-decimal list-inside mb-6 space-y-2 text-lg">
      <li>Book accommodations in residential neighborhoods for authentic experiences</li>
      <li>Travel during shoulder seasons for fewer crowds and better prices</li>
      <li>Pack light — you'll thank yourself when navigating cobblestone streets</li>
      <li>Keep a travel journal to capture memories and reflections</li>
      <li>Stay curious and open to changing your plans</li>
    </ol>

    <p class="text-lg leading-relaxed mb-6">As you plan your next journey, remember that the goal isn't perfection — it's connection. Connection to new places, new people, and ultimately, to yourself. Every trip offers an opportunity for growth, wonder, and the kind of memories that stay with you forever.</p>
  `;

  return (
    <MainLayout>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[70vh] min-h-[500px] flex items-end"
      >
        <div className="absolute inset-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="container-custom relative z-10 pb-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest mb-8 hero-animate opacity-60">
            <Link to="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <ChevronRight size={12} className="text-accent" />
            <Link to="/blog" className="hover:text-accent transition-colors">
              Blog
            </Link>
            <ChevronRight size={12} className="text-accent" />
            <span className="text-foreground">
              {post.category.toUpperCase()}
            </span>
          </nav>

          <span className="badge-accent mb-6 inline-block font-bold px-4 py-1.5 text-[10px] uppercase tracking-widest border border-accent/20 hero-animate">
            {post.category}
          </span>

          <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-8 max-w-5xl hero-animate uppercase tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-10 text-muted-foreground hero-animate">
            <div className="flex items-center gap-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-14 h-14 rounded-full object-cover border-4 border-accent/20"
              />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-foreground">
                  {post.author.name}
                </p>
                <p className="text-[10px] font-medium text-accent uppercase tracking-widest">
                  {post.author.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 font-bold text-[10px] uppercase tracking-widest">
              <Calendar size={14} className="text-accent" />
              <span>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center gap-3 font-bold text-[10px] uppercase tracking-widest">
              <Clock size={14} className="text-accent" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <article className="section-padding bg-background w-full">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div
                ref={contentRef}
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: fullContent }}
              />

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-accent/10 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Sharing */}
              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide flex items-center gap-2">
                  <Share2 size={16} />
                  Share this article
                </h3>
                <div className="flex flex-wrap gap-3">
                  <SocialShareButton
                    icon={<Facebook size={18} />}
                    label="Facebook"
                    onClick={() => handleShare("facebook")}
                    color="bg-[#1877F2] text-white hover:bg-[#1877F2]/90"
                  />
                  <SocialShareButton
                    icon={<Twitter size={18} />}
                    label="Twitter"
                    onClick={() => handleShare("twitter")}
                    color="bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90"
                  />
                  <SocialShareButton
                    icon={<Linkedin size={18} />}
                    label="LinkedIn"
                    onClick={() => handleShare("linkedin")}
                    color="bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90"
                  />
                  <SocialShareButton
                    icon={<Link2 size={18} />}
                    label="Copy Link"
                    onClick={() => handleShare("copy")}
                    color="bg-secondary text-secondary-foreground hover:bg-accent/20"
                  />
                </div>
              </div>

              {/* Author Card */}
              <div className="mt-16 p-10 bg-secondary/50 rounded-3xl border border-border/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full transition-transform duration-700 group-hover:scale-150" />
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 relative z-10">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl"
                  />
                  <div className="text-center sm:text-left">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-2">
                      Written by
                    </p>
                    <h3 className="text-2xl font-display font-bold uppercase tracking-tight mb-3">
                      {post.author.name}
                    </h3>
                    <p className="text-muted-foreground font-medium text-lg leading-relaxed">
                      A passionate travel writer dedicated to uncovering hidden
                      gems and sharing authentic experiences with fellow
                      explorers around the world.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                {/* Back to Blog */}
                <Link
                  to="/blog"
                  className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors group"
                >
                  <ArrowLeft
                    size={18}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                  Back to all articles
                </Link>

                {/* Newsletter CTA */}
                <div className="p-10 bg-primary text-primary-foreground rounded-3xl shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-accent/10 translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-display font-bold uppercase tracking-tight mb-4">
                      Get Travel Tips
                    </h3>
                    <p className="text-primary-foreground/70 text-sm mb-8 font-medium leading-relaxed">
                      Subscribe to our newsletter for weekly travel inspiration
                      and exclusive offers.
                    </p>
                    <div className="space-y-4">
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full px-6 py-4 rounded-2xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent font-bold text-xs"
                      />
                      <button className="w-full btn-hero text-[10px] font-bold py-4 tracking-widest justify-center">
                        SUBSCRIBE
                      </button>
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div className="p-6 bg-card rounded-2xl border border-border">
                  <h3 className="text-lg font-display font-semibold mb-4">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {[
                      "Destinations",
                      "Tips",
                      "Stories",
                      "Adventure",
                      "Culture",
                    ].map((category) => (
                      <button
                        key={category}
                        className="block w-full text-left px-4 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-secondary/30 w-full">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-16">
              <div>
                <span className="badge-accent mb-4 inline-block font-bold px-4 py-1.5 text-[10px] uppercase tracking-widest border border-accent/20">
                  KEEP READING
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight">
                  Related Articles
                </h2>
              </div>
              <Link
                to="/blog"
                className="hidden sm:flex items-center gap-3 text-accent hover:text-accent/80 transition-all font-bold text-[10px] uppercase tracking-[0.2em]"
              >
                VIEW ALL
                <ChevronRight size={18} className="translate-y-[-1px]" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
};

export default BlogDetails;
