import leakDetection from "../images/services/leak-detection.png";
import lowWater from "../images/services/low-water.png";
import tapRepairs from "../images/services/tap-repairs.png";
import toiletRepairs from "../images/services/toilet-repairs.png";
import emergency from "../images/services/emergency.png";

export const services = [
  {
    name: "Emergency",
    desc: "Not only can leaks be unsightly, but if left untreated for too long, they can cause serious damage to the building and more importantly, building foundations.",
    img: emergency,
  },
  {
    name: "Leakage",
    desc: "Not only can leaks be unsightly, but if left untreated for too long, they can cause serious damage to the building and more importantly, building foundations.",
    img: leakDetection,
  },
  {
    name: "Toilet Repairs",
    desc: "Are you struggling with an overflowing toilet, mysterious leaks, or a clogged pipe? These are all common issues and signs that your toilet needs repairing. ",
    img: toiletRepairs,
  },
  {
    name: "Low water pressure",
    desc: "A multitude of reasons can cause water shortages, from environmental issues such as drought or contamination to infrastructure failure like broken pipes. ",
    img: lowWater,
  },
  {
    name: "Tap Repairs",
    desc: "A leaking tap wastes a surprisingly large amount of water, leading to costly water bills, so it’s important that it is fixed as soon as possible.",
    img: tapRepairs,
  },
];
