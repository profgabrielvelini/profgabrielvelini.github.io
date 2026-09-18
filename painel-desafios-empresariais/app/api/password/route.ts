import { env } from "cloudflare:workers";
import { NextRequest, NextResponse } from "next/server";
import { hashPin, verifyPin } from "@/lib/admin";
export async function POST(request:NextRequest){const {currentPin,newPin}=await request.json() as {currentPin:string;newPin:string};if(!await verifyPin(currentPin))return NextResponse.json({error:"Senha atual incorreta."},{status:401});if(!/^\d{4,8}$/.test(newPin))return NextResponse.json({error:"A nova senha deve ter de 4 a 8 números."},{status:400});await env.DB.prepare("INSERT OR IGNORE INTO game_state (id, current_round) VALUES (1, 1)").run();await env.DB.prepare("UPDATE game_state SET pin_hash=? WHERE id=1").bind(await hashPin(newPin)).run();return NextResponse.json({ok:true})}
