import { dbConnect } from "@/lib/db";
import product from "@/models/product";
import series from "@/models/series";

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
  // REX Series
  {
    name: 'REX 400W Solar Panel',
    slug: 'rex-400w-panel',
    seriesName: 'REX Series',
    description: 'Premium 400W monocrystalline solar panel with high efficiency',
    features: ['400W output', '22% efficiency', 'Monocrystalline cells', '25-year warranty'],
    specifications: { power: '400W', efficiency: '22%', warranty: '25 years', weight: '22.5 kg', dimensions: '1956 x 992 mm' },
    deliveryInfo: 'Available for immediate shipping',
    warrantyInfo: '25-year performance warranty',
    thumbnailImage: 'https://images.unsplash.com/photo-1509391366360-2e938b991055?w=500&h=500&fit=crop',
  },
  {
    name: 'REX 500W Solar Panel',
    slug: 'rex-500w-panel',
    seriesName: 'REX Series',
    description: 'Ultra-high capacity 500W solar panel for maximum energy generation',
    features: ['500W output', '23% efficiency', 'Bifacial technology', '25-year warranty'],
    specifications: { power: '500W', efficiency: '23%', warranty: '25 years', weight: '24 kg', dimensions: '2094 x 1038 mm' },
    deliveryInfo: 'Available for immediate shipping',
    warrantyInfo: '25-year performance warranty',
    thumbnailImage: 'https://images.unsplash.com/photo-1607381505304-bd8e391bdc36?w=500&h=500&fit=crop',
  },
  {
    name: 'REX Mounting Kit',
    slug: 'rex-mounting-kit',
    seriesName: 'REX Series',
    description: 'Complete mounting system for REX series solar panels',
    features: ['Aluminum frame', 'Adjustable angle', 'Weather-resistant', 'Easy installation'],
    specifications: { power: 'N/A', efficiency: 'N/A', warranty: '10 years', weight: '15 kg', dimensions: 'Variable' },
    deliveryInfo: 'Ships with documentation',
    warrantyInfo: '10-year manufacturer warranty',
    thumbnailImage: 'https://images.unsplash.com/photo-1613665813671-333d8b78eb66?w=500&h=500&fit=crop',
  },
  // Titan Series
  {
    name: 'Titan 600W Industrial Panel',
    slug: 'titan-600w-panel',
    seriesName: 'Titan Series',
    description: 'Heavy-duty commercial solar panel designed for industrial installations',
    features: ['600W output', '24% efficiency', 'Industrial-grade', '30-year warranty'],
    specifications: { power: '600W', efficiency: '24%', warranty: '30 years', weight: '28 kg', dimensions: '2256 x 1130 mm' },
    deliveryInfo: 'Bulk pricing available',
    warrantyInfo: '30-year performance warranty',
    thumbnailImage: 'https://images.unsplash.com/photo-1620938495516-38599d958fbb?w=500&h=500&fit=crop',
  },
  {
    name: 'Titan 800W Industrial Panel',
    slug: 'titan-800w-panel',
    seriesName: 'Titan Series',
    description: 'Maximum capacity industrial solar panel for large-scale energy generation',
    features: ['800W output', '25% efficiency', 'Premium monocrystalline', '30-year warranty'],
    specifications: { power: '800W', efficiency: '25%', warranty: '30 years', weight: '32 kg', dimensions: '2384 x 1303 mm' },
    deliveryInfo: 'Custom logistics available',
    warrantyInfo: '30-year comprehensive warranty',
    thumbnailImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop',
  },
  {
    name: 'Titan Professional Array',
    slug: 'titan-professional-array',
    seriesName: 'Titan Series',
    description: 'Complete solar array system for commercial buildings and factories',
    features: ['Modular design', 'Up to 100kW', 'Smart monitoring', 'Grid-tied'],
    specifications: { power: 'Up to 100kW', efficiency: '24-25%', warranty: '30 years', weight: 'Custom', dimensions: 'Custom' },
    deliveryInfo: 'Professional installation included',
    warrantyInfo: '30-year comprehensive warranty',
    thumbnailImage: 'https://images.unsplash.com/photo-1508566354713-11d1d8ff89b3?w=500&h=500&fit=crop',
  },
  // VoltMax Series
  {
    name: 'VoltMax 5kW Inverter',
    slug: 'voltmax-5kw-inverter',
    seriesName: 'VoltMax Series',
    description: 'Smart 5kW inverter with real-time monitoring and WiFi connectivity',
    features: ['5kW power', 'Pure sine wave', 'WiFi monitoring', 'Dual MPPT'],
    specifications: { power: '5kW', efficiency: '98%', warranty: '10 years', weight: '20 kg', dimensions: '600 x 400 mm' },
    deliveryInfo: 'Ready to ship',
    warrantyInfo: '10-year manufacturer warranty',
    thumbnailImage: 'https://images.unsplash.com/photo-1626844601130-91ee809c33c7?w=500&h=500&fit=crop',
  },
  {
    name: 'VoltMax 10kW Inverter',
    slug: 'voltmax-10kw-inverter',
    seriesName: 'VoltMax Series',
    description: 'High-capacity 10kW inverter for large residential and commercial systems',
    features: ['10kW power', 'Pure sine wave', 'Advanced monitoring', 'Triple MPPT'],
    specifications: { power: '10kW', efficiency: '98.5%', warranty: '10 years', weight: '35 kg', dimensions: '700 x 500 mm' },
    deliveryInfo: 'Premium installation service',
    warrantyInfo: '10-year comprehensive warranty',
    thumbnailImage: 'https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=500&h=500&fit=crop',
  },
  {
    name: 'VoltMax Smart Controller',
    slug: 'voltmax-smart-controller',
    seriesName: 'VoltMax Series',
    description: 'Intelligent energy management controller for complete system optimization',
    features: ['Load management', 'Cloud connectivity', 'Predictive analytics', 'Mobile app'],
    specifications: { power: 'N/A', efficiency: '99%', warranty: '5 years', weight: '3 kg', dimensions: '300 x 200 mm' },
    deliveryInfo: 'Ships with all cables',
    warrantyInfo: '5-year hardware warranty',
    thumbnailImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop',
  },
  // PowerX Series
  {
    name: 'PowerX 10kWh Battery System',
    slug: 'powerx-10kwh-battery',
    seriesName: 'PowerX Series',
    description: 'Lithium-ion battery storage system with 10kWh capacity',
    features: ['10kWh capacity', 'LiFePO4 chemistry', 'Built-in BMS', '20-year lifespan'],
    specifications: { power: '5kW continuous', efficiency: '95%', warranty: '10 years', weight: '150 kg', dimensions: '2000 x 1000 mm' },
    deliveryInfo: 'Professional installation',
    warrantyInfo: '10-year battery warranty',
    thumbnailImage: 'https://images.unsplash.com/photo-1581092162562-40038f66deb5?w=500&h=500&fit=crop',
  },
  {
    name: 'PowerX 20kWh Battery System',
    slug: 'powerx-20kwh-battery',
    seriesName: 'PowerX Series',
    description: 'Heavy-duty 20kWh lithium battery system for energy independence',
    features: ['20kWh capacity', 'LiFePO4 chemistry', 'Modular scalability', 'Fast charging'],
    specifications: { power: '10kW continuous', efficiency: '96%', warranty: '10 years', weight: '300 kg', dimensions: '4000 x 1000 mm' },
    deliveryInfo: 'Team installation included',
    warrantyInfo: '10-year comprehensive warranty',
    thumbnailImage: 'https://images.unsplash.com/photo-1619983081563-430f63602796?w=500&h=500&fit=crop',
  },
  {
    name: 'PowerX Battery Management System',
    slug: 'powerx-bms',
    seriesName: 'PowerX Series',
    description: 'Advanced management system for battery monitoring and optimization',
    features: ['Cell monitoring', 'Temperature management', 'Load balancing', 'Cloud integration'],
    specifications: { power: 'N/A', efficiency: '99%', warranty: '5 years', weight: '5 kg', dimensions: '400 x 300 mm' },
    deliveryInfo: 'Included with systems',
    warrantyInfo: '5-year warranty',
    thumbnailImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
  },
];

export async function POST(req: Request) {
  try {
    // Verify authorization header or secret
    // const authHeader = req.headers.get('authorization');
    // const expectedSecret = process.env.NEXTAUTH_SECRET;

    // if (!authHeader?.includes(expectedSecret || 'seed-key')) {
    //   return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    // }

    await dbConnect();

    // Insert series
    const createdSeries = await series.insertMany(seriesData);

    // Map
    const seriesMap: Record<string, string> = {};
    createdSeries.forEach((s: any) => {
      seriesMap[s.name] = s._id.toString();
    });

    // Prepare products
    const productsWithSeriesId = productsData.map((item: any) => {
      const { seriesName, ...rest } = item;
      return {
        ...rest,
        series: seriesMap[seriesName],
      };
    });

    // Insert products
    const createdProducts = await product.insertMany(productsWithSeriesId);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Seed data created successfully',
        series: createdSeries.length,
        products: createdProducts.length,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Seed error:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to seed data',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500 }
    );
  }
}
