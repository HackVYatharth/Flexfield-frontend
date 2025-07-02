"use client";
import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Eye,
  EyeOff,
  Play,
  ArrowLeft,
  Mail,
  Lock,
  User,
  Phone,
  AlertCircle,
  Calendar,
  MapPin,
} from "lucide-react";
import Link from "next/link";

import { loginUser, signupUser, signupUserWithTeam } from "@/lib/services/auth";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [registeringAs, setRegisteringAs] = useState("individual");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "male",
    phone: "",
    email: "",
    pinCode: "",
    password: "",
    confirmPassword: "",
  });

  const [teamData, setTeamData] = useState({
    teamName: "",
    sport: "cricket",
    phoneNumber: "",
    email: "",
    teamMember: "",
    about: "",
  });


  // Default credentials for testing
  // const defaultCredentials = {
  //   email: "admin@flexfield.com",
  //   password: "admin123",
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isLogin) {
        // Login using API
        console.log("Login attempt with:", {
          email: formData.email,
          password: formData.password,
        });

        const response = await loginUser({
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("token", JSON.stringify(response.data.jwt));
        router.push("/home");
      } else {
        // Signup validation
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords don't match");
          return;
        }
        if (formData.password.length < 6) {
          setError("Password must be at least 6 characters");
          return;
        }

        if (registeringAs === "individual") {
          // Map form data to API expected format
          const userData = {
            playerName: formData.name,
            playerEmail: formData.email,
            playerPassword: formData.password,
            confirmPassword: formData.confirmPassword,
            playerContactNumber: formData.phone,
            playerDateOfBirth: formData.dob,
            playerGender: formData.gender,
            playerPincode: formData.pinCode,
            playerTypeId: 1,
            playerSportId: teamData.sport === "cricket" ? 2 : 1,
          };

          console.log("Individual signup with data:", userData);

          const response = await signupUser(userData);
          if (response.status === 201) {
            setIsLogin(true);
          }
        } else {
          // Create new team and user
          const userWithTeamData = {
            playerName: formData.name,
            playerEmail: formData.email,
            playerPassword: formData.password,
            confirmPassword: formData.confirmPassword,
            playerContactNumber: formData.phone,
            playerDateOfBirth: formData.dob,
            playerGender: formData.gender,
            playerPincode: formData.pinCode,
            playerTypeId: 2, // Assuming 2 is for team owner
            playerSportId: teamData.sport === "cricket" ? 2 : 1,
            teamName: teamData.teamName,
            teamContactNumber: teamData.phoneNumber,
            teamEmail: teamData.email,
            teamSportId: teamData.sport === "cricket" ? 2 : 1,
            teamAbout: teamData.about,
            numberOfTeamMembers: parseInt(teamData.teamMember) || 1,
          };

          console.log("Team signup with data:", userWithTeamData);

          const response = await signupUserWithTeam(userWithTeamData);
          console.log("Team signup response:", response.data);

          // After successful signup, switch to login
          setIsLogin(true);
        }
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setError(
        err.response?.data?.message ||
          "Authentication failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-green-500/20 rounded-full opacity-20"
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
          className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/20 rounded-full opacity-20"
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

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/"
            className="inline-flex items-center space-x-2 mb-6 text-gray-400 hover:text-green-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Play className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              FlexField
            </span>
          </div>

          <Badge className="bg-green-900/50 text-green-400 hover:bg-green-900/70 border border-green-500/30">
            🏆 Join 10K+ Players
          </Badge>
        </motion.div>

        {/* Default Credentials Info */}
        {isLogin && (
          <motion.div
            //className="mb-6 p-4 bg-blue-900/30 border border-blue-500/30 rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* <h3 className="text-sm font-semibold text-blue-400 mb-2">
              Demo Credentials:
            </h3>
            <p className="text-xs text-gray-300">Email: admin@flexfield.com</p>
            <p className="text-xs text-gray-300">Password: admin123</p> */}
          </motion.div>
        )}

        {/* Auth Toggle */}
        <motion.div
          className="flex bg-gray-800 border border-gray-700 rounded-xl p-1 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
              isLogin
                ? "bg-green-600 text-white shadow-md"
                : "text-gray-400 hover:text-green-400"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
              !isLogin
                ? "bg-green-600 text-white shadow-md"
                : "text-gray-400 hover:text-green-400"
            }`}
          >
            Sign Up
          </button>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-900/30 border border-red-500/30 rounded-lg flex items-center space-x-2"
          >
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-400">{error}</span>
          </motion.div>
        )}

        {/* Auth Forms */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login" : "signup"}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            custom={isLogin ? -1 : 1}
            transition={{ duration: 0.3 }}
          >
            <Card className="border border-gray-700 shadow-2xl bg-gray-800/50 backdrop-blur-lg">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-green-400">
                  {isLogin ? "Welcome Back!" : "Sign Up"}
                </CardTitle>
                <p className="text-gray-400">
                  {isLogin
                    ? "Sign in to continue your sports journey"
                    : "Join the ultimate sports community"}
                </p>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4"
                    >
                      {/* Name */}
                      <div>
                        <Label htmlFor="name" className="text-sm text-gray-400">
                          Name
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="pl-12 py-6 border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                            required
                          />
                        </div>
                      </div>

                      {/* DOB and Gender */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="dob"
                            className="text-sm text-gray-400"
                          >
                            DOB
                          </Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                              id="dob"
                              type="text"
                              placeholder="YYYY-MM-DD"
                              value={formData.dob}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  dob: e.target.value,
                                })
                              }
                              className="pl-12 py-6 border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm text-gray-400">
                            Gender
                          </Label>
                          <RadioGroup
                            value={formData.gender}
                            onValueChange={(value) =>
                              setFormData({ ...formData, gender: value })
                            }
                            className="flex space-x-4 mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="male"
                                id="male"
                                className="text-green-500"
                              />
                              <Label htmlFor="male" className="text-gray-300">
                                Male
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="female"
                                id="female"
                                className="text-green-500"
                              />
                              <Label htmlFor="female" className="text-gray-300">
                                Female
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>

                      {/* Contact No. */}
                      <div>
                        <Label
                          htmlFor="phone"
                          className="text-sm text-gray-400"
                        >
                          Contact No.
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            className="pl-12 py-6 border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                            required
                          />
                        </div>
                      </div>

                      {/* Pin Code */}
                      <div>
                        <Label
                          htmlFor="pinCode"
                          className="text-sm text-gray-400"
                        >
                          Pin Code
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            id="pinCode"
                            type="text"
                            placeholder="Enter your area pin code"
                            value={formData.pinCode}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                pinCode: e.target.value,
                              })
                            }
                            className="pl-12 py-6 border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                            required
                          />
                        </div>
                      </div>

                      {/* Registering As */}
                      <div>
                        <Label className="text-sm text-gray-400">
                          Registering As
                        </Label>
                        <RadioGroup
                          value={registeringAs}
                          onValueChange={setRegisteringAs}
                          className="flex space-x-4 mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="individual"
                              id="individual"
                              className="text-green-500"
                            />
                            <Label
                              htmlFor="individual"
                              className="text-gray-300"
                            >
                              Individual
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="team"
                              id="team"
                              className="text-green-500"
                            />
                            <Label htmlFor="team" className="text-gray-300">
                              Team
                            </Label>
                          </div>
                        </RadioGroup>
                        {registeringAs !== "team" && (
                          <div className="mt-4">
                            <Label className="text-sm text-gray-400">
                              Sport
                            </Label>
                            <RadioGroup
                              value={teamData.sport}
                              onValueChange={(value) =>
                                setTeamData({ ...teamData, sport: value })
                              }
                              className="flex space-x-4 mt-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="cricket"
                                  id="cricket"
                                  className="text-green-500"
                                />
                                <Label
                                  htmlFor="cricket"
                                  className="text-gray-300"
                                >
                                  Cricket
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="football"
                                  id="football"
                                  className="text-green-500"
                                />
                                <Label
                                  htmlFor="football"
                                  className="text-gray-300"
                                >
                                  Football
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                        )}
                      </div>

                      {/* `Team Registration Fields */}
                      {registeringAs === "team" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-4 p-4 border border-gray-600 rounded-lg"
                        >
                          <h3 className="text-lg font-semibold text-center text-green-400">
                            Team Registration
                          </h3>

                          {/* Team Name */}
                          <div>
                            <Label
                              htmlFor="teamName"
                              className="text-sm text-gray-400"
                            >
                              Team Name
                            </Label>
                            <Input
                              id="teamName"
                              type="text"
                              placeholder="Enter team name"
                              value={teamData.teamName}
                              onChange={(e) =>
                                setTeamData({
                                  ...teamData,
                                  teamName: e.target.value,
                                })
                              }
                              className="border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                              required
                            />
                          </div>

                          {/* Sport */}
                          <div>
                            <Label className="text-sm text-gray-400">
                              Sport
                            </Label>
                            <RadioGroup
                              value={teamData.sport}
                              onValueChange={(value) =>
                                setTeamData({ ...teamData, sport: value })
                              }
                              className="flex space-x-4 mt-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="cricket"
                                  id="cricket"
                                  className="text-green-500"
                                />
                                <Label
                                  htmlFor="cricket"
                                  className="text-gray-300"
                                >
                                  Cricket
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="football"
                                  id="football"
                                  className="text-green-500"
                                />
                                <Label
                                  htmlFor="football"
                                  className="text-gray-300"
                                >
                                  Football
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>

                          {/* Team Member */}
                          <div>
                            <Label
                              htmlFor="teamMember"
                              className="text-sm text-gray-400"
                            >
                              Team Member
                            </Label>
                            <Input
                              id="teamMember"
                              type="number"
                              placeholder="Enter Number Of Team Members (Max 11)"
                              value={teamData.teamMember}
                              onChange={(e) =>
                                setTeamData({
                                  ...teamData,
                                  teamMember: e.target.value,
                                })
                              }
                              className="border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                              required
                            />
                          </div>

                          {/* Team Phone Number */}
                          <div>
                            <Label
                              htmlFor="teamPhone"
                              className="text-sm text-gray-400"
                            >
                              Phone Number
                            </Label>
                            <Input
                              id="teamPhone"
                              type="tel"
                              placeholder="Enter team contact number"
                              value={teamData.phoneNumber}
                              onChange={(e) =>
                                setTeamData({
                                  ...teamData,
                                  phoneNumber: e.target.value,
                                })
                              }
                              className="border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                              required
                            />
                          </div>

                          {/* Team Email */}
                          <div>
                            <Label
                              htmlFor="teamEmail"
                              className="text-sm text-gray-400"
                            >
                              Email
                            </Label>
                            <Input
                              id="teamEmail"
                              type="email"
                              placeholder="Enter team email"
                              value={teamData.email}
                              onChange={(e) =>
                                setTeamData({
                                  ...teamData,
                                  email: e.target.value,
                                })
                              }
                              className="border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                              required
                            />
                          </div>

                          {/* About */}
                          <div>
                            <Label
                              htmlFor="teamEmail"
                              className="text-sm text-gray-400"
                            >
                              About
                            </Label>
                            <Input
                              id="teamAbout"
                              type="text"
                              placeholder="Tell About Your Team and Mention your skills"
                              value={teamData.about}
                              onChange={(e) =>
                                setTeamData({
                                  ...teamData,
                                  about: e.target.value,
                                })
                              }
                              className="border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                              required
                            />
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Email */}
                  <div>
                    <Label
                      htmlFor="email"
                      className={`text-sm text-gray-400 ${
                        !isLogin ? "sr-only" : ""
                      }`}
                    >
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="pl-12 py-6 border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  {isLogin ? (
                    // Login - Single password field
                    <div>
                      <Label
                        htmlFor="password"
                        className="text-sm text-gray-400"
                      >
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                          className="pl-12 pr-12 py-6 border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Signup - Password and Confirm Password fields
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="password"
                          className="text-sm text-gray-400"
                        >
                          Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="New"
                            value={formData.password}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                password: e.target.value,
                              })
                            }
                            className="pl-12 py-6 border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label
                          htmlFor="confirmPassword"
                          className="text-sm text-gray-400"
                        >
                          Confirm
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Re-enter"
                            value={formData.confirmPassword}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                confirmPassword: e.target.value,
                              })
                            }
                            className="pl-12 py-6 border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {isLogin && (
                    <div className="flex justify-end">
                      {/* <a
                        href="#"
                        className="text-sm text-green-400 hover:text-green-300"
                      >
                        Forgot Password?
                      </a> */}
                    </div>
                  )}

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full py-6 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-lg font-medium"
                    >
                      {isLogin ? "Sign In" : "Sign Up"}
                    </Button>
                  </motion.div>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-400">
                    {isLogin
                      ? "Don't have an account? "
                      : "Already registered? "}
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-green-400 hover:text-green-300 font-medium"
                    >
                      {isLogin ? "Sign Up" : "Login"}
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
