const jobs = [
    {
      id: 1,
      imgSrc: 'assets/img/job/google.png',
      jobTitle: 'Web Development',
      company: 'Google',
      location: 'Mountain',
      salary: 5000,
      postedTime: '2 days ago',
      jobTime: 'Freelance',
      vacancies: 8,
    },
    {
      id: 2,
      imgSrc: 'assets/img/job/apple.png',
      jobTitle: 'IOS Developer',
      company: 'Apple',
      location: 'Cupertino',
      salary: 7000,
      postedTime: '1 days ago',
      jobTime: 'Full Time',
      vacancies: 8,
    },
    {
      id: 3,
      imgSrc: 'assets/img/job/starbuck.png',
      jobTitle: 'Finance Manager',
      company: 'Starbucks',
      location: 'California',
      salary: 8000,
      postedTime: '4 days ago',
      jobTime: 'Full Time',
      vacancies: 8,
    },
    {
      id: 4,
      imgSrc: 'assets/img/job/meta.png',
      jobTitle: 'Digital Marketing',
      company: 'Meta',
      location: 'Menlo',
      salary: 6000,
      postedTime: '2 days ago',
      jobTime: 'Internship',
      vacancies: 8,
    },
    {
      id: 5,
      imgSrc: 'assets/img/job/volkswagen.png',
      jobTitle: 'Account Manager',
      company: 'Volkswagen',
      location: 'Wolfsburg',
      salary: 4000,
      postedTime: '2 days ago',
      jobTime: 'Full Time',
      vacancies: 8,
    },
    {
        id: 6,
        company: 'Nike',
        jobTitle: 'Account Manager',
        location: 'Oregon',
        salary: 9000,
        postedTime: '3 days ago',
        jobTime: 'Part Time',
        vacancies: 8,
        imgSrc: 'assets/img/job/nike.png'
    },
    {
      id: 7,
      imgSrc: 'assets/img/job/microsoft.png',
      jobTitle: 'Software Engineer',
      company: 'Microsoft',
      location: 'Redmond',
      salary: 8500,
      postedTime: '1 day ago',
      jobTime: 'Full Time',
      vacancies: 8,
    },
    {
      id: 8,
      imgSrc: 'assets/img/job/amazon.png',
      jobTitle: 'Product Manager',
      company: 'Amazon',
      location: 'Seattle',
      salary: 7500,
      postedTime: '5 days ago',
      jobTime: 'Full Time',
      vacancies: 8,
    },
  ];
  const tabPanes = [
    {
      title: 'Web Development',
      image: 'assets/img/services/service-details-1.jpg',
    },
    {
      title: 'Digital Marketing',
      image: 'assets/img/services/service-details-2.jpg',
    },
    {
      title: 'Human Resources',
      image: 'assets/img/services/service-details-3.jpg',
    },
    {
      title: 'Project Management',
      image: 'assets/img/services/service-details-4.jpg',
    },
    {
      title: 'Software Developer',
      image: 'assets/img/services/service-details-5.jpg',
    },
    {
      title: 'Mobile Apps Developer',
      image: 'assets/img/services/service-details-6.jpg',
    },
  ];
  const candidates = [
    {
      id: 1,
      name: 'Alfread Bonaport',
      image: 'assets/img/team/1.jpg',
      position: 'Market Analyst',
      workExp: '11 Years',
      location: 'Washington, USA',
    },
    {
      id: 2,
      name: 'Micheal Tevaz',
      image: 'assets/img/team/2.jpg',
      position: 'Market Analyst',
      workExp: '11 Years',
      location: 'Washington, USA',
    },
    {
      id: 3,
      name: 'Micheal Smith',
      image: 'assets/img/team/6.jpg',
      position: 'Market Analyst',
      workExp: '11 Years',
      location: 'Washington, USA',
    },
    {
      id: 4,
      name: 'Maria Bonaport',
      image: 'assets/img/team/5.jpg',
      position: 'Market Analyst',
      workExp: '11 Years',
      location: 'Washington, USA',
    },
    {
      id: 5,
      name: 'Alfread Bonaport',
      image: 'assets/img/team/3.jpg',
      position: 'Market Analyst',
      workExp: '11 Years',
      location: 'Washington, USA',
    },
    {
      id: 6,
      name: 'Jimmy Doe',
      image: 'assets/img/team/4.jpg',
      position: 'Market Analyst',
      workExp: '11 Years',
      location: 'Washington, USA',
    },
  ];

  const professionalTitles = [
    "Developer",
    "Designer",
    "Tester",
    "Manager",
    "Business Analyst",
    "Project Manager",
    "Data Scientist",
    "Sales Executive",
    "Marketing Specialist",
    "Financial Analyst",
    "Human Resources Manager",
    "Customer Service Representative",
    "Software Engineer",
    "Product Manager",
    "Operations Manager",
  ];
  

  const skills = [
    {
      id: 0,
      name: "JavaScript"
    },
    {
      id: 1,
      name: "Python"
    },
    {
      id: 2,
      name: "Java"
    },
    {
      id: 3,
      name: "Ruby"
    },
    {
      id: 4,
      name: "HTMLCSS"
    },
    {
      id: 5,
      name: "WebDesign"
    },
    {
      id: 6,
      name: "SQL"
    },
    {
      id: 7,
      name: "React"
    },
    {
      id: 8,
      name: "Angular"
    },
    {
      id: 9,
      name: "VueJS"
    },
    {
      id: 10,
      name: "NodeJS"
    },
    {
      id: 11,
      name: "Cpp"
    },
    {
      id: 12,
      name: "DataScience"
    },
    {
      id: 13,
      name: "UIUXDesign"
    },
    {
      id: 14,
      name: "SoftwareTesting"
    },
    {
      id: 15,
      name: "ProjectManagement"
    },
    {
      id: 16,
      name: "Leadership"
    },
    {
      id: 17,
      name: "BusinessAnalysis"
    },
    {
      id: 18,
      name: "Communication"
    },
    {
      id: 19,
      name: "SoftwareDevelopment"
    },
    {
      id: 20,
      name: "DataAnalysis"
    },
    {
      id: 21,
      name: "MarketingStrategy"
    },
    {
      id: 22,
      name: "DigitalMarketing"
    },
    {
      id: 23,
      name: "Sales"
    },
    {
      id: 24,
      name: "GraphicDesign"
    },
    {
      id: 25,
      name: "MongoDB"
    },
    {
      id: 26,
      name: "AWS"
    },
    {
      id: 27,
      name: "Docker"
    },
    {
      id: 28,
      name: "Kubernetes"
    },
    {
      id: 29,
      name: "Blockchain"
    },
    {
      id: 30,
      name: "ARVR"
    },
    {
      id: 31,
      name: "MachineLearning"
    },
    {
      id: 32,
      name: "ArtificialIntelligence"
    },
    {
      id: 33,
      name: "Cybersecurity"
    },
    {
      id: 34,
      name: "BigData"
    },
    {
      id: 35,
      name: "DevOps"
    },
    {
      id: 36,
      name: "MobileDevelopment"
    },
    {
      id: 37,
      name: "PHP"
    },
    {
      id: 38,
      name: "Swift"
    },
    {
      id: 39,
      name: "CSharp"
    },
    {
      id: 40,
      name: "Flutter"
    },
    {
      id: 41,
      name: "Xamarin"
    },
    {
      id: 42,
      name: "Unity"
    },
    {
      id: 43,
      name: "GameDevelopment"
    },
    {
      id: 44,
      name: "NetworkSecurity"
    },
    {
      id: 45,
      name: "SystemAdministration"
    },
    {
      id: 46,
      name: "CloudComputing"
    },
    {
      id: 47,
      name: "IoT"
    },
    {
      id: 48,
      name: "EmbeddedSystems"
    },
    {
      id: 49,
      name: "BackendDevelopment"
    },
    {
      id: 50,
      name: "FrontendDevelopment"
    },
    {
      id: 51,
      name: "FullStackDevelopment"
    },
    {
      id: 52,
      name: "DatabaseManagement"
    },
    {
      id: 53,
      name: "QualityAssurance"
    },
    {
      id: 54,
      name: "UserExperience"
    },
    {
      id: 55,
      name: "UserInterface"
    },
    {
      id: 56,
      name: "ProductManagement"
    },
    {
      id: 57,
      name: "AgileMethodology"
    },
    {
      id: 58,
      name: "Scrum"
    },
    {
      id: 59,
      name: "DataVisualization"
    },
    {
      id: 60,
      name: "PredictiveAnalytics"
    },
    {
      id: 61,
      name: "NaturalLanguageProcessing"
    },
    {
      id: 62,
      name: "ImageProcessing"
    },
    {
      id: 63,
      name: "DeepLearning"
    },
    {
      id: 64,
      name: "NeuralNetworks"
    },
    {
      id: 65,
      name: "Robotics"
    },
    {
      id: 66,
      name: "VirtualReality"
    },
    {
      id: 67,
      name: "AugmentedReality"
    }
  ];

  // const skills = [
  //   {
  //     id: "JavaScript",
  //     name: "JavaScript"
  //   },
  //   {
  //     id: "Python",
  //     name: "Python"
  //   },
  //   {
  //     id: "Java",
  //     name: "Java"
  //   },
  //   {
  //     id: "Ruby",
  //     name: "Ruby"
  //   },
  //   {
  //     id: "HTMLCSS",
  //     name: "HTML/CSS"
  //   },
  //   {
  //     id: "WebDesign",
  //     name: "Web Design"
  //   },
  //   {
  //     id: "SQL",
  //     name: "SQL"
  //   },
  //   {
  //     id: "React",
  //     name: "React"
  //   },
  //   {
  //     id: "Angular",
  //     name: "Angular"
  //   },
  //   {
  //     id: "VueJS",
  //     name: "Vue.js"
  //   },
  //   {
  //     id: "NodeJS",
  //     name: "Node.js"
  //   },
  //   {
  //     id: "Cpp",
  //     name: "C++"
  //   },
  //   {
  //     id: "DataScience",
  //     name: "Data Science"
  //   },
  //   {
  //     id: "UIUXDesign",
  //     name: "UI/UX Design"
  //   },
  //   {
  //     id: "SoftwareTesting",
  //     name: "Software Testing"
  //   },
  //   {
  //     id: "ProjectManagement",
  //     name: "Project Management"
  //   },
  //   {
  //     id: "Leadership",
  //     name: "Leadership"
  //   },
  //   {
  //     id: "BusinessAnalysis",
  //     name: "Business Analysis"
  //   },
  //   {
  //     id: "Communication",
  //     name: "Communication"
  //   },
  //   {
  //     id: "SoftwareDevelopment",
  //     name: "Software Development"
  //   },
  //   {
  //     id: "DataAnalysis",
  //     name: "Data Analysis"
  //   },
  //   {
  //     id: "MarketingStrategy",
  //     name: "Marketing Strategy"
  //   },
  //   {
  //     id: "DigitalMarketing",
  //     name: "Digital Marketing"
  //   },
  //   {
  //     id: "Sales",
  //     name: "Sales"
  //   },
  //   {
  //     id: "GraphicDesign",
  //     name: "Graphic Design"
  //   },
  //   {
  //     id: "MongoDB",
  //     name: "MongoDB"
  //   },
  //   {
  //     id: "AWS",
  //     name: "AWS"
  //   },
  //   {
  //     id: "Docker",
  //     name: "Docker"
  //   },
  //   {
  //     id: "Kubernetes",
  //     name: "Kubernetes"
  //   },
  //   {
  //     id: "Blockchain",
  //     name: "Blockchain"
  //   },
  //   {
  //     id: "ARVR",
  //     name: "AR/VR"
  //   },
  //   {
  //     id: "MachineLearning",
  //     name: "Machine Learning"
  //   },
  //   {
  //     id: "ArtificialIntelligence",
  //     name: "Artificial Intelligence"
  //   },
  //   {
  //     id: "Cybersecurity",
  //     name: "Cybersecurity"
  //   },
  //   {
  //     id: "BigData",
  //     name: "Big Data"
  //   },
  //   {
  //     id: "DevOps",
  //     name: "DevOps"
  //   },
  //   {
  //     id: "MobileDevelopment",
  //     name: "Mobile App Development"
  //   },
  //   {
  //     id: "PHP",
  //     name: "PHP"
  //   },
  //   {
  //     id: "Swift",
  //     name: "Swift"
  //   },
  //   {
  //     id: "CSharp",
  //     name: "C#"
  //   },
  //   {
  //     id: "Flutter",
  //     name: "Flutter"
  //   },
  //   {
  //     id: "Xamarin",
  //     name: "Xamarin"
  //   },
  //   {
  //     id: "Unity",
  //     name: "Unity"
  //   },
  //   {
  //     id: "GameDevelopment",
  //     name: "Game Development"
  //   },
  //   {
  //     id: "NetworkSecurity",
  //     name: "Network Security"
  //   },
  //   {
  //     id: "SystemAdministration",
  //     name: "System Administration"
  //   },
  //   {
  //     id: "CloudComputing",
  //     name: "Cloud Computing"
  //   },
  //   {
  //     id: "IoT",
  //     name: "IoT"
  //   },
  //   {
  //     id: "EmbeddedSystems",
  //     name: "Embedded Systems"
  //   },
  //   {
  //     id: "BackendDevelopment",
  //     name: "Backend Development"
  //   },
  //   {
  //     id: "FrontendDevelopment",
  //     name: "Frontend Development"
  //   },
  //   {
  //     id: "FullStackDevelopment",
  //     name: "Full Stack Development"
  //   },
  //   {
  //     id: "DatabaseManagement",
  //     name: "Database Management"
  //   },
  //   {
  //     id: "QualityAssurance",
  //     name: "Quality Assurance"
  //   },
  //   {
  //     id: "UserExperience",
  //     name: "User Experience"
  //   },
  //   {
  //     id: "UserInterface",
  //     name: "User Interface"
  //   },
  //   {
  //     id: "ProductManagement",
  //     name: "Product Management"
  //   },
  //   {
  //     id: "AgileMethodology",
  //     name: "Agile Methodology"
  //   },
  //   {
  //     id: "Scrum",
  //     name: "Scrum"
  //   },
  //   {
  //     id: "DataVisualization",
  //     name: "Data Visualization"
  //   },
  //   {
  //     id: "PredictiveAnalytics",
  //     name: "Predictive Analytics"
  //   },
  //   {
  //     id: "NaturalLanguageProcessing",
  //     name: "Natural Language Processing"
  //   },
  //   {
  //     id: "ImageProcessing",
  //     name: "Image Processing"
  //   },
  //   {
  //     id: "DeepLearning",
  //     name: "Deep Learning"
  //   },
  //   {
  //     id: "NeuralNetworks",
  //     name: "Neural Networks"
  //   },
  //   {
  //     id: "Robotics",
  //     name: "Robotics"
  //   },
  //   {
  //     id: "VirtualReality",
  //     name: "Virtual Reality"
  //   },
  //   {
  //     id: "AugmentedReality",
  //     name: "Augmented Reality"
  //   }
  // ];
    

const locations = [  
    {
      id: 1,
      name: "Tel Aviv"
    },
    {
      id: 2,
      name: "Jerusalem"
    },
    {
      id: 3,
      name: "Haifa"
    },
    {
      id: 4,
      name: "Rishon LeZion"
    },
    {
      id: 5,
      name: "Petah Tikva"
    },
    {
      id: 6,
      name: "Ashdod"
    },
    {
      id: 7,
      name: "Netanya"
    },
    {
      id: 8,
      name: "Beer Sheva"
    },
    {
      id: 9,
      name: "Bnei Brak"
    },
    {
      id: 10,
      name: "Rehovot"
    },
    {
      id: 11,
      name: "Bat Yam"
    },
    {
      id: 12,
      name: "Nahariya"
    },
    {
      id: 13,
      name: "Lod"
    },
    {
      id: 14,
      name: "Ashkelon"
    },
    {
      id: 15,
      name: "Tiberias"
    },
    {
      id: 16,
      name: "Eilat"
    },
    {
      id: 17,
      name: "Herzliya"
    },
    {
      id: 18,
      name: "Kfar Saba"
    },
    {
      id: 19,
      name: "Ra'anana"
    },
    {
      id: 20,
      name: "Acre",
    },
    {
      id: 21,
      name: "Modi'in"
    },
    {
      id: 22,
      name: "Beitar Illit"
    },
    {
      id: 23,
      name: "Hod HaSharon"
    },
    {
      id: 24,
      name: "Ramat Gan"
    },
    {
      id: 25,
      name: "Ramla"
    },
    {
      id: 26,
      name: "Nazareth"
    },
    {
      id: 27,
      name: "Rehovot"
    },
    {
      id: 28,
      name: "Beersheba"
    },
    {
      id: 29,
      name: "Afula"
    },
    {
      id: 30,
      name: "Holon"
    },
    {
      id: 31,
      name: "Sderot"
    },
    {
      id: 32,
      name: "Givatayim"
    },
    {
      id: 33,
      name: "Lod"
    },
    {
      id: 34,
      name: "Maalot-Tarshiha"
    },
    {
      id: 35,
      name: "Arad"
    },
    {
      id: 36,
      name: "Hod HaSharon"
    },
    {
      id: 37,
      name: "Hadera"
    },
    {
      id: 38,
      name: "Kiryat Gat"
    },
    {
      id: 39,
      name: "Nahariya"
    },
    {
      id: 40,
      name: "Karmiel"
    },
    {
      id: 41,
      name: "Tiberias"
    },
    {
      id: 42,
      name: "Eilat"
    },
    {
      id: 43,
      name: "Ramat HaSharon"
    },
    {
      id: 44,
      name: "Migdal HaEmek"
    },
    {
      id: 45,
      name: "Kiryat Motzkin"
    },
    {
      id: 46,
      name: "Ofakim"
    },
    {
      id: 47,
      name: "Sakhnin"
    },
    {
      id: 48,
      name: "Tamra"
    },
    {
      id: 49,
      name: "Netivot"
    },
    {
      id: 50,
      name: "Tirat Carmel"
    }
  ]

  const fieldOfStudies = [
    { id: 1, name: "Computer Science" },
    { id: 2, name: "Engineering" },
    { id: 3, name: "Business Administration" },
    { id: 4, name: "Psychology" },
    { id: 5, name: "Nursing" },
    { id: 6, name: "Biology" },
    { id: 7, name: "Economics" },
    { id: 8, name: "Education" },
    { id: 9, name: "Political Science" },
    { id: 10, name: "Communication Studies" },
    { id: 11, name: "English Literature" },
    { id: 12, name: "Mathematics" },
    { id: 13, name: "Sociology" },
    { id: 14, name: "Marketing" },
    { id: 15, name: "History" },
    { id: 16, name: "Finance" },
    { id: 17, name: "Environmental Science" },
    { id: 18, name: "Chemistry" },
    { id: 19, name: "Graphic Design" },
    { id: 20, name: "Philosophy" },
    { id: 21, name: "Physics" },
    { id: 22, name: "Human Resource Management" },
    { id: 23, name: "International Relations" },
    { id: 24, name: "Art History" },
    { id: 25, name: "Linguistics" },
    { id: 26, name: "Anthropology" },
    { id: 27, name: "Public Health" },
    { id: 28, name: "Architecture" },
    { id: 29, name: "Music" },
    { id: 30, name: "Journalism" }
  ];
  
  export {jobs,tabPanes, candidates,locations, skills, professionalTitles, fieldOfStudies }