"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Venue1 from "@/public/venue1.jpeg";
import Venue2 from "@/public/venue2.jpeg";
import Venue3 from "@/public/venue3.png";
import Venue4 from "@/public/venue4.png";
import Venue5 from "@/public/venue5.png";
import Venue6 from "@/public/venue6.jpeg";
import Venue7 from "@/public/venue7.png";
import Venue8 from "@/public/venue8.png";
import Venue9 from "@/public/venue9.jpeg";
import QRImage from "@/public/QR1.png";

import {
  ArrowLeft,
  Search,
  MapPin,
  Star,
  Clock,
  Wifi,
  Car,
  Coffee,
  Users,
  Heart,
  Share2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../_context/AuthContext";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function VenuesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [venueToBook, setVenueToBook] = useState<any>(null);
  const { user, setUser } = useAuth();
  const router = useRouter();
  ``
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // router.push("/auth");
    }
  }, [router]);

  const handleOpenPopup = () => {
    setIsModalOpen(true);
  }
  const handleClosePopup = () => {
    setIsModalOpen(false);
  }

  console.log("Selected Venue:", venueToBook);

  const venues = [
    {
      id: 1,
      name: "Elite Sports Arena",
      location: "Siruseri,Chennai",
      rating: 4.8,
      reviews: 124,
      price: "₹800/hour",
      image: Venue1,
      amenities: ["Parking", "Changing Room", "Floodlights", "Cafeteria"],
      sports: ["Cricket", "Football"],
      availability: "Available Now",
      featured: true,
      timeSlots: ["6:00 AM", "8:00 AM", "10:00 AM", "6:00 PM", "8:00 PM"],
      contact: {
        name: "Dhruv Singh",
        phone: "8860340629",
        email: "dhruv18@gmail.com",
        image: QRImage,
      },
    },
    {
      id: 2,
      name: "Champions Ground",
      location: "Nugambakkam,Chennai",
      rating: 4.9,
      reviews: 89,
      price: "₹1200/hour",
      image: Venue2,
      amenities: ["AC Lounge", "Equipment", "Parking", "Washroom"],
      sports: ["Cricket"],
      availability: "Available from 6 PM",
      featured: false,
      timeSlots: ["6:00 PM", "8:00 PM", "10:00 PM"],
      contact: {
        name: "Yatharth Biseria",
        phone: "7080088047",
        email: "yatharth@gmail.com",
        image: QRImage,
      },
    },
    {
      id: 3,
      name: "Victory Field",
      location: "Shollinganallur,Chennai",
      rating: 4.7,
      reviews: 156,
      price: "₹600/hour",
      image: Venue3,
      amenities: ["Parking", "Washroom", "Water", "First Aid"],
      sports: ["Football"],
      availability: "Booked until 8 PM",
      featured: false,
      timeSlots: ["9:00 PM", "10:00 PM"],
      contact: {
        name: "Vanshika Purohit",
        phone: "9988776655",
        email: "vanshika@gmail.com",
        image: QRImage,
      },
    },
    {
      id: 4,
      name: "Premier Sports Hub",
      location: "Tambaram,Chennai",
      rating: 4.6,
      reviews: 203,
      price: "₹900/hour",
      image: Venue4,
      amenities: ["Floodlights", "Changing Room", "Cafeteria", "Parking"],
      sports: ["Cricket", "Football"],
      availability: "Available Now",
      featured: true,
      timeSlots: ["7:00 AM", "9:00 AM", "5:00 PM", "7:00 PM", "9:00 PM"],
      contact: {
        name: "Priyanshu Jha",
        phone: "9876543211",
        email: "priyanshu@gmail.com",
        image: QRImage,
      },
    },
    {
      id: 5,
      name: "Ace Ground",
      location: "Navallur,Chennai",
      rating: 4.5,
      reviews: 78,
      price: "₹700/hour",
      image: Venue5,
      amenities: ["Parking", "Washroom", "Equipment"],
      sports: ["Cricket"],
      availability: "Available from 7 PM",
      featured: false,
      timeSlots: ["7:00 PM", "9:00 PM"],
      contact: {
        name: "Hemashree",
        phone: "9876543212",
        email: "hemashree@gmail.com",
        image: QRImage,
      },
    },
    {
      id: 6,
      name: "Thunder Arena",
      location: "Padur,Chennai",
      rating: 4.4,
      reviews: 92,
      price: "₹750/hour",
      image: Venue6,
      amenities: ["Floodlights", "Parking", "Water"],
      sports: ["Football", "Cricket"],
      availability: "Available Now",
      featured: false,
      timeSlots: ["6:00 AM", "8:00 AM", "6:00 PM", "8:00 PM"],
      contact: {
        name: "Akshat Kamboj",
        phone: "8882197407",
        email: "akshat@gmail.com",
        image: QRImage,
      },
    },
    {
      id: 7,
      name: "Turbo Turf",
      location: "OMR,Chennai",
      rating: 4.4,
      reviews: 92,
      price: "₹800/hour",
      image: Venue7,
      amenities: ["Floodlights", "Parking", "Water"],
      sports: ["Football"],
      availability: "Available Now",
      featured: false,
      timeSlots: ["6:00 AM", "8:00 AM", "8:00 PM"],
      contact: {
        name: "Gaurav Singh",
        phone: "9876543214",
        email: "gaurav@gmail.com",
        image: QRImage,
      },
    },
    {
      id: 8,
      name: "Tackle Town Indoor Turf",
      location: "Kovilambakkam,Chennai",
      rating: 4.4,
      reviews: 92,
      price: "₹950/hour",
      image: Venue8,
      amenities: ["Floodlights", "Parking", "Water"],
      sports: ["Cricket"],
      availability: "Available Now",
      featured: true,
      timeSlots: ["8:00 AM", "6:00 PM", "8:00 PM"],
      contact: {
        name: "Aviral Mathur",
        phone: "9350565324",
        email: "aviral@gmail.com",
        image: QRImage,
      },
    },
    {
      id: 9,
      name: "Knockout City Turf",
      location: "Perungudi,Chennai",
      rating: 4.4,
      reviews: 92,
      price: "₹700/hour",
      image: Venue9,
      amenities: ["Parking", "Water"],
      sports: ["Cricket"],
      availability: "Available Now",
      featured: false,
      timeSlots: ["6:00 AM", "8:00 AM", "8:00 PM"],
      contact: {
        name: "Avijoy Hazra",
        phone: "7003824978",
        email: "avijoy@gmail.com",
        image: QRImage,
      },
    },
  ];

  const filters = [
    { id: "all", label: "All Venues" },
    { id: "cricket", label: "Cricket" },
    { id: "football", label: "Football" },
    //{ id: "available", label: "Available Now" },
    { id: "featured", label: "Featured" },
  ];

  const filteredVenues = venues
    .filter((venue) => {
      if (selectedFilter === "all") return true;
      if (selectedFilter === "cricket") return venue.sports.includes("Cricket");
      if (selectedFilter === "football")
        return venue.sports.includes("Football");
      if (selectedFilter === "available")
        return venue.availability === "Available Now";
      if (selectedFilter === "featured") return venue.featured;
      return true;
    })
    .filter(
      (venue) =>
        venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleBookVenue = (venue: any) => {
    // Store booking data in localStorage
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const newBooking = {
      id: Date.now().toString(),
      venueId: venue.id,
      venueName: venue.name,
      //userId: user?.id,
      //userName: user?.name,
      date: new Date().toISOString().split("T")[0],
      time: venue.timeSlots[0],
      price: venue.price,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      contact: venue.contact,
    };
    setVenueToBook(newBooking);
    handleOpenPopup();
    bookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // Update user's venues booked count
    if (user) {
      const updatedUser = {
        ...user,
        // @ts-ignore
        venuesBooked: (user.venuesBooked || 0) + 1,
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
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
            <h1 className="text-2xl font-bold">Book Venues</h1>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <motion.div className="mb-8 space-y-4" {...fadeInUp}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search venues by name and location..."
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
            Found {filteredVenues.length} venue
            {filteredVenues.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        {/* Venues Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {filteredVenues.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="overflow-hidden border border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-gray-800/50">
                <div className="relative">
                  <Image
                    src={venue.image || "/placeholder.svg"}
                    alt={venue.name}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {venue.featured && (
                    <Badge className="absolute top-4 left-4 bg-orange-500 text-white">
                      Featured
                    </Badge>
                  )}

                  {/* <div className="absolute top-4 right-4 flex space-x-2">
                    <Button
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
                    </Button>
                  </div> */}

                  {/* <div className="absolute bottom-4 left-4">
                    <Badge
                      className={`${
                        venue.availability === "Available Now" ? "bg-green-500 text-white" : "bg-orange-500 text-white"
                      }`}
                    >
                      {venue.availability}
                    </Badge>
                  </div> */}
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg group-hover:text-green-400 transition-colors line-clamp-1">
                      {venue.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">
                        {venue.rating}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({venue.reviews})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-400 mb-3">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="text-sm line-clamp-1">
                      {venue.location}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {venue.sports.map((sport, sportIndex) => (
                      <Badge
                        key={sportIndex}
                        variant="secondary"
                        className="text-xs bg-gray-700 text-gray-300"
                      >
                        {sport}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {venue.amenities
                      .slice(0, 3)
                      .map((amenity, amenityIndex) => (
                        <div
                          key={amenityIndex}
                          className="flex items-center text-xs text-gray-400"
                        >
                          {amenity === "Parking" && (
                            <Car className="w-3 h-3 mr-1" />
                          )}
                          {amenity === "Cafeteria" && (
                            <Coffee className="w-3 h-3 mr-1" />
                          )}
                          {amenity === "Floodlights" && (
                            <Clock className="w-3 h-3 mr-1" />
                          )}
                          {amenity === "AC Lounge" && (
                            <Wifi className="w-3 h-3 mr-1" />
                          )}
                          {![
                            "Parking",
                            "Cafeteria",
                            "Floodlights",
                            "AC Lounge",
                          ].includes(amenity) && (
                              <Users className="w-3 h-3 mr-1" />
                            )}
                          {amenity}
                        </div>
                      ))}
                    {/* {venue.amenities.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{venue.amenities.length - 3} more
                      </span>
                    )} */}
                  </div>

                  {/* Available Time Slots */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-2">
                      Available Slots:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {venue.timeSlots.slice(0, 3).map((slot, slotIndex) => (
                        <Badge
                          key={slotIndex}
                          variant="outline"
                          className="text-xs border-gray-600 text-gray-300"
                        >
                          {slot}
                        </Badge>
                      ))}
                      {/* {venue.timeSlots.length > 3 && (
                        <Badge
                          variant="outline"
                          className="text-xs border-gray-600 text-gray-300"
                        >
                          +{venue.timeSlots.length - 3} more
                        </Badge>
                      )} */}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-green-400">
                      {venue.price}
                    </span>
                    <Button
                      onClick={() => handleBookVenue(venue)}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Book Now
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
                  Owner Details For : {venueToBook?.venueName || "Venue"}
                </h2>
                <p className="text-white">Owner Name: {venueToBook?.contact?.name} </p>
                <p className="text-white">Phone Number: {venueToBook?.contact?.phone}</p>
                <p className="text-white">Email: {venueToBook?.contact?.email}</p>

                <div className="w-full flex justify-center">
                  <Image src={venueToBook.contact.image} alt="QR" className="h-36 w-36" />
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

        {filteredVenues.length === 0 && (
          <motion.div className="text-center py-12" {...fadeInUp}>
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No venues found</h3>
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
