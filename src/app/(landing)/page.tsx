'use client'
import { LandingCTA } from '@/designSystem/landing/LandingCTA'
import { LandingContainer } from '@/designSystem/landing/LandingContainer'
import LandingFAQ from '@/designSystem/landing/LandingFAQ'
import { LandingFeatures } from '@/designSystem/landing/LandingFeatures'
import { LandingHero } from '@/designSystem/landing/LandingHero'
import { LandingHowItWorks } from '@/designSystem/landing/LandingHowItWorks'
import { LandingPainPoints } from '@/designSystem/landing/LandingPainPoints'
import { LandingPricing } from '@/designSystem/landing/LandingPricing'
import { LandingSocialProof } from '@/designSystem/landing/LandingSocialProof'
import { LandingSocialRating } from '@/designSystem/landing/LandingSocialRating'
import { LandingTestimonials } from '@/designSystem/landing/LandingTestimonials'
import {
  ShoppingCartOutlined,
  GiftOutlined,
  RocketOutlined,
  SafetyOutlined,
  TeamOutlined,
  DollarOutlined,
} from '@ant-design/icons'

export default function LandingPage() {
  const features = [
    {
      heading: 'Seamless Shopping Experience',
      description:
        'Browse and purchase with ease, reducing cart abandonment by up to 30%.',
      icon: <ShoppingCartOutlined />,
    },
    {
      heading: 'Rewarding Loyalty Program',
      description:
        'Earn points on every purchase, boosting customer retention by 25%.',
      icon: <GiftOutlined />,
    },
    {
      heading: 'Lightning-Fast Performance',
      description:
        'Enjoy blazing-fast load times, improving conversion rates by 15%.',
      icon: <RocketOutlined />,
    },
    {
      heading: 'Secure Transactions',
      description:
        'Shop with confidence using our state-of-the-art security measures.',
      icon: <SafetyOutlined />,
    },
    {
      heading: 'Personalized Recommendations',
      description: "Discover products you'll love with AI-powered suggestions.",
      icon: <TeamOutlined />,
    },
    {
      heading: 'Competitive Pricing',
      description:
        'Get the best deals with our price matching and dynamic pricing.',
      icon: <DollarOutlined />,
    },
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      designation: 'Online Boutique Owner',
      content:
        'This eCommerce platform transformed my business. Sales are up 40% and customer retention has never been better!',
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: 'Michael Chen',
      designation: 'Tech Startup Founder',
      content:
        "The integrated loyalty program is a game-changer. Our customers love it, and we've seen a 30% increase in repeat purchases.",
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      name: 'Emma Rodriguez',
      designation: 'Fashion Influencer',
      content:
        "As someone who shops online frequently, this platform stands out. It's fast, intuitive, and the rewards program is addictive!",
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    },
    {
      name: 'David Thompson',
      designation: 'Digital Marketing Expert',
      content:
        "The personalized recommendations are spot-on. It's like having a personal shopper for every customer.",
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    },
    {
      name: 'Lisa Patel',
      designation: 'E-commerce Consultant',
      content:
        "I've worked with many platforms, but this one takes the cake. It's a complete solution that delivers results.",
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: 'John Smith',
      designation: 'Satisfied Customer',
      content:
        'Shopping here is a breeze. The interface is clean, checkout is quick, and I love earning points on my purchases!',
      avatar: 'https://randomuser.me/api/portraits/men/17.jpg',
    },
  ]

  const navItems = [
    {
      title: 'Features',
      link: '#features',
    },
    {
      title: 'Pricing',
      link: '#pricing',
    },
    {
      title: 'FAQ',
      link: '#faq',
    },
  ]

  const packages = [
    {
      title: 'Starter',
      description: 'Perfect for small businesses just getting started',
      monthly: 29,
      yearly: 290,
      features: ['Up to 500 products', 'Basic loyalty program', '24/7 support'],
    },
    {
      title: 'Growth',
      description: 'Ideal for growing businesses with expanding needs',
      monthly: 79,
      yearly: 790,
      features: [
        'Up to 5,000 products',
        'Advanced loyalty program',
        'Priority support',
        'AI-powered recommendations',
      ],
      highlight: true,
    },
    {
      title: 'Enterprise',
      description: 'For large-scale operations with custom requirements',
      monthly: 199,
      yearly: 1990,
      features: [
        'Unlimited products',
        'Custom loyalty program',
        'Dedicated account manager',
        'Advanced analytics',
      ],
    },
  ]

  const questionAnswers = [
    {
      question: 'How does the loyalty program work?',
      answer:
        'Our loyalty program rewards customers with points for every purchase. These points can be redeemed for discounts on future purchases, creating a cycle of engagement and repeat business.',
    },
    {
      question: 'Is the platform mobile-friendly?',
      answer:
        'Absolutely! Our platform is fully responsive and optimized for all devices, ensuring a seamless shopping experience whether customers are on desktop, tablet, or mobile.',
    },
    {
      question: 'Can I integrate my existing inventory system?',
      answer:
        'Yes, we offer seamless integration with most major inventory management systems. Our team can assist you in setting up the integration to ensure a smooth transition.',
    },
    {
      question: 'What kind of support do you offer?',
      answer:
        "We provide 24/7 customer support for all our clients. Depending on your plan, you'll have access to email support, live chat, or a dedicated account manager for enterprise clients.",
    },
  ]

  const logos = [
    { url: 'https://i.imgur.com/afwBIFK.png' },
    { url: 'https://i.imgur.com/LlloOPa.png' },
    { url: 'https://i.imgur.com/j8jPb4H.png' },
    { url: 'https://i.imgur.com/mJ1sZFv.png' },
  ]

  const steps = [
    {
      heading: 'Set Up Your Store',
      description:
        'Easily customize your online store with our intuitive dashboard.',
    },
    {
      heading: 'Add Your Products',
      description:
        'Upload your inventory and set up your product catalog in minutes.',
    },
    {
      heading: 'Configure Loyalty Program',
      description:
        'Tailor your rewards system to incentivize customer engagement.',
    },
    {
      heading: 'Launch and Grow',
      description:
        'Go live and watch your online business thrive with our powerful tools.',
    },
  ]

  const painPoints = [
    {
      emoji: '😓',
      title: 'Struggling with high cart abandonment rates',
    },
    {
      emoji: '😟',
      title: 'Losing customers to competitors',
    },
    {
      emoji: '🤯',
      title: 'Overwhelmed by complex, inefficient systems',
    },
  ]

  const avatarItems = [
    {
      src: 'https://randomuser.me/api/portraits/men/51.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/9.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/52.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title="Revolutionize Your Online Store: Boost Sales and Customer Loyalty"
        subtitle="Experience the future of eCommerce with our all-in-one platform. Increase conversions, retain customers, and watch your business soar."
        buttonText="Start Your Free Trial"
        pictureUrl="https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/f1kgcH-airaa-kkPw"
        socialProof={
          <LandingSocialRating
            avatarItems={avatarItems}
            numberOfUsers={10000}
            suffixText="from happy merchants"
          />
        }
      />
      <LandingSocialProof logos={logos} title="Trusted by Industry Leaders" />
      <LandingPainPoints
        title="Are You Losing Money and Customers? You're Not Alone."
        painPoints={painPoints}
      />
      <LandingHowItWorks
        title="Effortlessly Transform Your Online Business in 4 Simple Steps"
        steps={steps}
      />
      <LandingFeatures
        id="features"
        title="Empower Your eCommerce Journey with Cutting-Edge Features"
        subtitle="Discover how our platform can skyrocket your online sales and customer satisfaction"
        features={features}
      />
      <LandingTestimonials
        title="Success Stories: How Our Platform Transformed Businesses"
        subtitle="Join thousands of satisfied merchants who've revolutionized their online presence"
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title="Invest in Your eCommerce Success"
        subtitle="Choose the perfect plan to grow your online business"
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title="Got Questions? We've Got Answers"
        subtitle="Learn more about how our platform can work for you"
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title="Ready to Revolutionize Your Online Business?"
        subtitle="Join thousands of successful merchants and start your journey to eCommerce excellence today."
        buttonText="Start Your Free Trial Now"
        buttonLink="/register"
      />
    </LandingContainer>
  )
}
