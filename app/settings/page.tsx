'use client'

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState, useEffect } from "react"
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { DELETE } from '@/app/api/delete-account/route'

const AVATAR_OPTIONS = [
  { value: "1", url: "https://github.com/shadcn.png" },
  { value: "2", url: "https://github.com/vercel.png" },
  { value: "3", url: "https://avatars.githubusercontent.com/u/124599" },
  { value: "4", url: "https://avatars.githubusercontent.com/u/1475839" },
]

export default function Settings() {
  const supabase = createClient()
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0].url)
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  // Fetch current profile data
  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('avatar_url, display_name')
          .eq('id', user.id)
          .single()

        if (profile) {
          setSelectedAvatar(profile.avatar_url)
          setName(profile.display_name)
        }
      }
    }
    getProfile()
  }, [])

  // Save profile changes
  const handleSaveProfile = async () => {
    try {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) throw new Error('No user found')

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          avatar_url: selectedAvatar,
          display_name: name,
          updated_at: new Date().toISOString()
        })
        .select()

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error updating profile')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    try {
      const response = await DELETE()

     

      // Sign out after successful deletion
      const supabase = createClient()
      await supabase.auth.signOut()
      
      // Redirect to home page
      window.location.href = '/'
    } catch (error) {
      console.error('Error deleting account:', error)
      alert('Failed to delete account. Please try again.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            Manage your account settings and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Selection */}
          <div className="space-y-4">
            <Label>Profile Picture</Label>
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={selectedAvatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Select
                onValueChange={(value) => {
                  const avatar = AVATAR_OPTIONS.find(a => a.value === value)
                  if (avatar) setSelectedAvatar(avatar.url)
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select avatar" />
                </SelectTrigger>
                <SelectContent>
                  {AVATAR_OPTIONS.map((avatar) => (
                    <SelectItem key={avatar.value} value={avatar.value}>
                      Avatar {avatar.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name">Display Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          {/* Save Profile Button */}
          <Button 
            className="w-full" 
            onClick={handleSaveProfile}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Profile Changes'}
          </Button>

          {/* Password Change */}
          <div className="pt-4 border-t">
            <Link href="/resetpassword">
            <Button 
              variant="outline" 
              className="w-full"
              >
              Change Password
            </Button>
              </Link>
          </div>

          {/* Delete Account */}
          <div className="pt-4">
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}