
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from '@/app/logo';
import { Button } from '@/components/button';
import { Checkbox, CheckboxField } from '@/components/checkbox';
import { Field, Label } from '@/components/fieldset';
import { Heading } from '@/components/heading';
import { Input } from '@/components/input';
import { Strong, Text, TextLink } from '@/components/text';
import { Link } from '@/components/link';
import { useSession } from "@/contexts/SessionContext";

// export const metadata = {
//   title: 'Login',
// };

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateSession } = useSession();
  const router = useRouter();
  const BaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10255";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${BaseUrl}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }

      const data = await response.json();
      await updateSession({
        user: {
          id: data.user.id,
          email: data.user.email,
          role: data.user.role,
          firstname: data.user.firstname,
        },
        expires: data.session.expires,
      });
      router.push("/"); // Redirect to home page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
      <Link href="/" className="flex justify-center mt-4">
        <Logo 
          className="h-6 text-zinc-950 dark:text-white forced-colors:text-[CanvasText]" 
          aria-label="Company Logo"
        />
      </Link>
      <form onSubmit={handleSubmit} className="grid w-full max-w-sm grid-cols-1 gap-8 mt-4">
        <Heading>Sign in to your account</Heading>
        {error && (
          <Text className="text-red-600">{error}</Text>
        )}
        <Field>
          <Label>Email</Label>
          <Input 
            type="email" 
            name="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Field>
        <Field>
          <Label>Password</Label>
          <Input 
            type="password" 
            name="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Field>
        <div className="flex items-center justify-between">
          <CheckboxField>
            <Checkbox name="remember" />
            <Label>Remember me</Label>
          </CheckboxField>
          <Text>
            <TextLink href="/forgot-password">
              <Strong>Forgot password?</Strong>
            </TextLink>
          </Text>
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Text>
          Don’t have an account?{' '}
          <TextLink href="/register">
            <Strong>Sign up</Strong>
          </TextLink>
        </Text>
      </form>
    </div>
  );
}
