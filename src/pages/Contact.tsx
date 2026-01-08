import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import MainLayout from '@/layouts/MainLayout';
import VideoHero from '@/components/VideoHero';
import heroDestinationsImage from '@/assets/hero-destinations.jpg';
import heroDestinationsVideo from '@/assets/hero-destinations-video.mp4';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted && successRef.current) {
      gsap.fromTo(
        successRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
      );
      gsap.fromTo(
        successRef.current.querySelector('.success-icon'),
        { rotate: -180, scale: 0 },
        { rotate: 0, scale: 1, duration: 0.6, delay: 0.2, ease: 'back.out(2)' }
      );
    }
  }, [submitted]);

  return (
    <MainLayout>
      <VideoHero
        title="Contact Us"
        badge="Get in Touch"
        description="Let's start planning your dream adventure together."
        imageSrc={heroDestinationsImage}
        videoSrc={heroDestinationsVideo}
        height="small"
      />

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-headline mb-6">Let's Plan Your Dream Trip</h2>
              <p className="text-muted-foreground mb-8">Have questions or ready to start planning? Our travel experts are here to help craft your perfect journey.</p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                    <MapPin className="text-accent group-hover:text-accent-foreground transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Visit Us</h4>
                    <p className="text-muted-foreground">123 Travel Street, New York, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                    <Phone className="text-accent group-hover:text-accent-foreground transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Call Us</h4>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                    <Mail className="text-accent group-hover:text-accent-foreground transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email Us</h4>
                    <p className="text-muted-foreground">hello@wanderlust.travel</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-lg">
              {submitted ? (
                <div ref={successRef} className="text-center py-12">
                  <CheckCircle className="success-icon w-16 h-16 text-tertiary mx-auto mb-4" />
                  <h3 className="text-2xl font-display font-medium mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <label 
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                        focusedField === 'name' || form.name
                          ? '-top-2 text-xs text-accent bg-card px-2'
                          : 'top-3 text-muted-foreground'
                      }`}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all"
                    />
                  </div>
                  <div className="relative">
                    <label 
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                        focusedField === 'email' || form.email
                          ? '-top-2 text-xs text-accent bg-card px-2'
                          : 'top-3 text-muted-foreground'
                      }`}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all"
                    />
                  </div>
                  <div className="relative">
                    <label 
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                        focusedField === 'subject' || form.subject
                          ? '-top-2 text-xs text-accent bg-card px-2'
                          : 'top-3 text-muted-foreground'
                      }`}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all"
                    />
                  </div>
                  <div className="relative">
                    <label 
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                        focusedField === 'message' || form.message
                          ? '-top-2 text-xs text-accent bg-card px-2'
                          : 'top-3 text-muted-foreground'
                      }`}
                    >
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none resize-none transition-all"
                    />
                  </div>
                  <button type="submit" className="btn-hero w-full justify-center group">
                    Send Message 
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Contact;
