import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { CheckCircle, Zap, Shield, ArrowRight, Layout, Calendar, Bell } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
    

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Manage tasks with
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> 
                {" "}efficiency
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Stay organized, focused, and in control. TaskFlow helps you manage your tasks 
              with elegance and simplicity.
            </p>
           
          </div>
        </div>
      </section>
<div className="flex justify-center gap-5">
  <Link href="/sign-in">
    <Button className="bg-black text-white hover:opacity-90">
      Sign in
    </Button>
  </Link>
  <Link href="/sign-in">
    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90">
      Sign up
    </Button>
  </Link>
</div>
     </div>
  )
}

