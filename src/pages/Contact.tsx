import React, { useState, useRef, useEffect } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react";
import gsap from "gsap";
import MainLayout from "@/layouts/MainLayout";
import VideoHero from "@/components/VideoHero";
import heroDestinationsImage from "@/assets/hero-destinations.jpg";
import heroDestinationsVideo from "@/assets/hero-destinations-video.mp4";

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
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
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
      gsap.fromTo(
        successRef.current.querySelector(".success-icon"),
        { rotate: -180, scale: 0 },
        { rotate: 0, scale: 1, duration: 0.6, delay: 0.2, ease: "back.out(2)" }
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

      <section className="section-padding bg-background w-full">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-24">
            <div>
              <span className="badge-accent mb-6 inline-block font-bold px-4 py-1.5 text-[10px] uppercase tracking-widest border border-accent/20">
                GET IN TOUCH
              </span>
              <h2 className="text-5xl md:text-6xl font-display font-bold mb-8 uppercase tracking-tight">
                Let's Plan Your Dream Trip
              </h2>
              <p className="text-muted-foreground mb-12 text-lg leading-relaxed">
                Have questions or ready to start planning? Our expert travel
                curators are here to help craft your perfect, unforgettable
                journey.
              </p>

              <div className="space-y-10">
                <div className="flex items-start gap-6 group">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500 shadow-lg border border-border/50">
                    <MapPin
                      className="text-accent group-hover:text-accent-foreground transition-colors duration-500"
                      size={24}
                    />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      Visit Our Studio
                    </h4>
                    <p className="font-bold text-lg">
                      123 Travel Street, New York, NY 10001
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500 shadow-lg border border-border/50">
                    <Phone
                      className="text-accent group-hover:text-accent-foreground transition-colors duration-500"
                      size={24}
                    />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      Call Us Directly
                    </h4>
                    <p className="font-bold text-lg">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500 shadow-lg border border-border/50">
                    <Mail
                      className="text-accent group-hover:text-accent-foreground transition-colors duration-500"
                      size={24}
                    />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      Send an Email
                    </h4>
                    <p className="font-bold text-lg">hello@wanderlust.travel</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-3xl p-10 md:p-12 shadow-2xl border border-border/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full transition-transform duration-700 group-hover:scale-150" />
              {submitted ? (
                <div ref={successRef} className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-tertiary/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="success-icon w-10 h-10 text-tertiary" />
                  </div>
                  <h3 className="text-3xl font-display font-bold uppercase tracking-tight mb-4">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground font-medium text-lg">
                    We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-10 text-[10px] font-bold uppercase tracking-widest text-accent hover:underline"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-8 relative z-10"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="relative">
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-3 text-muted-foreground">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="w-full px-6 py-4 rounded-2xl border border-border bg-background focus:ring-2 focus:ring-accent focus:outline-none transition-all font-bold text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-3 text-muted-foreground">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="w-full px-6 py-4 rounded-2xl border border-border bg-background focus:ring-2 focus:ring-accent focus:outline-none transition-all font-bold text-sm"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-3 text-muted-foreground">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                      className="w-full px-6 py-4 rounded-2xl border border-border bg-background focus:ring-2 focus:ring-accent focus:outline-none transition-all font-bold text-sm"
                      placeholder="Planning a luxury honeymoon"
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-3 text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className="w-full px-6 py-5 rounded-2xl border border-border bg-background focus:ring-2 focus:ring-accent focus:outline-none resize-none transition-all font-bold text-sm"
                      placeholder="Tell us about your dream trip..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-hero w-full justify-center py-6 text-[10px] font-bold tracking-[0.3em] uppercase"
                  >
                    SEND MESSAGE
                    <Send
                      size={18}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
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
