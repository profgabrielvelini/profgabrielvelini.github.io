import { env } from "cloudflare:workers";
import { NextRequest, NextResponse } from "next/server";
import { verifyPin } from "@/lib/admin";

export async function POST(request:NextRequest){
  const {pin,action,minutes}=await request.json() as {pin:string;action:"start"|"pause"|"resume"|"clear";minutes?:number};
  if(!await verifyPin(pin))return NextResponse.json({error:"Não autorizado."},{status:401});
  await env.DB.prepare("INSERT OR IGNORE INTO game_state (id, current_round) VALUES (1, 1)").run();
  const now=Date.now();
  if(action==="start"){
    const seconds=Math.max(60,Math.min(10800,Math.round(Number(minutes||5)*60)));
    await env.DB.prepare("UPDATE game_state SET timer_status='running', timer_duration=?, timer_remaining=?, timer_end_at=? WHERE id=1").bind(seconds,seconds,now+seconds*1000).run();
  }else if(action==="pause"){
    const state=await env.DB.prepare("SELECT timer_end_at FROM game_state WHERE id=1").first<{timer_end_at:number|null}>();
    const remaining=Math.max(0,Math.ceil(((state?.timer_end_at||now)-now)/1000));
    await env.DB.prepare("UPDATE game_state SET timer_status='paused', timer_remaining=?, timer_end_at=NULL WHERE id=1").bind(remaining).run();
  }else if(action==="resume"){
    const state=await env.DB.prepare("SELECT timer_remaining FROM game_state WHERE id=1").first<{timer_remaining:number}>();
    const remaining=Math.max(0,state?.timer_remaining||0);
    await env.DB.prepare("UPDATE game_state SET timer_status='running', timer_end_at=? WHERE id=1").bind(now+remaining*1000).run();
  }else if(action==="clear"){
    await env.DB.prepare("UPDATE game_state SET timer_status='idle', timer_remaining=timer_duration, timer_end_at=NULL WHERE id=1").run();
  }
  return NextResponse.json({ok:true});
}
