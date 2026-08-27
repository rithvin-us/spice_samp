import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new',
  args:['--no-sandbox','--hide-scrollbars','--enable-unsafe-swiftshader'] });
const p = await b.newPage();
await p.setViewport({width:1440,height:900});
await p.goto('http://localhost:5180/',{waitUntil:'networkidle2'});
await new Promise(r=>setTimeout(r,1500));
const hash = () => p.evaluate(()=>{
  const c=document.querySelector('canvas'); const o=document.createElement('canvas');
  o.width=32;o.height=18; const x=o.getContext('2d'); x.drawImage(c,0,0,32,18);
  const d=x.getImageData(0,0,32,18).data; let h=0;
  for(let i=0;i<d.length;i+=4) h=(h*31+d[i]+d[i+1]*3+d[i+2]*7)>>>0; return h;
});
const seen=[];
for (const y of [0,400,900,1400,1900,2300]) {
  await p.evaluate(v=>window.scrollTo(0,v), y);
  await new Promise(r=>setTimeout(r,900));
  seen.push(`y=${y} #${(await hash()).toString(16).slice(0,6)}`);
}
console.log('scrub:', seen.join('  '));
console.log('distinct while scrolling:', new Set(seen.map(s=>s.split('#')[1])).size, 'of', seen.length);
await b.close();
