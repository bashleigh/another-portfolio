type WorkExperience = {
  startDate: {
    month: string
    year: string
  }
  endDate: {
    month: string
    year: string
  }
  title: string
  company: string
  description: string[]
  exert: string
}

export const workexperience: WorkExperience[] = [
  {
    startDate: {
      month: "05",
      year: "2021",
    },
    endDate: {
      month: (new Date().getMonth() + 1).toString().padStart(2, "0"),
      year: new Date().getFullYear().toString(),
    },
    title: "Manager, Engineering, Platform Applications",
    company: "Reapit Ltd",
    description: [
      "I have successfully built a working dynamic CI/CD pipeline tool to deploy PWA apps to AWS and I'm currently planning a verison 2 capable of deploying and maintaining backend application solutions.",
      "Despite the funky job title I'm not a manager. Within my team I'm almost self sufficient. However I have been supporting aspiring junior developers within the company by offering them support whenever I can.",
    ],
    exert:
      "At Reapit I'm responsible for building and maintaining internal and external developer tools within the business",
  },
  {
    startDate: {
      month: "01",
      year: "2021",
    },
    endDate: {
      month: "05",
      year: "2021",
    },
    title: "Everything",
    company: "Freelance",
    description: [
      "An interesting project I had was for Essex university where I built a graphical 'speed dial' to monitor gRPC calls to a server. I also attempted at developing my own applications for several business ideas using firebase and flutter to produce multi platform apps.",
    ],
    exert:
      "As a freelancer I had a various clients that I worked with to build and maintain their unique solutions.",
  },
  {
    startDate: {
      month: "05",
      year: "2020",
    },
    endDate: {
      month: "12",
      year: "2020",
    },
    title: "Senior Fullstack Developer",
    company: "HomeServeNow",
    description: [
      "Organised and implemented more structured methodologies such as REST, IaC, SRP, open-closed and others. I've also maintained and improved our mobile app, admin dashboard and customer facing web site. Planned, designed, built and published homeserve's first public library serverless-aws-handler At HomeserveNow we used AWS, TypeScript, lambdas, cognito, react, react-native, SQS, SES, pusher, expo and others.",
    ],
    exert:
      "At HomeserveNow I was tasked with improving the architecture of a greenfield project.",
  },
  {
    startDate: {
      month: "08",
      year: "2019",
    },
    endDate: {
      month: "04",
      year: "2020",
    },
    title: "Senior JavaScript Developer",
    company: "Velocity Black",
    description: [
      "I persisted within a team of 3 and primarily build a variety of applications for Velocity's systems using mainly TypeScript with NestJS. During my time at VB I used kubernetes, TypeScript, Google Cloud Platform, NestJS, React and others.",
    ],
    exert:
      "At Velocity Black, I was responsible for developing a reliable and scalable concierge messaging platform.",
  },
  {
    startDate: {
      month: "05",
      year: "2018",
    },
    endDate: {
      month: "07",
      year: "2019",
    },
    title: "Developer",
    company: "Wi-Q",
    description: [
      "At Wi-Q I develop micro services using TypeScript, PHP with symfony and Nodejs to deliver emails, url shortening, link click tracking, machine learning Facebook messenger bot to answer questions with defined answers. I also architectured their promotion handling system and their batch action/job system for handling serval tasks simultaneously.",
      "At Wi-Q I used PHP, symfony, kubernetes, Google Cloud Platform, react, nodejs, express, rabbitMQ (AMQP) and others.",
    ],
    exert: "",
  },
  {
    startDate: {
      month: "03",
      year: "2017",
    },
    endDate: {
      month: "05",
      year: "2018",
    },
    title: "Senior Software Engineer",
    company: "Ansta Ltd",
    description: [
      "I've worked on maintaining small CMS', built native apps and PWAs to building systems capable of thousands of concurrent uses.",
      "I'm now in a position where I'm planning, scheduling and appling new projects and systems within my deadlines and communicating with my clients and colleagues. Whilst at Ansta I used PHP, Laravel, Lumen, a Custom PHP framework, A custom PWA framework, Debian, CentOS, React, bootstrap, React-Native, Expo and produced a dynamic web page for Stamford Bridge's stadium displays.",
    ],
    exert:
      "My time at Ansta I delved into many new languages, experiences and server architecture.",
  },
  {
    startDate: {
      month: "06",
      year: "2016",
    },
    endDate: {
      month: "03",
      year: "2017",
    },
    title: "Web Developer",
    company: "DotFive",
    description: [
      "I was tasked with assisting in the build of a property sales system called LegalZoom for a company called Beaumount legal. I also developed a wine and whiskey review based site and API. Working on a custom built framework written in a custom language I learnt a great deal of how a language and framework should not be maintained. A 7 year project without a goal or use is an extremely costly blackhole! At DotFive I used various languages and frameworks, mainly PHP, Laravel and jQuery.",
    ],
    exert:
      "During my time at DotFive I gained an extremely considerable amount of experience in Laravel and package management",
  },
  {
    startDate: {
      month: "10",
      year: "2015",
    },
    endDate: {
      month: "06",
      year: "2016",
    },
    title: "Web Developer",
    company: "Merali Digital",
    description: [
      "Patients requiring attention would be referred to hospital via fax.",
      "During my extremely long journey to work I used the time to experiment with Codeigniter and other frameworks such as Symfony and Laravel.",
    ],
    exert:
      "My main task at Merali Digital was to maintain and updating a system built in Zend 1.4 for managing and documenting opticians test results.",
  },
]
