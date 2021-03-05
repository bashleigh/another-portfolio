export enum ProjectStatus {
  ACTIVE = "active",
  CEASED = "ceased",
  ONHOLD = "on hold",
  PLANNING = "planning",
  COMPLETE = "complete",
}

export type Slide = {
  status: ProjectStatus;
  name: string;
  description: string;
  link?: string;
  technologies?: string[];
  image?: string;
};

export const slides: Slide[] = [
  {
    status: ProjectStatus.ACTIVE,
    name: "LineUp",
    description:
      "A football team line up builder for your social media! Customise your players, subs, colours, player highlight and even add your club's badge!",
    technologies: ["typescript", "gatsby", "football", "image rendering"],
    image: "lineup",
    link: "https://clever-visvesvaraya-0c4dc3.netlify.app/",
  },
  {
    status: ProjectStatus.ONHOLD,
    name: "Ruddr",
    description:
      "A PWA boat selling and buying marketplace platform. I'm planning on coming back to this and building a native app instead",
    technologies: [
      "typescript",
      "AWS EC2",
      "postgres",
      "react",
      "P2P marketplace",
    ],
    image: "ruddr",
  },
  {
    status: ProjectStatus.CEASED,
    name: "Ford & sons meat shop",
    description:
      "A quickly built click and collect website for my local butcher. Sadly the website was never published due to franchise issues. The good news however, is the site I built is still available if you wish to view it!",
    link: "https://adoring-villani-ca7b56.netlify.app/",
    technologies: ["gatsby", "typescript", "click & collect", "netlify"],
    image: "fordandsons",
  },
  {
    status: ProjectStatus.ACTIVE,
    name: "Showelli Entertainment",
    description: "My sister's dance agency website!",
    link: "https://showelli.co.uk",
    technologies: ["gatsby", "typescript", "netlify"],
    image: "showelli",
  },
  {
    status: ProjectStatus.PLANNING,
    name: "PosPal",
    description:
      "A mobile only, next generation EPOS system for sole traders and small retailers",
    technologies: [
      "typescript",
      "gcloud",
      "google functions",
      "mysql",
      "react",
      "flutter",
      "barcodes",
      "printers",
      "bluetooth",
      "payment gateways",
      "pub/sub",
      "RTDB",
      "sqlite",
      "google messaging",
    ],
    image: "pospal",
  },
  {
    status: ProjectStatus.PLANNING,
    name: "Trino",
    description:
      "A very secret project of mine that will change the highstreet forever!",
    technologies: ["typescript", "RTDB", "sqlite", "flutter"],
  },
  {
    status: ProjectStatus.ACTIVE,
    name: "Whip Round",
    description: "A collection project",
    technologies: ["firebase", "firebase auth", "firebase store", "flutter"],
  },
  {
    status: ProjectStatus.ACTIVE,
    name: "Typeorm polymorphic",
    description: "A polymorphic typescript repository package for typeorm",
    technologies: ["typeorm", "typescript", "mysql"],
    link: "https://github.com/bashleigh/typeorm-polymorphic",
  },
  {
    status: ProjectStatus.ACTIVE,
    name: "nestjs-typeorm-paginate",
    description: "A pagination function for nestjs + typeorm",
    technologies: ["nestjs", "typeorm", "mysql", "typescript"],
    link: "https://github.com/nestjsx/nestjs-typeorm-paginate",
  },
  {
    status: ProjectStatus.ACTIVE,
    name: "nestjs-config",
    description: "A config package for nestjs based on laravel",
    technologies: ["nestjs", "typescript"],
    link: "https://github.com/nestjsx/nestjs-config",
  },
];
