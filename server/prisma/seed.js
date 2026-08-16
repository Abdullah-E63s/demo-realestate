require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const properties = [
  {
    title: '10 Marla Residential Plot — DHA Phase 6',
    slug: '10-marla-plot-dha-phase-6',
    type: 'Residential Plot',
    status: 'Available',
    price: 18500000,
    priceLabel: 'PKR 1.85 Crore',
    size: 10,
    sizeUnit: 'Marla',
    society: 'DHA Lahore',
    phase: 'Phase 6',
    location: 'Block E, DHA Phase 6, Lahore',
    description:
      'Premium 10 Marla corner plot situated in the prestigious Block E of DHA Phase 6 Lahore. This is a level plot with all utility connections. The block is fully developed with wide carpeted roads, underground electricity, and is in close proximity to all major amenities including schools, hospitals, and commercial areas.',
    features: JSON.stringify(['Corner Plot', 'Level Ground', 'All Utilities Connected', 'Carpeted Road', 'Gated Community', '24/7 Security']),
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?w=1200&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80',
      'https://images.unsplash.com/photo-1560185893-a55cbc8c57e3?w=1200&q=80',
    ]),
    isFeatured: true,
  },
  {
    title: '1 Kanal Plot — DHA Phase 8',
    slug: '1-kanal-plot-dha-phase-8',
    type: 'Residential Plot',
    status: 'Available',
    price: 42000000,
    priceLabel: 'PKR 4.2 Crore',
    size: 1,
    sizeUnit: 'Kanal',
    society: 'DHA Lahore',
    phase: 'Phase 8',
    location: 'Block X, DHA Phase 8, Lahore',
    description:
      'Exceptional 1 Kanal plot in the newly developed DHA Phase 8. Wide road facing, ideally positioned for building a dream home. This ultra-modern sector offers wide boulevards, parks, and is close to Lahore Ring Road access. A blue-chip investment for both end-users and investors.',
    features: JSON.stringify(['Wide Road Facing', 'Boulevard', 'Park Nearby', 'Ring Road Access', 'All Utilities', 'Possession Available']),
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    ]),
    isFeatured: true,
  },
  {
    title: '5 Marla Commercial Plot — Bahria Town Main Boulevard',
    slug: '5-marla-commercial-bahria-town',
    type: 'Commercial Plot',
    status: 'Available',
    price: 9500000,
    priceLabel: 'PKR 95 Lac',
    size: 5,
    sizeUnit: 'Marla',
    society: 'Bahria Town Lahore',
    phase: 'Commercial Zone',
    location: 'Main Commercial Boulevard, Bahria Town, Lahore',
    description:
      'Prime 5 Marla commercial plot on the main commercial boulevard of Bahria Town Lahore. This is an exceptional investment opportunity with maximum footfall and visibility. Ideal for retail, restaurants, or mixed-use commercial development. Possession available immediately.',
    features: JSON.stringify(['Main Boulevard', 'High Footfall Area', 'Commercial Zone', 'Immediate Possession', 'All Utilities', 'Signage Rights']),
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80',
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80',
    ]),
    isFeatured: false,
  },
  {
    title: '1 Kanal Modern Villa — DHA Phase 5',
    slug: '1-kanal-villa-dha-phase-5',
    type: 'Villa',
    status: 'Available',
    price: 95000000,
    priceLabel: 'PKR 9.5 Crore',
    size: 1,
    sizeUnit: 'Kanal',
    society: 'DHA Lahore',
    phase: 'Phase 5',
    location: 'Block L, DHA Phase 5, Lahore',
    description:
      'Architecturally stunning 1 Kanal modern villa in Block L, DHA Phase 5. Built to international standards with premium Italian marble, smart home automation, and a landscaped private garden. Features include 5 ensuite bedrooms, a home cinema, chef\'s kitchen, and a rooftop terrace. This is bespoke luxury redefined.',
    features: JSON.stringify(['5 Bedrooms', 'Smart Home', 'Italian Marble', 'Home Cinema', 'Rooftop Terrace', 'Landscaped Garden', '3-Car Garage', 'Solar Panels']),
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&q=80',
    ]),
    isFeatured: true,
  },
  {
    title: '4 Marla House — Gulberg III',
    slug: '4-marla-house-gulberg-3',
    type: 'House',
    status: 'Available',
    price: 22000000,
    priceLabel: 'PKR 2.2 Crore',
    size: 4,
    sizeUnit: 'Marla',
    society: 'Gulberg',
    phase: 'Gulberg III',
    location: 'Main Gulberg, Lahore',
    description:
      'Beautifully renovated 4 Marla house in the heart of Gulberg III. Triple storey with modern interiors, marble flooring throughout, modular kitchen, and 3 elegant bedrooms. Walking distance to MM Alam Road, Liberty Market, and Gulberg Main Boulevard. Perfect for families or as a rental investment.',
    features: JSON.stringify(['Triple Storey', 'Marble Flooring', 'Modular Kitchen', '3 Bedrooms', 'Renovated', 'Near MM Alam Road']),
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80',
    ]),
    isFeatured: false,
  },
  {
    title: 'DHA Lahore File — Phase 9 Prism',
    slug: 'dha-phase-9-prism-file',
    type: 'File',
    status: 'Available',
    price: 5800000,
    priceLabel: 'PKR 58 Lac',
    size: 10,
    sizeUnit: 'Marla',
    society: 'DHA Lahore',
    phase: 'Phase 9 Prism',
    location: 'DHA Phase 9 Prism, Lahore',
    description:
      'Open form 10 Marla residential file for DHA Phase 9 Prism — one of Lahore\'s fastest appreciating sectors. This balloted file comes with all documentation verified and is ready for transfer. Ideal for long-term capital growth investment. DHA 9 Prism is rapidly developing with infrastructure work underway.',
    features: JSON.stringify(['Balloted File', 'Verified Documents', 'Ready to Transfer', '10 Marla', 'High Growth Potential', 'DHA Backed']),
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1626178793926-22b28830aa30?w=1200&q=80',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80',
    ]),
    isFeatured: true,
  },
  {
    title: '2 Kanal Farm House — Barki Road',
    slug: '2-kanal-farmhouse-barki-road',
    type: 'Farm House',
    status: 'Available',
    price: 75000000,
    priceLabel: 'PKR 7.5 Crore',
    size: 2,
    sizeUnit: 'Kanal',
    society: 'Barki Road',
    phase: null,
    location: 'Barki Road, Lahore',
    description:
      'Exquisite 2 Kanal farmhouse retreat on Barki Road, just minutes from DHA. A haven of tranquility featuring a private swimming pool, lush orchards, a fully equipped guest house, and expansive lawns perfect for events. Built with natural stone and wood accents, this is country living with city convenience.',
    features: JSON.stringify(['Private Pool', 'Orchard', 'Guest House', 'Event Lawn', 'Natural Stone Architecture', 'Bore Water', 'Servant Quarters']),
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=1200&q=80',
      'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1200&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80',
    ]),
    isFeatured: false,
  },
  {
    title: '2 Bed Luxury Apartment — Johar Town',
    slug: '2-bed-apartment-johar-town',
    type: 'Apartment',
    status: 'Available',
    price: 14500000,
    priceLabel: 'PKR 1.45 Crore',
    size: 8,
    sizeUnit: 'Marla',
    society: 'Johar Town',
    phase: null,
    location: 'Main Ferozepur Road, Johar Town, Lahore',
    description:
      'Premium 8 Marla (approx 1800 sqft) luxury apartment in a high-rise residential tower in Johar Town. Featuring a stunning city view from the 12th floor, this 2-bedroom apartment comes with high-end fittings, modular kitchen, gym access, and 24/7 concierge. Ideal for young professionals and investors seeking rental income.',
    features: JSON.stringify(['12th Floor', 'City View', 'Gym Access', '24/7 Concierge', 'Backup Generator', 'Covered Parking', 'High-end Fittings']),
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80',
    ]),
    isFeatured: false,
  },
  {
    title: '10 Marla Plot — Bahria Orchard Phase 4',
    slug: '10-marla-plot-bahria-orchard-phase-4',
    type: 'Residential Plot',
    status: 'Available',
    price: 7800000,
    priceLabel: 'PKR 78 Lac',
    size: 10,
    sizeUnit: 'Marla',
    society: 'Bahria Town Lahore',
    phase: 'Bahria Orchard Phase 4',
    location: 'Block G, Bahria Orchard Phase 4, Lahore',
    description:
      'Beautifully located 10 Marla plot in the fast-developing Bahria Orchard Phase 4. Possession available with all utilities connected. Block G is particularly sought after for its wide roads, proximity to the park, and excellent resale value. This is an ideal opportunity to build your dream home in a secure, modern community.',
    features: JSON.stringify(['Possession Available', 'Park Facing', 'Wide Road', 'All Utilities', 'Secure Community', 'Near Amenities']),
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=1200&q=80',
      'https://images.unsplash.com/photo-1592595896616-c37162298647?w=1200&q=80',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1200&q=80',
    ]),
    isFeatured: false,
  },
  {
    title: '1 Kanal Luxury House — DHA Phase 1',
    slug: '1-kanal-house-dha-phase-1',
    type: 'House',
    status: 'Available',
    price: 135000000,
    priceLabel: 'PKR 13.5 Crore',
    size: 1,
    sizeUnit: 'Kanal',
    society: 'DHA Lahore',
    phase: 'Phase 1',
    location: 'Block M, DHA Phase 1, Lahore',
    description:
      'Grand 1 Kanal family residence in the coveted Block M of DHA Phase 1 — Lahore\'s most prestigious address. This double-storey masterpiece features 7 bedrooms, a formal dining hall, a private cinema room, a heated indoor pool, and service quarters. Recently renovated with imported materials. Unmatched in exclusivity.',
    features: JSON.stringify(['7 Bedrooms', 'Indoor Pool', 'Private Cinema', 'Formal Dining', 'Service Quarters', 'Double Storey', 'Imported Materials', '24/7 Security']),
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&q=80',
    ]),
    isFeatured: true,
  },
];

const agents = [
  {
    name: 'Zain ul Abidin',
    role: 'Senior Property Advisor',
    phone: '+92 303 6570074',
    whatsapp: '923036570074',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80',
    bio: '15 years of experience in DHA Lahore\'s residential and commercial property market. Specialist in luxury villas and investment files.',
  },
  {
    name: 'Hira Farooq',
    role: 'Investment Consultant',
    phone: '+92 303 6570074',
    whatsapp: '923036570074',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
    bio: 'Bahria Town specialist with a deep understanding of market trends, file pricing, and ROI projections for savvy investors.',
  },
  {
    name: 'Kamran Sheikh',
    role: 'Founder & CEO',
    phone: '+92 303 6570074',
    whatsapp: '923036570074',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80',
    bio: 'Founded PKEstate in 2003. Two decades of transforming real estate experiences in Lahore, from first-time buyers to seasoned investors.',
  },
  {
    name: 'Saba Malik',
    role: 'Commercial Property Specialist',
    phone: '+92 303 6570074',
    whatsapp: '923036570074',
    image: 'https://images.unsplash.com/photo-1573497491765-dccce02b29df?w=800&q=80',
    bio: 'Expert in Gulberg and Canal Road commercial properties. Advises top brands on location strategy and retail expansion.',
  },
];

async function main() {
  console.log('🌱 Seeding PKEstate database...\n');

  // Create admin user
  const hashedPassword = await bcrypt.hash('pkestate123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@pkestate.pk' },
    update: {},
    create: {
      email: 'admin@pkestate.pk',
      password: hashedPassword,
      role: 'admin',
    },
  });
  console.log('✅ Admin user: admin@pkestate.pk / pkestate123');

  // Seed properties
  for (const property of properties) {
    await prisma.property.upsert({
      where: { slug: property.slug },
      update: {},
      create: property,
    });
  }
  console.log(`✅ ${properties.length} properties seeded`);

  // Seed agents (clear and re-seed)
  await prisma.agent.deleteMany();
  await prisma.agent.createMany({ data: agents });
  console.log(`✅ ${agents.length} agents seeded`);

  console.log('\n🎉 Database seeded successfully!');
  console.log('   Run: cd server && npm run dev');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
