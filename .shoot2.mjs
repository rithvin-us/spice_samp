import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox','--hide-scrollbars'] });
const targets = JSON.parse(process.argv[2]);
const OUT='C:/Users/rithv/AppData/Local/Temp/claude/E--w-spice-samp/3ee7bd1f-c780-43dd-924d-8cddf63e1c80/scratchpad/shots';
const errs=[];
for (const t of targets) {
  const p = await b.newPage();
  await p.setViewport({width:t.w,height:t.h,isMobile:!!t.mobile,hasTouch:!!t.mobile});
  p.on('pageerror',e=>errs.push(`[${t.name}] ${String(e).slice(0,200)}`));
  p.on('console',m=>{if(m.type()==='error')errs.push(`[${t.name}] ${m.text().slice(0,200)}`)});
  await p.goto('http://localhost:5180'+(t.path||'/'),{waitUntil:'networkidle2',timeout:45000});
  await p.evaluate((sel)=>{const el=document.querySelector(sel); if(el) el.scrollIntoView({block:'start',behavior:'instant'});}, t.sel);
  await p.evaluate((o)=>window.scrollBy(0,o||0), t.offset);
  await new Promise(r=>setTimeout(r,t.settle??1200));
  const ov = await p.evaluate(()=>({s:document.documentElement.scrollWidth,c:document.documentElement.clientWidth}));
  if(ov.s>ov.c+1) errs.push(`[${t.name}] H-OVERFLOW ${ov.s}>${ov.c}`);
  await p.screenshot({path:`${OUT}/${t.name}.png`});
  await p.close();
}
await b.close();
console.log(errs.length?errs.join('\n'):'CLEAN');
