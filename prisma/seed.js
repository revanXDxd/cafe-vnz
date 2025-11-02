// prisma/seed.js - DATA SAMPLE LENGKAP
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Start seeding...')

  // Clear existing data
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.menuItem.deleteMany()
  await prisma.gallery.deleteMany()
  await prisma.contact.deleteMany()
  await prisma.reservation.deleteMany()
  await prisma.user.deleteMany()

  console.log('🗑️  Cleared existing data')

  // Create Admin User
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@vnzcafe.com',
      password: '$2b$10$EXAMPLE_HASHED_PASSWORD', // You should hash this properly
      name: 'VNZ Cafe Admin',
      role: 'ADMIN'
    }
  })
  console.log('👤 Created admin user')

  // Create Menu Items
  const menuItems = await prisma.menuItem.createMany({
    data: [
      // COFFEE
      {
        name: 'VNZ Signature Blend',
        description: 'Blend kopi spesial dengan rasa yang unik dan nikmat, dibuat dari biji kopi pilihan',
        price: 35000,
        category: 'COFFEE',
        image: '/images/coffee1.jpg',
        isFeatured: true,
        ingredients: 'Arabica beans, hot water',
        calories: 5
      },
      {
        name: 'Espresso Macchiato',
        description: 'Espresso kuat dengan sedikit foam susu yang creamy dan lembut',
        price: 28000,
        category: 'COFFEE',
        image: '/images/coffee2.jpg',
        ingredients: 'Espresso, milk foam',
        calories: 10
      },
      {
        name: 'Caramel Latte',
        description: 'Latte dengan caramel syrup premium yang manis dan aroma yang menggoda',
        price: 32000,
        category: 'COFFEE',
        image: '/images/coffee3.jpg',
        ingredients: 'Espresso, steamed milk, caramel syrup',
        calories: 180
      },
      {
        name: 'Cold Brew Special',
        description: 'Kopi seduh dingin selama 24 jam dengan rasa yang smooth dan menyegarkan',
        price: 30000,
        category: 'COFFEE',
        image: '/images/coffee4.jpg',
        ingredients: 'Cold brew coffee, ice',
        calories: 5
      },
      // NON-COFFEE
      {
        name: 'Matcha Latte Premium',
        description: 'Green tea matcha grade premium dengan susu steamed dan foam yang lembut',
        price: 30000,
        category: 'NON_COFFEE',
        image: '/images/matcha.jpg',
        ingredients: 'Matcha powder, steamed milk, honey',
        calories: 120
      },
      {
        name: 'Chocolate Mint',
        description: 'Coklat panas Belgian dengan sentuhan mint yang menyegarkan',
        price: 28000,
        category: 'NON_COFFEE',
        image: '/images/chocolate.jpg',
        ingredients: 'Belgian chocolate, mint syrup, milk',
        calories: 220
      },
      // FOOD
      {
        name: 'Croissant Butter',
        description: 'Croissant dengan butter premium, renyah luar dan lembut dalam',
        price: 25000,
        category: 'FOOD',
        image: '/images/croissant.jpg',
        ingredients: 'Flour, butter, yeast, salt',
        calories: 280
      },
      {
        name: 'Sandwich Club',
        description: 'Sandwich dengan daging premium, sayuran segar, dan sauce spesial',
        price: 45000,
        category: 'FOOD',
        image: '/images/sandwich.jpg',
        ingredients: 'Bread, chicken, lettuce, tomato, mayo',
        calories: 420
      },
      // DESSERT
      {
        name: 'Tiramisu Classic',
        description: 'Dessert Italia klasik dengan mascarpone, kopi, dan cocoa powder',
        price: 35000,
        category: 'DESSERT',
        image: '/images/tiramisu.jpg',
        ingredients: 'Mascarpone, coffee, cocoa, ladyfingers',
        calories: 320
      },
      {
        name: 'New York Cheesecake',
        description: 'Cheesecake lembut dengan berry sauce homemade dan biscuit base',
        price: 32000,
        category: 'DESSERT',
        image: '/images/cheesecake.jpg',
        ingredients: 'Cream cheese, biscuit, berry sauce',
        calories: 380
      }
    ]
  })
  console.log('☕ Created menu items')

  // Create Gallery Items
  const galleryItems = await prisma.gallery.createMany({
    data: [
      {
        title: 'Interior Modern VNZ',
        image: '/images/gallery1.jpg',
        category: 'INTERIOR',
        description: 'Suasana interior cafe yang modern dan nyaman'
      },
      {
        title: 'Coffee Art Special',
        image: '/images/gallery2.jpg',
        category: 'COFFEE',
        description: 'Seni latte art yang dibuat oleh barista profesional'
      },
      {
        title: 'Cozy Atmosphere',
        image: '/images/gallery3.jpg',
        category: 'ATMOSPHERE',
        description: 'Atmosfer hangat dan cozy untuk bersantai'
      },
      {
        title: 'Dessert Collection',
        image: '/images/gallery4.jpg',
        category: 'FOOD',
        description: 'Koleksi dessert lezat buatan sendiri'
      }
    ]
  })
  console.log('🖼️  Created gallery items')

  // Create Sample Contacts
  const contacts = await prisma.contact.createMany({
    data: [
      {
        name: 'Budi Santoso',
        email: 'budi@example.com',
        phone: '+628123456789',
        subject: 'Reservasi',
        message: 'Halo, saya ingin reservasi meja untuk 4 orang tanggal 15 Desember jam 19:00. Terima kasih.'
      },
      {
        name: 'Sari Dewi',
        email: 'sari@example.com',
        subject: 'Pertanyaan Menu',
        message: 'Apakah ada menu vegetarian di cafe? Dan apakah bisa request tanpa gula?'
      }
    ]
  })
  console.log('📞 Created sample contacts')

  console.log('✅ Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })