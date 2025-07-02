"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CricketImage from "@/public/Cricket.jpeg";
import FootBallImage from "@/public/FootBall.jpeg";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Play,
  Shield,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-700"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Play className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
             FlexField 
            </span>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            {/* {["Home", "Venues", "About", "Contact"].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="text-gray-300 hover:text-green-400 transition-colors"
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))} */}
          </nav>

          <div className="flex items-center space-x-4">
            {/* <Link href="/auth">
              <Button
                variant="outline"
                className=" text-black hidden sm:inline-flex border-gray-600  hover:bg-gray-800 hover:text-white"
              >
                Login
              </Button>
            </Link> */}
            <Link href="/auth">
              <motion.div {...scaleOnHover}>
                <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                  Get Started
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Badge className="bg-green-900/50 text-green-400 hover:bg-green-900/70 mb-4 border border-green-500/30">
                  🏆 #1 Turf Booking Platform
                </Badge>
              </motion.div>

              <motion.h1
                className="text-5xl lg:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Your Turf,
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent block">
                  Your Squad,
                </span>
                Go Flex!!
              </motion.h1>

              <motion.p
                className="text-xl text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                FlexField makes it easy to find turfs, team up with players and compete in tournaments - All from one Simple Platform.  

              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link href="/auth">
                  <motion.div {...scaleOnHover}>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-lg px-8 py-6"
                    >
                      Start Booking <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.div>
                </Link>
                <motion.div {...scaleOnHover}>
                  {/* <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-6 border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Watch Demo <Play className="ml-2 w-5 h-5" />
                  </Button> */}
                </motion.div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-8 pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">500+</div>
                  <div className="text-sm text-gray-400">Venues</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">10K+</div>
                  <div className="text-sm text-gray-400">Players</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">1M+</div>
                  <div className="text-sm text-gray-400">Bookings</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative z-10">
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src={FootBallImage}
                    alt="Turf Booking App"
                    width={500}
                    height={600}
                    className="rounded-3xl shadow-2xl border border-gray-700"
                  />
                </motion.div>
              </div>

              {/* Floating Cards */}
              <motion.div
                className="absolute -top-4 -left-4 bg-gray-800 border border-gray-700 rounded-2xl p-4 shadow-xl"
                animate={{
                  y: [0, -10, 0],
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-300">
                    Available Now
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-4 bg-gray-800 border border-gray-700 rounded-2xl p-4 shadow-xl"
                animate={{
                  y: [0, 10, 0],
                  x: [0, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-gray-300">
                    4.9 Rating
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-green-500/20 rounded-full opacity-50"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/20 rounded-full opacity-30"
            animate={{
              scale: [1, 0.8, 1],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <Badge className="bg-blue-900/50 text-blue-400 hover:bg-blue-900/70 mb-4 border border-blue-500/30">
              ⚡ Features
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Everything You Need to
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent block">
                Play & Connect
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From booking venues to finding teammates, we've got all your
              sports needs covered
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: MapPin,
                title: "Find Venues",
                description:
                  "Discover premium turfs and sports venues near you with real-time availability",
                color: "green",
              },
              {
                icon: Users,
                title: "Connect Players",
                description:
                  "Find skilled players and build your dream team for any sport",
                color: "blue",
              },
              {
                icon: Trophy,
                title: "Join Tournaments",
                description:
                  "Participate in exciting tournaments and compete with the best teams",
                color: "purple",
              },
              {
                icon: Calendar,
                title: "Easy Booking",
                description:
                  "Book your favorite venues instantly with our seamless booking system",
                color: "orange",
              },
              {
                icon: Shield,
                title: "Secure Payments",
                description:
                  "Safe and secure payment processing with multiple payment options",
                color: "red",
                comingSoon: true,
              },
              {
                icon: Zap,
                title: "Instant Updates",
                description:
                  "Get real-time notifications about bookings, matches, and tournaments",
                color: "yellow",
                comingSoon: true,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="h-full border border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gray-800/50 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 bg-${feature.color}-900/50 border border-${feature.color}-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                    >
                      <feature.icon
                        className={`w-8 h-8 text-${feature.color}-400`}
                      />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-green-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                    {feature.comingSoon && (
                      <div className="absolute bottom-4 right-4 text-green-400 text-sm font-semibold">
                      Coming Soon...
                    </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sports Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <Badge className="bg-green-900/50 text-green-400 hover:bg-green-900/70 mb-4 border border-green-500/30">
              🏈 Sports
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Choose Your
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent block">
                Favorite Sport
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Cricket",
                image: CricketImage,
                venues: "200+ Venues",
                players: "5K+ Players",
              },
              {
                name: "Football",
                image: FootBallImage,
                venues: "150+ Venues",
                players: "3K+ Players",
              },
            ].map((sport, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <Card className="overflow-hidden border border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gray-800/50">
                  <div className="relative">
                    <Image
                      src={sport.image || "/placeholder.svg"}
                      alt={sport.name}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-3xl font-bold mb-2">{sport.name}</h3>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm bg-white/20 px-3 py-1 rounded-full border border-white/30">
                          {sport.venues}
                        </span>
                        <span className="text-sm bg-white/20 px-3 py-1 rounded-full border border-white/30">
                          {sport.players}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Start Playing?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of players who trust FlexField for their sports
              needs
            </p>
            <Link href="/auth">
              <motion.div {...scaleOnHover}>
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6"
                >
                  Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Play className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">FlexField</span>
              </div>
              <p className="text-gray-400">
                Your ultimate sports booking platform
              </p>
            </div>

            {[
              {
                title: "Platform",
                links: [
                  "Book Venues",
                  "Find Players",
                  "Join Teams",
                  "Tournaments",
                ],
              },
              {
                title: "Support",
                links: ["Help Center", "Contact Us", "FAQ", "Community"],
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Privacy", "Terms"],
              },
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        //href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FlexField. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
