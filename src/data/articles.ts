export interface Article {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    imageUrl: string;
    date: string;
    content?: string;
    author?: string;
    readingTime?: string;
  }
  
  export interface CategoryType {
    id: string;
    name: string;
  }
  
  export interface TrendingArticle {
    id: number;
    title: string;
    imageUrl: string;
  }

export const categories: CategoryType[] = [
  { id: 'all', name: 'All Articles' },
  { id: 'recycling', name: 'Recycling' },
  { id: 'upcycling', name: 'Upcycling' },
  { id: 'sustainability', name: 'Sustainability' },
  { id: 'diy', name: 'DIY Projects' },
];

export const articles: Article[] = [
    {
        id: 1,
        title: 'How to DIY a compost bin at home',
        excerpt: 'Transform your kitchen scraps into nutrient-rich soil with these easy steps to create your own compost bin using recycled materials.',
        category: 'recycling',
        imageUrl: 'https://images.pexels.com/photos/4505168/pexels-photo-4505168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        date: 'June 15, 2025',
        author: 'Sarah Green',
        readingTime: '5 min read',
        content: `
          Creating your own compost bin is an excellent way to reduce waste and create nutrient-rich soil for your garden. This comprehensive guide will walk you through the process step by step.
    
          What You'll Need:
          - Large plastic container with lid
          - Drill or hammer and nail
          - Brown materials (dry leaves, paper)
          - Green materials (kitchen scraps, grass clippings)
          - Water
          - Optional: compost starter
    
          Step 1: Prepare Your Container
          Start by drilling or punching holes in the bottom and sides of your container for drainage and airflow. Space the holes about 2 inches apart.
    
          Step 2: Choose the Right Location
          Place your compost bin in a partially shaded area with good drainage. Avoid placing it directly against buildings or wooden structures.
    
          Step 3: Layer Your Materials
          Begin with a layer of brown materials at the bottom. Alternate between brown and green materials, keeping a ratio of roughly 3:1 brown to green.
    
          Step 4: Maintain Your Compost
          Keep your compost pile moist but not wet. Turn it every few weeks to aerate the materials and speed up decomposition.
    
          Common Problems and Solutions:
          - Bad odor: Add more brown materials
          - Slow decomposition: Check moisture levels and add nitrogen-rich materials
          - Pests: Ensure food scraps are well covered
    
          Tips for Success:
          - Chop materials into smaller pieces for faster decomposition
          - Keep a good balance of materials
          - Monitor moisture levels
          - Be patient - good compost takes time
    
          With proper maintenance, you should have usable compost in 2-6 months. Use it to enrich your garden soil or share with neighbors to spread the benefits of composting in your community.
        `
      },
      // ... (keep all other articles, just adding content, author, and readingTime properties)
  {
    id: 2,
    title: 'Creative ways to reuse plastic bottles',
    excerpt: 'Discover 10 innovative and practical ways to give plastic bottles a second life, from garden planters to home organization solutions.',
    category: 'upcycling',
    imageUrl: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: 'June 12, 2025',
    author: 'Liam Smith',
    readingTime: '4 min read',
    content: `
Plastic bottles are versatile materials you can upcycle into various useful items. From home décor to gardening tools, the possibilities are endless.

Ideas to Try:
- Hanging garden planters
- Bird feeders
- Storage containers
- DIY sprinklers for your garden
    `
  },
  {
    id: 3,
    title: 'How to start a zero-waste lifestyle',
    excerpt: 'Begin your journey toward a more sustainable future with these practical tips for reducing waste in your everyday life.',
    category: 'sustainability',
    imageUrl: 'https://images.pexels.com/photos/5217322/pexels-photo-5217322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: 'June 8, 2025',
    author: 'Olivia Brown',
    readingTime: '6 min read',
    content: `
Living zero-waste means making conscious choices to minimize the trash you produce. Start small and gradually incorporate sustainable habits into your daily life.

Steps to Begin:
- Bring reusable bags
- Shop in bulk
- Compost organic waste
- Support zero-waste businesses
    `
  },
  {
    id: 4,
    title: 'Make your own natural cleaning products',
    excerpt: 'Create effective, eco-friendly cleaning solutions using simple ingredients you already have in your pantry.',
    category: 'diy',
    imageUrl: 'https://images.pexels.com/photos/4239037/pexels-photo-4239037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: 'June 5, 2025',
    author: 'Emily White',
    readingTime: '3 min read',
    content: `
Replace chemical-laden cleaners with homemade natural alternatives. They're better for your health and the environment.

Recipes:
- Vinegar + baking soda for all-purpose cleaning
- Lemon + salt for scrubbing surfaces
- Essential oils for fresh scents
    `
  },
  {
    id: 5,
    title: 'Upcycled art projects for kids',
    excerpt: 'Engage children in sustainability with these fun craft projects that transform trash into beautiful art pieces.',
    category: 'upcycling',
    imageUrl: 'https://images.pexels.com/photos/5087991/pexels-photo-5087991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: 'June 1, 2025',
    author: 'Sophia Johnson',
    readingTime: '5 min read',
    content: `
Upcycled art teaches kids about creativity and sustainability. Gather everyday waste and turn it into colorful masterpieces.

Project Ideas:
- Bottle cap mosaics
- Cardboard sculptures
- Recycled paper collages
    `
  },
  {
    id: 6,
    title: 'Guide to starting a community garden',
    excerpt: 'Build community connections while growing fresh produce with this comprehensive guide to establishing a shared garden space.',
    category: 'sustainability',
    imageUrl: 'https://images.pexels.com/photos/4505169/pexels-photo-4505169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: 'May 28, 2025',
    author: 'Noah Williams',
    readingTime: '7 min read',
    content: `
Community gardens foster collaboration, sustainability, and food security. Here's how you can start one in your neighborhood.

Steps:
- Find a location
- Gather community support
- Plan the layout
- Assign plots and responsibilities
    `
  },
  {
    id: 7,
    title: 'Turn old clothes into reusable bags',
    excerpt: 'Learn how to transform worn-out t-shirts and jeans into practical, stylish bags that reduce plastic waste.',
    category: 'upcycling',
    imageUrl: 'https://images.pexels.com/photos/6195328/pexels-photo-6195328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: 'May 25, 2025',
    author: 'James Davis',
    readingTime: '4 min read',
    content: `
Instead of throwing away old clothes, upcycle them into reusable bags. No sewing machine required for some designs!

Simple No-Sew Method:
- Cut sleeves off a t-shirt
- Cut fringes at the bottom
- Tie knots for a secure base
    `
  },
  {
    id: 8,
    title: 'How to build a rain barrel system',
    excerpt: 'Conserve water and reduce your utility bills by creating an efficient rain collection system for your garden.',
    category: 'diy',
    imageUrl: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: 'May 22, 2025',
    author: 'Mia Martinez',
    readingTime: '5 min read',
    content: `
Rain barrels are an easy and effective way to harvest rainwater for garden use.

Steps:
- Choose a barrel
- Install a spigot
- Connect downspouts
- Keep it covered to avoid mosquitoes
    `
  },
  {
    id: 9,
    title: 'Beginners guide to composting',
    excerpt: 'Everything you need to know to start composting successfully, even if you have limited space or live in an apartment.',
    category: 'recycling',
    imageUrl: 'https://images.pexels.com/photos/4503261/pexels-photo-4503261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: 'May 18, 2025',
    author: 'Ava Wilson',
    readingTime: '4 min read',
    content: `
Even if you live in a small space, composting is possible and beneficial. Use kitchen scraps to nourish plants and reduce landfill waste.

Tips:
- Use a small indoor bin
- Focus on vegetable scraps and coffee grounds
- Avoid meat and dairy
    `
  },
];

export const trendingArticles: TrendingArticle[] = [
  {
    id: 2,
    title: 'Creative ways to reuse plastic bottles',
    imageUrl: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 3,
    title: 'How to start a zero-waste lifestyle',
    imageUrl: 'https://images.pexels.com/photos/5217322/pexels-photo-5217322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 4,
    title: 'Make your own natural cleaning products',
    imageUrl: 'https://images.pexels.com/photos/4239037/pexels-photo-4239037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 5,
    title: 'Upcycled art projects for kids',
    imageUrl: 'https://images.pexels.com/photos/5087991/pexels-photo-5087991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 6,
    title: 'Guide to starting a community garden',
    imageUrl: 'https://images.pexels.com/photos/4505169/pexels-photo-4505169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 7,
    title: 'Turn old clothes into reusable bags',
    imageUrl: 'https://images.pexels.com/photos/6195328/pexels-photo-6195328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

