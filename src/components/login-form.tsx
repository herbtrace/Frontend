import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useState } from "react"

interface LoginFormProps extends React.ComponentProps<"div"> {
  onLogin?: (email: string, password: string) => void;
  onSignUp?: () => void;
  isLoading?: boolean;
}

export function LoginForm({
  className,
  onLogin,
  onSignUp,
  isLoading = false,
  ...props
}: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin?.(email, password)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-0 shadow-xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6">
                  <Image
                    src="/logo.png"
                    alt="Herbtrace Logo"
                    width={60}
                    height={60}
                    className="mx-auto mb-3"
                  />
                  <div className="w-12 h-px bg-green-600 mx-auto"></div>
                </div>
                <h1 className="text-2xl font-light tracking-wide text-black">Welcome back</h1>
                <p className="text-gray-600 text-balance font-light">
                  Sign in to your Herbtrace account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm text-gray-500 hover:text-green-600 underline-offset-2 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-md border-0"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={onSignUp}
                  className="text-green-600 hover:text-green-700 underline underline-offset-4 font-medium"
                >
                  Sign up
                </button>
              </div>
            </div>
          </form>
          <div className="bg-gradient-to-br from-green-50 to-green-100 relative hidden md:block">
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="text-green-600 text-6xl mb-6">🌿</div>
                <h3 className="text-xl font-light text-gray-800 mb-4">Supply Chain Transparency</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Track herbs from farm to pharmacy with complete visibility and trust
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-gray-500 text-center text-xs text-balance">
        By signing in, you agree to our{" "}
        <a href="#" className="text-green-600 hover:text-green-700 underline underline-offset-4">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-green-600 hover:text-green-700 underline underline-offset-4">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  )
}
