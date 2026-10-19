import {
  Cloud,
  CreditCard,
  Database,
  Monitor,
  Palette,
  Server,
  Smartphone,
  Sparkles,
  Wrench,
} from 'lucide-react'
import {
  siApple,
  siExpo,
  siExpress,
  siFramer,
  siGithub,
  siGooglegemini,
  siGooglemaps,
  siJsonwebtokens,
  siLottiefiles,
  siNextdotjs,
  siNginx,
  siRazorpay,
  siSpringboot,
  siStripe,
  siWhatsapp,
} from 'simple-icons'

// Full-colour official logos from devicon
import reactLogo from 'devicon/icons/react/react-original.svg'
import html5Logo from 'devicon/icons/html5/html5-original.svg'
import css3Logo from 'devicon/icons/css3/css3-original.svg'
import tailwindLogo from 'devicon/icons/tailwindcss/tailwindcss-original.svg'
import javascriptLogo from 'devicon/icons/javascript/javascript-original.svg'
import typescriptLogo from 'devicon/icons/typescript/typescript-original.svg'
import viteLogo from 'devicon/icons/vitejs/vitejs-original.svg'
import javaLogo from 'devicon/icons/java/java-original.svg'
import nodejsLogo from 'devicon/icons/nodejs/nodejs-original.svg'
import pythonLogo from 'devicon/icons/python/python-original.svg'
import phpLogo from 'devicon/icons/php/php-original.svg'
import graphqlLogo from 'devicon/icons/graphql/graphql-plain.svg'
import androidLogo from 'devicon/icons/android/android-original.svg'
import flutterLogo from 'devicon/icons/flutter/flutter-original.svg'
import kotlinLogo from 'devicon/icons/kotlin/kotlin-original.svg'
import swiftLogo from 'devicon/icons/swift/swift-original.svg'
import firebaseLogo from 'devicon/icons/firebase/firebase-original.svg'
import mongodbLogo from 'devicon/icons/mongodb/mongodb-original.svg'
import postgresqlLogo from 'devicon/icons/postgresql/postgresql-original.svg'
import redisLogo from 'devicon/icons/redis/redis-original.svg'
import sqliteLogo from 'devicon/icons/sqlite/sqlite-original.svg'
import sqlServerLogo from 'devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg'
import mysqlRaw from 'devicon/icons/mysql/mysql-original.svg?raw'
import awsWordmark from 'devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg?raw'
import googleCloudLogo from 'devicon/icons/googlecloud/googlecloud-original.svg'
import azureLogo from 'devicon/icons/azure/azure-original.svg'
import dockerLogo from 'devicon/icons/docker/docker-original.svg'
import kubernetesLogo from 'devicon/icons/kubernetes/kubernetes-original.svg'
import githubActionsLogo from 'devicon/icons/githubactions/githubactions-original.svg'
import jenkinsLogo from 'devicon/icons/jenkins/jenkins-original.svg'
import gitLogo from 'devicon/icons/git/git-original.svg'
import postmanLogo from 'devicon/icons/postman/postman-original.svg'
import vscodeLogo from 'devicon/icons/vscode/vscode-original.svg'
import intellijLogo from 'devicon/icons/intellij/intellij-original.svg'
import eclipseLogo from 'devicon/icons/eclipse/eclipse-original.svg'
import jiraLogo from 'devicon/icons/jira/jira-original.svg'
import figmaLogo from 'devicon/icons/figma/figma-original.svg'
import xdLogo from 'devicon/icons/xd/xd-original.svg'
import photoshopLogo from 'devicon/icons/photoshop/photoshop-original.svg'
import illustratorLogo from 'devicon/icons/illustrator/illustrator-original.svg'
import canvaLogo from 'devicon/icons/canva/canva-original.svg'
import blenderLogo from 'devicon/icons/blender/blender-original.svg'

// OpenAI, Twilio and Oracle were removed from recent simple-icons releases;
// these are the official paths from simple-icons v11.15.0.
const siOpenaiLegacy = {
  hex: '412991',
  path: 'M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z',
}

const siOracleLegacy = {
  hex: 'F80000',
  path: 'M16.412 4.412h-8.82a7.588 7.588 0 0 0-.008 15.176h8.828a7.588 7.588 0 0 0 0-15.176zm-.193 12.502H7.786a4.915 4.915 0 0 1 0-9.828h8.433a4.914 4.914 0 1 1 0 9.828z',
}

const siTwilioLegacy = {
  hex: 'F22F46',
  path: 'M12 0C5.381-.008.008 5.352 0 11.971V12c0 6.64 5.359 12 12 12 6.64 0 12-5.36 12-12 0-6.641-5.36-12-12-12zm0 20.801c-4.846.015-8.786-3.904-8.801-8.75V12c-.014-4.846 3.904-8.786 8.75-8.801H12c4.847-.014 8.786 3.904 8.801 8.75V12c.015 4.847-3.904 8.786-8.75 8.801H12zm5.44-11.76c0 1.359-1.12 2.479-2.481 2.479-1.366-.007-2.472-1.113-2.479-2.479 0-1.361 1.12-2.481 2.479-2.481 1.361 0 2.481 1.12 2.481 2.481zm0 5.919c0 1.36-1.12 2.48-2.481 2.48-1.367-.008-2.473-1.114-2.479-2.48 0-1.359 1.12-2.479 2.479-2.479 1.361-.001 2.481 1.12 2.481 2.479zm-5.919 0c0 1.36-1.12 2.48-2.479 2.48-1.368-.007-2.475-1.113-2.481-2.48 0-1.359 1.12-2.479 2.481-2.479 1.358-.001 2.479 1.12 2.479 2.479zm0-5.919c0 1.359-1.12 2.479-2.479 2.479-1.367-.007-2.475-1.112-2.481-2.479 0-1.361 1.12-2.481 2.481-2.481 1.358 0 2.479 1.12 2.479 2.481z',
}

// The AWS wordmark text is dark navy; lighten it for the dark theme.
const awsWordmarkLight = awsWordmark.replace('fill="#252f3e"', 'fill="#f8fafc"')

// devicon's MySQL dolphin (#00618A) is too dark on navy; use the lighter
// official MySQL blue from simple-icons
const mysqlLight = mysqlRaw.replace('fill="#00618A"', 'fill="#4479A1"')

// Logo descriptors understood by <TechLogo>:
//   { src }          — full-colour image URL (devicon)
//   { svg }          — inline SVG markup
//   { path, color }  — single-path simple-icons glyph on a 24×24 grid
//   { lucide }       — generic glyph for non-brand items
const img = (name, src, glow) => ({ name, logo: { src }, glow })
const glyph = (name, icon, color) => ({
  name,
  logo: { path: icon.path, color: color ?? `#${icon.hex}` },
  glow: color ?? `#${icon.hex}`,
})

// Monochrome-black brand marks are rendered white on the navy theme
const WHITE = '#F8FAFC'

export const TECH_STACK = [
  {
    id: 'frontend',
    short: 'Frontend',
    title: 'Frontend Development',
    description: 'Modern, responsive and high-performance user interfaces.',
    icon: Monitor,
    techs: [
      img('React', reactLogo, '#61DAFB'),
      glyph('Next.js', siNextdotjs, WHITE),
      img('HTML5', html5Logo, '#E34F26'),
      img('CSS3', css3Logo, '#1572B6'),
      img('Tailwind CSS', tailwindLogo, '#38BDF8'),
      img('JavaScript', javascriptLogo, '#F7DF1E'),
      img('TypeScript', typescriptLogo, '#3178C6'),
      img('Vite', viteLogo, '#A855F7'),
    ],
  },
  {
    id: 'backend',
    short: 'Backend',
    title: 'Backend Development',
    description: 'Robust, scalable and secure server-side solutions.',
    icon: Server,
    techs: [
      img('Java', javaLogo, '#E76F00'),
      glyph('Spring Boot', siSpringboot),
      img('Node.js', nodejsLogo, '#5FA04E'),
      glyph('Express.js', siExpress, WHITE),
      img('Python', pythonLogo, '#FFD43B'),
      img('PHP', phpLogo, '#777BB4'),
      img('GraphQL', graphqlLogo, '#E10098'),
      glyph('JWT', siJsonwebtokens, '#D63AFF'),
    ],
  },
  {
    id: 'mobile',
    short: 'Mobile',
    title: 'Mobile App Development',
    description: 'Cross-platform and native mobile applications.',
    icon: Smartphone,
    techs: [
      img('Android', androidLogo, '#3DDC84'),
      glyph('iOS', siApple, WHITE),
      img('React Native', reactLogo, '#61DAFB'),
      img('Flutter', flutterLogo, '#02569B'),
      glyph('Expo', siExpo, WHITE),
      img('Kotlin', kotlinLogo, '#7F52FF'),
      img('Firebase', firebaseLogo, '#FFCA28'),
      img('Swift', swiftLogo, '#F05138'),
    ],
  },
  {
    id: 'databases',
    short: 'Databases',
    title: 'Databases',
    description: 'Reliable and high-performance data management.',
    icon: Database,
    techs: [
      { name: 'MySQL', logo: { svg: mysqlLight }, glow: '#4479A1' },
      img('MongoDB', mongodbLogo, '#47A248'),
      img('PostgreSQL', postgresqlLogo, '#4169E1'),
      img('Firebase', firebaseLogo, '#FFCA28'),
      img('Redis', redisLogo, '#DC382D'),
      img('SQLite', sqliteLogo, '#0F80CC'),
      glyph('Oracle', siOracleLegacy),
      img('SQL Server', sqlServerLogo, '#CC2927'),
    ],
  },
  {
    id: 'cloud',
    short: 'Cloud & DevOps',
    title: 'Cloud & DevOps',
    description: 'Deploy, scale and manage with modern cloud infrastructure.',
    icon: Cloud,
    techs: [
      { name: 'AWS', logo: { svg: awsWordmarkLight, wide: true }, glow: '#FF9900' },
      img('Google Cloud', googleCloudLogo, '#4285F4'),
      img('Azure', azureLogo, '#0078D4'),
      img('Docker', dockerLogo, '#2496ED'),
      img('Kubernetes', kubernetesLogo, '#326CE5'),
      img('GitHub Actions', githubActionsLogo, '#2088FF'),
      img('Jenkins', jenkinsLogo, '#D24939'),
      glyph('Nginx', siNginx),
    ],
  },
  {
    id: 'tools',
    short: 'Tools',
    title: 'Tools & Platforms',
    description: 'Development, collaboration and project management tools.',
    icon: Wrench,
    techs: [
      img('Git', gitLogo, '#F05032'),
      glyph('GitHub', siGithub, WHITE),
      img('Postman', postmanLogo, '#FF6C37'),
      img('VS Code', vscodeLogo, '#007ACC'),
      img('IntelliJ IDEA', intellijLogo, '#FE315D'),
      img('Eclipse', eclipseLogo, '#F7941E'),
      img('Figma', figmaLogo, '#A259FF'),
      img('Jira', jiraLogo, '#2684FF'),
    ],
  },
  {
    id: 'design',
    short: 'Design',
    title: 'UI/Design & Prototyping',
    description: 'Beautiful and user-centric designs for better experiences.',
    icon: Palette,
    techs: [
      img('Figma', figmaLogo, '#F24E1E'),
      img('Adobe XD', xdLogo, '#FF61F6'),
      img('Photoshop', photoshopLogo, '#31A8FF'),
      img('Illustrator', illustratorLogo, '#FF9A00'),
      glyph('Framer', siFramer, WHITE),
      img('Canva', canvaLogo, '#00C4CC'),
      glyph('Lottie', siLottiefiles),
      img('Blender', blenderLogo, '#F5792A'),
    ],
  },
  {
    id: 'ai-integrations',
    short: 'AI & Integrations',
    title: 'AI & Integrations',
    description: 'AI platforms, payments and third-party services we integrate.',
    icon: Sparkles,
    techs: [
      glyph('OpenAI', siOpenaiLegacy, WHITE),
      glyph('Gemini', siGooglegemini, '#8AB4F8'),
      glyph('Stripe', siStripe),
      // Razorpay's catalogue colour is near-black navy; use its logo light blue
      glyph('Razorpay', siRazorpay, '#3395FF'),
      glyph('Twilio', siTwilioLegacy),
      glyph('WhatsApp API', siWhatsapp),
      glyph('Google Maps', siGooglemaps),
      { name: 'Payment APIs', logo: { lucide: CreditCard }, glow: '#8750F7' },
    ],
  },
]

export const TECH_FILTERS = [{ id: 'all', short: 'All' }, ...TECH_STACK]
