import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import VideoHero from '@/components/VideoHero';
import BlogCard from '@/components/BlogCard';
import { blogPosts } from '@/data';
import heroBlogImage from '@/assets/hero-blog.jpg';

const Blog: React.FC = () => {
  return (
    <MainLayout>
      <VideoHero
        title="Travel Blog"
        badge="Stories"
        description="Inspiration, guides, and stories from around the world."
        imageSrc={heroBlogImage}
        height="medium"
      />

      <section className="section-padding bg-background">
        <div className="container-custom">
          {blogPosts.length > 0 && (
            <div className="mb-12">
              <BlogCard post={blogPosts[0]} variant="featured" />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Blog;
