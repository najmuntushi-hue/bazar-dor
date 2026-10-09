
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/schema";

export async function PATCH(request: Request) {
  try {
    // Check the currently signed-in user
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { message: "প্রথমে Sign In করুন।" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const name =
      typeof body.name === "string" ? body.name.trim() : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    // Validate name
    if (!name || name.length > 80) {
      return NextResponse.json(
        { message: "নাম দিন (সর্বোচ্চ ৮০ অক্ষর)।" },
        { status: 400 }
      );
    }

    // Validate email
    if (
      !email ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { message: "সঠিক ইমেইল ঠিকানা দিন।" },
        { status: 400 }
      );
    }

    // Prevent using another user's email
    const existingUser = await db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.email, email))
      .limit(1);

    if (
      existingUser.length > 0 &&
      existingUser[0].id !== session.user.id
    ) {
      return NextResponse.json(
        { message: "এই ইমেইল দিয়ে অন্য একটি অ্যাকাউন্ট রয়েছে।" },
        { status: 409 }
      );
    }

    // Update only the signed-in user's account
    await db
      .update(user)
      .set({
        name,
        email,
        ...(email !== session.user.email
          ? { emailVerified: false }
          : {}),
        updatedAt: new Date(),
      })
      .where(eq(user.id, session.user.id));

    return NextResponse.json({
      message: "প্রোফাইল সফলভাবে আপডেট হয়েছে।",
    });
  } catch (error) {
    console.error("Profile update error:", error);

    return NextResponse.json(
      { message: "প্রোফাইল আপডেট করা যায়নি। আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}

