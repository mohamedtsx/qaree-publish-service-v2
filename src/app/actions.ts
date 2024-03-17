"use server";

import { signUp } from "@/lib/graphql";
import type { RegisterData } from "@/lib/graphql/types";
import { registerFormSchema } from "@/schema";
import { signIn } from "next-auth/react";

type RegisterState = {
	success: boolean;
	message: string;
	error?: string;
};

export const register = async (
	userData: RegisterData,
): Promise<RegisterState> => {
	const result = registerFormSchema.safeParse(userData);

	if (!result.success) {
		const errorMessage = result.error.message;
		return {
			success: false,
			message: "Form data is not valid",
			error: errorMessage,
		};
	}

	try {
		// 1. Sign Up
		const signupRes = await signUp(userData);
		if (signupRes.status !== 200 || !signupRes.data.signup) {
			return {
				success: false,
				message: "Failed to sign up",
			};
		}

		// 2. Verfiy Email

		return {
			success: true,
			message: signupRes.data.signup?.message as string,
		};
	} catch (error) {
		let errorMessage = "Register Unexpected Error!";

		if (error instanceof Error) {
			errorMessage = error.message;
		}

		return {
			success: false,
			message: errorMessage,
		};
	}
};

// 2. Verfiy Email
// const { email, password } = userData;

// 3. Login
// await signIn("credentials", {
// 	redirect: false,
// 	email,
// 	password,
// });

// if (!res.data.signup) {
//   return {
//     success: false,
//     message: "Failed to register",
//   };
// }
