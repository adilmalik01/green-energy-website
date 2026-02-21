'use client';

import Banner from '@/components/Banner';
import { motion } from 'framer-motion';
import { Award, Globe, Leaf, Users } from 'lucide-react';

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

export default function About() {
  return (
    <main>
      {/* Hero Section */}
      <Banner title='About Green Energy Pakistan' description='Leading the solar revolution in Pakistan with premium products, expert service, and a commitment to sustainability.' imageUrl='/banners/banner2.png' />

      {/* Company Story */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            <motion.div variants={fadeInUp} className="space-y-6">
              <h2 className="heading-lg text-foreground">Our Story</h2>
              <div className="space-y-4 text-muted-foreground body-base">
                <p>
                  Founded in 2009, Green Energy Pakistan began with a simple vision: to make clean, renewable energy accessible to every Pakistani home and business.
                </p>
                <p>
                  What started as a small team of solar enthusiasts has grown into a comprehensive renewable energy solutions provider, serving over 5,000 satisfied customers across Pakistan.
                </p>
                <p>
                  Today, we continue to innovate and expand our product range, ensuring that the latest in solar technology is available to those looking to reduce their energy costs and environmental footprint.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { value: '15+', label: 'Years in Business' },
                { value: '5000+', label: 'Happy Customers' },
                { value: '10MW+', label: 'Capacity Installed' },
                { value: '100%', label: 'Customer Satisfaction' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="card-elevated p-8 rounded-lg text-center space-y-2"
                >
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-background/50">
        <div className="container-wide">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <motion.div
              variants={fadeInUp}
              className="card-elevated p-8 lg:p-12 rounded-lg space-y-4"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Globe className="text-primary" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
              <p className="text-muted-foreground body-base">
                To provide affordable, reliable, and sustainable solar energy solutions that empower Pakistanis to take control of their energy future while reducing environmental impact.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="card-elevated p-8 lg:p-12 rounded-lg space-y-4"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Leaf className="text-primary" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Our Vision</h3>
              <p className="text-muted-foreground body-base">
                A Pakistan powered by clean, renewable energy where every household and business has access to reliable solar solutions, contributing to a sustainable and prosperous future.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-12"
          >
            <motion.div
              variants={fadeInUp}
              className="text-center max-w-2xl mx-auto space-y-4"
            >
              <h2 className="heading-lg text-foreground">Our Core Values</h2>
              <p className="body-base text-muted-foreground">
                These principles guide every decision we make.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {[
                {
                  icon: Award,
                  title: 'Quality',
                  desc: 'Premium products and services',
                },
                {
                  icon: Users,
                  title: 'Customer First',
                  desc: 'Your satisfaction is our priority',
                },
                {
                  icon: Leaf,
                  title: 'Sustainability',
                  desc: 'Protecting our planet',
                },
                {
                  icon: Globe,
                  title: 'Innovation',
                  desc: 'Latest solar technology',
                },
              ].map((value, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="card-elevated p-6 rounded-lg text-center space-y-3"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <value.icon className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold text-foreground">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-background/50">
        <div className="container-wide">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-12"
          >
            <motion.div
              variants={fadeInUp}
              className="text-center max-w-2xl mx-auto space-y-4"
            >
              <h2 className="heading-lg text-foreground">Our Team</h2>
              <p className="body-base text-muted-foreground">
                Experienced professionals committed to excellence in solar energy.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  name: 'Ahmed Hassan',
                  role: 'Founder & CEO',
                  expertise: 'Solar Industry Veteran',
                },
                {
                  name: 'Fatima Khan',
                  role: 'Technical Director',
                  expertise: 'Solar Engineering Expert',
                },
                {
                  name: 'Khalid Ahmed',
                  role: 'Customer Success Lead',
                  expertise: 'Customer Relations',
                },
              ].map((member, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="card-elevated p-6 rounded-lg text-center space-y-3"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto" />
                  <h3 className="font-semibold text-lg text-foreground">{member.name}</h3>
                  <p className="text-primary font-medium text-sm">{member.role}</p>
                  <p className="text-xs text-muted-foreground">{member.expertise}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
