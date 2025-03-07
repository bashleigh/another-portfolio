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
}

export const workexperience: WorkExperience[] = [
  {
    startDate: {
      month: "05",
      year: "2021",
    },
    endDate: {
      month: new Date().getMonth().toString().padStart(2, "0"),
      year: new Date().getFullYear().toString(),
    },
    title: "Senior Platform Application Engineer, Manager",
    company: "Reapit Ltd",
    description: [
      "At Reapit I'm responsible for building developer tools for our internal and customer's developers. I have successfully built a working dynamic CI/CD pipeline tool to deploy PWA apps to AWS and I'm currently planning a verison 2 capable of deploying and maintaining backend application solutions.",
      "Despite the funky job title I'm not a manager. Within my team I'm almost self sufficient. However I have been supporting aspiring junior developers within the company by offering them support whenever I can.",
    ],
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
      "As a freelancer I had a various clients that I worked with to build and maintain their unique solutions. An interesting project I had was for Essex university where I built a graphical 'speed dial' to monitor gRPC calls to a server. I also attempted at developing my own applications for several business ideas using firebase and flutter to produce multi platform apps.",
    ],
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
      "At HomeserveNow I started a project to rebuild the entire platform to be more performative, organised and use more structured methodologies such as REST, IaC, SRP, open-closed and others. I've also maintained and improved our mobile app, admin dashboard and customer facing web site. Planned, designed, built and published homeserve's first public library https://github.com/Homeservenow/serverless-aws-handler At HomeserveNow we used AWS, TypeScript, lambdas, cognito, react, react-native, SQS, SES, pusher, expo and others.",
    ],
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
      "At Velocity Black I'm responsible for developing the infrastructure for Velocity Black's newest technology in the industry. I'm currently within a team of 3 and primarily build a variety of applications for Velocity's systems using mainly TypeScript with NestJS. During my time at VB I used kubernetes, TypeScript, Google Cloud Platform, NestJS, React and others.",
    ],
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
      "My time at Ansta I have delved into many new languages, experiences and server architecture. I've worked on maintaining small CMS', built native apps and PWAs to building systems capable of thousands of concurrent uses.",
      "I'm now in a position where I'm planning, scheduling and appling new projects and systems within my deadlines and communicating with my clients and colleagues. Whilst at Ansta I used PHP, Laravel, Lumen, a Custom PHP framework, A custom PWA framework, Debian, CentOS, React, bootstrap, React-Native, Expo and produced a dynamic web page for Stamford Bridge's stadium displays.",
    ],
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
      "During my time at DotFive I gained an extremely considerable amount of experience in Laravel and package management. I was tasked with assisting in the build of a property sales system called LegalZoom for a company called Beaumount legal. I also developed a wine and whiskey review based site and API. Working on a custom built framework written in a custom language I learnt a great deal of how a language and framework should not be maintained. A 7 year project without a goal or use is an extremely costly blackhole! At DotFive I used various languages and frameworks, mainly PHP, Laravel and jQuery.",
    ],
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
      "My main task at Merali Digital was to maintain and updating a system built in Zend 1.4 for managing and documenting opticians test results and patients. Patients requiring attention would be referred to hospital via fax.",
      "During my extremely long journey to work I used the time to experiment with Codeigniter and other frameworks such as Symfony and Laravel.",
    ],
  },
]
