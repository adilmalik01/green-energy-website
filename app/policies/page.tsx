'use client';

import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Banner from '@/components/Banner';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Policies() {
  return (
    <main>
      {/* Hero Section */}
      <Banner title='Policies & Terms' description='Learn about our policies, warranties, and terms of service.' imageUrl='/banners/banner3.png' />

      {/* Policies Section */}
      <section className="section-padding bg-background">
        <div className="container-wide max-w-4xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            <Tabs defaultValue="privacy" className="w-full bg-white">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
                <TabsTrigger
                  value="privacy"
                  className="data-[state=active]:bg-[#71AB26] 
             data-[state=active]:text-white 
             data-[state=active]:shadow-md
             transition-all duration-300"
                >
                  Privacy
                </TabsTrigger>

                <TabsTrigger
                  value="terms"
                  className="data-[state=active]:bg-[#71AB26] 
             data-[state=active]:text-white 
             data-[state=active]:shadow-md
             transition-all duration-300"
                >
                  Terms
                </TabsTrigger>


                <TabsTrigger
                  value="warranty"
                  className="data-[state=active]:bg-[#71AB26] 
             data-[state=active]:text-white 
             data-[state=active]:shadow-md
             transition-all duration-300"
                >
                  Warranty
                </TabsTrigger>
                <TabsTrigger
                  value="delivery"
                  className="data-[state=active]:bg-[#71AB26] 
             data-[state=active]:text-white 
             data-[state=active]:shadow-md
             transition-all duration-300"
                >
                  Delivery
                </TabsTrigger>
              </TabsList>

              {/* Privacy Policy */}
              <TabsContent value="privacy" className="space-y-6">
                <motion.div variants={fadeInUp} className="space-y-4">
                  <h2 className="heading-md text-foreground">Privacy Policy</h2>
                  <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
                    <section className="space-y-3">
                      <h3 className="font-semibold text-foreground text-lg">1. Information We Collect</h3>
                      <p>
                        We collect information you provide directly to us, such as when you fill out a contact form or make a purchase. This may include your name, email address, phone number, and address.
                      </p>
                    </section>

                    <section className="space-y-3">
                      <h3 className="font-semibold text-foreground text-lg">2. How We Use Your Information</h3>
                      <p>
                        We use the information we collect to:
                      </p>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Respond to your inquiries and provide customer support</li>
                        <li>Process transactions and send related information</li>
                        <li>Send marketing communications (with your consent)</li>
                        <li>Improve our website and services</li>
                      </ul>
                    </section>

                    <section className="space-y-3">
                      <h3 className="font-semibold text-foreground text-lg">3. Data Security</h3>
                      <p>
                        We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                      </p>
                    </section>

                    <section className="space-y-3">
                      <h3 className="font-semibold text-foreground text-lg">4. Third-Party Sharing</h3>
                      <p>
                        We do not sell, trade, or rent your personal information to third parties. We may share information with service providers who assist us in operating our website and conducting business.
                      </p>
                    </section>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Terms & Conditions */}
              <TabsContent value="terms" className="space-y-6">
                <motion.div variants={fadeInUp} className="space-y-4">
                  <h2 className="heading-md text-foreground">Terms & Conditions</h2>
                  <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
                    <section className="space-y-3">
                      <h3 className="font-semibold text-foreground text-lg">1. Acceptance of Terms</h3>
                      <p>
                        By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                      </p>
                    </section>

                    <section className="space-y-3">
                      <h3 className="font-semibold text-foreground text-lg">2. Use License</h3>
                      <p>
                        Permission is granted to temporarily download one copy of the materials (information or software) on Green Energy Pakistan's website for personal, non-commercial transitory viewing only.
                      </p>
                    </section>

                    <section className="space-y-3">
                      <h3 className="font-semibold text-foreground text-lg">3. Disclaimer</h3>
                      <p>
                        The materials on Green Energy Pakistan's website are provided on an 'as is' basis. Green Energy Pakistan makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                      </p>
                    </section>

                    <section className="space-y-3">
                      <h3 className="font-semibold text-foreground text-lg">4. Limitations</h3>
                      <p>
                        In no event shall Green Energy Pakistan or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Green Energy Pakistan's website.
                      </p>
                    </section>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Warranty Policy */}
              <TabsContent value="warranty" className="space-y-6">
                <motion.div variants={fadeInUp} className="space-y-4">
                  <h2 className="heading-md text-foreground">Warranty Policy</h2>
                  <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
                    <section className="space-y-3">
                      <h3 className="font-semibold text-foreground text-lg">1. Solar Panel Warranty</h3>
                      <p>
                        All solar panels come with a 25-year performance warranty guaranteeing at least 80% of rated capacity. This covers manufacturing defects and degradation beyond normal rates.
                      </p>
                    </section>

                    <section className="space-y-3">
                      <h3 className="font-semibold text-foreground text-lg">2. Inverter Warranty</h3>
                      <p>
                        All inverters come with a 10-year comprehensive warranty covering all components and workmanship. Extended warranties of up to 15 years are available at additional cost.
                      </p>
                    </section>

                    <section className="space-y-3">
                      <h3 className="font-semibold text-foreground text-lg">3. Battery Warranty</h3>
                      <p>
                        All battery systems come with a 10-year warranty covering defects in materials and workmanship. Battery degradation beyond 20% will be replaced at no cost.
                      </p>
                    </section>

                    <section className="space-y-3">
                      <h3 className="font-semibold text-foreground text-lg">4. Installation Warranty</h3>
                      <p>
                        All installation work is covered by a 5-year warranty. If any defects arise from our installation, we will repair or replace the affected components at no cost.
                      </p>
                    </section>

                    <section className="space-y-3">
                      <h3 className="font-semibold text-foreground text-lg">5. What's Not Covered</h3>
                      <p>
                        Warranties do not cover damage due to misuse, accidents, natural disasters, unauthorized repairs, or normal wear and tear.
                      </p>
                    </section>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Delivery Policy */}
              <TabsContent value="delivery" className="space-y-6">
                <motion.div variants={fadeInUp} className="space-y-4">
                  <h2 className="heading-md text-foreground">Delivery & Shipping Policy</h2>
                  <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
                    <section className="space-y-3">
                      <h3 className="font-semibold text-foreground text-lg">1. Delivery Timeline</h3>
                      <p>
                        Standard delivery within Karachi is 3-5 business days. Other cities may take 7-10 business days depending on location. Installation can typically be scheduled within 2 weeks of delivery.
                      </p>
                    </section>

                    <section className="space-y-3">
                      <h3 className="font-semibold text-foreground text-lg">2. Shipping Costs</h3>
                      <p>
                        Shipping is free for orders over Rs. 500,000. For smaller orders, shipping costs will be calculated based on location and weight.
                      </p>
                    </section>

                    <section className="space-y-3">
                      <h3 className="font-semibold text-foreground text-lg">3. Delivery Process</h3>
                      <p>
                        Products will be delivered by our trained professionals who will verify the condition of goods upon delivery. You will receive a tracking number via SMS/email to monitor your shipment.
                      </p>
                    </section>

                    <section className="space-y-3">
                      <h3 className="font-semibold text-foreground text-lg">4. Damage Claims</h3>
                      <p>
                        If any products arrive damaged, please report it within 24 hours of delivery with photos. We will arrange replacement or refund accordingly.
                      </p>
                    </section>

                    <section className="space-y-3">
                      <h3 className="font-semibold text-foreground text-lg">5. Installation Service</h3>
                      <p>
                        We provide professional installation services. Installation charges vary based on system size and complexity. Our installation team will survey your property to provide accurate quotes.
                      </p>
                    </section>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
