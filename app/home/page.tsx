"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Clock,
  MapPin,
  Menu,
  Play,
  Star,
  Trophy,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Venue1Image from "@/public/venue1.jpeg";
import Venue2Image from "@/public/venue2.jpeg";
import Venue3Image from "@/public/venue3.png";
import CricketImage from "@/public/Cricket.jpeg";
import FootBallImage from "@/public/FootBall.jpeg";
import { getMe } from "@/lib/services/me";
import { useAuth } from "../_context/AuthContext";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
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

export default function HomePage() {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [isToken, setIsToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const getData = async () => {
        try {
          const getMeData = await getMe();
          console.log("User: ", getData);
          // @ts-ignore
          setUser(getMeData);

        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      };
      getData();
    } else {
      // router.push("/auth");
    }
  }, [router]);

  console.log("User: ", user);

  const quickActions = [
    { icon: MapPin, label: "Book Turf", href: "/venues", color: "green" },
    { icon: Users, label: "Find Players", href: "/players", color: "blue" },
    { icon: Users, label: "Find Teams", href: "/teams", color: "purple" },
    {
      icon: Trophy,
      label: "Tournaments",
      href: "/tournaments",
      color: "orange",
    },
  ];

  const featuredVenues = [
    {
      id: 1,
      name: "Elite Sports Arena",
      location: "Downtown",
      rating: 4.8,
      price: "₹800/hour",
      image: Venue1Image,
      amenities: ["Parking", "Changing Room"],
    },
    {
      id: 2,
      name: "Champions Ground",
      location: "City Center",
      rating: 4.9,
      price: "₹1200/hour",
      image: Venue2Image,
      amenities: ["AC Lounge", "Cafeteria", "Equipment"],
    },
    {
      id: 3,
      name: "Victory Field",
      location: "Sports Complex",
      rating: 4.7,
      price: "₹600/hour",
      image: Venue3Image,
      amenities: ["Parking", "Washroom", "Water"],
    },
  ];

  const upcomingMatches = [
    {
      team1: "Thunder Bolts",
      team2: "Lightning FC",
      time: "6:00 PM",
      venue: "Elite Arena",
      sport: "Football",
    },
    {
      team1: "Royal Strikers",
      team2: "Power Hitters",
      time: "7:30 PM",
      venue: "Champions Ground",
      sport: "Cricket",
    },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-lg border-b border-gray-700"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  FlexField
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-white">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button> */}

              <Link href="/profile">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-300 hover:text-white"
                >
                  <User className="w-5 h-5" />
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-300 hover:text-white"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div className="mb-8" {...fadeInUp}>
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">
            Welcome back, <span className="text-green-400">{user.playerName}!</span>
          </h1>
          <p className="text-gray-400 text-lg">Ready for your next game?</p>
        </motion.div>

        {/* Search Bar */}
        {/* <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search venues, players, or tournaments..."
              className="pl-12 pr-16 py-6 text-lg border-gray-600 bg-gray-800/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500 rounded-2xl"
            />
            <Button
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-600 rounded-xl"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </motion.div> */}

        {/* Quick Actions */}
        <motion.div
          className="mb-12"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={action.href}>
                  <Card className="border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 bg-gray-800/50 backdrop-blur-sm cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 bg-${action.color}-900/50 border border-${action.color}-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4`}
                      >
                        <action.icon
                          className={`w-8 h-8 text-${action.color}-400`}
                        />
                      </div>
                      <h3 className="font-semibold text-gray-200">
                        {action.label}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Games Section */}
        <motion.div className="mb-12" {...fadeInUp}>
          {/* <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Choose Your Game</h2>
            <Link href="/games">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                View All
              </Button>
            </Link>
          </div> */}

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: "Cricket",
                players: "5,234 Active",
                venues: "156 Venues",
                image: CricketImage,
                href: "",
              },
              {
                name: "Football",
                players: "3,891 Active",
                venues: "98 Venues",
                image: FootBallImage,
                href: "",
              },
            ].map((game, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="group cursor-pointer"
              >
                <Link href={game.href}>
                  <Card className="overflow-hidden border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 bg-gray-800/50">
                    <div className="relative">
                      <Image
                        src={game.image || "/placeholder.svg"}
                        alt={game.name}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-2xl font-bold mb-2">{game.name}</h3>
                        <div className="flex items-center space-x-4">
                          <Badge className="bg-white/20 text-white hover:bg-white/30 border border-white/30">
                            {game.players}
                          </Badge>
                          <Badge className="bg-white/20 text-white hover:bg-white/30 border border-white/30">
                            {game.venues}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Venues */}
        <motion.div
          className="mb-12"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Venues</h2>
            <Link href="/venues">
              <Button
                variant="outline"
                className="border-gray-600 text-green-500 hover:bg-gray-800 font-bold"
              >
                View All
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVenues.map((venue, index) => (
              <motion.div
                key={venue.id}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="overflow-hidden border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 bg-gray-800/50">
                  <div className="relative">
                    <Image
                      src={venue.image || "/placeholder.svg"}
                      alt={venue.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      {/* <Button
                        size="icon"
                        variant="secondary"
                        className="w-8 h-8 bg-gray-800/80 hover:bg-gray-700 border border-gray-600"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="w-8 h-8 bg-gray-800/80 hover:bg-gray-700 border border-gray-600"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button> */}
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg group-hover:text-green-400 transition-colors">
                        {venue.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">
                          {venue.rating}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-400 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{venue.location}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {venue.amenities.map((amenity, amenityIndex) => (
                        <Badge
                          key={amenityIndex}
                          variant="secondary"
                          className="text-xs bg-gray-700 text-gray-300"
                        >
                          {amenity}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-green-400">
                        {venue.price}
                      </span>
                      {/* <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600"
                      >
                        Book Now
                      </Button> */}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Matches */}
        <motion.div className="mb-12" {...fadeInUp}>
          <h2 className="text-2xl font-bold mb-6">Upcoming Matches</h2>
          <div className="space-y-4">
            {upcomingMatches.map((match, index) => (
              <Card
                key={index}
                className="border border-gray-700 shadow-lg bg-gray-800/50"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Badge className="bg-blue-900/50 text-blue-400 border border-blue-500/30">
                        {match.sport}
                      </Badge>
                      <div>
                        <div className="font-semibold text-gray-200">
                          {match.team1} vs {match.team2}
                        </div>
                        <div className="text-sm text-gray-400 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {match.time} • {match.venue}
                        </div>
                      </div>
                    </div>
                    {/* <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      View Details
                    </Button> */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
