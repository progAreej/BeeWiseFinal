
const mongoose = require('mongoose');
const connectDB = require('../config/db'); // Adjust path as necessary
const { BlogPost } = require('../models/Blog'); // Adjust path as necessary (make sure this matches your updated model)
const User = require('../models/Users'); // Adjust path as necessary

const seedBlog = async () => {
  try {
    await connectDB();
    console.log('Database connection established');

    // Fetch sample users
    // const users = await User.find().exec();
    const users = await User.find({ role: { $in: ['beekeeper', 'admin'] } }).exec();


    if (users.length === 0) {
      console.error('Ensure that you have users in your database.');
      await mongoose.connection.close();
      return;
    }

    // Sample blog posts data
//     const blogPosts = [
//       // Post 1
//       {
//         title: {
//           en: "The Importance of Pollination for Honey Production",
//           ar: "أهمية التلقيح لإنتاج العسل"
//         },
//         imageUrl: "https://media.licdn.com/dms/image/D4E12AQF2W8O1vFIKrQ/article-cover_image-shrink_720_1280/0/1686757421016?e=2147483647&v=beta&t=Obq1m5NsfgZ4njY0JAlUC5h1tyacObKfPTBNKaT1ktw",
//         author: users[0]._id,
//         content: {
//           en: "Pollination is crucial for the survival of plants and the production of honey. Without bees pollinating flowers, many crops would fail. This post explores the vital role bees play in pollination, how this process increases honey yields, and the impact of losing pollinator species. By understanding the delicate balance between bees and plants, we can appreciate the importance of protecting bee populations and improving their habitats.",
//           ar: "التلقيح أمر بالغ الأهمية لبقاء النباتات وإنتاج العسل. بدون تلقيح النحل للزهور، ستفشل العديد من المحاصيل. تستكشف هذه المدونة الدور الحيوي الذي تلعبه النحل في التلقيح، وكيف يزيد هذا من إنتاج العسل، وتأثير فقدان الأنواع الملحقة بالتلقيح. من خلال فهم التوازن الدقيق بين النحل والنباتات، يمكننا تقدير أهمية حماية مجموعات النحل وتحسين بيئتها."
//         },
//         category: { en: "Pollination", ar: "التلقيح" },
//         isApproved: true,
//       },
//       // Post 2
//       {
//         title: {
//           en: "Top Tips for Beekeeping During Winter",
//           ar: "نصائح لتربية النحل خلال فصل الشتاء"
//         },
//         imageUrl: "https://example.com/winter-beekeeping.jpg",
//         author: users[1]._id,
//         content: {
//           en: "Beekeeping in winter presents unique challenges. Cold weather can lead to colony losses if bees aren't properly cared for. In this post, we offer practical tips for preparing your beehives for winter, such as insulating the hive, monitoring food supplies, and minimizing disturbances. With the right preparations, you can ensure your bees survive the winter months and emerge strong and ready for the new season.",
//           ar: "تربية النحل في الشتاء تقدم تحديات فريدة. يمكن أن يؤدي الطقس البارد إلى فقدان المستعمرات إذا لم يتم العناية بالنحل بشكل صحيح. في هذه المدونة، نقدم نصائح عملية لإعداد خلايا النحل لفصل الشتاء، مثل عزل الخلية، مراقبة إمدادات الطعام، وتقليل الاضطرابات. مع التحضيرات المناسبة، يمكنك ضمان بقاء النحل خلال أشهر الشتاء والظهور بقوة استعداداً للموسم الجديد."
//         },
//         category: { en: "Beekeeping", ar: "تربية النحل" },
//         isApproved: true,
//       },
//       // Post 3
//       {
//         title: {
//           en: "Understanding Bee Health and Disease Prevention",
//           ar: "فهم صحة النحل والوقاية من الأمراض"
//         },
//         imageUrl: "https://example.com/bee-health.jpg",
//         author: users[2]._id,
//         content: {
//           en: "Maintaining bee health is essential for a productive hive. Bees are vulnerable to various diseases and parasites, such as varroa mites and foulbrood. This post covers the most common bee diseases, their symptoms, and prevention methods. By adopting good hive management practices, beekeepers can reduce the risk of infection and promote the health of their colonies. Additionally, we discuss the importance of keeping bees in clean environments and regularly inspecting hives for signs of trouble.",
//           ar: "الحفاظ على صحة النحل أمر أساسي لخلايا إنتاجية. النحل معرض لأمراض وطفيليات مختلفة مثل حشرة الفاروا وتعفن الحضنة. تغطي هذه المدونة أكثر الأمراض شيوعًا بين النحل، أعراضها، وطرق الوقاية منها. من خلال اعتماد ممارسات إدارة جيدة للخلايا، يمكن لمربي النحل تقليل مخاطر الإصابة وتعزيز صحة المستعمرات. بالإضافة إلى ذلك، نناقش أهمية إبقاء النحل في بيئات نظيفة وفحص الخلايا بانتظام للكشف عن أي مشكلات."
//         },
//         category: { en: "Bee Health", ar: "صحة النحل" },
//         isApproved: false,
//       },
//       // Post 4
//       {
//         title: {
//           en: "The Secret Behind Quality Wax Products",
//           ar: "السر وراء منتجات الشمع عالية الجودة"
//         },
//         imageUrl: "https://example.com/wax-products.jpg",
//         author: users[3]._id,
//         content: {
//           en: "Bee wax is an important byproduct of beekeeping, with many applications in cosmetics, candles, and more. Producing high-quality wax requires attention to detail in hive management and wax processing. In this post, we explore how bees produce wax, the different uses for bee wax, and what factors influence wax quality. Learn how to handle wax properly to create premium products that are not only useful but also environmentally friendly.",
//           ar: "شمع النحل منتج ثانوي مهم في تربية النحل، وله العديد من الاستخدامات في مستحضرات التجميل والشموع وغير ذلك. يتطلب إنتاج شمع عالي الجودة اهتمامًا بالتفاصيل في إدارة الخلايا ومعالجة الشمع. في هذه المدونة، نستكشف كيفية إنتاج النحل للشمع، الاستخدامات المختلفة لشمع النحل، والعوامل التي تؤثر على جودته. تعلم كيفية التعامل مع الشمع بشكل صحيح لإنشاء منتجات متميزة ليست مفيدة فحسب، بل صديقة للبيئة أيضًا."
//         },
//         category: { en: "Wax Products", ar: "منتجات الشمع" },
//         isApproved: true,
//       },
//       // Post 5
//       {
//         title: {
//           en: "Exploring Bee Species in Jordan",
//           ar: "استكشاف أنواع النحل في الأردن"
//         },
//         imageUrl: "https://example.com/bee-species.jpg",
//         author: users[4]._id,
//         content: {
//           en: "Jordan is home to several unique bee species, each playing a critical role in the local ecosystem. From the industrious honeybee to lesser-known solitary species, this post takes a closer look at the diverse types of bees found in Jordan. We delve into the importance of conserving these species and the challenges they face due to habitat loss and environmental changes. Understanding these bees can help us protect their populations for future generations.",
//           ar: "تعد الأردن موطنًا لأنواع فريدة من النحل، حيث يلعب كل نوع منها دورًا حيويًا في النظام البيئي المحلي. من نحل العسل المجتهد إلى الأنواع الفردية الأقل شهرة، تأخذك هذه المدونة في جولة حول أنواع النحل المتنوعة الموجودة في الأردن. نغوص في أهمية الحفاظ على هذه الأنواع والتحديات التي تواجهها نتيجة لفقدان المواطن الطبيعية والتغيرات البيئية. فهم هذه الأنواع يساعدنا في حماية مجموعاتها للأجيال القادمة."
//         },
//         category: { en: "Bee Species", ar: "أنواع النحل" },
//         isApproved: false,
//       },
//       {
//   title: {
//     en: "How to Start Beekeeping: A Beginner's Guide",
//     ar: "كيفية بدء تربية النحل: دليل للمبتدئين"
//   },
//   imageUrl: "https://example.com/start-beekeeping.jpg",
//   author: users[5]._id,
//   content: {
//     en: "Beekeeping can be a rewarding hobby or a profitable business. This guide will walk you through the basics of starting a beekeeping journey, from choosing the right hive and equipment to understanding the initial steps of hive management. We also discuss the best time to start and what to expect in your first year.",
//     ar: "يمكن أن تكون تربية النحل هواية مجزية أو عملًا مربحًا. سيأخذك هذا الدليل عبر الأساسيات لبدء رحلة تربية النحل، من اختيار الخلية المناسبة والمعدات إلى فهم الخطوات الأولية لإدارة الخلية. نناقش أيضًا أفضل وقت للبدء وما يمكن توقعه في السنة الأولى."
//   },
//   category: { en: "Beekeeping", ar: "تربية النحل" },
//   isApproved: true,
// },

// // Post 7
// {
//   title: {
//     en: "The Role of Queen Bees in a Hive",
//     ar: "دور ملكة النحل في الخلية"
//   },
//   imageUrl: "https://example.com/queen-bee.jpg",
//   author: users[6]._id,
//   content: {
//     en: "The queen bee is the heart of the hive, responsible for laying eggs and maintaining the colony's harmony. This post discusses the queen's life cycle, how she influences the hive, and what beekeepers should know about requeening and managing queen health.",
//     ar: "ملكة النحل هي قلب الخلية، وهي مسؤولة عن وضع البيض والحفاظ على تناغم المستعمرة. يناقش هذا المقال دورة حياة الملكة، وكيف تؤثر على الخلية، وما يجب أن يعرفه مربي النحل حول إعادة تربية الملكات وإدارة صحة الملكة."
//   },
//   category: { en: "Bee Health", ar: "صحة النحل" },
//   isApproved: true,
// },

// // Post 8
// {
//   title: {
//     en: "Top Plants to Attract Bees to Your Garden",
//     ar: "أفضل النباتات لجذب النحل إلى حديقتك"
//   },
//   imageUrl: "https://example.com/bee-plants.jpg",
//   author: users[7]._id,
//   content: {
//     en: "Bees are attracted to certain plants that provide them with nectar and pollen. In this post, we list the top plants to grow in your garden to attract bees and support pollinator populations, including lavender, sunflowers, and clover.",
//     ar: "يجذب النحل بعض النباتات التي توفر له الرحيق وحبوب اللقاح. في هذه المقالة، نسرد أفضل النباتات التي يمكن زراعتها في حديقتك لجذب النحل ودعم مجموعات الملقحات، بما في ذلك الخزامى، وعباد الشمس، ونبات البرسيم."
//   },
//   category: { en: "Gardening", ar: "الحدائق" },
//   isApproved: true,
// },

// // Post 9
// {
//   title: {
//     en: "Common Mistakes New Beekeepers Make",
//     ar: "الأخطاء الشائعة التي يرتكبها مربو النحل الجدد"
//   },
//   imageUrl: "https://example.com/beekeeping-mistakes.jpg",
//   author: users[8]._id,
//   content: {
//     en: "Starting beekeeping can be challenging, and new beekeepers often make mistakes that can affect the health of the hive. This post highlights the most common errors, such as poor hive placement, insufficient feeding, and neglecting pest control, and offers advice on how to avoid them.",
//     ar: "يمكن أن يكون بدء تربية النحل أمرًا صعبًا، وغالبًا ما يرتكب مربو النحل الجدد أخطاء يمكن أن تؤثر على صحة الخلية. يسلط هذا المقال الضوء على الأخطاء الشائعة، مثل وضع الخلية في مكان غير مناسب، والتغذية غير الكافية، وتجاهل مكافحة الآفات، ويقدم نصائح حول كيفية تجنبها."
//   },
//   category: { en: "Beekeeping", ar: "تربية النحل" },
//   isApproved: false,
// },

// // Post 10
// {
//   title: {
//     en: "How to Harvest Honey the Right Way",
//     ar: "كيفية حصاد العسل بالطريقة الصحيحة"
//   },
//   imageUrl: "https://example.com/harvest-honey.jpg",
//   author: users[9]._id,
//   content: {
//     en: "Harvesting honey is one of the most rewarding aspects of beekeeping. This post covers the best practices for harvesting honey, including when to harvest, equipment needed, and tips for ensuring the hive remains healthy during and after the harvest.",
//     ar: "يعد حصاد العسل من أكثر الجوانب إرضاءً في تربية النحل. يغطي هذا المقال أفضل الممارسات لحصاد العسل، بما في ذلك متى يتم الحصاد، المعدات المطلوبة، ونصائح لضمان بقاء الخلية صحية أثناء وبعد الحصاد."
//   },
//   category: { en: "Honey Production", ar: "إنتاج العسل" },
//   isApproved: true,
// },

// // Post 11
// {
//   title: {
//     en: "The Impact of Pesticides on Bees",
//     ar: "تأثير المبيدات الحشرية على النحل"
//   },
//   imageUrl: "https://example.com/pesticides-impact.jpg",
//   author: users[10]._id,
//   content: {
//     en: "Pesticides pose a significant threat to bee populations worldwide. This post discusses the harmful effects of certain chemicals on bees, the symptoms of pesticide poisoning in bees, and how beekeepers and gardeners can help protect pollinators.",
//     ar: "تشكل المبيدات الحشرية تهديدًا كبيرًا لمجموعات النحل في جميع أنحاء العالم. يناقش هذا المقال الآثار الضارة لبعض المواد الكيميائية على النحل، وأعراض التسمم بالمبيدات الحشرية لدى النحل، وكيف يمكن لمربي النحل والبستانيين المساعدة في حماية الملقحات."
//   },
//   category: { en: "Bee Health", ar: "صحة النحل" },
//   isApproved: false,
// },

// // Post 12
// {
//   title: {
//     en: "How Bees Communicate: The Language of Dance",
//     ar: "كيف يتواصل النحل: لغة الرقص"
//   },
//   imageUrl: "https://example.com/bee-dance.jpg",
//   author: users[11]._id,
//   content: {
//     en: "Bees use a fascinating 'waggle dance' to communicate with each other about the location of food sources. This post explains how this dance works, its purpose, and what it reveals about bee behavior and hive dynamics.",
//     ar: "يستخدم النحل رقصة مذهلة تُعرف بـ'رقصة الهز' للتواصل فيما بينهم حول مواقع مصادر الطعام. يشرح هذا المقال كيف تعمل هذه الرقصة، والغرض منها، وما تكشفه عن سلوك النحل وديناميكيات الخلية."
//   },
//   category: { en: "Bee Behavior", ar: "سلوك النحل" },
//   isApproved: true,
// },

// // Post 13
// {
//   title: {
//     en: "Innovations in Beekeeping Technology",
//     ar: "الابتكارات في تكنولوجيا تربية النحل"
//   },
//   imageUrl: "https://example.com/bee-technology.jpg",
//   author: users[12]._id,
//   content: {
//     en: "Modern technology is transforming beekeeping, with innovations such as smart hives, hive monitoring systems, and new beekeeping tools. This post explores the latest advancements and how they help beekeepers better manage their hives.",
//     ar: "تُحدث التكنولوجيا الحديثة تحولًا في تربية النحل، من خلال ابتكارات مثل الخلايا الذكية وأنظمة مراقبة الخلايا وأدوات تربية النحل الجديدة. يستكشف هذا المقال أحدث التطورات وكيف تساعد مربي النحل على إدارة خلاياهم بشكل أفضل."
//   },
//   category: { en: "Beekeeping", ar: "تربية النحل" },
//   isApproved: true,
// },

// // Post 14
// {
//   title: {
//     en: "The Effects of Climate Change on Bees",
//     ar: "تأثيرات تغير المناخ على النحل"
//   },
//   imageUrl: "https://example.com/climate-change-bees.jpg",
//   author: users[13]._id,
//   content: {
//     en: "Climate change poses new challenges for bees, affecting their habitats, food sources, and seasonal behaviors. This post discusses how changes in the environment impact bee health and what steps can be taken to help bees adapt.",
//     ar: "يطرح تغير المناخ تحديات جديدة للنحل، تؤثر على موائله ومصادر طعامه وسلوكياته الموسمية. يناقش هذا المقال كيف تؤثر التغيرات البيئية على صحة النحل، وما هي الخطوات التي يمكن اتخاذها لمساعدة النحل على التكيف."
//   },
//   category: { en: "Bee Health", ar: "صحة النحل" },
//   isApproved: false,
// },

// // Post 15
// {
//   title: {
//     en: "Exploring the Different Types of Beehives",
//     ar: "استكشاف أنواع مختلفة من خلايا النحل"
//   },
//   imageUrl: "https://example.com/types-of-beehives.jpg",
//   author: users[14]._id,
//   content: {
//     en: "Not all beehives are the same, and choosing the right one is essential for successful beekeeping. This post covers the different types of hives available, such as the Langstroth, top-bar, and Warre hives, and discusses their advantages and drawbacks.",
//     ar: "ليست كل خلايا النحل متماثلة، واختيار النوع المناسب أمر ضروري لتربية نحل ناجحة. يغطي هذا المقال الأنواع المختلفة من الخلايا المتاحة، مثل خلايا لانجستروث، والقضبان العليا، وخلايا وار، ويستعرض مزاياها وعيوبها."
//   },
//   category: { en: "Beekeeping", ar: "تربية النحل" },
//   isApproved: true,
// },

// // Post 16
// {
//   title: {
//     en: "The Role of Bees in Pollination",
//     ar: "دور النحل في التلقيح"
//   },
//   imageUrl: "https://example.com/bee-pollination.jpg",
//   author: users[15]._id,
//   content: {
//     en: "Pollination is a vital process for many plants, and bees play a crucial role in this ecosystem service. This post explains the significance of bee pollination for agriculture, the challenges facing pollinators, and ways to support bee populations.",
//     ar: "التلقيح هو عملية حيوية للعديد من النباتات، ويلعب النحل دورًا حاسمًا في هذه الخدمة البيئية. يشرح هذا المقال أهمية تلقيح النحل للزراعة، والتحديات التي تواجه الملقحات، وطرق دعم مجموعات النحل."
//   },
//   category: { en: "Bee Behavior", ar: "سلوك النحل" },
//   isApproved: true,
// },

// // Post 17
// {
//   title: {
//     en: "Bee-Friendly Gardening: Creating a Haven for Pollinators",
//     ar: "الحدائق الصديقة للنحل: إنشاء ملاذ للملقحات"
//   },
//   imageUrl: "https://example.com/bee-friendly-garden.jpg",
//   author: users[16]._id,
//   content: {
//     en: "Creating a bee-friendly garden is a great way to support pollinators. This post provides tips on how to choose the right plants, avoid harmful pesticides, and design a garden that attracts and nourishes bees.",
//     ar: "يُعد إنشاء حديقة صديقة للنحل طريقة رائعة لدعم الملقحات. تقدم هذه المقالة نصائح حول كيفية اختيار النباتات المناسبة، وتجنب المبيدات الحشرية الضارة، وتصميم حديقة تجذب النحل وتغذيه."
//   },
//   category: { en: "Gardening", ar: "الحدائق" },
//   isApproved: false,
// },

// // Post 18
// {
//   title: {
//     en: "What to Do if You Get Stung by a Bee",
//     ar: "ماذا تفعل إذا تعرضت للسعة نحل"
//   },
//   imageUrl: "https://example.com/bee-sting.jpg",
//   author: users[17]._id,
//   content: {
//     en: "Bee stings can be painful, but knowing how to properly treat them can reduce discomfort. This post covers first aid steps to take after a sting, how to identify an allergic reaction, and what to do if you experience severe symptoms.",
//     ar: "قد تكون لسعات النحل مؤلمة، لكن معرفة كيفية علاجها بشكل صحيح يمكن أن يقلل من الشعور بعدم الراحة. يغطي هذا المقال خطوات الإسعافات الأولية بعد التعرض للسعة، وكيفية التعرف على رد الفعل التحسسي، وماذا تفعل إذا واجهت أعراضًا خطيرة."
//   },
//   category: { en: "Bee Health", ar: "صحة النحل" },
//   isApproved: true,
// },

// // Post 19
// {
//   title: {
//     en: "The Life Cycle of a Honeybee",
//     ar: "دورة حياة النحلة"
//   },
//   imageUrl: "https://example.com/honeybee-life-cycle.jpg",
//   author: users[18]._id,
//   content: {
//     en: "Honeybees go through a fascinating life cycle, from egg to adult worker, queen, or drone. This post explains each stage of the honeybee's life, their roles in the hive, and how beekeepers can help support healthy hive development.",
//     ar: "تمر النحلات بدورة حياة مثيرة، من البيضة إلى العامل البالغ، الملكة، أو الذكر. يشرح هذا المقال كل مرحلة من مراحل حياة النحلة، أدوارها في الخلية، وكيف يمكن لمربي النحل المساعدة في دعم تطور الخلايا الصحية."
//   },
//   category: { en: "Bee Behavior", ar: "سلوك النحل" },
//   isApproved: true,
// },

// // Post 20
// {
//   title: {
//     en: "How to Make Beeswax Candles at Home",
//     ar: "كيفية صنع شموع شمع النحل في المنزل"
//   },
//   imageUrl: "https://example.com/beeswax-candles.jpg",
//   author: users[19]._id,
//   content: {
//     en: "Beeswax candles are a natural, eco-friendly alternative to paraffin candles. This post provides a step-by-step guide on how to make your own beeswax candles at home, including materials needed and tips for a smooth crafting experience.",
//     ar: "شموع شمع النحل هي بديل طبيعي وصديق للبيئة لشموع البارافين. يقدم هذا المقال دليلًا خطوة بخطوة حول كيفية صنع شموع شمع النحل الخاصة بك في المنزل، بما في ذلك المواد المطلوبة ونصائح لتجربة صنع سلسة."
//   },
//   category: { en: "DIY", ar: "الأعمال اليدوية" },
//   isApproved: false,
// }
//     ];


const blogPosts = [
  // Post 1
  {
    title: {
      en: "The Importance of Pollination for Honey Production",
      ar: "أهمية التلقيح لإنتاج العسل"
    },
    imageUrl: "https://cdn.pixabay.com/photo/2023/10/11/10/05/ai-generated-8308210_1280.png",
    author: users[0]._id,
    content: {
      en: "Pollination is crucial for the survival of plants and the production of honey...",
      ar: "التلقيح أمر بالغ الأهمية لبقاء النباتات وإنتاج العسل..."
    },
    category: { en: "Pollination", ar: "التلقيح" },
    isApproved: true,
  },
  // Post 2
  {
    title: {
      en: "Top Tips for Beekeeping During Winter",
      ar: "نصائح لتربية النحل خلال فصل الشتاء"
    },
    imageUrl: "https://bestbees.com/wp-content/uploads/2023/06/Overwintering-beehives-denver-e1687460639197.jpeg",
    author: users[1]._id,
    content: {
      en: "Beekeeping in winter presents unique challenges...",
      ar: "تربية النحل في الشتاء تقدم تحديات فريدة..."
    },
    category: { en: "Beekeeping", ar: "تربية النحل" },
    isApproved: true,
  },
  // Post 3
  {
    title: {
      en: "Understanding Bee Health and Disease Prevention",
      ar: "فهم صحة النحل والوقاية من الأمراض"
    },
    imageUrl: "https://reviveabee.com/wp-content/uploads/2023/03/a-beekeeper-inspecting-a-hive-for-various-kinds-of-bee-diseases.jpg",
    author: users[2]._id,
    content: {
      en: "Maintaining bee health is essential for a productive hive...",
      ar: "الحفاظ على صحة النحل أمر أساسي لخلايا إنتاجية..."
    },
    category: { en: "Bee Health", ar: "صحة النحل" },
    isApproved: false,
  },
  // Post 4
  {
    title: {
      en: "The Secret Behind Quality Wax Products",
      ar: "السر وراء منتجات الشمع عالية الجودة"
    },
    imageUrl: "https://m.media-amazon.com/images/I/71t3BVu3d9L._AC_UF1000,1000_QL80_.jpg",
    author: users[3]._id,
    content: {
      en: "Bee wax is an important byproduct of beekeeping...",
      ar: "شمع النحل منتج ثانوي مهم في تربية النحل..."
    },
    category: { en: "Wax Products", ar: "منتجات الشمع" },
    isApproved: true,
  },
  // Post 5
  {
    title: {
      en: "Exploring Bee Species in Jordan",
      ar: "استكشاف أنواع النحل في الأردن"
    },
    imageUrl: "https://nodglobal.com/wp-content/uploads/2023/04/Picture_4-300x201.jpg",
    author: users[4]._id,
    content: {
      en: "Jordan is home to several unique bee species...",
      ar: "تعد الأردن موطنًا لأنواع فريدة من النحل..."
    },
    category: { en: "Bee Species", ar: "أنواع النحل" },
    isApproved: false,
  },
  // Post 6
  {
    title: {
      en: "How to Increase Honey Production Naturally",
      ar: "كيفية زيادة إنتاج العسل بشكل طبيعي"
    },
    imageUrl: "https://images.squarespace-cdn.com/content/v1/622312fda30e487ad9a3414e/a306cae4-bcc5-4f33-8047-f935ac487585/How+honey+is+processed.png",
    author: users[0]._id,
    content: {
      en: "Natural methods can help boost honey production...",
      ar: "الطرق الطبيعية يمكن أن تساعد في زيادة إنتاج العسل..."
    },
    category: { en: "Honey Production", ar: "إنتاج العسل" },
    isApproved: true,
  },
  // Post 7
  {
    title: {
      en: "Preparing Beehives for Spring",
      ar: "إعداد خلايا النحل لفصل الربيع"
    },
    imageUrl: "https://oraravalleyhoney.com.au/wp-content/uploads/2017/09/beehive-spring-managment-768x1024.jpg",
    author: users[1]._id,
    content: {
      en: "Spring is the perfect time to prepare your beehives...",
      ar: "الربيع هو الوقت المثالي لتحضير خلايا النحل..."
    },
    category: { en: "Beekeeping", ar: "تربية النحل" },
    isApproved: true,
  },
  // Post 8
  {
    title: {
      en: "Common Bee Diseases and How to Treat Them",
      ar: "الأمراض الشائعة للنحل وكيفية علاجها"
    },
    imageUrl: "https://www.ages.at/download/sdl-eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDk0NTkyMDAsImV4cCI6NDA3MDkwODgwMCwidXNlciI6MCwiZ3JvdXBzIjpbMCwtMV0sImZpbGUiOiJmaWxlYWRtaW4vX3Byb2Nlc3NlZF8vMC83L2NzbV9jc21fSFBfdG90ZXNfd2ludGVydm9sa192YXJyb2FzY2hhZGVuX21hZXJ6MjAxMF8xMWMxM2E5MWVhXzAyMzAzMzMzNjcuanBnIiwicGFnZSI6OTYyfQ.2_utNsiYOHVJEXyAzlnE5FrtK0BecNqM7kIcZzHVhiU/csm_csm_HP_totes_wintervolk_varroaschaden_maerz2010_11c13a91ea_0230333367.jpg",
    author: users[2]._id,
    content: {
      en: "Bee diseases can significantly impact hive productivity...",
      ar: "يمكن للأمراض النحل أن تؤثر بشكل كبير على إنتاجية الخلايا..."
    },
    category: { en: "Bee Health", ar: "صحة النحل" },
    isApproved: false,
  },
  // Post 9
  {
    title: {
      en: "The Role of Bees in Biodiversity",
      ar: "دور النحل في التنوع البيولوجي"
    },
    imageUrl: "https://www.mdpi.com/insects/insects-12-00688/article_deploy/html/images/insects-12-00688-g002-550.jpg",
    author: users[3]._id,
    content: {
      en: "Bees play a crucial role in maintaining biodiversity...",
      ar: "النحل يلعب دورًا حاسمًا في الحفاظ على التنوع البيولوجي..."
    },
    category: { en: "Pollination", ar: "التلقيح" },
    isApproved: true,
  },
  // Post 10
  {
    title: {
      en: "Harvesting Wax for Candle Making",
      ar: "حصاد الشمع لصنع الشموع"
    },
    imageUrl: "https://cdn.pixabay.com/photo/2023/10/11/10/05/ai-generated-8308210_1280.png",
    author: users[4]._id,
    content: {
      en: "Wax harvesting is a valuable skill for beekeepers...",
      ar: "حصاد الشمع هو مهارة قيمة لمربي النحل..."
    },
    category: { en: "Wax Products", ar: "منتجات الشمع" },
    isApproved: true,
  },
  // Post 11
  {
    title: {
      en: "Identifying Different Honey Types",
      ar: "التعرف على أنواع العسل المختلفة"
    },
    imageUrl: "https://cdn.pixabay.com/photo/2023/10/11/10/05/ai-generated-8308210_1280.png",
    author: users[0]._id,
    content: {
      en: "Honey comes in various types, each with unique properties...",
      ar: "يأتي العسل بأنواع مختلفة، ولكل منها خصائص فريدة..."
    },
    category: { en: "Honey Production", ar: "إنتاج العسل" },
    isApproved: true,
  },
  // Post 12
  {
    title: {
      en: "The Benefits of Propolis in Beekeeping",
      ar: "فوائد البروبوليس في تربية النحل"
    },
    imageUrl: "https://cdn.pixabay.com/photo/2023/10/11/10/05/ai-generated-8308210_1280.png",
    author: users[1]._id,
    content: {
      en: "Propolis is a valuable substance collected by bees...",
      ar: "البروبوليس هو مادة قيمة يجمعها النحل..."
    },
    category: { en: "Beekeeping", ar: "تربية النحل" },
    isApproved: true,
  },
  // Post 13
  {
    title: {
      en: "Protecting Bees from Pesticides",
      ar: "حماية النحل من المبيدات الحشرية"
    },
    imageUrl: "https://cdn.pixabay.com/photo/2023/10/11/10/05/ai-generated-8308210_1280.png",
    author: users[2]._id,
    content: {
      en: "Pesticides pose a significant threat to bee populations...",
      ar: "تشكل المبيدات الحشرية تهديدًا كبيرًا لمجموعات النحل..."
    },
    category: { en: "Bee Health", ar: "صحة النحل" },
    isApproved: false,
  },
  // Post 14
  {
    title: {
      en: "How Pollination Affects Crop Yields",
      ar: "كيف يؤثر التلقيح على غلة المحاصيل"
    },
    imageUrl: "https://cdn.pixabay.com/photo/2023/10/11/10/05/ai-generated-8308210_1280.png",
    author: users[3]._id,
    content: {
      en: "Pollination is directly linked to the success of crop production...",
      ar: "يرتبط التلقيح بشكل مباشر بنجاح إنتاج المحاصيل..."
    },
    category: { en: "Pollination", ar: "التلقيح" },
    isApproved: true,
  },
  // Post 15
  {
    title: {
      en: "Using Bee Wax in Skincare Products",
      ar: "استخدام شمع النحل في منتجات العناية بالبشرة"
    },
    imageUrl: "https://cdn.pixabay.com/photo/2023/10/11/10/05/ai-generated-8308210_1280.png",
    author: users[4]._id,
    content: {
      en: "Bee wax is a common ingredient in skincare products...",
      ar: "شمع النحل هو مكون شائع في منتجات العناية بالبشرة..."
    },
    category: { en: "Wax Products", ar: "منتجات الشمع" },
    isApproved: true,
  },
  // Post 16
  {
    title: {
      en: "Harvesting Honey Without Hurting Bees",
      ar: "حصاد العسل بدون إيذاء النحل"
    },
    imageUrl: "https://cdn.pixabay.com/photo/2023/10/11/10/05/ai-generated-8308210_1280.png",
    author: users[0]._id,
    content: {
      en: "Learn how to harvest honey in a bee-friendly manner...",
      ar: "تعلم كيفية حصاد العسل بطريقة صديقة للنحل..."
    },
    category: { en: "Honey Production", ar: "إنتاج العسل" },
    isApproved: true,
  },
  // Post 17
  {
    title: {
      en: "Best Practices for Spring Beekeeping",
      ar: "أفضل الممارسات لتربية النحل في الربيع"
    },
    imageUrl: "https://cdn.pixabay.com/photo/2023/10/11/10/05/ai-generated-8308210_1280.png",
    author: users[1]._id,
    content: {
      en: "Spring is an important season for beekeeping...",
      ar: "الربيع هو فصل مهم لتربية النحل..."
    },
    category: { en: "Beekeeping", ar: "تربية النحل" },
    isApproved: true,
  },
  // Post 18
  {
    title: {
      en: "Recognizing Signs of Bee Colony Collapse",
      ar: "التعرف على علامات انهيار مستعمرة النحل"
    },
    imageUrl: "https://cdn.pixabay.com/photo/2023/10/11/10/05/ai-generated-8308210_1280.png",
    author: users[2]._id,
    content: {
      en: "Colony collapse disorder poses a significant threat to bees...",
      ar: "يشكل اضطراب انهيار المستعمرة تهديدًا كبيرًا للنحل..."
    },
    category: { en: "Bee Health", ar: "صحة النحل" },
    isApproved: false,
  },
  // Post 19
  {
    title: {
      en: "How to Create a Pollinator-Friendly Garden",
      ar: "كيفية إنشاء حديقة صديقة للتلقيح"
    },
    imageUrl: "https://images.squarespace-cdn.com/content/v1/5811566d20099e23814644fd/c73c6c87-e1b1-4eaa-a146-399cd7e0bc63/Dammanns+Garden+Company+-+Creating+a+Pollinator-Friendly+GardeN-birdhouse+in+garden.jpg",
    author: users[3]._id,
    content: {
      en: "A pollinator-friendly garden can help support local bee populations...",
      ar: "يمكن أن تساعد الحديقة الصديقة للتلقيح في دعم مجموعات النحل المحلية..."
    },
    category: { en: "Pollination", ar: "التلقيح" },
    isApproved: true,
  },
  // Post 20
  {
    title: {
      en: "Innovative Uses for Bee Wax in Everyday Life",
      ar: "استخدامات مبتكرة لشمع النحل في الحياة اليومية"
    },
    imageUrl: "https://bestbees.com/wp-content/uploads/2024/06/pexels-liyazerya-10012665-e1719411579285.jpg",
    author: users[4]._id,
    content: {
      en: "Bee wax can be used in various innovative ways...",
      ar: "يمكن استخدام شمع النحل بطرق مبتكرة مختلفة..."
    },
    category: { en: "Wax Products", ar: "منتجات الشمع" },
    isApproved: true,
  },
];



    // Clear existing blog posts
    await BlogPost.deleteMany({});
    console.log('Cleared existing blog posts');

    // Insert new blog posts
    const docs = await BlogPost.insertMany(blogPosts);
    console.log('Blog posts inserted:', docs);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close();
  }
};

seedBlog();
