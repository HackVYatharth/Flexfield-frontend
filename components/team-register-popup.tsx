"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { X, Users, Trophy, Upload, Plus, Minus } from "lucide-react"

interface TeamRegisterPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function TeamRegisterPopup({ isOpen, onClose }: TeamRegisterPopupProps) {
  const [teamData, setTeamData] = useState({
    name: "",
    sport: "cricket",
    description: "",
    players: [""],
  })

  const addPlayer = () => {
    setTeamData({
      ...teamData,
      players: [...teamData.players, ""],
    })
  }

  const removePlayer = (index: number) => {
    setTeamData({
      ...teamData,
      players: teamData.players.filter((_, i) => i !== index),
    })
  }

  const updatePlayer = (index: number, value: string) => {
    const updatedPlayers = [...teamData.players]
    updatedPlayers[index] = value
    setTeamData({
      ...teamData,
      players: updatedPlayers,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle team registration
    console.log("Team registered:", teamData)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
          >
            <Card className="border-0 shadow-2xl bg-white">
              <CardHeader className="relative">
                <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-4 right-4">
                  <X className="w-4 h-4" />
                </Button>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Register Your Team</CardTitle>
                  <p className="text-gray-600 mt-2">Join tournaments and compete with the best</p>
                </div>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Team Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Team Name</label>
                    <Input
                      placeholder="Enter your team name"
                      value={teamData.name}
                      onChange={(e) => setTeamData({ ...teamData, name: e.target.value })}
                      required
                    />
                  </div>

                  {/* Sport Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Sport</label>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant={teamData.sport === "cricket" ? "default" : "outline"}
                        onClick={() => setTeamData({ ...teamData, sport: "cricket" })}
                        className={teamData.sport === "cricket" ? "bg-green-500 hover:bg-green-600" : ""}
                      >
                        Cricket
                      </Button>
                      <Button
                        type="button"
                        variant={teamData.sport === "football" ? "default" : "outline"}
                        onClick={() => setTeamData({ ...teamData, sport: "football" })}
                        className={teamData.sport === "football" ? "bg-green-500 hover:bg-green-600" : ""}
                      >
                        Football
                      </Button>
                    </div>
                  </div>

                  {/* Team Description */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Team Description</label>
                    <Textarea
                      placeholder="Tell us about your team..."
                      value={teamData.description}
                      onChange={(e) => setTeamData({ ...teamData, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  {/* Players */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium">Team Players</label>
                      <Badge variant="secondary">{teamData.players.filter((p) => p.trim()).length} players</Badge>
                    </div>

                    <div className="space-y-2">
                      {teamData.players.map((player, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            placeholder={`Player ${index + 1} name`}
                            value={player}
                            onChange={(e) => updatePlayer(index, e.target.value)}
                          />
                          {teamData.players.length > 1 && (
                            <Button type="button" variant="outline" size="icon" onClick={() => removePlayer(index)}>
                              <Minus className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        onClick={addPlayer}
                        className="w-full"
                        disabled={teamData.players.length >= 15}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Player
                      </Button>
                    </div>
                  </div>

                  {/* Team Logo Upload */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Team Logo (Optional)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">Click to upload team logo</p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    Register Team
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
