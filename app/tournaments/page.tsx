"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Trophy, Calendar, Users, MapPin, Clock, Target, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import QRImage from "@/public/QR.jpg";
import TourImage1 from "@/public/Cricket_tour1.png";
import TourImage2 from "@/public/Cricket_tour.png";
import TourImage3 from "@/public/Football_Tour.png";
import TourImage4 from "@/public/Cricket_tour2.jpeg";
import TourImage5 from "@/public/Football_tour1.png";
import TourImage6 from "@/public/Cricket_tour3.png";
import { useAuth } from "../_context/AuthContext"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function TournamentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const {user,setUser} = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    captainName: "",
    phone: "",
    email: "",
    image: null,
  })
  const [selectedTournament, setSelectedTournament] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      //router.push("/auth")
    }
  }, [router])



  const tournaments = [
    {
      id: 1,
      name: "City Cricket Championship",
      sport: "Cricket",
      organizer: "Chennai Sports Club",
      startDate: "2024-12-15",
      endDate: "2024-12-22",
      registrationDeadline: "2024-12-10",
      location: "Siruseri",
      venue: "Elite Sports Arena",
      teams: 12,
      maxTeams: 16,
      entryFee: "₹5,000",
      prizePool: "₹50,000",
      image: TourImage1,
      status: "Registration Open",
      format: "Knockout",
      description: "Premier cricket tournament featuring the best teams from the city",
      rules: ["11 players per team", "50 overs per innings", "Professional umpires"],
      featured: true,
      contact: {
              name: "Gaurav Singh",
              phone: "9876543214",
              email: "gaurav@gmail.com",
              image: QRImage,
            },
    },
    {
      id: 2,
      name: "Weekend Warriors Cup",
      sport: "Cricket",
      organizer: "Sports Central",
      startDate: "2024-12-22",
      endDate: "2024-12-23",
      registrationDeadline: "2024-12-18",
      location: "Navallur",
      venue: "Champions Ground",
      teams: 6,
      maxTeams: 8,
      entryFee: "₹3,000",
      prizePool: "₹25,000",
      image: TourImage2,
      status: "Few Spots Left",
      format: "Round Robin",
      description: "Quick weekend tournament for cricket enthusiasts",
      rules: ["T20 format", "8 players minimum", "Weekend matches only"],
      featured: false,
      contact: {
        name: "Dhruv Singh",
        phone: "8860340629",
        email: "dhruv18@gmail.com",
        image: QRImage,
      },
    },
    {
      id: 3,
      name: "Football Premier League",
      sport: "Football",
      organizer: "Chennai Football Association",
      startDate: "2024-12-20",
      endDate: "2025-01-15",
      registrationDeadline: "2024-12-15",
      location: "Padur",
      venue: "Multiple Venues",
      teams: 8,
      maxTeams: 10,
      entryFee: "₹4,000",
      prizePool: "₹40,000",
      image: TourImage3,
      status: "Registration Open",
      format: "League + Playoffs",
      description: "Month-long football league with professional standards",
      rules: ["11 players per team", "90 minutes matches", "Yellow/Red card system"],
      featured: true,
      contact: {
              name: "Vanshika Purohit",
              phone: "9876543214",
              email: "vanshika@gmail.com",
              image: QRImage,
            },
    },
    {
      id: 4,
      name: "New Year Cricket Bash",
      sport: "Cricket",
      organizer: "Chennai Sports Hub",
      startDate: "2025-01-01",
      endDate: "2025-01-03",
      registrationDeadline: "2024-12-25",
      location: "ECR",
      venue: "Victory Field",
      teams: 4,
      maxTeams: 8,
      entryFee: "₹2,500",
      prizePool: "₹20,000",
      image: TourImage4,
      status: "Registration Open",
      format: "Knockout",
      description: "Start the new year with exciting cricket matches",
      rules: ["T20 format", "Minimum 8 players", "New Year special prizes"],
      featured: false,
      contact: {
        name: "Hemashree",
        phone: "9876543214",
        email: "hemashree@gmail.com",
        image: QRImage,
      },
    },
    {
      id: 5,
      name: "Corporate Football Cup",
      sport: "Football",
      organizer: "Chennai Corporate League",
      startDate: "2025-01-10",
      endDate: "2025-01-12",
      registrationDeadline: "2025-01-05",
      location: "Tambaram",
      venue: "Thunder Arena",
      teams: 10,
      maxTeams: 12,
      entryFee: "₹6,000",
      prizePool: "₹60,000",
      image: TourImage5,
      status: "Registration Open",
      format: "Group Stage + Knockout",
      description: "Exclusive tournament for corporate teams",
      rules: ["Company employees only", "7v7 format", "Professional referees"],
      featured: true,
      contact: {
        name: "Yatharth Biseria",
        phone: "9876543214",
        email: "yatharth@gmail.com",
        image: QRImage,
      },
    },
    {
      id: 6,
      name: "Youth Cricket League",
      sport: "Cricket",
      organizer: "Chennai Youth Sports",
      startDate: "2025-01-15",
      endDate: "2025-01-20",
      registrationDeadline: "2025-01-10",
      location: "Shollinganallur",
      venue: "Ace Ground",
      teams: 3,
      maxTeams: 6,
      entryFee: "₹1,500",
      prizePool: "₹15,000",
      image: TourImage6,
      status: "Registration Open",
      format: "Round Robin",
      description: "Tournament for young cricket talents under 25",
      rules: ["Under 25 age limit", "T20 format", "Development focused"],
      featured: false,
      contact: {
        name: "Priyanshu Jha",
        phone: "9876543214",
        email: "priyanshu@gmail.com",
        image: QRImage,
      },
    },
  ]

  const filters = [
    { id: "all", label: "All Tournaments" },
    { id: "cricket", label: "Cricket" },
    { id: "football", label: "Football" },
    { id: "open", label: "Registration Open" },
    { id: "featured", label: "Featured" },
  ]

  const filteredTournaments = tournaments
    .filter((tournament) => {
      if (selectedFilter === "all") return true
      if (selectedFilter === "cricket") return tournament.sport === "Cricket"
      if (selectedFilter === "football") return tournament.sport === "Football"
      if (selectedFilter === "open") return tournament.status === "Registration Open"
      if (selectedFilter === "featured") return tournament.featured
      return true
    })
    .filter(
      (tournament) =>
        tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tournament.location.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  const handleOpenPopup = (tournament: any) => {
    console.log("Opening popup for tournament:", tournament);
    setSelectedTournament(tournament)
    setIsModalOpen(true)
  }

  const handleClosePopup = () => {
    setIsModalOpen(false)
    setFormData({ captainName: "", phone: "", email: "", image: null })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    if (!formData.captainName || !formData.phone || !formData.email) {
      alert("Please fill in all the required fields.")
      return
    }

    // Store tournament registration in localStorage
    const registrations = JSON.parse(localStorage.getItem("tournamentRegistrations") || "[]")
    const newRegistration = {
      id: Date.now().toString(),
      //userId: user?.id,
      //userName: user?.name,
      tournamentId: selectedTournament.id,
      tournamentName: selectedTournament.name,
      registrationDate: new Date().toISOString(),
      status: "registered",
      entryFee: selectedTournament.entryFee,
      captainName: formData.captainName,
      phone: formData.phone,
      email: formData.email,
      image: formData.image ? URL.createObjectURL(formData.image) : null,
    }

    
    registrations.push(newRegistration)
    localStorage.setItem("tournamentRegistrations", JSON.stringify(registrations))

    alert(`Successfully registered for ${selectedTournament.name}!`)
    handleClosePopup()
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
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
          <div className="flex items-center space-x-4">
            <Link href="/home">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Tournaments</h1>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <motion.div className="mb-8 space-y-4" {...fadeInUp}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search tournaments by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg border-gray-600 bg-gray-800/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500 rounded-2xl"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                onClick={() => setSelectedFilter(filter.id)}
                className={
                  selectedFilter === filter.id
                    ? "bg-green-500 hover:bg-green-600"
                    : "border-gray-600 text-gray-300 hover:bg-gray-800"
                }
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <p className="text-gray-400">
            Found {filteredTournaments.length} tournament{filteredTournaments.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        {/* Tournaments Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {filteredTournaments.map((tournament, index) => (
            <motion.div
              key={tournament.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="overflow-hidden border border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-gray-800/50">
                <div className="relative">
                  <Image
                    src={tournament.image || "/placeholder.svg"}
                    alt={tournament.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {tournament.featured && (
                    <Badge className="absolute top-4 left-4 bg-orange-500 text-white">Featured</Badge>
                  )}

                  <div className="absolute bottom-4 left-4">
                    <Badge
                      className={`${
                        tournament.status === "Registration Open"
                          ? "bg-green-500 text-white"
                          : tournament.status === "Few Spots Left"
                            ? "bg-orange-500 text-white"
                            : "bg-red-500 text-white"
                      }`}
                    >
                      {tournament.status}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg group-hover:text-green-400 transition-colors line-clamp-2">
                      {tournament.name}
                    </h3>
                    <Badge className="bg-blue-900/50 text-blue-400 border border-blue-500/30 ml-2">
                      {tournament.sport}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm text-gray-400 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>
                        {new Date(tournament.startDate).toLocaleDateString()} -{" "}
                        {new Date(tournament.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>
                        {tournament.location} • {tournament.venue}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        <span>
                          Teams: {tournament.teams}/{tournament.maxTeams}
                        </span>
                      </div>
                      <div className="w-16 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(tournament.teams / tournament.maxTeams) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Target className="w-4 h-4 mr-2" />
                        <span>Entry: {tournament.entryFee}</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-2" />
                        <span>Prize: {tournament.prizePool}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Registration ends: {new Date(tournament.registrationDeadline).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-400 italic mb-2">{tournament.description}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                        {tournament.format}
                      </Badge>
                      <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                        {tournament.organizer}
                      </Badge>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-2">Rules:</p>
                    <ul className="text-xs text-gray-400 space-y-1">
                      {tournament.rules.slice(0, 2).map((rule, ruleIndex) => (
                        <li key={ruleIndex} className="flex items-center">
                          <div className="w-1 h-1 bg-green-400 rounded-full mr-2"></div>
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    onClick={() => handleOpenPopup(tournament)}
                    className="w-full bg-green-500 hover:bg-green-600"
                    disabled={tournament.status !== "Registration Open" && tournament.status !== "Few Spots Left"}
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    {tournament.status === "Registration Open" || tournament.status === "Few Spots Left"
                      ? "Register Now"
                      : "Registration Closed"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Popup */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md bg-gray-800 border border-gray-700 shadow-lg">
              <CardContent className="p-6 space-y-4  flex-col">
                <h2 className="text-xl font-bold text-center text-white">
                  Owner Details For {selectedTournament?.name}
                </h2>
                <p className="text-white">Owner Name: {selectedTournament?.contact?.name} </p>
                <p className="text-white">Phone Number: {selectedTournament?.contact?.phone}</p>
                <p className="text-white">Email: {selectedTournament?.contact?.email}</p>

                <div className="w-full flex justify-center">
                <Image src={QRImage} alt="QR" className="h-36 w-36" />
                </div>

                <div className="flex justify-start space-x-4">
                  <Button
                    variant="outline"
                    onClick={handleClosePopup}
                    className=" hover:bg-gray-700 text-white bg-red-500" 
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {filteredTournaments.length === 0 && (
          <motion.div className="text-center py-12" {...fadeInUp}>
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No tournaments found</h3>
            <p className="text-gray-400 mb-4">Try adjusting your search or filters</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedFilter("all")
              }}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
