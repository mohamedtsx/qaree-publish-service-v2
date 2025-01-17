"use client";

import { Form } from "./ui/form";

import { type LoginSchemaType, loginFormSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { FormInput, SubmitButton } from "./SmartForm";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Icons } from "./Icons";
import { Button } from "./ui/button";

import Link from "next/link";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";

function AuthLoginForm() {
	const form = useForm<LoginSchemaType>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: "",
		},
	});

	const router = useRouter();

	const onSubmit = async (values: LoginSchemaType) => {
		const { email, password } = values;

		if (!email || !password) {
			if (!email) {
				toast.error("Please enter your email address.");
			} else {
				toast.error("Please enter password.");
			}
			return;
		}

		const res = await signIn("credentials", {
			redirect: false,
			...values,
		});

		if (res?.error) {
			return toast.error(res.error);
		}

		router.push("/dashboard");
	};

	return (
		<Card className="w-full max-w-lg">
			<CardHeader className="space-y-2">
				<CardTitle className="text-2xl">Sign In</CardTitle>
				<CardDescription>
					Welcome back! Sign in to your Qaree account.
				</CardDescription>
			</CardHeader>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
					<CardContent className="grid gap-4">
						<Button
							type="button"
							variant="outline"
							onClick={() => {
								toast.error("Sign in with google is not avilable yet");
							}}
						>
							<Icons.google className="mr-2 h-4 w-4" />
							Google
						</Button>
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-muted-foreground">
									Or continue with
								</span>
							</div>
						</div>
						<FormInput
							form={form}
							name="email"
							label="Email"
							type="email"
							placeholder="Enter your email address"
						/>
						<div>
							<FormInput
								form={form}
								name="password"
								type="password"
								label="Password"
								placeholder="Enter password"
							/>
							<div className="mt-2 flex justify-end">
								<Link
									className="text-sm hover:underline text-muted-foreground"
									href={"/signin/reset-password"}
								>
									Forgot password?
								</Link>
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex flex-col">
						<SubmitButton>Login</SubmitButton>
						<p className="text-sm text-muted-foreground w-full mt-5">
							Don`t have account?{" "}
							<Link href={"/signup"} className="hover:underline">
								Sign up
							</Link>
						</p>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}

export default AuthLoginForm;
