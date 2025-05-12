
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/lib/prisma";

// GET all users
export async function GET(request: NextRequest) {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { error: 'Failed to fetch users' }, 
            { status: 500 }
        );
    }
}


// CREATE a new user
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        // Validate required fields
        if (!body.email || !body.name) {
            return NextResponse.json(
                { error: 'Email and Name are required' }, 
                { status: 400 }
            );
        }

        // Create user in database
        const newUser = await prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
                // Optional fields with defaults from schema
                followers: body.followers ?? 0,
                isActive: body.isActive ?? true
            }
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        
        // Handle unique constraint violation for email
        if (error instanceof Error && error.message.includes('Unique constraint')) {
            return NextResponse.json(
                { error: 'A user with this email already exists' }, 
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to create user' }, 
            { status: 500 }
        );
    }
}