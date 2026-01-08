import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User } from "lucide-react";
import gsap from "gsap";
import { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  variant?: "default" | "featured" | "compact";
}

const BlogCard: React.FC<BlogCardProps> = ({
  post,
  index = 0,
  variant = "default",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.to(card.querySelector(".card-image"), {
        scale: 1.08,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card.querySelector(".card-image"), {
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (variant === "featured") {
    return (
      <Link to={`/blog/${post.slug}`}>
        <div
          ref={cardRef}
          className="group relative h-[500px] rounded-3xl overflow-hidden"
        >
          <img
            src={post.image}
            alt={post.title}
            className="card-image absolute inset-0 w-full h-full object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className="badge-accent mb-4 inline-block font-bold px-4 py-1.5 text-[10px] uppercase tracking-widest border border-accent/20">
              {post.category}
            </span>
            <h3 className="text-3xl font-display font-medium text-primary-foreground mb-4">
              {post.title}
            </h3>
            <p className="text-primary-foreground/80 mb-4 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-primary-foreground font-medium">
                    {post.author.name}
                  </p>
                  <p className="text-primary-foreground/60 text-sm">
                    {formatDate(post.publishedAt)}
                  </p>
                </div>
              </div>
              <span className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                Read More <ArrowRight size={18} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/blog/${post.slug}`}>
      <div
        ref={cardRef}
        className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="card-image w-full h-full object-cover transition-transform duration-700"
          />
          <div className="absolute top-4 left-4">
            <span className="badge-accent font-bold px-4 py-1.5 text-[10px] uppercase tracking-widest bg-primary-foreground/90 backdrop-blur-sm border border-primary/10">
              {post.category}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {formatDate(post.publishedAt)}
            </span>
            <span>{post.readTime} min read</span>
          </div>

          <h3 className="text-lg font-display font-medium text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium">{post.author.name}</span>
            </div>
            <ArrowRight
              size={18}
              className="text-accent group-hover:translate-x-1 transition-transform"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
