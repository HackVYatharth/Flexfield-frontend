"use client"
 
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Trophy,
  Settings,
  LogOut,
  Edit,
  Star,
  Calendar,
  Users,
  Target,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "../_context/AuthContext"
import { GET, PUT } from "../../lib/adapters/adapters"
import { toast } from 'sonner';
 
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}
 
interface PlayerProfileDisplayResponse {
  playerId: number;
  playerName: string;
  playerEmail: string;
  playerContactNumber: string;
  playerLocation: string;
  playerDateOfBirth: string;
  playerAbout: string | null;
}
 
interface PlayerProfileUpdateRequest {
  playerName: string;
  playerContactNumber: string;
  playerAbout: string;
}
 
export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: "",
    phone: "",
    location: "",
    bio: "",
  })
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()
 
  const fetchProfileData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await GET<PlayerProfileDisplayResponse>("/api/profile/me");
 
      // Update AuthContext user state
      setUser({
        playerId: response.playerId,
        playerName: response.playerName,
        playerEmail: response.playerEmail,
        playerContactNumber: response.playerContactNumber,
        playerDateOfBirth: response.playerDateOfBirth,
        playerLocation: response.playerLocation,
        playerAbout: response.playerAbout,
      });
 
      // Initialize editData with fetched data here
      setEditData({
        name: response.playerName,
        phone: response.playerContactNumber,
        bio: response.playerAbout || "",
        location: response.playerLocation,
      });
 
      toast.success("Profile data loaded successfully!");
    } catch (err: any) {
      console.error("Failed to fetch profile:", err);
      setError("Failed to load profile data. Please try again.");
      toast.error("Failed to load profile data.");
      if (err.response && err.response.status === 401) {
        toast.error("Session expired or unauthorized. Please log in again.");
        router.push("/auth/login"); // Adjust to your login page path
      }
    } finally {
      setIsLoading(false);
    }
  };
 
  useEffect(() => {
    // Fetch data when the component mounts
    fetchProfileData();
  }, []); // Empty dependency array means this runs once on mount
 
  // This useEffect ensures editData is updated if `user` changes from outside this component
  // (e.g., if you were setting user from localStorage initially elsewhere, or if an external
  // action modified the user in AuthContext).
  // It also handles the case where fetchProfileData completes and updates `user`.
  useEffect(() => {
    if (user && !isEditing) { // Only update editData if not currently editing
      setEditData({
        name: user.playerName || "",
        phone: user.playerContactNumber || "",
        bio: user.playerAbout || "",
        location: user.playerLocation || "",
      });
    }
  }, [user, isEditing]);
 
 
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the JWT token
    localStorage.removeItem("user"); // Remove user data (if you're storing it there separately)
    setUser(null); // Clear user from context
    toast.info("You have been logged out.");
    router.push("/"); // Redirect to home or login page
  };
 
  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const updatePayload: PlayerProfileUpdateRequest = {
        playerName: editData.name,
        playerContactNumber: editData.phone,
        playerAbout: editData.bio,
      };
 
      await PUT("/api/profile/me", updatePayload);
 
      // Update AuthContext user state immediately with the new data from editData
      // This avoids a re-fetch and updates the displayed info instantly
      setUser((currentUser) => {
        if (!currentUser) return null; // Should not happen if save is successful
 
        return {
          ...currentUser,
          playerName: editData.name,
          playerContactNumber: editData.phone,
          playerAbout: editData.bio,
          // location, email, DOB, etc. remain unchanged as they are not editable here
        };
        
      });
 
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      console.error("Failed to update profile:", err);
      setError("Failed to update profile. Please check your input and try again.");
      toast.error("Failed to update profile. " + (err.response?.data?.error || err.message));
    } finally {
      setIsLoading(false);
    }
  };
 
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading profile...</div>
      </div>
    );
  }
 
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-red-400">
        <div className="text-xl mb-4">{error}</div>
        <Button onClick={fetchProfileData} className="bg-blue-500 hover:bg-blue-600">
          Retry Loading Profile
        </Button>
      </div>
    );
  }
 
  // After loading, if user is still null (e.g., fetch failed and redirected), handle it
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Profile not available. Please log in.</div>
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
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Profile</h1>
          </div>
        </div>
      </motion.header>
 
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <motion.div {...fadeInUp}>
              <Card className="border border-gray-700 shadow-lg bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="relative inline-block mb-4">
                    {/* <Image
                    src={user?.avatar || "/placeholder.svg"} // Ensure avatar is set or fallback
                    alt={user?.playerName || "user"}
                    width={120}
                    height={120}
                    className="w-30 h-30 rounded-full object-cover mx-auto border-4 border-green-500"
                  /> */}
                    {/* <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-2 border-gray-800 flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div> */}
                  </div>
 
                  {isEditing ? (
                    <div className="space-y-4">
                      <Input
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="text-center border-gray-600 bg-gray-700/50 text-white"
                      />
                      <Input
                        value={editData.phone}
                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                        className="text-center border-gray-600 bg-gray-700/50 text-white"
                      />
                      <Input
                        value={editData.location}
                        onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                        className="text-center border-gray-600 bg-gray-700/50 text-white"
                        disabled={true}
                      />
 
 
                      <Textarea
                        value={editData.bio}
                        onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                        className="border-gray-600 bg-gray-700/50 text-white"
                        rows={3}
                        placeholder="Tell us about yourself..."
                      />
                      <div className="flex space-x-2">
                        <Button onClick={handleSave} className="flex-1 bg-green-500 hover:bg-green-600">
                          Save
                        </Button>
                        <Button
                          onClick={() => setIsEditing(false)}
                          variant="outline"
                          className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-green-500 mb-2">{user.playerName}</h2>
                      {/* <Badge className="bg-green-900/50 text-green-400 border border-green-500/30 mb-4">
                        Premium Player
                      </Badge> */}
 
                      <div className="space-y-3 text-left">
                        <div className="flex items-center space-x-3 text-gray-300">
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">{user.playerEmail}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-300">
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">{user.playerContactNumber}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-300">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{user.playerLocation}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-300">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">DOB: {user.playerDateOfBirth}</span>
                        </div>
                      </div>
 
                      <div className="mt-6 p-4 bg-gray-700/30 rounded-lg">
                        <p className="text-sm text-gray-300 italic">{editData.bio}</p>
                      </div>
 
                      <div className="mt-6 space-y-2">
                        <Button
                          onClick={() => setIsEditing(true)}
                          variant="outline"
                          className="w-full border-gray-600 text-gray-500 hover:bg-gray-800"
                        >
                          <Edit className="w-4 h-4 mr-2 " />
                          Edit Profile
                        </Button>
                        {/* <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Button> */}
                        <Button
                          onClick={handleLogout}
                          variant="outline"
                          className="w-full border-red-600 text-red-400 hover:bg-red-900/20"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
 
          {/* Stats and Activity */}
          <div className="lg:col-span-2 space-y-8">
 
          </div>
        </div>
      </div>
    </div>
  )
}
 
 