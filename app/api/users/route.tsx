import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest){

    return NextResponse.json([
        {id: 1, name: 'John Doe', email: 'john.doe@mail.com'},
        {id: 2, name: 'Jane Doe', email: 'jane.doe@mail.com'},
        {id: 3, name: 'John Smith', email: 'john.smith@mail.com'},
        {id: 4, name: 'Jane Smith', email: 'jane.smith@mail.com'},
        
    ])

    
}


export async function POST(request: NextRequest){
    
    const body = await request.json();
    if(!body.name) return NextResponse.json({error: 'Name is required'}, {status: 400})
    return NextResponse.json({id: 5, name: body.name, email: body.email}, {status: 201})
}