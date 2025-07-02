"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

interface TeamRegistrationFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (teamData: any) => void
}

export function TeamRegistrationForm({ isOpen, onClose, onSubmit }: TeamRegistrationFormProps) {
  const [teamData, setTeamData] = useState({
    teamName: "",
    teamMember: "",
    sport: "cricket",
    phoneNumber: "",
    email: "",
    about: "",
  });

  const [errors, setErrors] = useState({
    teamName: "",
    teamMember: "",
    phoneNumber: "",
    email: "",
    about: "",
  });

  const validateForm = () => {
    const newErrors: any = {};

    if (!teamData.teamName.trim()) {
      newErrors.teamName = "Team name is required.";
    }

    const teamMemberCount = parseInt(teamData.teamMember, 10);
    if (!teamData.teamMember.trim() || isNaN(teamMemberCount) || teamMemberCount <= 0 || teamMemberCount > 11) {
      newErrors.teamMember = "Enter a valid number of team members (1-11).";
    }

    if (!teamData.phoneNumber.trim() || !/^\d{10}$/.test(teamData.phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid 10-digit phone number.";
    }

    if (!teamData.email.trim() || !/\S+@\S+\.\S+/.test(teamData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!teamData.about.trim()) {
      newErrors.about = "Team description is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(teamData);
      setTeamData({
        teamName: "",
        teamMember: "0",
        sport: "cricket",
        phoneNumber: "",
        email: "",
        about: "",
      });
      setErrors({
        teamName: "",
        teamMember: "",
        phoneNumber: "",
        email: "",
        about: "",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 ">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-md"
      >
        <Card className="border border-gray-700 shadow-2xl bg-gray-800/90 backdrop-blur-lg h-[500px] overflow-y-scroll">
          <CardHeader className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute right-2 top-2 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
            <CardTitle className="text-2xl font-bold text-center text-white">Team Registration</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Team Name */}
              <div>
                <Label htmlFor="teamName" className="text-sm text-gray-400">
                  Team Name
                </Label>
                <Input
                  id="teamName"
                  type="text"
                  placeholder="Enter team name"
                  value={teamData.teamName}
                  onChange={(e) => setTeamData({ ...teamData, teamName: e.target.value })}
                  className="border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                  required
                />
                {errors.teamName && <p className="text-red-500 text-sm mt-1">{errors.teamName}</p>}
              </div>

              {/* Sport */}
              <div>
                <Label className="text-sm text-gray-400">Sport</Label>
                <RadioGroup
                  value={teamData.sport}
                  onValueChange={(value) => setTeamData({ ...teamData, sport: value })}
                  className="flex space-x-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cricket" id="team-cricket" className="text-green-500" />
                    <Label htmlFor="team-cricket" className="text-gray-300">
                      Cricket
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="football" id="team-football" className="text-green-500" />
                    <Label htmlFor="team-football" className="text-gray-300">
                      Football
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Team Member */}
              <div>
                <Label htmlFor="teamMember" className="text-sm text-gray-400">
                  Team Member
                </Label>
                <Input
                  id="teamMember"
                  type="number"
                  placeholder="Enter Number Of Team Members (Max 11)"
                  value={teamData.teamMember}
                  onChange={(e) => setTeamData({ ...teamData, teamMember: e.target.value })}
                  className="border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                  required
                />
                {errors.teamMember && <p className="text-red-500 text-sm mt-1">{errors.teamMember}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <Label htmlFor="phoneNumber" className="text-sm text-gray-400">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter team contact number"
                  value={teamData.phoneNumber}
                  onChange={(e) => setTeamData({ ...teamData, phoneNumber: e.target.value })}
                  className="border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                  required
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="teamEmail" className="text-sm text-gray-400">
                  Email
                </Label>
                <Input
                  id="teamEmail"
                  type="email"
                  placeholder="Enter team email"
                  value={teamData.email}
                  onChange={(e) => setTeamData({ ...teamData, email: e.target.value })}
                  className="border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* About */}
              <div>
                <Label htmlFor="teamEmail" className="text-sm text-gray-400">
                  About
                </Label>
                <Input
                  id="teamAbout"
                  type="text"
                  placeholder="Tell About Your Team and Mention your skills"
                  value={teamData.about}
                  onChange={(e) => setTeamData({ ...teamData, about: e.target.value })}
                  className="border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                  required
                />
                {errors.about && <p className="text-red-500 text-sm mt-1">{errors.about}</p>}
              </div>

              <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white py-6">
                Register Team
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
