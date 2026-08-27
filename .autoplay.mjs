import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new',
  args:['--no-sandbox','--hide-scrollbars','--enable-unsafe-swiftshader'] });
const p = await b.newPage();
await p.setViewport({width:1440,height:900});
await p.goto('http://localhost:5180/',{waitUntil:'domcontentloaded',timeout:45000});

// Sample the real <canvas> pixels without ever scrolling.
const samples = await p.evaluate(async () => {
  const out=[];
  const grab = () => {
    const c = document.querySelector('canvas');
    if (!c) return {t:'no-canvas'};
    const off = document.createElement('canvas');
    off.width=32; off.height=18;
    const ctx=off.getContext('2d');
    try { ctx.drawImage(c,0,0,32,18); } catch(e){ return {t:'taint'}; }
    const d=ctx.getImageData(0,0,32,18).data;
    let h=0; for(let i=0;i<d.length;i+=4) h=(h*31+d[i]+d[i+1]*3+d[i+2]*7)>>>0;
    return {hash:h, y:window.scrollY};
  };
  for (let i=0;i<24;i++){
    out.push({ms:i*250, ...grab()});
    await new Promise(r=>setTimeout(r,250));
  }
  return out;
});
await b.close();
const hashes=samples.filter(s=>s.hash!==undefined);
const uniq=[...new Set(hashes.map(s=>s.hash))];
console.log('scrollY values:', [...new Set(samples.map(s=>s.y))].join(','));
console.log('samples:', hashes.length, ' distinct frames drawn:', uniq.length);
console.log(samples.map(s=>`${s.ms}ms y=${s.y} ${s.hash!==undefined?('#'+s.hash.toString(16).slice(0,6)):s.t}`).join('\n'));
