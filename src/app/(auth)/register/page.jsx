
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

  

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
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
      const response = await fetch(`${BaseUrl}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname,
          lastname,
          phonenumber,
          email,
          password,
          role: "jobseeker", // Default role
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }

      const data = await response.json();
      await updateSession({
        user: {
          id: data.user.id,
          email: data.user.email,
          role: data.user.role,
          firstname: data.user.firstname,
        },
        expires: data.session?.expires || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      });
      router.push("/"); // Redirect to home page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
      <div className="flex justify-center mt-4">
        <Logo 
          className="h-6 text-zinc-950 dark:text-white forced-colors:text-[CanvasText]" 
          aria-label="Company Logo"
        />
      </div>
      <form onSubmit={handleSubmit} className="grid w-full max-w-sm grid-cols-1 gap-8 mt-4">
        <Heading>Create your account</Heading>
        {error && (
          <Text className="text-red-600">{error}</Text>
        )}
        <Field>
          <Label>First Name</Label>
          <Input 
            name="firstname" 
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </Field>
        <Field>
          <Label>Last Name</Label>
          <Input 
            name="lastname" 
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </Field>
        <Field>
          <Label>Phone Number</Label>
          <Input 
            type="tel" 
            name="phonenumber" 
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            required
          />
        </Field>
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
            autoComplete="new-password"
            required
          />
        </Field>
        <CheckboxField>
          <Checkbox name="newsletter" />
          <Label>Get emails about product updates and news.</Label>
        </CheckboxField>
        <Button type="submit" className="w-full">
          Create account
        </Button>
        <Text>
          Already have an account?{' '}
          <TextLink href="/login">
            <Strong>Sign in</Strong>
          </TextLink>
        </Text>
      </form>
    </div>
  );
}
