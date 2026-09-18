import { env } from "cloudflare:workers";

export async function hashPin(pin:string){
  const data=new TextEncoder().encode(pin);
  const digest=await crypto.subtle.digest("SHA-256",data);
  return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,"0")).join("");
}

export async function verifyPin(pin:string){
  const state=await env.DB.prepare("SELECT pin_hash FROM game_state WHERE id = 1").first<{pin_hash:string|null}>();
  if(state?.pin_hash)return state.pin_hash===await hashPin(pin);
  return Boolean(env.ADMIN_PIN&&pin===env.ADMIN_PIN);
}
