import StreamLabsLogo from "../assets/streamlabs-logo.png";
import BroadcastlyLogo from "../assets/broadcastly-logo.png";
import LiveStreamerLogo from "../assets/livestreamer-logo.png";
import CloudCastLogo from "../assets/cloudcast-logo.png";

import streamImage from "../assets/streamer.jpeg";
import chart from "../assets/chart.png";
import optimize from "../assets/optimize.jpeg";
import audienceEngagementImage from "../assets/audience.jpeg";
import monetizeImage from "../assets/monetize.jpeg";
import automationImage from "../assets/automation.jpeg";
import user1 from "../assets/user1.jpeg";
import user2 from "../assets/user2.jpeg";
import user3 from "../assets/user3.jpeg";
import user4 from "../assets/user4.jpeg";
import user5 from "../assets/user5.jpeg";
import user6 from "../assets/user6.jpeg";

// import {
//   RiBarChart2Line,
//   RiSettings2Line,
//   RiTeamLine,
//   RiTwitchLine,
//   RiYoutubeLine,
//   RiCalendarLine,
// } from "@remixicon/react";

import { AiOutlineBarChart } from "react-icons/ai";
import { AiOutlineSetting } from "react-icons/ai";
import { AiOutlineTeam } from "react-icons/ai";
import { AiFillAlert } from "react-icons/ai";
import { AiOutlineYoutube } from "react-icons/ai";
import { AiOutlineRadiusUpright } from "react-icons/ai";

export const HERO_CONTENT = {
  badgeText: "🚀 New Feature: Stream Analytics 2.0 Now Live!",
  mainHeading: "La plateforme  \n d'hébergement Ultme",
  subHeading:
    "solutions d’hébergement web performantes et des services de gestion de noms de domaine adaptés à vos besoins.",
  callToAction: {
    primary: "Commencer Maintenant",
    secondary: "Nouveau Nom de domaine",
  },
  trustedByText: "Trusted by Leading Streaming Brands & Creators",
};

export const BRAND_LOGOS = [
  { src: StreamLabsLogo, alt: "StreamLabs" },
  { src: BroadcastlyLogo, alt: "Broadcastly" },
  { src: LiveStreamerLogo, alt: "LiveStreamer" },
  { src: CloudCastLogo, alt: "CloudCast" },
];

export const SERVICES = {
  sectionTitle: "Nos Services",
  sectionDescription:
    "Stream like a pro with our 6-step process. From setup to performance tracking, we've got everything you need to elevate your streaming experience.",
  services: [
    {
      title: "Hebergement Web",
      description:
        "Easily configure your streaming environment with our user-friendly tools. Connect to Twitch, YouTube, and more in minutes.",
      link: {
        to: "/service/:service",
        label: "Voir Plus",
      },
    },
    {
      title: "Full Stack Programing",
      description:
        "Interact with your audience in real-time through custom alerts, chat overlays, and live notifications.",
      link: {
        to: "/service/:service",
        label: "Voir Plus",
      },
    },
    {
      title: "Nom de Domaines",
      description:
        "Monitor your stream’s performance in real-time with detailed analytics and viewer engagement insights.",
      link: {
        to: "/service/:service",
        label: "Voir Plus",
      },
    },
  ],
};

export const POPULAR_DOMAINS = {
  sectionTitle: "Choisissez parmi les domaines les plus populaires",
  sectionDescription:
    "Utilisez des extensions de domaines populaires pour permettre à votre client de trouver plus facilement votre entreprise en ligne.",
  popular: [
    {
      title: ".COM",
      description:
        "Créez la confiance avec les noms de domaine les plus connus.",
      price: {
        pricerange: "US$",
        priceamount: "13.76",
        domaintime: "/ans"
      },
    },
    {
      title: ".ORG",
      description:
        "Présentez votre organisation avec l'extension de domaine connue pour les organisations.",
      price: {
        pricerange: "US$",
        priceamount: "16.61",
        domaintime: "/ans"
      },
    },
    {
      title: ".ME",
      description:
        "Pour votre portfolio personnel ou votre blog, cette extension est la meilleure de tous les temps.",
      price: {
        pricerange: "US$",
        priceamount: "29.9",
        domaintime: "/ans"
      },
    },
  ],
};

export const DOMAINS = {
  domains: [
    {
      title: ".COM",
      price: "$13.76 USD/ans",
    },
    {
      title: ".NET",
      price: "$17.60 USD/ans",
    },
    {
      title: ".ORG",
      price: "$16.61 USD/ans",
    },
    {
      title: ".INFO",
      price: "$26.10 USD/ans",
    },
    {
      title: ".ME",
      price: "$29.29 USD/ans",
    },
    {
      title: ".MOBI",
      price: "$37.00 USD/ans",
    },
    {
      title: ".BLOG",
      price: "$29.52 USD/ans",
    },
    {
      title: ".SITE",
      price: "$34.23 USD/amns",
    },
  ],
};

export const KEY_FEATURES_CONTENT = {
  sectionTitle: "Stream Smarter with These Key Features",
  sectionDescription:
    "Everything you need to enhance your streaming experience, all in one place.",
  features: [
    {
      id: 1,
      icon: <AiOutlineBarChart className="w-8 h-8" />,
      title: "Real-Time Stream Analytics",
      description:
        "Track your audience engagement, viewer count, and performance in real-time.",
    },
    {
      id: 2,
      icon: <AiOutlineSetting className="w-8 h-8" />,
      title: "Automated Stream Management",
      description:
        "Set up automated alerts, stream schedules, and more with ease.",
    },
    {
      id: 3,
      icon: <AiOutlineTeam className="w-8 h-8" />,
      title: "Audience Engagement Tools",
      description:
        "Interact with your audience through custom alerts, chat integrations, and giveaways.",
    },
    {
      id: 4,
      icon: <AiFillAlert className="w-8 h-8" />,
      title: "Twitch Integration",
      description:
        "Seamlessly connect with Twitch to automate alerts, manage subscribers, and track donations.",
    },
    {
      id: 5,
      icon: <AiOutlineYoutube className="w-8 h-8" />,
      title: "YouTube Streaming Support",
      description:
        "Go live on YouTube with built-in tools for managing chats, subscribers, and more.",
    },
    {
      id: 6,
      icon: <AiOutlineRadiusUpright className="w-8 h-8" />,
      title: "Schedule Streams",
      description:
        "Plan and schedule your streams ahead of time, with reminders sent to your audience.",
    },
  ],
};

export const PLANS_CONTENT = {
  sectionTitle: "Choose Your Plan",
  sectionDescription:
    "Streamerzz offers flexible pricing plans to fit every streamer’s needs, from beginner to pro.",
  popularBadge: "Most Popular",
  ctaText: "Get Started",
  plans: [
    {
      name: "Basic",
      price: "$9.99/month",
      description:
        "Perfect for beginners just starting their streaming journey.",
      features: [
        "Basic analytics",
        "Custom overlays",
        "Viewer engagement tools",
        "Stream up to 720p",
      ],
    },
    {
      name: "Pro",
      price: "$19.99/month",
      description:
        "For streamers who want more advanced tools to grow their audience.",
      features: [
        "Advanced analytics",
        "Custom alerts & notifications",
        "HD streaming up to 1080p",
        "Real-time audience insights",
        "Unlimited support",
      ],
      popular: true,
    },
    {
      name: "Elite",
      price: "$49.99/month",
      description:
        "For professional streamers who need cutting-edge tools and insights.",
      features: [
        "Premium analytics & reporting",
        "4K Ultra HD streaming",
        "Dedicated account manager",
        "Full API access",
        "Custom branding & overlays",
      ],
    },
  ],
};

export const TESTIMONIALS_CONTENT = {
  sectionTitle: "What Our Streamers Say",
  sectionDescription:
    "Hear from some of the top streamers who use Streamerzz to engage with their audience and grow their channels.",
  reviews: [
    {
      name: "Alice Johnson",
      title: "Content Creator",
      review:
        "Streamerzz has revolutionized the way we manage our content subscriptions. The intuitive dashboard and real-time analytics have made it easier to track our progress and optimize our offerings. Highly recommended!",
      image: user1,
    },
    {
      name: "Bob Smith",
      title: "Marketing Specialist",
      review:
        "The team at Streamerzz has been fantastic! Their support is responsive and knowledgeable. The platform itself is versatile and has helped us streamline our subscription management, saving us time and increasing efficiency.",
      image: user2,
    },
    {
      name: "Carla Mendes",
      title: "Product Manager",
      review:
        "Streamerzz's automated billing and comprehensive analytics have been game-changers for our product team. We can now easily track user engagement and make data-driven decisions to enhance our service offerings.",
      image: user3,
    },
    {
      name: "David Lee",
      title: "Customer Success Manager",
      review:
        "Using Streamerzz, we’ve been able to increase our customer retention rates. The platform's user-friendly interface and powerful features have provided our customers with a seamless experience, leading to higher satisfaction.",
      image: user4,
    },
    {
      name: "Ella Fernandez",
      title: "UX Designer",
      review:
        "Streamerzz's flexibility and ease of use have made it a key tool in our design process. We can quickly adjust our subscription plans and monitor the impact on user engagement, allowing for a more responsive approach.",
      image: user5,
    },
    {
      name: "Frank Wilson",
      title: "Data Analyst",
      review:
        "Streamerzz provides us with detailed insights into our subscription metrics. The advanced reporting tools have enabled us to identify trends and make informed decisions to optimize our growth strategy.",
      image: user6,
    },
  ],
};

export const FOOTER_CONTENT = {
  sections: [
    {
      title: "TOOLS & SERVICES",
      links: [
        { text: "Real-time Analytics", url: "#" },
        { text: "Customizable Alerts", url: "#" },
        { text: "Integrated Chat Systems", url: "#" },
        { text: "Instant Notifications", url: "#" },
        { text: "Overlays & Visuals", url: "#" },
        { text: "Mobile Streaming Support", url: "#" },
        { text: "4K Stream Capabilities", url: "#" },
        { text: "Stream Scheduling Tool", url: "#" },
      ],
    },
    {
      title: "SUPPORT & RESOURCES",
      links: [
        { text: "Subscription Plans", url: "#" },
        { text: "Affiliate Program", url: "#" },
        { text: "Frequently Asked Questions", url: "#" },
        { text: "Company Blog", url: "#" },
        { text: "Subscribe to Newsletter", url: "#" },
        { text: "Latest Features", url: "#" },
        { text: "Merchandise Store", url: "#" },
        { text: "Workshops & Events", url: "#" },
      ],
    },
    {
      title: "CONNECT WITH US",
      links: [
        { text: "Twitter", url: "#" },
        { text: "Facebook", url: "#" },
        { text: "TikTok", url: "#" },
        { text: "LinkedIn", url: "#" },
        { text: "YouTube", url: "#" },
        { text: "Twitch", url: "#" },
        { text: "Discord", url: "#" },
      ],
    },
    {
      title: "LEARN & EXPLORE",
      links: [
        { text: "Engage Viewers with Custom Alerts", url: "#" },
        { text: "Top Streaming Strategies for New Streamers", url: "#" },
        { text: "How to Stream in 4K for Maximum Quality", url: "#" },
        { text: "Efficient Stream Scheduling Techniques", url: "#" },
        { text: "Using Analytics to Boost Engagement", url: "#" },
        { text: "Create Stunning Overlays for Streams", url: "#" },
        { text: "Advanced Analytics for Streamers: A Guide", url: "#" },
      ],
    },
  ],
  platformsText:
    "Streaming Platforms | Twitch | YouTube | Discord | Facebook Gaming",
  copyrightText: "© 2024 Streamerzz, Inc. All rights reserved.",
};
