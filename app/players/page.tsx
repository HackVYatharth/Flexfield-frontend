"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import avtarImage1 from "@/public/boy1.png";
import avtarImage2 from "@/public/boy2.png";
import avtarImage3 from "@/public/boy3.png";
import avtarImage4 from "@/public/boy4.png";
import avtarImage5 from "@/public/girl.png";
import avtarImage6 from "@/public/boy5.png";
import {
  ArrowLeft,
  Search,
  MapPin,
  Star,
  User,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../_context/AuthContext";
import { getAllPlayers } from "@/lib/services/player";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function PlayersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const { user, setUser } = useAuth();
  const [players, setPlayers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
  })
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null)
  const router = useRouter();

  console.log(selectedPlayer);

  console.log("teams from frontend: ", players);

  useEffect(() => {
    const getAllPlayersData = async () => {
      const maleAvatars = [avtarImage1, avtarImage2, avtarImage3, avtarImage4, avtarImage6];
      const femaleAvatars = [avtarImage5];
  
      const data = await getAllPlayers();
      console.log("Players: ", data);
  
      // @ts-ignore
      const mappedData = data.map((a) => {
        const randomAvatar =
          a.playerGender.toLowerCase() === "male"
            ? maleAvatars[Math.floor(Math.random() * maleAvatars.length)]
            : femaleAvatars[Math.floor(Math.random() * femaleAvatars.length)];
  
        return {
          id: a.playerId,
          name: a.playerName,
          gender: a.playerGender,
          sport: a.playerSportName,
          rating: 4.8,
          location: a.playerLocation,
          image: randomAvatar, // Assign random avatar based on gender
          achievements: ["City Championship 2023", "Summer League Winners"],
          description: a.playerAbout,
          contact: {
            phone: a.playerContactNumber,
            email: a.playerEmail,
          },
        };
      });
  
      setPlayers(mappedData);
  
      // Store players with avatars in localStorage
      localStorage.setItem("players", JSON.stringify(mappedData));
  
      console.log("Mapped Data: ", mappedData);
    };
  
    getAllPlayersData();
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // router.push("/auth");
    }
  }, [router]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // router.push("/auth");
    }

    // Load teams from localStorage
    const storedTeams = localStorage.getItem("teams");

    if (storedTeams) {
      setPlayers(JSON.parse(storedTeams));
    } else {
    }
  }, [router]);

  const filters = [
    { id: "all", label: "All Players" },
    { id: "cricket", label: "Cricket" },
    { id: "football", label: "Football" },
    //{ id: "available", label: "Available" },
  ];

  const filteredPlayers = players
    .filter((player) => {
      if (selectedFilter === "all") return true;
      if (selectedFilter === "cricket") return player.sport === "Cricket";
      if (selectedFilter === "football") return player.sport === "Football";
      if (selectedFilter === "available") return player.available;
      return true;
    })
    .filter(
      (player) =>
        player.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleOpenPopup = (player: any) => {
    console.log("Opening popup for player:", player);
    setSelectedPlayer(player)
    setIsModalOpen(true)
  }

  const handleClosePopup = () => {
    setIsModalOpen(false)
    setFormData({ phone: "", email: "" })
  }

  const handleCreatePlayer = (playerData: any) => {
      if (!user) {
      alert("You must be logged in to create a team");
      return;
    }

  const playerId = Date.now().toString();
    const newTeam = {
      id: playerId,
      name: playerData.playerName,
      gender: playerData.playerGender,
      sport: playerData.sport.charAt(0).toUpperCase() + playerData.sport.slice(1),
      rating: 0,
      location: user.playerLocation || "Chennai",
      founded: new Date().getFullYear().toString(),
      image: "/placeholder.svg?height=150&width=150",
      achievements: [],
      description: playerData.description,
      nextMatch: "",
      phoneNumber: playerData.phoneNumber,
      email: playerData.email, 
    };

    // Update teams list
    const updatedTeams = [...players, newTeam];
    setPlayers(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));

    // Update user data
    // const userTeams = user.teamsOwned || [];
    // const updatedUser = {
    //   ...user,
    //   teamsOwned: [...userTeams, teamId],
    //   teamsJoined: (user.teamsJoined || 0) + 1,
    // };
    // setUser(updatedUser);
    // localStorage.setItem("user", JSON.stringify(updatedUser));


  };

  console.log("Player from frontend: ", players);
  console.log("Filtered Players : ", filteredPlayers);

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
          <div className="flex items-center space-x-4">
            <Link href="/home">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Find Players</h1>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <motion.div className="mb-8 space-y-4" {...fadeInUp}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search players by name..."
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
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-gray-400">
            Found {filteredPlayers.length} player
            {filteredPlayers.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        {/* Players Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {filteredPlayers.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="overflow-hidden border border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-gray-800/50">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="relative inline-block">
                      <Image
                        src={player.image || "/placeholder.svg"}
                        alt={player.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-gray-600"
                      />
                      {/* <div
                        className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-gray-800 ${
                          player.available ? "bg-green-500" : "bg-gray-500"
                        }`}
                      ></div> */}
                    </div>

                    <h3 className="font-bold text-lg group-hover:text-green-400 transition-colors">
                      {player.name}
                    </h3>

                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Badge className="bg-blue-900/50 text-blue-400 border border-blue-500/30">
                        {player.sport}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-gray-700 text-gray-300"
                      >
                        {player.position}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-center space-x-1 mb-3">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">
                        {player.rating}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-400 mb-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      {player.gender}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-400 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {player.location}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-400 italic">{player.description}</p>
                  </div>

                  {/* <div className="flex flex-wrap gap-1 mb-4">
                    {player.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="outline"
                        className="text-xs border-gray-600 text-gray-300"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div> */}

                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleOpenPopup(player)}
                      className="flex-1 bg-green-500 hover:bg-green-600"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Invite
                    </Button>
                  </div>
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
                  Player Contact Details
                </h2>
                <p className="text-white">Phone Number: {selectedPlayer?.contact?.phone}</p>
                <p className="text-white">Email: {selectedPlayer?.contact?.email}</p>

                <div className="flex justify-center space-x-4">
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


        {filteredPlayers.length === 0 && (
          <motion.div className="text-center py-12" {...fadeInUp}>
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No players found</h3>
            <p className="text-gray-400 mb-4">
              Try adjusting your search or filters
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedFilter("all");
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
  );
}
