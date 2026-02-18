const mongoose = require('mongoose');

// MongoDB Connection String - update this
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/green-energy';

// Series Model
const seriesSchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
});

// Product Model
const productSchema = new mongoose.Schema({
  name: String,
  slug: String,
  series: { type: mongoose.Schema.Types.ObjectId, ref: 'Series' },
  seriesName: String,
  description: String,
  features: [String],
  specifications: {
    power: String,
    efficiency: String,
    warranty: String,
    weight: String,
    dimensions: String,
  },
  deliveryInfo: String,
  warrantyInfo: String,
  thumbnailImage: String,
  createdAt: { type: Date, default: Date.now },
});

const Series = mongoose.model('Series', seriesSchema);
const Product = mongoose.model('Product', productSchema);

// Dummy Data
const seriesData = [
  {
    name: 'REX Series',
    slug: 'rex-series',
    description: 'High-performance solar panels with premium efficiency for residential use',
  },
  {
    name: 'Titan Series',
    slug: 'titan-series',
    description: 'Industrial-grade solar solutions for commercial applications',
  },
  {
    name: 'VoltMax Series',
    slug: 'voltmax-series',
    description: 'Advanced inverters with smart monitoring and grid integration',
  },
  {
    name: 'PowerX Series',
    slug: 'powerx-series',
    description: 'Complete energy storage and battery management systems',
  },
];

const productsData = [
  // REX Series Products
  {
    name: 'REX 400W Solar Panel',
    slug: 'rex-400w-panel',
    seriesName: 'REX Series',
    description: 'Premium 400W monocrystalline solar panel with high efficiency and durability',
    features: [
      '400W output power',
      '22% efficiency rating',
      'Monocrystalline cells',
      '25-year performance warranty',
      'Weather resistant frame',
      'Anti-reflective glass coating',
    ],
    specifications: {
      power: '400W',
      efficiency: '22%',
      warranty: '25 years',
      weight: '22.5 kg',
      dimensions: '1956 x 992 x 40 mm',
    },
    deliveryInfo: 'Available for immediate shipping across Pakistan. Standard delivery: 3-5 business days.',
    warrantyInfo: '25-year performance warranty and 10-year material warranty included.',
    thumbnailImage: 'https://images.unsplash.com/photo-1509391366360-2e938b991055?w=500&h=500&fit=crop',
  },
  {
    name: 'REX 500W Solar Panel',
    slug: 'rex-500w-panel',
    seriesName: 'REX Series',
    description: 'Ultra-high capacity 500W solar panel for maximum energy generation',
    features: [
      '500W output power',
      '23% efficiency rating',
      'Monocrystalline cells',
      '25-year performance warranty',
      'Bifacial technology',
      'Enhanced temperature coefficient',
    ],
    specifications: {
      power: '500W',
      efficiency: '23%',
      warranty: '25 years',
      weight: '24 kg',
      dimensions: '2094 x 1038 x 40 mm',
    },
    deliveryInfo: 'Available for immediate shipping across Pakistan. Standard delivery: 3-5 business days.',
    warrantyInfo: '25-year performance warranty and 10-year material warranty included.',
    thumbnailImage: 'https://images.unsplash.com/photo-1607381505304-bd8e391bdc36?w=500&h=500&fit=crop',
  },
  {
    name: 'REX Mounting Kit',
    slug: 'rex-mounting-kit',
    seriesName: 'REX Series',
    description: 'Complete mounting system for REX series solar panels',
    features: [
      'Aluminum frame construction',
      'Adjustable angle mounting',
      'Weather-resistant coating',
      'Easy installation',
      'Hardware included',
      'Compatible with all REX panels',
    ],
    specifications: {
      power: 'N/A',
      efficiency: 'N/A',
      warranty: '10 years',
      weight: '15 kg',
      dimensions: 'Variable',
    },
    deliveryInfo: 'Available for immediate shipping. Includes full installation guide.',
    warrantyInfo: '10-year manufacturer warranty on all materials and hardware.',
    thumbnailImage: 'https://images.unsplash.com/photo-1613665813671-333d8b78eb66?w=500&h=500&fit=crop',
  },

  // Titan Series Products
  {
    name: 'Titan 600W Industrial Panel',
    slug: 'titan-600w-panel',
    seriesName: 'Titan Series',
    description: 'Heavy-duty commercial solar panel designed for industrial installations',
    features: [
      '600W output power',
      '24% efficiency rating',
      'Monocrystalline cells',
      'Industrial-grade frame',
      '30-year warranty',
      'Extreme weather resistant',
    ],
    specifications: {
      power: '600W',
      efficiency: '24%',
      warranty: '30 years',
      weight: '28 kg',
      dimensions: '2256 x 1130 x 45 mm',
    },
    deliveryInfo: 'Commercial bulk pricing available. Custom shipment schedules for large orders.',
    warrantyInfo: '30-year performance warranty and 15-year material warranty for commercial use.',
    thumbnailImage: 'https://images.unsplash.com/photo-1620938495516-38599d958fbb?w=500&h=500&fit=crop',
  },
  {
    name: 'Titan 800W Industrial Panel',
    slug: 'titan-800w-panel',
    seriesName: 'Titan Series',
    description: 'Maximum capacity industrial solar panel for large-scale energy generation',
    features: [
      '800W output power',
      '25% efficiency rating',
      'Premium monocrystalline cells',
      'Heavy-duty construction',
      '30-year warranty',
      'Enterprise-level support',
    ],
    specifications: {
      power: '800W',
      efficiency: '25%',
      warranty: '30 years',
      weight: '32 kg',
      dimensions: '2384 x 1303 x 45 mm',
    },
    deliveryInfo: 'Custom logistics available. Dedicated account manager for bulk orders.',
    warrantyInfo: '30-year performance warranty and on-site support included.',
    thumbnailImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop',
  },
  {
    name: 'Titan Professional Array',
    slug: 'titan-professional-array',
    seriesName: 'Titan Series',
    description: 'Complete solar array system for commercial buildings and factories',
    features: [
      'Modular design',
      'Up to 100kW capacity',
      'Smart monitoring system',
      'Grid-tied connectivity',
      'SCADA integration',
      'O&M services included',
    ],
    specifications: {
      power: 'Up to 100kW',
      efficiency: '24-25%',
      warranty: '30 years',
      weight: 'Custom',
      dimensions: 'Custom installation',
    },
    deliveryInfo: 'Professional installation team included. Site assessment and design customization.',
    warrantyInfo: '30-year comprehensive warranty including maintenance and monitoring.',
    thumbnailImage: 'https://images.unsplash.com/photo-1508566354713-11d1d8ff89b3?w=500&h=500&fit=crop',
  },

  // VoltMax Series Products
  {
    name: 'VoltMax 5kW Inverter',
    slug: 'voltmax-5kw-inverter',
    seriesName: 'VoltMax Series',
    description: 'Smart 5kW inverter with real-time monitoring and WiFi connectivity',
    features: [
      '5kW continuous power',
      'Pure sine wave output',
      'WiFi monitoring app',
      'Automatic grid detection',
      'Dual MPPT trackers',
      'IP65 rated enclosure',
    ],
    specifications: {
      power: '5kW',
      efficiency: '98%',
      warranty: '10 years',
      weight: '20 kg',
      dimensions: '600 x 400 x 200 mm',
    },
    deliveryInfo: 'Ready to ship. Professional installation recommended.',
    warrantyInfo: '10-year manufacturer warranty plus free technical support.',
    thumbnailImage: 'https://images.unsplash.com/photo-1626844601130-91ee809c33c7?w=500&h=500&fit=crop',
  },
  {
    name: 'VoltMax 10kW Inverter',
    slug: 'voltmax-10kw-inverter',
    seriesName: 'VoltMax Series',
    description: 'High-capacity 10kW inverter for large residential and commercial systems',
    features: [
      '10kW continuous power',
      'Pure sine wave output',
      'Advanced monitoring dashboard',
      'WiFi and Ethernet',
      'Triple MPPT tracking',
      'Outdoor-rated design',
    ],
    specifications: {
      power: '10kW',
      efficiency: '98.5%',
      warranty: '10 years',
      weight: '35 kg',
      dimensions: '700 x 500 x 250 mm',
    },
    deliveryInfo: 'Premium installation service available. Free site survey included.',
    warrantyInfo: '10-year comprehensive warranty with priority support.',
    thumbnailImage: 'https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=500&h=500&fit=crop',
  },
  {
    name: 'VoltMax Smart Controller',
    slug: 'voltmax-smart-controller',
    seriesName: 'VoltMax Series',
    description: 'Intelligent energy management controller for complete system optimization',
    features: [
      'Real-time load management',
      'Cloud connectivity',
      'Predictive analytics',
      'Mobile app control',
      'Energy storage integration',
      'Multi-inverter support',
    ],
    specifications: {
      power: 'N/A',
      efficiency: '99%',
      warranty: '5 years',
      weight: '3 kg',
      dimensions: '300 x 200 x 100 mm',
    },
    deliveryInfo: 'Ships with all necessary cables and documentation.',
    warrantyInfo: '5-year hardware warranty plus lifetime software updates.',
    thumbnailImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop',
  },

  // PowerX Series Products
  {
    name: 'PowerX 10kWh Battery System',
    slug: 'powerx-10kwh-battery',
    seriesName: 'PowerX Series',
    description: 'Lithium-ion battery storage system with 10kWh capacity',
    features: [
      '10kWh usable capacity',
      'LiFePO4 chemistry',
      'Built-in BMS system',
      'Wall-mounted installation',
      '20-year lifespan',
      '95% round-trip efficiency',
    ],
    specifications: {
      power: '5kW continuous',
      efficiency: '95%',
      warranty: '10 years',
      weight: '150 kg',
      dimensions: '2000 x 1000 x 250 mm',
    },
    deliveryInfo: 'Professional installation required. Free site assessment included.',
    warrantyInfo: '10-year battery warranty and 5-year system warranty.',
    thumbnailImage: 'https://images.unsplash.com/photo-1581092162562-40038f66deb5?w=500&h=500&fit=crop',
  },
  {
    name: 'PowerX 20kWh Battery System',
    slug: 'powerx-20kwh-battery',
    seriesName: 'PowerX Series',
    description: 'Heavy-duty 20kWh lithium battery system for complete energy independence',
    features: [
      '20kWh usable capacity',
      'LiFePO4 chemistry',
      'Advanced BMS',
      'Modular scalability',
      '20-year lifespan',
      'Fast DC charging',
    ],
    specifications: {
      power: '10kW continuous',
      efficiency: '96%',
      warranty: '10 years',
      weight: '300 kg',
      dimensions: '4000 x 1000 x 250 mm',
    },
    deliveryInfo: 'Complex installation - our team handles everything. 2-3 day project.',
    warrantyInfo: '10-year battery warranty and comprehensive system support.',
    thumbnailImage: 'https://images.unsplash.com/photo-1619983081563-430f63602796?w=500&h=500&fit=crop',
  },
  {
    name: 'PowerX Battery Management System',
    slug: 'powerx-bms',
    seriesName: 'PowerX Series',
    description: 'Advanced management system for battery monitoring and optimization',
    features: [
      'Real-time cell monitoring',
      'Temperature management',
      'Automatic load balancing',
      'Cloud integration',
      'Predictive maintenance alerts',
      'Multiple battery support',
    ],
    specifications: {
      power: 'N/A',
      efficiency: '99%',
      warranty: '5 years',
      weight: '5 kg',
      dimensions: '400 x 300 x 150 mm',
    },
    deliveryInfo: 'Included with PowerX battery systems or available separately.',
    warrantyInfo: '5-year warranty on electronics and lifetime software support.',
    thumbnailImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
  },
];

async function seedData() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await Series.deleteMany({});
    await Product.deleteMany({});

    // Insert series
    console.log('Inserting series data...');
    const createdSeries = await Series.insertMany(seriesData);
    console.log(`Created ${createdSeries.length} series`);

    // Map series data for products
    const seriesMap = {};
    createdSeries.forEach((s) => {
      seriesMap[s.name] = s._id;
    });

    // Update products with series IDs
    const productsWithSeriesId = productsData.map((product) => ({
      ...product,
      series: seriesMap[product.seriesName],
    }));

    // Insert products
    console.log('Inserting product data...');
    const createdProducts = await Product.insertMany(productsWithSeriesId);
    console.log(`Created ${createdProducts.length} products`);

    console.log('Seed data successfully created!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedData();
