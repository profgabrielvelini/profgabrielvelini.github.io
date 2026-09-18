import { env } from "cloudflare:workers";
import { NextRequest, NextResponse } from "next/server";
import { verifyPin } from "@/lib/admin";
export async function POST(request:NextRequest){const {pin}=await request.json() as {pin:string};if(!await verifyPin(pin))return NextResponse.json({error:"Não autorizado."},{status:401});await env.DB.batch([env.DB.prepare("DELETE FROM selections"),env.DB.prepare("INSERT OR IGNORE INTO game_state (id, current_round) VALUES (1, 1)"),env.DB.prepare("UPDATE game_state SET current_round = 1, timer_status = 'idle', timer_end_at = NULL, timer_remaining = timer_duration WHERE id = 1")]);return NextResponse.json({ok:true,round:1})}
