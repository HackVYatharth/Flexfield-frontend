"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import avtarImage1 from "@/public/cricket.png";
import avtarImage2 from "@/public/football.png";
import avtarImage3 from "@/public/cricket2.png";
import avtarImage4 from "@/public/cricket3.png";
import avtarImage5 from "@/public/football2.png";
import avtarImage6 from "@/public/football3.png";
import {
  ArrowLeft,
  Search,
  Users,
  Star,
  Trophy,
  MapPin,
  UserPlus,
  MessageCircle,
  Calendar,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TeamRegistrationForm } from "@/components/team-registration-form";
import { useAuth } from "../_context/AuthContext";
import { getAllTeams } from "@/lib/services/teams";
import { POST } from "@/lib/adapters/adapters";


const sportIdMapping: { [key: string]: number } = {
  Football: 1,
  Cricket: 2,
};
 


const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function TeamsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const { user, setUser } = useAuth();
  const [teams, setTeams] = useState<any[]>([]);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
  })
  const [selectedTeam, setSelectedTeam] = useState<any>(null)
  const router = useRouter();

  const [refreshTrigger, setRefreshTrigger] = useState(0);
 

  console.log(selectedTeam);

  console.log("teams from frontend: ", teams);

  useEffect(() => {
    const getAllTeamsData = async () => {
      const cricketAvatars = [avtarImage1, avtarImage3, avtarImage4];
      const footballAvatars = [avtarImage2, avtarImage5, avtarImage6];
  
      const data = await getAllTeams();
      console.log("Teams: ", data);
  
      // @ts-ignore
      const mappedData = data.map((a) => {
        const randomAvatar =
          a.teamSportName.toLowerCase() === "cricket"
            ? cricketAvatars[Math.floor(Math.random() * cricketAvatars.length)]
            : footballAvatars[Math.floor(Math.random() * footballAvatars.length)];
  
        return {
          id: a.teamId,
          name: a.teamName,
          sport: a.teamSportName,
          captain: a.captainName,
          members: parseInt(a.numberOfMembers),
          maxMembers: 11,
          rating: 4.8,
          location: a.teamLocation,
          founded: "2023",
          image: randomAvatar, // Assign random avatar based on sport
          recruiting: parseInt(a.numberOfMembers) < 11, // Recruiting is true only if members < 11
          achievements: ["City Championship 2023", "Summer League Winners"],
          description: a.teamAbout,
          nextMatch: "Dec 15, 2024",
          contact: {
            phone: a.teamContactNumber,
            email: a.teamEmail,
          },
        };
      });
  
      setTeams(mappedData);
  
      console.log("Mapped Data: ", mappedData);
    };
  
    getAllTeamsData();
  }, [refreshTrigger]);


  const filters = [
    { id: "all", label: "All Teams" },
    { id: "cricket", label: "Cricket" },
    { id: "football", label: "Football" },
    { id: "recruiting", label: "Recruiting" },
  ];

  const filteredTeams = teams
  .filter((team) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "cricket")
      return team.sport.toLowerCase() === "cricket";
    if (selectedFilter === "football")
      return team.sport.toLowerCase() === "football";
    if (selectedFilter === "recruiting") return team.recruiting; // Recruiting filter
    if (selectedFilter === "full") return !team.recruiting; // Full filter
    return true;
  })
  .filter(
    (team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenPopup = (team: any) => {
    console.log("Opening popup for team:", team);
    setSelectedTeam(team);
    setIsModalOpen(true);
  };

  const handleClosePopup = () => {
    setIsModalOpen(false)
    setFormData({ phone: "", email: "" })
  }

  const handleCreateTeam = async(teamData: any) => {
    if (!user) {
      alert("You must be logged in to create a team");
      return;
    }

    const capitalizedSport =
      teamData.sport.charAt(0).toUpperCase() + teamData.sport.slice(1);
    const sportId = sportIdMapping[capitalizedSport];
    if (!sportId) {
      alert("Invalid sport selected. Please try again.");
      return;
    }
 
    const numberOfMembers = teamData.teamMember ? parseInt(teamData.teamMember, 10) : null;
 
    if (numberOfMembers === null || isNaN(numberOfMembers) || numberOfMembers <= 0) {
      alert("Please enter a valid number of team members (greater than 0).");
      return; // Stop the submission
    }
 
    // Construct the payload to exactly match the backend's TeamRegistrationRequest DTO
    const payload = {
      teamName: teamData.teamName,
      teamContactNumber: teamData.phoneNumber,
      teamEmail: teamData.email,
      teamSportId: sportId,
      teamAbout: teamData.about,
      numberOfTeamMembers: numberOfMembers
    };
 
    try {
      // Make the POST request to the secured backend endpoint
      // The response will be the newly created team object from the backend
      const newTeamResponse = await POST<any>("/api/teams/register", payload);
 
      console.log("Team registered successfully:", newTeamResponse);
      setRefreshTrigger((prev) => prev + 1);
 
      // Update the local state with the data from the API response
      const mappedNewTeam = {
        id: newTeamResponse.teamId,
        name: newTeamResponse.teamName,
        sport: capitalizedSport, // Use the name for the frontend display
        captain: user.playerName, // Assuming captain is the logged-in user
        members: newTeamResponse.numberOfTeamMembers, // Get actual members from backend response
        maxMembers: teamData.sport === "cricket" ? 15 : 11, // Still using frontend logic for max members
        rating: 0,
        location: user.playerLocation, // Assuming backend doesn't return this, using user's location
        founded: new Date().getFullYear().toString(),
        image: "/placeholder.svg?height=150&width=150",
        recruiting: true,
        achievements: [],
        description: newTeamResponse.teamAbout,
        nextMatch: "",
        contact: {
          phone: newTeamResponse.teamContactNumber,
          email: newTeamResponse.teamEmail,
        },
      };
 


    // Update teams list
    const updatedTeams = [...teams, mappedNewTeam];
    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));


    setShowTeamForm(false);
    alert(`Team ${teamData.teamName} created successfully!`);
  }catch (error: any) {
    // Handle errors from the API call
    console.error(
      "Failed to create team:",
      error.response?.data || error.message
    );
    const errorMessage =
      error.response?.data?.error ||
      "An unexpected error occurred. Please check the form data.";
    alert(`Error: ${errorMessage}`);
  }
};



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
              <Link href="/home">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-300 hover:text-white"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">Find Teams</h1>
            </div>

            <Button
              onClick={() => setShowTeamForm(true)}
              className="bg-green-500 hover:bg-green-600"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Team
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <motion.div className="mb-8 space-y-4" {...fadeInUp}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search teams by name..."
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
            Found {filteredTeams.length} team
            {filteredTeams.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        {/* Teams Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {filteredTeams.map((team, index) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="overflow-hidden border border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-gray-800/50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="relative">
                      <Image
                        src={team.image || "/placeholder.svg"}
                        alt={team.name}
                        width={60}
                        height={60}
                        className="w-15 h-15 rounded-full object-cover border-2 border-gray-600"
                      />
                      
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-lg group-hover:text-green-400 transition-colors">
                        {team.name}
                      </h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className="bg-blue-900/50 text-blue-400 border border-blue-500/30">
                          {team.sport}
                        </Badge>
                        {team.recruiting && (
                          <Badge className="bg-green-900/50 text-green-400 border border-green-500/30">
                            Recruiting
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">
                          {team.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-400 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        <span>Captain: {team.captain}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{team.location}</span>
                      </div>
                      <span>Est.2025</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>
                        Members: {team.members}/{team.maxMembers}
                      </span>
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${(team.members / team.maxMembers) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-400 italic mb-2">
                      {team.description}
                    </p>
                    
                  </div>



                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleOpenPopup(team)}
                      className="flex-1 bg-green-500 hover:bg-green-600"
                      disabled={!team.recruiting}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      {team.recruiting ? "Join Team" : "Full"}
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
                  Team Contact Details
                </h2>
                <p className="text-white">Phone Number: {selectedTeam?.contact?.phone}</p>
                <p className="text-white">Email: {selectedTeam?.contact?.email}</p>

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

        {filteredTeams.length === 0 && (
          <motion.div className="text-center py-12" {...fadeInUp}>
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No teams found</h3>
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

      {/* Team Registration Form */}
      <TeamRegistrationForm
        isOpen={showTeamForm}
        onClose={() => setShowTeamForm(false)}
        onSubmit={handleCreateTeam}
      />
    </div>
  );
}
