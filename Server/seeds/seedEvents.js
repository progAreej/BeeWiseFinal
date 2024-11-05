
const mongoose = require('mongoose');
const connectDB = require('../config/db'); // Adjust path as necessary
const Event = require('../models/Event'); // Adjust path as necessary
const User = require('../models/Users'); // Adjust path as necessary
const Attendance = require('../models/Attendance'); // Adjust path as necessary

const seedEvents = async () => {
  try {
    await connectDB();
    console.log('Database connection established');

    // Fetch sample users with roles of Beekeeper or Admin
    const users = await User.find({ role: { $in: ['admin', 'beekeeper'] } }).exec();

    if (users.length === 0) {
      console.error('Ensure that you have Beekeeper or Admin users in your database.');
      await mongoose.connection.close();
      return;
    }

    // Sample event data
    const events = [
      {
        title: {
          en: "Beekeeping Basics Workshop",
          ar: "ورشة أساسيات تربية النحل"
        },
        description: {
          en: "Join us for a workshop that covers the fundamentals of beekeeping, including hive management, bee biology, and honey extraction techniques.",
          ar: "انضم إلينا في ورشة تغطي أساسيات تربية النحل، بما في ذلك إدارة الخلايا، وعلم الأحياء للنحل، وتقنيات استخراج العسل."
        },
        location: "Amman",
        date: new Date('2024-10-10'),
        organizer: users[0]._id,
        imageUrl: "https://img.freepik.com/premium-photo/araffe-with-honeycombs-honey-drops-brown-background-generative-ai_955884-14191.jpg",
        category: "Workshops",
        isApproved: true,
      },
      {
        title: {
          en: "Honey Tasting Festival",
          ar: "مهرجان تذوق العسل"
        },
        description: {
          en: "Experience the diverse flavors of honey at our annual Honey Tasting Festival. Sample various types of honey and learn about their unique properties.",
          ar: "اختبر النكهات المتنوعة للعسل في مهرجان تذوق العسل السنوي. تذوق أنواع مختلفة من العسل وتعرف على خصائصها الفريدة."
        },
        location: "Irbid",
        date: new Date('2024-11-05'),
        organizer: users[1]._id,
        imageUrl: "https://img.freepik.com/premium-photo/araffe-with-honeycombs-honey-drops-brown-background-generative-ai_955884-14191.jpg",
        category: "Festivals",
        isApproved: true,
      },
      {
        title: {
          en: "Beekeeping for Beginners",
          ar: "تربية النحل للمبتدئين"
        },
        description: {
          en: "A detailed workshop designed for newcomers to beekeeping. Learn how to start your own hive, maintain it, and harvest honey.",
          ar: "ورشة عمل مفصلة مصممة للمبتدئين في تربية النحل. تعلم كيفية بدء خلايا النحل الخاصة بك، والحفاظ عليها، وحصاد العسل."
        },
        location: "Amman",
        date: new Date('2024-09-25'),
        organizer: users[2]._id,
        imageUrl: "https://img.freepik.com/premium-photo/honey-honeycomb-with-bee-ai-generated_201606-7343.jpg",
        category: "Workshops",
        isApproved: true,
      },
      {
        title: {
          en: "Bee Health and Nutrition Conference",
          ar: "مؤتمر صحة النحل وتغذيته"
        },
        description: {
          en: "Join experts in apiculture as they discuss the latest research on bee health, nutrition, and disease management.",
          ar: "انضم إلى الخبراء في تربية النحل أثناء مناقشتهم لأحدث الأبحاث حول صحة النحل، والتغذية، وإدارة الأمراض."
        },
        location: "Zarqa",
        date: new Date('2024-12-15'),
        organizer: users[3]._id,
        imageUrl: "https://img.freepik.com/premium-photo/honey-honeycomb-with-bee-ai-generated_201606-7343.jpg",
        category: "Conferences",
        isApproved: true,
      },
      {
        title: {
          en: "The Role of Bees in Ecosystems",
          ar: "دور النحل في الأنظمة البيئية"
        },
        description: {
          en: "A lecture series focused on the ecological importance of bees and their contribution to biodiversity and food production.",
          ar: "سلسلة محاضرات تركز على الأهمية البيئية للنحل ومساهمته في التنوع البيولوجي وإنتاج الغذاء."
        },
        location: "Amman",
        date: new Date('2024-10-30'),
        organizer: users[4]._id,
        imageUrl: "https://example.com/role_of_bees.jpg",
        category: "Lectures",
        isApproved: true,
      },
      {
        title: {
          en: "Advanced Beekeeping Techniques",
          ar: "تقنيات تربية النحل المتقدمة"
        },
        description: {
          en: "Take your beekeeping skills to the next level with this advanced workshop focusing on queen rearing, swarm management, and seasonal hive care.",
          ar: "ارتق بمهاراتك في تربية النحل إلى المستوى التالي مع ورشة العمل المتقدمة هذه التي تركز على تربية الملكات، وإدارة الأسراب، ورعاية الخلايا الموسمية."
        },
        location: "Madaba",
        date: new Date('2024-11-20'),
        organizer: users[0]._id,
        imageUrl: "https://img.freepik.com/premium-photo/honey-honeycomb-with-bee-ai-generated_201606-7343.jpg",
        category: "Workshops",
        isApproved: true,
      },
      {
        title: {
          en: "Honey Harvest Festival",
          ar: "مهرجان حصاد العسل"
        },
        description: {
          en: "Celebrate the honey harvest season with us! Participate in honey extraction demonstrations and enjoy local crafts and food.",
          ar: "احتفل بموسم حصاد العسل معنا! شارك في عروض استخراج العسل واستمتع بالحرف المحلية والطعام."
        },
        location: "Ajloun",
        date: new Date('2024-09-15'),
        organizer: users[1]._id,
        imageUrl: "https://img.freepik.com/premium-photo/honey-honeycomb-with-bee-ai-generated_201606-7343.jpg",
        category: "Festivals",
        isApproved: true,
      },
      {
        title: {
          en: "Beekeeping Sustainability Summit",
          ar: "قمة استدامة تربية النحل"
        },
        description: {
          en: "Engage with industry leaders and activists discussing sustainable beekeeping practices and policies to protect bee populations.",
          ar: "تفاعل مع قادة الصناعة والنشطاء الذين يناقشون ممارسات وسياسات تربية النحل المستدامة لحماية تجمعات النحل."
        },
        location: "Irbid",
        date: new Date('2024-12-10'),
        organizer: users[2]._id,
        imageUrl: "https://img.freepik.com/premium-photo/honey-honeycomb-with-bee-ai-generated_201606-7343.jpg",
        category: "Conferences",
        isApproved: true,
      },
      {
        title: {
          en: "Bees and Biodiversity Workshop",
          ar: "ورشة عمل النحل والتنوع البيولوجي"
        },
        description: {
          en: "Explore the relationship between bees and biodiversity in this interactive workshop, including field visits to local habitats.",
          ar: "استكشف العلاقة بين النحل والتنوع البيولوجي في هذه الورشة التفاعلية، بما في ذلك الزيارات الميدانية إلى المواطن المحلية."
        },
        location: "Karak",
        date: new Date('2024-11-08'),
        organizer: users[3]._id,
        imageUrl: "https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10109.jpg",
        category: "Workshops",
        isApproved: true,
      },
      {
        title: {
          en: "Beekeeping Field Day",
          ar: "يوم حقلي لتربية النحل"
        },
        description: {
          en: "Join us for a hands-on field day where participants can observe bee colonies, learn about hive inspections, and try their hand at honey extraction.",
          ar: "انضم إلينا ليوم ميداني عملي حيث يمكن للمشاركين مراقبة مستعمرات النحل، وتعلم كيفية تفتيش الخلايا، وتجربة استخراج العسل."
        },
        location: "Irbid",
        date: new Date('2024-10-22'),
        organizer: users[4]._id,
        imageUrl: "https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10109.jpg",
        category: "Workshops",
        isApproved: true,
      },
      {
        title: {
          en: "Bee-Friendly Gardening Workshop",
          ar: "ورشة عمل حديقة صديقة للنحل"
        },
        description: {
          en: "Learn how to create a bee-friendly garden that attracts and supports bee populations. This workshop includes hands-on planting activities.",
          ar: "تعلم كيفية إنشاء حديقة صديقة للنحل تجذب وتدعم تجمعات النحل. تتضمن ورشة العمل أنشطة زراعة عملية."
        },
        location: "Amman",
        date: new Date('2024-09-12'),
        organizer: users[0]._id,
        imageUrl: "https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10109.jpg",
        category: "Workshops",
        isApproved: true,
      },
      {
        title: {
          en: "The Importance of Bees in Agriculture",
          ar: "أهمية النحل في الزراعة"
        },
        description: {
          en: "Join us for a seminar discussing the critical role of bees in agricultural pollination and food production.",
          ar: "انضم إلينا في ندوة تناقش الدور الحيوي للنحل في تلقيح المحاصيل وإنتاج الغذاء."
        },
        location: "Zarqa",
        date: new Date('2024-10-05'),
        organizer: users[1]._id,
        imageUrl: "https://cdn.pixabay.com/photo/2024/03/26/11/03/ai-generated-8656537_640.jpg",
        category: "Seminars",
        isApproved: true,
      },
      {
        title: {
          en: "Beekeeping Mentorship Program",
          ar: "برنامج توجيه تربية النحل"
        },
        description: {
          en: "Enroll in our mentorship program to receive personalized guidance from experienced beekeepers. Ideal for aspiring beekeepers.",
          ar: "سجل في برنامج التوجيه الخاص بنا للحصول على إرشادات شخصية من مربي النحل ذوي الخبرة. مثالي للمربين الطموحين."
        },
        location: "Amman",
        date: new Date('2024-09-30'),
        organizer: users[2]._id,
        imageUrl: "https://cdn.pixabay.com/photo/2024/03/26/11/03/ai-generated-8656537_640.jpg",
        category: "Programs",
        isApproved: true,
      },
      {
        title: {
          en: "The Science of Honey Production",
          ar: "علم إنتاج العسل"
        },
        description: {
          en: "Attend this workshop to delve into the science behind honey production, including the process of nectar collection and honey processing.",
          ar: "احضر هذه الورشة للتعمق في علم إنتاج العسل، بما في ذلك عملية جمع الرحيق ومعالجة العسل."
        },
        location: "Irbid",
        date: new Date('2024-11-18'),
        organizer: users[3]._id,
        imageUrl: "https://img.freepik.com/premium-photo/bee-sitting-top-piece-honey-generative-ai_900101-690.jpg",
        category: "Workshops",
        isApproved: true,
      },
      {
        title: {
          en: "Pollinator Protection Symposium",
          ar: "ندوة حماية الملقحات"
        },
        description: {
          en: "Join experts for a symposium focusing on the challenges facing pollinators, including bees, and strategies for their protection.",
          ar: "انضم إلى الخبراء في ندوة تركز على التحديات التي تواجه الملقحات، بما في ذلك النحل، واستراتيجيات حمايتها."
        },
        location: "Amman",
        date: new Date('2024-12-20'),
        organizer: users[4]._id,
        imageUrl: "https://img.freepik.com/premium-photo/bee-sitting-top-piece-honey-generative-ai_900101-690.jpg",
        category: "Symposiums",
        isApproved: true,
      },
      {
        title: {
          en: "Beekeeping Q&A Session",
          ar: "جلسة أسئلة وأجوبة عن تربية النحل"
        },
        description: {
          en: "Have questions about beekeeping? Join our Q&A session with experienced beekeepers who will share their knowledge and answer your queries.",
          ar: "لديك أسئلة حول تربية النحل؟ انضم إلى جلسة أسئلة وأجوبة مع مربي النحل ذوي الخبرة الذين سيشاركون معرفتهم ويجيبون على استفساراتك."
        },
        location: "Madaba",
        date: new Date('2024-10-18'),
        organizer: users[0]._id,
        imageUrl: "https://img.freepik.com/premium-photo/araffe-with-honeycombs-honey-drops-brown-background-generative-ai_955884-14191.jpg",
        category: "Sessions",
        isApproved: true,
      },
      {
        title: {
          en: "Beekeeping Awareness Campaign",
          ar: "حملة توعية لتربية النحل"
        },
        description: {
          en: "Participate in our awareness campaign to educate the community about the importance of bees and how to support their populations.",
          ar: "شارك في حملتنا التوعوية لتثقيف المجتمع حول أهمية النحل وكيفية دعم تجمعاتهم."
        },
        location: "Amman",
        date: new Date('2024-09-29'),
        organizer: users[1]._id,
        imageUrl: "https://img.freepik.com/premium-photo/araffe-with-honeycombs-honey-drops-brown-background-generative-ai_955884-14191.jpg",
        category: "Campaigns",
        isApproved: true,
      },
    ];
      // Add the rest of the 19 events here (same as previous example)
   

    // Clear existing events and attendance records
    await Event.deleteMany({});
    await Attendance.deleteMany({});
    console.log('Cleared existing events and attendance records');

    // Insert events into the database
    const insertedEvents = await Event.insertMany(events);
    // console.log('Events inserted:', insertedEvents);

    // Sample attendance data can go here...

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding events:', error);
    await mongoose.connection.close();
  }
};

// Run the seeding function
seedEvents();
