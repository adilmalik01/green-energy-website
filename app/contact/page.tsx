'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { LoadingSpinner } from '@/components/loading-spinner';
import Banner from '@/components/Banner';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <Banner title='Get in Touch' description="Have questions about our solar solutions? We\'re here to help. Contact us today for a free consultation." imageUrl='/banners/banner2.png' />

      {/* Contact Section */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          >
            {/* Contact Info */}
            <motion.div variants={fadeInUp} className="space-y-6">
              <h2 className="heading-md text-foreground">Contact Information</h2>

              <div className="space-y-4">
                <div className="card-elevated p-6 rounded-lg space-y-3">
                  <div className="flex items-start gap-3">
                    <Phone className="text-primary mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-semibold text-foreground">Phone</h3>
                      <a
                        href="tel:+923001234567"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        +92 300 123 4567
                      </a>
                    </div>
                  </div>
                </div>

                <div className="card-elevated p-6 rounded-lg space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail className="text-primary mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <a
                        href="mailto:info@greenenergy.pk"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        info@greenenergy.pk
                      </a>
                    </div>
                  </div>
                </div>

                <div className="card-elevated p-6 rounded-lg space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-semibold text-foreground">Address</h3>
                      <p className="text-muted-foreground">
                        123 Solar Street<br />
                        Karachi, Pakistan
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card-elevated p-6 rounded-lg space-y-3">
                  <div className="flex items-start gap-3">
                    <Clock className="text-primary mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-semibold text-foreground">Business Hours</h3>
                      <p className="text-muted-foreground">
                        Mon - Sat: 9:00 AM - 6:00 PM<br />
                        Sunday: 10:00 AM - 4:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={fadeInUp}
              className="lg:col-span-2 card-elevated p-8 rounded-lg"
            >
              <h2 className="heading-md text-foreground mb-6">Send us a Message</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-primary/10 text-primary p-6 rounded-lg text-center space-y-2"
                >
                  <p className="font-semibold">Thank you for reaching out!</p>
                  <p className="text-sm">We'll get back to you as soon as possible.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Name</label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Phone</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+92 300 123 4567"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Message</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your solar needs..."
                      rows={6}
                      required
                      disabled={loading}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-background/50">
        <div className="container-wide">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <h2 className="heading-md text-foreground mb-4">Visit Our Office</h2>
              <p className="text-muted-foreground body-base">
                Located in the heart of Karachi, we welcome walk-ins during business hours.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="w-full h-96 bg-muted rounded-lg overflow-hidden"
            >
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.746572700847!2d67.2441!3d24.8607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e0b0b0b0b0b%3A0x0!2sKarachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1234567890"
                allowFullScreen={true}
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
