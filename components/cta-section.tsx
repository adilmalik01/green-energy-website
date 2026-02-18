{/* CTA Strip */}
      <section className="section-padding bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white">
        <div className="container-wide">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {[
              {
                emoji: '📞',
                label: 'Call Us Anytime',
                value: '+92 300 123 4567',
                action: 'tel:+923001234567',
                description: 'Mon-Sat: 9AM - 6PM',
              },
              {
                emoji: '💬',
                label: 'WhatsApp Chat',
                value: 'Quick Response',
                action: whatsappLink,
                description: 'Get instant quotes',
              },
              {
                emoji: '✉️',
                label: 'Email Us',
                value: 'info@greenenergy.pk',
                action: 'mailto:info@greenenergy.pk',
                description: 'We reply within 24hrs',
              },
            ].map((item, i) => (
              <motion.a
                key={i}
                variants={fadeInUp}
                href={item.action}
                target={item.action.startsWith('http') ? '_blank' : undefined}
                rel={item.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {/* Emoji Icon */}
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.emoji}
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">
                    {item.label}
                  </h3>
                  <p className="text-xl font-bold text-white/95">
                    {item.value}
                  </p>
                  <p className="text-sm text-white/70">
                    {item.description}
                  </p>
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-xl">→</span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>