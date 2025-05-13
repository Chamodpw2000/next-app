import { prisma } from '@/prisma/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcrypt';
const schema = z.object({

    email: z.string().email(),
    password: z.string().min(6).max(20),

});
export async function POST(request: NextRequest) {
    const body = await request.json();
    console.log("lllllllllllllllllllllllllllllllllllllllllll",body);
    
    const validation = schema.safeParse(body);


    if (!validation.success) {
        console.log();
        
        return new Response(JSON.stringify({ error: validation.error.issues }), { status: 400 });
    }
    const user = await prisma.user.findUnique({where:{email:body.email}});
    if (user) {
        return new Response(JSON.stringify({ error: 'User already exists' }), { status: 409 });
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await prisma.user.create({
        data: {
            email: body.email,
            hashedPassword: hashedPassword,
           
     
        }
    });

    return NextResponse.json({ message: 'User created', user: newUser }, { status: 201 });
}