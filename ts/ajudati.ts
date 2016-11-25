import {TweenDeckOptions, TweenDeck} from './tweendeck';
import {LineChart} from './chart';
import {position, Slide, SlideConf, SlideEffect, SlideEffectType, renderSlides, renderSlideEffect} from './slide';

enum ATISlides{
  App      = 0,
  Problema,
  Qualidades,
  Mercado,
  Domestico,
  PublicoAlvo,
  Solucoes,
  AjudaTI,
  GerenciarChamados,
  ProcurarAjudantes,
  ProcurarServico,
  Conversacao,
  Diferenciais,
  // RedesSociais,
  ModeloNegocio,
  Inovacao,
  Equipe,
  Obrigado
}

enum ColorNames{
  DarkPurple = 0,
  Green,
  Blue,
  DarkPink,
  DarkGrey,
  DarkRed,
  Purple,
  DarkYellow,
  SkyBlue,
  PalePink,
  LightPurple,
  White
}
let colors:string[] = [
"#2a1948",
"#0d4f08",
"#080b4f",
"#4f164c",
"#333333",
"#660000",
"#340c7a",
"#674900",
"#0c2e7a",
"#7a0c3d",
'#c0ade3',
'#ffffff'
];

// {
//   name:"redessociais",
//   bgColor:colors[ColorNames.DarkRed],
//   titleColor:colors[ColorNames.White],
//   fgColor:colors[ColorNames.White]
// },

let slidesConf:SlideConf[] = [
  {
    name:"App",
    bgColor:colors[ColorNames.DarkPurple],
    titleColor:colors[ColorNames.LightPurple],
    fgColor:colors[ColorNames.White]
  },
  {
    name:"problema",
    bgColor:colors[ColorNames.DarkPurple],
    titleColor:colors[ColorNames.LightPurple],
    fgColor:colors[ColorNames.White]
  },
  {
    name:"qualidades",
    bgColor:colors[ColorNames.Purple],
    titleColor:colors[ColorNames.White],
    fgColor:colors[ColorNames.White]
  },
  {
    name:"mercado",
    bgColor:colors[ColorNames.Green],
    titleColor:colors[ColorNames.White],
    fgColor:colors[ColorNames.White]
  },
  {
    name:"domestico",
    bgColor:colors[ColorNames.Blue],
    titleColor:colors[ColorNames.White],
    fgColor:colors[ColorNames.White]
  },
  {
    name:"publicoalvo",
    bgColor:colors[ColorNames.DarkPink],
    titleColor:colors[ColorNames.White],
    fgColor:colors[ColorNames.White]
  },
  {
    name:"solucoes",
    bgColor:colors[ColorNames.DarkGrey],
    titleColor:colors[ColorNames.White],
    fgColor:colors[ColorNames.White]
  },
  {
    name:"ajudati",
    bgColor:colors[ColorNames.Purple],
    titleColor:colors[ColorNames.White],
    fgColor:colors[ColorNames.White]
  },
  {
    name:"gerenciarchamados",
    bgColor:colors[ColorNames.Green],
    titleColor:colors[ColorNames.White],
    fgColor:colors[ColorNames.White]
  },
  {
    name:"procurarajudantes",
    bgColor:colors[ColorNames.SkyBlue],
    titleColor:colors[ColorNames.White],
    fgColor:colors[ColorNames.White]
  },
  {
    name:"procurarservico",
    bgColor:colors[ColorNames.PalePink],
    titleColor:colors[ColorNames.White],
    fgColor:colors[ColorNames.White]
  },
  {
    name:"conversacao",
    bgColor:colors[ColorNames.Purple],
    titleColor:colors[ColorNames.White],
    fgColor:colors[ColorNames.White]
  },
  {
    name:"diferenciais",
    bgColor:colors[ColorNames.Purple],
    titleColor:colors[ColorNames.White],
    fgColor:colors[ColorNames.White]
  },
  {
    name:"modelonegocio",
    bgColor:colors[ColorNames.Green],
    titleColor:colors[ColorNames.White],
    fgColor:colors[ColorNames.White]
  },
  {
    name:"inovacao",
    bgColor:colors[ColorNames.DarkRed],
    titleColor:colors[ColorNames.White],
    fgColor:colors[ColorNames.White]
  },
  {
    name:"equipe",
    bgColor:colors[ColorNames.DarkGrey],
    titleColor:colors[ColorNames.White],
    fgColor:colors[ColorNames.White]
  },
  {
    name:"obrigado",
    bgColor:colors[ColorNames.Purple],
    titleColor:colors[ColorNames.White],
    fgColor:colors[ColorNames.White]
  },
];

enum Orientation{
  Left,
  Right,
  Top,
  Bottom,
}

function getBgEffect(i:number, position?:position):SlideEffect{
  return {object: "body", duration: 0.75, type:SlideEffectType.To  , vars:{backgroundColor:slidesConf[i].bgColor, color:slidesConf[i].fgColor}, position: position};
}
function getLineColorEffect(i:number,position?:position):SlideEffect{
  return {object: ".line", duration: 0.75, type:SlideEffectType.To  , vars:{backgroundColor:slidesConf[i].titleColor}, position: position};
}
function getBorderColorEffect(i:number,position?:position):SlideEffect{
  return {object: ".border", duration: 0.75, type:SlideEffectType.To  , vars:{borderColor:slidesConf[i].titleColor}, position: position};
}

function getTitleColorEffect(i:number, position?:position):SlideEffect{
  console.log(slidesConf[i].name);
  return {object: `#${slidesConf[i].name}-title`, duration: 0.75, type:SlideEffectType.To, vars:{color:slidesConf[i].titleColor}, position: position};
}
function getTitleEffect(i:number, translation:number, type:SlideEffectType, orientation:Orientation, position?:position):SlideEffect{
  let vars:Object = {opacity:0};
  switch(orientation){
    case Orientation.Left:   Object.assign(vars,{x:`-${translation}px`}); break;
    case Orientation.Right:  Object.assign(vars,{x:` ${translation}px`}); break;
    case Orientation.Top:    Object.assign(vars,{y:`-${translation}px`}); break;
    case Orientation.Bottom: Object.assign(vars,{y:` ${translation}px`}); break;
  }
  return {object: `#${slidesConf[i].name}-title`, duration: 0.75, type:type, vars:vars,     position: position};
}
function getLineEffect(i:number,type:SlideEffectType=SlideEffectType.From, position?:position):SlideEffect{
  return {object: `#${slidesConf[i].name}-title-line`, duration: 0.75, type:type, vars:{scaleX:0}, position: position};
}

function getSlideHideEffect(i:number, position?:position):SlideEffect{
  return getSlideDisplayEffect(i,'none',position);
}
function getSlideShowEffect(i:number,position?:position):SlideEffect{
  return getSlideDisplayEffect(i,'flex',position);
}
function getSlideDisplayEffect(i:number, display:string, position?:position){
  return {object: '#'+slidesConf[i].name, type:SlideEffectType.To, duration:0,vars:{immediateRender:false,css:{display:display}},position:position};
}

function getBasicSlideEffects(i:number, titleType:SlideEffectType, titleOrientation:Orientation, colorPosition?:position, otherPositions?:position[]):SlideEffect[]{
  return [
    getSlideShowEffect(i),
    getBgEffect(i,colorPosition),
    getLineColorEffect(i,colorPosition),

    getTitleColorEffect(i,otherPositions?otherPositions[0]:undefined),
    getTitleEffect(i,40,titleType, titleOrientation,otherPositions?otherPositions[0]:undefined),
    getLineEffect(i,SlideEffectType.From, otherPositions?otherPositions[1]:undefined)
  ];
}
function getBasicOutEffects(i:number, titleOrientation:Orientation, linePosition?:position, textPosition?:position){
  return [
    getLineEffect(i,SlideEffectType.To,linePosition),
    getTitleEffect(i,40,SlideEffectType.To, titleOrientation,textPosition),
    getSlideHideEffect(i)
  ]
}

let slides:Slide[] = [
  {
    conf:slidesConf[0],
    inEffects:[
      {object:"#app",type:SlideEffectType.To,   duration:0, vars:{display:'flex'},position:0},
      {object:"#app",type:SlideEffectType.From, duration:0.5, vars:{opacity:0},position:0},
    ],
    outEffects:[
      {object:"#app",type:SlideEffectType.To, duration:0.5, vars:{opacity:0},position:0},
      {object:"#app",type:SlideEffectType.To, duration:0, vars:{display:'none'},position:0.5},
    ],
  },
  {
    conf:slidesConf[ATISlides.Problema],
    inEffects:getBasicSlideEffects(ATISlides.Problema,SlideEffectType.From,Orientation.Top,0,[0.5,1]).concat([
      getBorderColorEffect(ATISlides.Problema,0),
      {object:"#problema-backbone"      ,type:SlideEffectType.From, duration:10,vars:{width:'0%'},position:1},
      {object:"#problema-indisponivel"  ,type:SlideEffectType.From, duration:1, vars:{opacity:0,scale:0,ease:Elastic.easeOut.config(1,0.3)},position:2.4},
      {object:"#problema-desconfortavel",type:SlideEffectType.From, duration:1, vars:{opacity:0,scale:0,ease:Elastic.easeOut.config(1,0.3)},position:4},
      {object:"#problema-dificil"       ,type:SlideEffectType.From, duration:1, vars:{opacity:0,scale:0,ease:Elastic.easeOut.config(1,0.3)},position:6},
    ]),
    outEffects:(<SlideEffect[]>[
      {object:"#problema-indisponivel"  ,type:SlideEffectType.To, duration:1, vars:{opacity:0,scale:0,ease:Elastic.easeOut.config(1,0.3)},position:0},
      {object:"#problema-desconfortavel",type:SlideEffectType.To, duration:1, vars:{opacity:0,scale:0,ease:Elastic.easeOut.config(1,0.3)},position:0},
      {object:"#problema-dificil"       ,type:SlideEffectType.To, duration:1, vars:{opacity:0,scale:0,ease:Elastic.easeOut.config(1,0.3)},position:0},
      {object:"#problema-backbone"      ,type:SlideEffectType.To, duration:1, vars:{opacity:0},position:1}
    ]).concat(getBasicOutEffects(ATISlides.Problema,Orientation.Top,0,0.5))
  },
  {
    conf:slidesConf[ATISlides.Qualidades],
    inEffects:getBasicSlideEffects(ATISlides.Qualidades,SlideEffectType.From,Orientation.Top,0.5,[2,2.5]).concat([
      {object:"#qualidades .shadow"      ,type:SlideEffectType.From, duration:0.5,vars:{height:'0px'},position:2.5},
      {object:".qualidades-text"         ,type:SlideEffectType.From, duration:0.5,vars:{opacity:0},position:2.5},
      {object:".qualidades-img"          ,type:SlideEffectType.From, duration:0.5,vars:{opacity:0},position:2.5},
    ]),
    outEffects:(<SlideEffect[]>[
      {object:"#qualidades .shadow"      ,type:SlideEffectType.To, duration:0.5,vars:{height:'0px'},position:0},
      {object:".qualidades-text"         ,type:SlideEffectType.To, duration:0.5,vars:{opacity:0},position:0},
      {object:".qualidades-img"         ,type:SlideEffectType.To, duration:0.5,vars:{opacity:0},position:0},
    ]).concat(getBasicOutEffects(ATISlides.Qualidades,Orientation.Top,0,0.5))
  },
  {
    conf:slidesConf[ATISlides.Mercado],
    inEffects:getBasicSlideEffects(ATISlides.Mercado,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
      {object:"#mercado"  ,type:SlideEffectType.From, duration:0.5,vars:{opacity:0},position:1.5},
      {object:"#mercado-middle"  ,type:SlideEffectType.From, duration:0.5,vars:{opacity:0},position:1.5},
      {object:"#mercado-middle"  ,type:SlideEffectType.From, duration:0.5,vars:{height:'0px'},position:2},
    ]),
    outEffects:(<SlideEffect[]>[
      {object:"#mercado-middle"  ,type:SlideEffectType.To, duration:0.5,vars:{height:'0px'},position:0},
      {object:"#mercado"         ,type:SlideEffectType.To, duration:0.5,vars:{opacity:0},position:0.5},
    ]).concat(getBasicOutEffects(ATISlides.Mercado,Orientation.Top,0,0.5))
  },
  {
    conf:slidesConf[ATISlides.Domestico],
    inEffects:getBasicSlideEffects(ATISlides.Domestico,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
      {object:"#domestico-left"           ,type:SlideEffectType.From, duration:0.75,vars:{opacity:0},position:1.5},
      {object:"#domestico-empresarial h1" ,type:SlideEffectType.From,   duration:1,vars:{marginLeft:'-170px'},position:1.5},
    ]),
    outEffects:[]
  },
  {
    conf:null,
    inEffects:[
      {object:"#domestico-domestico h1"    ,type:SlideEffectType.From,   duration:1,vars:{marginLeft:'-170px'},position:0.5},
      {object:"#domestico-domestico .icon" ,type:SlideEffectType.From,   duration:1,vars:{opacity:0},position:0.5},
      {object:"#domestico-right" ,type:SlideEffectType.From,   duration:1,vars:{opacity:0},position:0.5},
    ],
    outEffects:(<SlideEffect[]>[
      {object:"#domestico" ,type:SlideEffectType.To,   duration:1,vars:{opacity:0},position:0.5},
    ]).concat(getBasicOutEffects(ATISlides.Domestico,Orientation.Top,0,0.5))
  },
  {
    conf:null,
    inEffects:[
      getSlideShowEffect(ATISlides.PublicoAlvo),
      getBgEffect(ATISlides.PublicoAlvo,1),
      {object:"#publicoalvo-chamada" ,type:SlideEffectType.To,   duration:0,vars:{display:'flex'},position:0.5},
      {object:"#publicoalvo-chamada" ,type:SlideEffectType.From, duration:1,vars:{opacity:0},     position:1.5},
    ],
    outEffects:[
      {object:"#publicoalvo-chamada" ,type:SlideEffectType.To,   duration:1,vars:{opacity:0},position:0},
      {object:"#publicoalvo-chamada" ,type:SlideEffectType.To,   duration:1,vars:{display:'none'},position:1},
    ]
  },
  {
    conf:slidesConf[ATISlides.PublicoAlvo],
    inEffects:[
      getLineColorEffect(ATISlides.PublicoAlvo,1),
      getTitleColorEffect(ATISlides.PublicoAlvo,1),
      getTitleEffect(ATISlides.PublicoAlvo,40,SlideEffectType.From, Orientation.Top),
      getLineEffect(ATISlides.PublicoAlvo,SlideEffectType.From, Orientation.Top),
      {object:"#publicoalvo-conteudo" ,type:SlideEffectType.To,   duration:1,vars:{display:'flex'},position:2},
      {object:"#publicoalvo-conteudo" ,type:SlideEffectType.From,   duration:1,vars:{opacity:0},position:2},
      {object:"#publicoalvo-left"     ,type:SlideEffectType.From,   duration:1,vars:{opacity:0, scale:0.1, ease:Elastic.easeOut.config(1,0.3)},position:2.5},
      {object:"#publicoalvo-right"    ,type:SlideEffectType.From,   duration:1,vars:{opacity:0, scale:0.1, ease:Elastic.easeOut.config(1,0.3)},position:2.5},
    ],
    outEffects:(<SlideEffect[]>[
      {object:"#publicoalvo-left"     ,type:SlideEffectType.To,   duration:1,vars:{opacity:0, scale:0.1, ease:Elastic.easeOut.config(1,0.3)},position:0},
      {object:"#publicoalvo-right"    ,type:SlideEffectType.To,   duration:1,vars:{opacity:0, scale:0.1, ease:Elastic.easeOut.config(1,0.3)},position:0},
    ]).concat(getBasicOutEffects(ATISlides.PublicoAlvo,Orientation.Top,0,0.5))
  },
  {
    conf:slidesConf[ATISlides.Solucoes],
    inEffects:getBasicSlideEffects(ATISlides.Solucoes,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
      {object:"#content-solucoes-shadow1"     ,type:SlideEffectType.From,   duration:0.75,vars:{opacity:0},position:1.7},
      {object:"#solucoes-logos img"           ,type:SlideEffectType.From,   duration:3,vars:{css:{marginBottom:'-21vw'}},position:2},
      {object:"#content-solucoes .mirror img" ,type:SlideEffectType.From,   duration:3,vars:{css:{marginBottom:'-20vw',webkitMaskPosition:"0px -14.5vw"}},position:2},
      {object:"#solucoes-problemas"           ,type:SlideEffectType.From,   duration:0.75,vars:{opacity:0},position:3},
      // sSolucoes.from("#content-solucoes-shadow1",0.75,{opacity:0},1.7);
      // sSolucoes.from("#solucoes-logos img",3,{css:{marginBottom:'-21vw'}},2);
      // sSolucoes.from("#content-solucoes .mirror img",3,{css:{marginBottom:'-20vw',webkitMaskPosition:"0px -14.5vw"}},"-=3");
      // sSolucoes.from("#solucoes-problemas",0.75,{opacity:0});
    ]),
    outEffects:(<SlideEffect[]>[
      {object:"#content-solucoes"             ,type:SlideEffectType.To,   duration:0.75,vars:{opacity:0},position:0},
      {object:"#solucoes-subtitle"             ,type:SlideEffectType.To,   duration:0.75,vars:{opacity:0},position:0},
      {object:"#solucoes-problemas"             ,type:SlideEffectType.To,   duration:0.75,vars:{opacity:0},position:0},
    ]).concat(getBasicOutEffects(ATISlides.Solucoes,Orientation.Top,0,0.5))
  },
  {
    conf:slidesConf[ATISlides.AjudaTI],
    inEffects:getBasicSlideEffects(ATISlides.AjudaTI,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
      {object:"#ajudati h1"             ,type:SlideEffectType.From,   duration:0.75,vars:{opacity:0},position:1.5},
    ]),
    outEffects:(<SlideEffect[]>[
      {object:"#ajudati h1"             ,type:SlideEffectType.To,   duration:0.75,vars:{opacity:0},position:0},
    ]).concat(getBasicOutEffects(ATISlides.AjudaTI,Orientation.Top,0,0.5))
  },
  {
    conf:slidesConf[8],
    inEffects:getBasicSlideEffects(8,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
    ]),
    outEffects:(<SlideEffect[]>[
    ]).concat(getBasicOutEffects(8,Orientation.Top,0,0.5))
  },
  {
    conf:slidesConf[9],
    inEffects:getBasicSlideEffects(9,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
    ]),
    outEffects:(<SlideEffect[]>[
    ]).concat(getBasicOutEffects(9,Orientation.Top,0,0.5))
  },
  {
    conf:slidesConf[10],
    inEffects:getBasicSlideEffects(10,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
    ]),
    outEffects:(<SlideEffect[]>[
    ]).concat(getBasicOutEffects(10,Orientation.Top,0,0.5))
  },
  {
    conf:slidesConf[11],
    inEffects:getBasicSlideEffects(11,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
    ]),
    outEffects:(<SlideEffect[]>[
    ]).concat(getBasicOutEffects(11,Orientation.Top,0,0.5))
  },
  {
    conf:slidesConf[12],
    inEffects:getBasicSlideEffects(12,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
    ]),
    outEffects:(<SlideEffect[]>[
    ]).concat(getBasicOutEffects(12,Orientation.Top,0,0.5))
  },
  {
    conf:slidesConf[13],
    inEffects:getBasicSlideEffects(13,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
    ]),
    outEffects:(<SlideEffect[]>[
    ]).concat(getBasicOutEffects(13,Orientation.Top,0,0.5))
  },
  {
    conf:slidesConf[14],
    inEffects:getBasicSlideEffects(14,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
    ]),
    outEffects:(<SlideEffect[]>[
    ]).concat(getBasicOutEffects(14,Orientation.Top,0,0.5))
  },
  {
    conf:slidesConf[15],
    inEffects:getBasicSlideEffects(15,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
    ]),
    outEffects:(<SlideEffect[]>[
    ]).concat(getBasicOutEffects(15,Orientation.Top,0,0.5))
  },
  {
    conf:slidesConf[16],
    inEffects:getBasicSlideEffects(16,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
    ]),
    outEffects:(<SlideEffect[]>[
    ]).concat(getBasicOutEffects(16,Orientation.Top,0,0.5))
  },
  //   conf:slidesConf[17],
  //   inEffects:getBasicSlideEffects(17,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
  //   ]),
  //   outEffects:(<SlideEffect[]>[
  //   ]).concat(getBasicOutEffects(17,Orientation.Top,0,0.5))
  // }
];

var tl:TimelineMax = new TimelineMax();
renderSlides(slides,tl);
var deck = new TweenDeck(tl,{tweenFirst:true,from:0});

console.log(deck);

function hideApp(){
  let obj = document.getElementById('app');
  TweenMax.to(obj,1,{opacity:0, onComplete:()=>obj.style.display='none'});
}
function showApp(){
  let obj = document.getElementById('app');
  obj.style.display='flex';
  TweenMax.to(obj,1,{opacity:1});
}
function reloadApp(){
  let obj = (<HTMLIFrameElement>document.getElementById('app-iframe'));
  obj.src = obj.src;//.f.src = f.src;contentWindow.location.reload();
}
console.log(reloadApp,hideApp,showApp);