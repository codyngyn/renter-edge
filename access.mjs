import {createHash,timingSafeEqual} from 'node:crypto';
export function liveEnabled(env=process.env){return env.RENTER_EDGE_LIVE==='true' && typeof env.RENTER_EDGE_DEMO_TOKEN==='string' && env.RENTER_EDGE_DEMO_TOKEN.length>=32;}
export function authorized(header,env=process.env){
 if(!liveEnabled(env)||typeof header!=='string')return false;
 const hash=s=>createHash('sha256').update(s).digest();
 return timingSafeEqual(hash(header),hash('Bearer '+env.RENTER_EDGE_DEMO_TOKEN));
}
