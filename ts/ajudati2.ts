import {TweenDeckOptions, TweenDeck} from './tweendeck';
import {LineChart} from './chart';

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
interface Slide{
  name:string;
  play();
}

let slideProblemas:Slide = {name:"problemas",play:()=>{
  
}};

var tl:TimelineMax = new TimelineMax();
var algo = new TweenDeck(tl);
tl.from("section",1,{opacity:0});
tl.play();