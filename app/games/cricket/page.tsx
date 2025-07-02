"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Users, Trophy, Calendar, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function CricketPage() {
  const quickActions = [
    { icon: MapPin, label: "Book Turf", href: "/venues?sport=cricket", color: "green" },
    { icon: Users, label: "Find Players", href: "/players?sport=cricket", color: "blue" },
    { icon: Users, label: "Find Teams", href: "/teams?sport=cricket", color: "purple" },
    { icon: Trophy, label: "Tournaments", href: "/tournaments?sport=cricket", color: "orange" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-lg border-b border-gray-700"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/home">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Cricket</h1>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div className="mb-12 text-center" {...fadeInUp}>
          <div className="relative mb-8">
            <Image
              src="/placeholder.svg?height=300&width=800"
              alt="Cricket"
              width={800}
              height={300}
              className="w-full h-64 object-cover rounded-3xl border border-gray-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-3xl" />
            <div className="absolute bottom-8 left-8 text-white">
              <h2 className="text-4xl font-bold mb-2">Cricket</h2>
              <div className="flex items-center space-x-4">
                <Badge className="bg-white/20 text-white border border-white/30">5,234 Active Players</Badge>
                <Badge className="bg-white/20 text-white border border-white/30">156 Venues</Badge>
                <Badge className="bg-white/20 text-white border border-white/30">24 Tournaments</Badge>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-6">What would you like to do?</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href={action.href}>
                  <Card className="border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 bg-gray-800/50 backdrop-blur-sm cursor-pointer h-full">
                    <CardContent className="p-8 text-center">
                      <div
                        className={`w-20 h-20 bg-${action.color}-900/50 border border-${action.color}-500/30 rounded-3xl flex items-center justify-center mx-auto mb-4`}
                      >
                        <action.icon className={`w-10 h-10 text-${action.color}-400`} />
                      </div>
                      <h4 className="font-bold text-lg text-gray-200">{action.label}</h4>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Popular Venues */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Popular Cricket Venues</h3>
              <Link href="/venues?sport=cricket">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  View All
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {[
                {
                  name: "Champions Cricket Ground",
                  location: "Sports Complex",
                  rating: 4.9,
                  price: "₹1000/hour",
                  image: "/placeholder.svg?height=150&width=200",
                },
                {
                  name: "Elite Cricket Arena",
                  location: "Downtown",
                  rating: 4.8,
                  price: "₹800/hour",
                  image: "/placeholder.svg?height=150&width=200",
                },
              ].map((venue, index) => (
                <Card
                  key={index}
                  className="border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 bg-gray-800/50"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={venue.image || "/placeholder.svg"}
                        alt={venue.name}
                        width={80}
                        height={60}
                        className="rounded-lg object-cover border border-gray-600"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-200">{venue.name}</h4>
                        <div className="flex items-center text-gray-400 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          {venue.location}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                            <span className="text-sm">{venue.rating}</span>
                          </div>
                          <span className="font-bold text-green-400">{venue.price}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Tournaments */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Upcoming Tournaments</h3>
              <Link href="/tournaments?sport=cricket">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  View All
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {[
                {
                  name: "City Cricket Championship",
                  date: "Dec 15, 2024",
                  teams: "16 Teams",
                  prize: "₹50,000",
                  status: "Registration Open",
                },
                {
                  name: "Weekend Warriors Cup",
                  date: "Dec 22, 2024",
                  teams: "8 Teams",
                  prize: "₹25,000",
                  status: "Few Spots Left",
                },
              ].map((tournament, index) => (
                <Card
                  key={index}
                  className="border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 bg-gray-800/50"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-bold text-lg text-gray-200">{tournament.name}</h4>
                      <Badge
                        className={
                          tournament.status === "Registration Open"
                            ? "bg-green-900/50 text-green-400 border border-green-500/30"
                            : "bg-orange-900/50 text-orange-400 border border-orange-500/30"
                        }
                      >
                        {tournament.status}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {tournament.date}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        {tournament.teams}
                      </div>
                      <div className="flex items-center">
                        <Trophy className="w-4 h-4 mr-2" />
                        Prize: {tournament.prize}
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-green-500 hover:bg-green-600">Register Now</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
