import { SiPostman } from "react-icons/si";
import { SiRabbitmq } from "react-icons/si";
import { TbBrandAzure } from "react-icons/tb";
import { FaAws } from "react-icons/fa";
import { FaSalesforce } from "react-icons/fa";
import { SiApachespark, SiApachekafka, SiApachehadoop, SiApachehive, SiApachecassandra, SiNeo4J } from "react-icons/si";
import { DiMongodb } from "react-icons/di";
import { FaPython } from "react-icons/fa";
import { IoLogoTableau } from "react-icons/io5";
import { FaSquareUpwork } from "react-icons/fa6";
import { VscAzure, VscAzureDevops } from "react-icons/vsc";
import { SiPostgresql, SiMysql, SiApacheairflow, SiApachesuperset, SiDatabricks } from "react-icons/si";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { FaRegSnowflake } from "react-icons/fa";
import { IconType } from "react-icons";

import {
  HiArrowUpRight,
  HiOutlineLink,
  HiArrowTopRightOnSquare,
  HiEnvelope,
  HiCalendarDays,
  HiArrowRight,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineDocument,
  HiOutlineGlobeAsiaAustralia,
  HiOutlineRocketLaunch,
} from "react-icons/hi2";

import {
  PiHouseDuotone,
  PiUserCircleDuotone,
  PiGridFourDuotone,
  PiBookBookmarkDuotone,
  PiImageDuotone,
  PiMedalDuotone,
  PiPlayDuotone,
} from "react-icons/pi";

import {
  SiJavascript,
  SiNextdotjs,
  SiFigma,
  SiSupabase,
} from "react-icons/si";

import { FaDiscord, FaGithub, FaLinkedin, FaX, FaThreads, FaXTwitter, FaFacebook, FaPinterest, FaWhatsapp, FaReddit, FaTelegram, } from "react-icons/fa6";

export const iconLibrary: Record<string, IconType> = {
  postman: SiPostman,
  rabbitmq: SiRabbitmq,
  azureBrand: TbBrandAzure,
  aws: FaAws,
  salesforce: FaSalesforce,
  apacheSpark: SiApachespark,
  apacheKafka: SiApachekafka,
  apacheHadoop: SiApachehadoop,
  apacheHive: SiApachehive,
  apacheCassandra: SiApachecassandra,
  neo4j: SiNeo4J,
  mongodb: DiMongodb,
  python: FaPython,
  tableau: IoLogoTableau,
  upwork: FaSquareUpwork,
  azure: VscAzure,
  azureDevops: VscAzureDevops,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  apacheAirflow: SiApacheairflow,
  apacheSuperset: SiApachesuperset,
  databricks: SiDatabricks,
  googleAnalytics: TbBrandGoogleAnalytics,
  snowflake: FaRegSnowflake,
  arrowUpRight: HiArrowUpRight,
  arrowRight: HiArrowRight,
  email: HiEnvelope,
  globe: HiOutlineGlobeAsiaAustralia,
  person: PiUserCircleDuotone,
  grid: PiGridFourDuotone,
  book: PiBookBookmarkDuotone,
  play: PiPlayDuotone,
  medal: PiMedalDuotone,
  openLink: HiOutlineLink,
  calendar: HiCalendarDays,
  home: PiHouseDuotone,
  gallery: PiImageDuotone,
  discord: FaDiscord,
  eye: HiOutlineEye,
  eyeOff: HiOutlineEyeSlash,
  github: FaGithub,
  linkedin: FaLinkedin,
  x: FaX,
  twitter: FaXTwitter,
  threads: FaThreads,
  arrowUpRightFromSquare: HiArrowTopRightOnSquare,
  document: HiOutlineDocument,
  rocket: HiOutlineRocketLaunch,
  javascript: SiJavascript,
  nextjs: SiNextdotjs,
  supabase: SiSupabase,
  figma: SiFigma,
  facebook: FaFacebook,
  pinterest: FaPinterest,
  whatsapp: FaWhatsapp,
  reddit: FaReddit,
  telegram: FaTelegram,
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;
