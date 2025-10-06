import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

const DealerLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Login successful",
          description: "Welcome back!",
        });

        navigate("/dealer/dashboard");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dealer/dashboard`,
            data: {
              first_name: firstName,
              last_name: lastName,
            },
          },
        });

        if (error) throw error;

        toast({
          title: "Account created",
          description: "You can now log in!",
        });

        setIsLogin(true);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030303] via-[#1a1a1a] to-[#030303] flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-[#FCFCFC] border-[#D6C68A]/20">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-[#030303]">
            {isLogin ? "Dealer Login" : "Create Account"}
          </CardTitle>
          <CardDescription className="text-center text-[#030303]/70">
            {isLogin
              ? "Enter your credentials to access the dealer portal"
              : "Sign up for a new dealer account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-[#030303]">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="bg-white border-[#D6C68A]/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-[#030303]">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="bg-white border-[#D6C68A]/30"
                  />
                </div>
              </>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#030303]">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white border-[#D6C68A]/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#030303]">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white border-[#D6C68A]/30 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#030303]/50 hover:text-[#030303]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#D6C68A] hover:bg-[#D6C68A]/90 text-[#030303] font-semibold"
              disabled={loading}
            >
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-[#D6C68A] hover:underline"
            >
              {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealerLogin;
