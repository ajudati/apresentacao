import {TweenDeckOptions, TweenDeck} from './tweendeck';
import {LineChart} from './chart';
import {position, Slide, SlideConf, SlideEffect, SlideEffectType, renderSlides, renderSlideEffect} from './slide';

enum ATISlides{
  Problema = 0,
  Mercado,
  Domestico,
  PublicoAlvo,
  Solucoes,
  RedesSociais,
  Qualidades,
  AjudaTI,
  GerenciarChamados,
  ProcurarAjudantes,
  ProcurarServico,
  Conversacao,
  Diferenciais,
  ModeloNegocio,
  Inovacao,
  Equipe,
  Obrigado
}

let slidesNames = [
  "problema",
  "mercado",
  "domestico",
  "publicoalvo",
  "solucoes",
  "redessociais",
  "qualidades",
  "ajudati",
  "gerenciarchamados",
  "procurarajudantes",
  "procurarservico",
  "conversacao",
  "diferenciais",
  "modelonegocio",
  "inovacao",
  "equipe", 
  "obrigado"
];

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

let slidesConf:SlideConf[] = [
  {
    name:"problema",
    bgColor:colors[ColorNames.DarkPurple],
    titleColor:colors[ColorNames.LightPurple],
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
    name:"redessociais",
    bgColor:colors[ColorNames.DarkRed],
    titleColor:colors[ColorNames.White],
    fgColor:colors[ColorNames.White]
  },
  {
    name:"qualidades",
    bgColor:colors[ColorNames.Purple],
    titleColor:colors[ColorNames.White],
    fgColor:colors[ColorNames.White]
  },
  {
    name:"ajudati",
    bgColor:colors[ColorNames.DarkYellow],
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
    inEffects:getBasicSlideEffects(0,SlideEffectType.From,Orientation.Top,0,[0.5,1]).concat([
      getBorderColorEffect(0,0)
    ]),
    outEffects:[
    ].concat(getBasicOutEffects(0,Orientation.Top,0,0.5))
  },{
    conf:slidesConf[1],
    inEffects:getBasicSlideEffects(1,SlideEffectType.From,Orientation.Left,0.5,[1,1.5]).concat([
    ]),
    outEffects:[
    ].concat(getBasicOutEffects(1,Orientation.Left,0,0.5))
  },
  {
    conf:slidesConf[2],
    inEffects:getBasicSlideEffects(2,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
    ]),
    outEffects:[
    ].concat(getBasicOutEffects(2,Orientation.Top,0,0.5))
  },
  {
    conf:slidesConf[3],
    inEffects:getBasicSlideEffects(3,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
    ]),
    outEffects:[
    ].concat(getBasicOutEffects(3,Orientation.Top,0,0.5))
  },
  {
    conf:slidesConf[4],
    inEffects:getBasicSlideEffects(4,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
    ]),
    outEffects:[
    ].concat(getBasicOutEffects(4,Orientation.Top,0,0.5))
  },
  {
    conf:slidesConf[5],
    inEffects:getBasicSlideEffects(5,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
    ]),
    outEffects:[
    ].concat(getBasicOutEffects(5,Orientation.Top,0,0.5))
  },
  {
    conf:slidesConf[6],
    inEffects:getBasicSlideEffects(6,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
    ]),
    outEffects:[
    ].concat(getBasicOutEffects(7,Orientation.Top,0,0.5))
  },
  {
    conf:slidesConf[7],
    inEffects:getBasicSlideEffects(7,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
    ]),
    outEffects:[
    ].concat(getBasicOutEffects(7,Orientation.Top,0,0.5))
  },
  {
    conf:slidesConf[8],
    inEffects:getBasicSlideEffects(8,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
    ]),
    outEffects:[
    ].concat(getBasicOutEffects(8,Orientation.Top,0,0.5))
  },
  {
    conf:slidesConf[9],
    inEffects:getBasicSlideEffects(9,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
    ]),
    outEffects:[
    ].concat(getBasicOutEffects(9,Orientation.Top,0,0.5))
  },
  {
    conf:slidesConf[10],
    inEffects:getBasicSlideEffects(10,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
    ]),
    outEffects:[
    ].concat(getBasicOutEffects(10,Orientation.Top,0,0.5))
  },
  {
    conf:slidesConf[11],
    inEffects:getBasicSlideEffects(11,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
    ]),
    outEffects:[
    ].concat(getBasicOutEffects(11,Orientation.Top,0,0.5))
  },
  {
    conf:slidesConf[12],
    inEffects:getBasicSlideEffects(12,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
    ]),
    outEffects:[
    ].concat(getBasicOutEffects(12,Orientation.Top,0,0.5))
  },
  {
    conf:slidesConf[13],
    inEffects:getBasicSlideEffects(13,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
    ]),
    outEffects:[
    ].concat(getBasicOutEffects(13,Orientation.Top,0,0.5))
  },
  {
    conf:slidesConf[14],
    inEffects:getBasicSlideEffects(14,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
    ]),
    outEffects:[
    ].concat(getBasicOutEffects(14,Orientation.Top,0,0.5))
  },
  {
    conf:slidesConf[15],
    inEffects:getBasicSlideEffects(15,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
    ]),
    outEffects:[
    ].concat(getBasicOutEffects(15,Orientation.Top,0,0.5))
  },
  {
    conf:slidesConf[16],
    inEffects:getBasicSlideEffects(16,SlideEffectType.From,Orientation.Top,0.5,[1,1.5]).concat([
    ]),
    outEffects:[
    ].concat(getBasicOutEffects(16,Orientation.Top,0,0.5))
  }
];

var tl:TimelineMax = new TimelineMax();
renderSlides(slides,tl);
var deck = new TweenDeck(tl);
console.log(deck);