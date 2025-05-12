import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import { prisma } from "@/prisma/lib/prisma";


export async function GET(request: NextRequest, {params}:{params: { id: string}}){

if(parseInt(params.id)>10) return NextResponse.json({error: 'User not found'}, {status: 404});
    
const user = await prisma.user.findUnique({where:{id:parseInt(params.id)}});

if(!user) return NextResponse.json({error: 'User not found'}, {status: 404});



return NextResponse.json({name : user.name , email:user.email})

}

export async function POST(request:NextRequest){
    const body =  await request.json();




    
if(!body.name) return NextResponse.json({error: 'Name is required'}, {status: 400})
if(!body.email) return NextResponse.json({error: 'Email is required'}, {status: 400})

    const existinguser = await prisma.user.findUnique({where:{email:body.email}});
    if(existinguser) return NextResponse.json({error: 'User already exists'}, {status: 409})

    const user = await prisma.user.create({data:{name:body.name, email:body.email}});    
    return NextResponse.json({messege: 'User created', user}, {status: 201});

};


export async function PUT(request: NextRequest, {params}:{params: { id: string}}){
    const body =  await request.json();


const user = await prisma.user.findUnique({where:{id:parseInt(params.id)}});
if(!user) return NextResponse.json({error: 'User not found'}, {status: 404});


const updatedUser = await prisma.user.update({where: {id: parseInt(params.id)}, data: body});





    return NextResponse.json({updatedUser, message: 'User updated'}, {status: 200});

}

export async function DELETE(request: NextRequest, {params}:{params: { id: string}}){
    const user = await prisma.user.findUnique({where:{id:parseInt(params.id)}});
if(!user) return NextResponse.json({error: 'User not found'}, {status: 404});
    await prisma.user.delete({where:{id:parseInt(params.id)}});


    return NextResponse.json({id: params.id , message:'User deleted'});

}




