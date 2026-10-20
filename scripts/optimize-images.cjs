// Generates copies only. Originals remain available for fallback and enlargement.
const sharp = require('sharp');
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const images = [
  ['logo-oficial-salmos.png', [208,416,624], 'lossless'],
  ['imagem-principal-salmos-com-bonus.png', [400,768,1120,1199], 96],
  ...['01','02','03','04','05','06'].map(i=>[`atividade-${i}.webp`, [720,1055],96]),
  ['terceira-secao-salmos-antes-depois.png', [640,1024,1672],96],
  ...['joely-cardoso','juliana-ferreira','juliana-martins','mariana-costa'].map(n=>[`depoimento-${n}.png`,[420,840,1122],96]),
  ...['familias','educadores','ministerios'].map(n=>[`para-quem-${n}.png`,[480,768,1120,1536],94]),
  ...['bible-goods','proverbios-na-ponta-do-lapis','tabuada-com-noe','emociobook'].map(n=>[`bonus-${n}.png`,[220,440,660],96]),
  ['garantia-jesus-criancas.png',[400,800,1254],96],
];
const heroSizes = '(max-width: 359px) calc(100vw - 32px), (max-width: 767px) calc(100vw - 40px), (max-width: 1185px) calc(100vw - 64px), 1122px';
(async()=>{
  await fs.mkdir('public/images/optimized',{recursive:true});
  const manifest={}, report=[];
  const previous=JSON.parse(await fs.readFile('work/performance/image-sizes.json','utf8').catch(()=>'{"images":[]}'));
  for(const [name,widths,quality] of images){
    const source=path.join('public/images',name),original=await fs.readFile(source),meta=await sharp(original).metadata();
    const variants=[], avifVariants=[];
    const avifQuality = /^(para-quem|bonus-|terceira-)/.test(name) ? 85 : 70;
    const hash=crypto.createHash('sha256').update(original).digest('hex');
    const prior=previous.images.find(i=>i.source==='/images/'+name&&i.sha256===hash&&i.quality===quality);
    for(const width of widths){
      const old=prior?.variants.find(v=>v.width===width);
      let resized=old ? await fs.readFile('public'+old.src).catch(()=>null) : null;
      resized ||= await sharp(original).resize({width,withoutEnlargement:true,kernel:'lanczos3'}).webp(quality==='lossless'?{lossless:true,effort:6}:{quality,alphaQuality:100,smartSubsample:true,effort:6}).toBuffer();
      const target=`/images/optimized/${path.parse(name).name}-${width}.webp`;
      // Already-compressed full-size activity WebPs do not need a larger copy.
      if(name.endsWith('.webp')&&width===meta.width&&resized.length>=original.length){
        variants.push({src:'/images/'+name,width,bytes:original.length});
      }else{
        await fs.writeFile('public'+target,resized);
        variants.push({src:target,width,bytes:resized.length});
      }
    }
    if(quality!=='lossless'&&!name.endsWith('.webp')){
      for(const width of widths){
        const target=`/images/optimized/${path.parse(name).name}-${width}.avif`;
        const oldAvif=prior?.avifQuality===avifQuality && prior.avifVariants?.find(v=>v.width===width);
        let buffer=oldAvif ? await fs.readFile('public'+oldAvif.src).catch(()=>null) : null;
        buffer ||= await sharp(original).resize({width,withoutEnlargement:true,kernel:'lanczos3'}).avif({quality:avifQuality,chromaSubsampling:'4:4:4',effort:4}).toBuffer();
        await fs.writeFile('public'+target,buffer);
        avifVariants.push({src:target,width,bytes:buffer.length});
      }
    }
    manifest['/images/'+name]={width:meta.width,height:meta.height,variants:variants.map(({src,width})=>({src,width})),...(avifVariants.length?{avifVariants:avifVariants.map(({src,width})=>({src,width}))}:{})};
    report.push({source:'/images/'+name,originalBytes:original.length,sha256:crypto.createHash('sha256').update(original).digest('hex'),width:meta.width,height:meta.height,quality,variants,avifQuality,avifEffort:4,avifVariants});
    console.log(name,original.length,'→',variants.map(v=>`${v.width}w:${v.bytes}`).join(', '));
  }
  await fs.writeFile('src/optimized-images.json',JSON.stringify(manifest,null,2)+'\n');
  await fs.mkdir('work/performance',{recursive:true});
  await fs.writeFile('work/performance/image-sizes.json',JSON.stringify({encoder:sharp.versions,images:report},null,2)+'\n');
  const hero=manifest['/images/imagem-principal-salmos-com-bonus.png'];
  const srcset=hero.avifVariants.map(v=>`${v.src} ${v.width}w`).join(', ');
  const preload=`<!-- critical-product-image --><link rel="preload" as="image" type="image/avif" href="${hero.avifVariants[1].src}" imagesrcset="${srcset}" imagesizes="${heroSizes}" fetchpriority="high"/><!-- /critical-product-image -->`;
  let html=await fs.readFile('index.html','utf8');
  html=html.includes('<!-- critical-product-image -->')?html.replace(/<!-- critical-product-image -->[\s\S]*?<!-- \/critical-product-image -->/,preload):html.replace('</head>',preload+'</head>');
  await fs.writeFile('index.html',html);
})().catch(error=>{console.error(error);process.exitCode=1;});
