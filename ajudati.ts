enum ATISlides{
  Problema = 0,
  Mercado = 1,
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
interface TweenDeckOptions{
  allowSkip:boolean;
}
class TweenDeck{
  private positions:Array<number>;
  private positionIndex:number;
  private timeScale:number;
  private options:TweenDeckOptions;
  private tl:TimelineMax;
  constructor(tl:TimelineMax, options:TweenDeckOptions={allowSkip:true}){
    this.positionIndex = 1;
    this.timeScale     = 0;
    this.tl            = tl;
    this.options       = options;
    this.positions     = (<TimelineMax[]>tl.getChildren(false)).map(timeline=>timeline.startTime());
    this.positions.push(tl.duration());

    document.addEventListener('keydown', (e)=>{
      console.log(e.keyCode);
      // down/right arrow, pagedown, space = play forward
      if ((e.keyCode === 34 || e.keyCode === 39 || e.keyCode === 32 || e.keyCode === 40) && this.positionIndex < this.positions.length) {
        this.next();
      }
      // up/left arrow, pageup = rewind
      else if ((e.keyCode === 33 || e.keyCode === 37 || e.keyCode === 38) && this.positionIndex > 1) {
        this.prev();
      }else if(e.keyCode === 36){
        //this.tl.tweenTo(this.positions[1]).timeScale(10);
        this.tl.seek(this.positions[0]);
        tl.tweenTo(this.positions[1]);
      }else if(e.keyCode === 35){
        this.tl.seek(this.positions[this.positions.length-1]);
        tl.tweenTo(this.positions[this.positions.length-1]);
        //this.tl.tweenTo(this.positions[this.positions.length-1]).timeScale(10);
      }
    });
  }
  next(){
    this.tweenTo(this.positionIndex+1);
  }
  prev(){
    this.tweenTo(this.positionIndex-1);
  }
  // Move the playhead to the appropriate position (based on the index)
  tweenTo(i) {
    if (this.options.allowSkip) {
      this.timeScale++; //speed up if the user keeps pushing the button.
    } else if (this.timeScale !== 0) {
      // If the timeScale isn't 0, that means we're mid-tween, and since allowSkip is false, we should ignore the request.
      return;
    } else {
      this.timeScale = 1;
    }
    this.positionIndex = i;
    // Tween the "time" (playhead) to the new position using a linear ease. We could have used timeline.tweenTo() if we knew the timeline would always be a TimelineMax, but this code makes it compatible with TimelineLite too.
    TweenLite.to(this.tl, Math.abs(this.positions[i] - this.tl.time()), {time:this.positions[i], ease:Linear.easeNone, onComplete:()=>this.timeScale = 0}).timeScale(this.timeScale);
  } 
}

function init(){
  let slidesnames:string[] = ["problema", "mercado", "domestico", "publicoalvo", 
                              "solucoes", "redessociais", "qualidades", "ajudati", 
                              "gerenciarchamados", "procurarajudantes", "procurarservico", 
                              "conversacao", "diferenciais", "modelonegocio", "inovacao", 
                              "equipe", "obrigado"];
  let body:Element             = document.getElementsByTagName("BODY")[0];
  let slidesTags:HTMLElement[] = new Array<HTMLElement>();
  var slidesTL:TimelineMax[]   = new Array<TimelineMax>();
  var tl:TimelineMax           = new TimelineMax();

  // Preenchendo as timelines de cada slide
  for (var i = ATISlides.Obrigado; i >= 0; i--) {
    slidesTL[i] = new TimelineMax();
    //tl.add(slidesTL[i]);
    slidesTags[i] = document.getElementById(`slide-${slidesnames[i]}`);
  }

  // PROBLEMAS ============================================================
  let sProblema = slidesTL[ATISlides.Problema];
  let tProblema = slidesTags[ATISlides.Problema];
  let fxProblemaCircle:Object = {scale:0.1,opacity:0,ease:Elastic.easeOut.config(1,0.3)};
  sProblema.to(body,0.5,{backgroundColor:'#2a1948'});
  sProblema.to(tProblema,0,{immediateRender:false,css:{display:'block'}});
  sProblema.from("#title-problema-text",0.75,{css:{opacity:0,marginTop:'-50px'}});
  sProblema.from("#line-title-problema .line",0.75,{css:{width:'0px'}});
  sProblema.from("#line-backbone",1,{css:{width:'0%'}},1);
  sProblema.from("#circle-disponibilidade", 0.5, fxProblemaCircle);
  sProblema.from("#circle-seguranca"      , 0.5, fxProblemaCircle);
  sProblema.from("#circle-comodidade"     , 0.5, fxProblemaCircle);
  sProblema.from("#circle-usabilidade"    , 0.5, fxProblemaCircle);
  tl.add(sProblema);

  // MERCADO ==============================================================
  let sMercado = slidesTL[ATISlides.Mercado];
  let tMercado = slidesTags[ATISlides.Mercado];
  // out previous
  sMercado.to("#line-title-problema .line",0.75,{css:{width:'0px'}},0.5);
  sMercado.to("#title-problema-text",0.75,{css:{opacity:0,marginTop:'-50px'}},0.5);
  fxProblemaCircle = {scale:0.1,opacity:0,ease:Power2.easeOut};
  sMercado.to("#circle-disponibilidade", 0.5, fxProblemaCircle, 0.5);
  sMercado.to("#circle-seguranca"      , 0.5, fxProblemaCircle, 0.5);
  sMercado.to("#circle-comodidade"     , 0.5, fxProblemaCircle, 0.5);
  sMercado.to("#circle-usabilidade"    , 0.5, fxProblemaCircle, 0.5);
  sMercado.to("#line-backbone",1,{css:{opacity:'0'}},0.75);
  sMercado.to(tProblema,0,{immediateRender:false,css:{display:'none'}});
  
  // in current
  sMercado.to(tMercado,0,{immediateRender:false,css:{display:'block'}},0.75);
  sMercado.to(body,0.5,{backgroundColor:'#0d4f08'},0.75);
  sMercado.from("#title-mercado-text",0.75,{css:{opacity:0,marginTop:'-50px'}});
  sMercado.from("#line-title-mercado .line",0.75,{css:{width:'0px'}});
  sMercado.from('#content-mercado',0.5,{opacity:0},1);
  sMercado.from('#content-mercado-middle',0.5,{opacity:'0'},1);
  sMercado.from('#content-mercado-middle',0.5,{height:'0px'},1.5);
  tl.add(sMercado);

  // DOMÉSTICO ============================================================
  let sDomestico = slidesTL[ATISlides.Domestico];
  let tDomestico = slidesTags[ATISlides.Domestico];
  // out previous
  sDomestico.to("#title-mercado-text",0.75,{css:{opacity:0,marginTop:'-50px'}},0.5);
  sDomestico.to("#line-title-mercado .line",0.75,{css:{width:'0px'}},0.5);
  sDomestico.to('#content-mercado-middle',0.5,{height:'0px'},1);
  sDomestico.to('#content-mercado',0.5,{opacity:0},1.6);
  sDomestico.to(tMercado,0,{immediateRender:false,css:{display:'none'}});
  // in current
  sDomestico.to(tDomestico,0,{immediateRender:false,css:{display:'block'}});
  sDomestico.to(body,0.5,{backgroundColor:'#080b4f'},0.75);
  sDomestico.from("#title-domestico-text",0.75,{css:{marginLeft:'-50px',opacity:0}});
  sDomestico.from("#line-title-domestico .line",0.75,{css:{width:'0px'}});
  sDomestico.from("#content-domestico-left",0.75,{opacity:0},"-=0.2");
  sDomestico.from("#content-domestico-empresarial .topic h1",0.75,{css:{marginLeft:'-170px'}});
  sDomestico.from("#content-domestico-shadow1",0.75,{left:body.clientWidth},2.5);
  sDomestico.from("#content-domestico-shadow2",0.75,{left:body.clientWidth+30},2.5);
  sDomestico.from("#content-domestico-domestico .icon",0.75,{css:{opacity:0}});
  sDomestico.from("#content-domestico-domestico .topic h1",0.75,{css:{marginLeft:'-170px'}});
  
  
  tl.add(sDomestico);

  // PÚBLICO ALVO =========================================================
  let sPublicoAlvo = slidesTL[ATISlides.PublicoAlvo];
  let tPublicoAlvo = slidesTags[ATISlides.PublicoAlvo];
  // out previous
  sPublicoAlvo.to("#line-title-domestico .line",0.75,{css:{width:'0px'}},0.5);
  sPublicoAlvo.to("#title-domestico-text",0.75,{css:{opacity:0,marginLeft:'-50px'}},0.75);
  sPublicoAlvo.to("#content-domestico-shadow1",0.75,{left:body.clientWidth},1);
  sPublicoAlvo.to("#content-domestico-shadow2",0.75,{left:body.clientWidth+30},1);
  sPublicoAlvo.to("#content-domestico",0.5,{opacity:0},1);
  sPublicoAlvo.to(tDomestico,0,{immediateRender:false,css:{display:'none'}});
  // in current
  sPublicoAlvo.to(tPublicoAlvo,0,{immediateRender:false,css:{display:'block'}});
  sPublicoAlvo.to(body,0.5,{backgroundColor:'#4f164c'},1.25);
  sPublicoAlvo.from("#title-publicoalvo-text",0.75,{css:{opacity:0,marginLeft:'-50px'}});
  sPublicoAlvo.from("#line-title-publicoalvo .line",0.75,{css:{width:'0px'}});
  sPublicoAlvo.from("#content-publicoalvo-left",0.75,{opacity:0, scale:0.1, ease:Elastic.easeOut.config(1,0.3)});
  sPublicoAlvo.from("#content-publicoalvo-right",0.75,{opacity:0, scale:0.1, ease:Elastic.easeOut.config(1,0.3)});
  tl.add(sPublicoAlvo);

  
  // SOLUÇÕES =============================================================
  let sSolucoes = slidesTL[ATISlides.Solucoes];
  let tSolucoes = slidesTags[ATISlides.Solucoes];
  // out previous
  //sSolucoes.to("#content-publicoalvo",0.75,{opacity:0, scaleY:0});
  sSolucoes.to("#content-publicoalvo-left",0.75,{opacity:0, scale:0.1, ease:Elastic.easeIn.config(1,0.3)});
  sSolucoes.to("#content-publicoalvo-right",0.75,{opacity:0, scale:0.1, ease:Elastic.easeIn.config(1,0.3)},0);
  sSolucoes.to("#line-title-publicoalvo .line",0.75,{css:{width:'0px'}},0);
  sSolucoes.to("#title-publicoalvo-text",0.75,{css:{opacity:0,marginLeft:'-50px'}},0.5);
  sSolucoes.to(tPublicoAlvo,0,{immediateRender:false,css:{display:'none'}});
  // in current
  sSolucoes.to(body,0.5,{backgroundColor:'#333333'},1.25);
  sSolucoes.to(tSolucoes,0,{immediateRender:false,css:{display:'block'}});
  sSolucoes.from("#title-solucoes-text",0.75,{css:{opacity:0,marginTop:'-50px'}});
  sSolucoes.from("#line-title-solucoes .line",0.75,{css:{width:'0px'}});
  sSolucoes.from("#content-solucoes-shadow1",0.75,{opacity:0},1.5);
  sSolucoes.from("#solucoes-logos img",3,{css:{marginBottom:'-21vw'}},2);
  sSolucoes.from("#content-solucoes .mirror img",3,{css:{marginBottom:'-20vw',webkitMaskPosition:"0px -14.5vw"}},"-=3");
  sSolucoes.from("#solucoes-problemas",0.75,{opacity:0});
  
  tl.add(sSolucoes);
  // REDES SOCIAIS ========================================================
  let sRedesSociais = slidesTL[ATISlides.RedesSociais];
  let tRedesSociais = slidesTags[ATISlides.RedesSociais];
  // out previous
  sRedesSociais.to("#solucoes-problemas",0.75,{opacity:0},0);
  sRedesSociais.to("#content-solucoes .mirror img",3,{css:{marginBottom:'-20vw',webkitMaskPosition:"0px -14.5vw"}},0.75);
  sRedesSociais.to("#solucoes-logos img",3,{css:{marginBottom:'-21vw'}},0.75);
  sRedesSociais.to("#content-solucoes-shadow1",0.75,{opacity:0},2.3);
  sRedesSociais.to("#line-title-solucoes .line",0.75,{css:{width:'0px'}},1.3);
  sRedesSociais.to("#title-solucoes-text",0.75,{css:{opacity:0,marginTop:'-50px'}},1.6);
  sRedesSociais.to("#subtitle-solucoes-text",0.75,{css:{opacity:0}},1.6);
  sRedesSociais.to(tSolucoes,0,{immediateRender:false,css:{display:'none'}});
  // in current
  sRedesSociais.to(body,0.5,{backgroundColor:'#660000'},3);
  sRedesSociais.to(tRedesSociais,0,{immediateRender:false,css:{display:'block'}});
  tl.add(sRedesSociais);

  tl.seek(24);
  
  // QUALIDADES ===========================================================
  let sQualidades = slidesTL[ATISlides.Qualidades];
  let tQualidades = slidesTags[ATISlides.Qualidades];
  // out previous
  // in current
  tl.add(sQualidades);
  // AJUDATI ==============================================================
  let sAjudaTI = slidesTL[ATISlides.AjudaTI];
  let tAjudaTI = slidesTags[ATISlides.AjudaTI];
  // out previous
  // in current
  tl.add(sAjudaTI);
  // GERENCIAR CHAMADOS ===================================================
  let sGerenciarChamados = slidesTL[ATISlides.GerenciarChamados];
  let tGerenciarChamados = slidesTags[ATISlides.GerenciarChamados];
  // out previous
  // in current
  tl.add(sGerenciarChamados);
  // PROCURAR AJUDANTES ===================================================
  let sProcurarAjudantes = slidesTL[ATISlides.ProcurarAjudantes];
  let tProcurarAjudantes = slidesTags[ATISlides.ProcurarAjudantes];
  // out previous
  // in current
  tl.add(sProcurarAjudantes);
  // PROCURAR SERVIÇO =====================================================
  let sProcurarServico = slidesTL[ATISlides.ProcurarServico];
  let tProcurarServico = slidesTags[ATISlides.ProcurarServico];
  // out previous
  // in current
  tl.add(sProcurarServico);
  // CONVERSAÇÃO ==========================================================
  let sConversacao = slidesTL[ATISlides.Conversacao];
  let tConversacao = slidesTags[ATISlides.Conversacao];
  // out previous
  // in current
  tl.add(sConversacao);
  // DIFERENCIAIS =========================================================
  let sDiferenciais = slidesTL[ATISlides.Diferenciais];
  let tDiferenciais = slidesTags[ATISlides.Diferenciais];
  // out previous
  // in current
  tl.add(sDiferenciais);
  // MODELO DE NEGÓCIO ====================================================
  let sModeloNegocio = slidesTL[ATISlides.ModeloNegocio];
  let tModeloNegocio = slidesTags[ATISlides.ModeloNegocio];
  // out previous
  // in current
  tl.add(sModeloNegocio);
  // INOVAÇÃO =============================================================
  let sInovacao = slidesTL[ATISlides.Inovacao];
  let tInovacao = slidesTags[ATISlides.Inovacao];
  // out previous
  // in current
  tl.add(sInovacao);
  // EQUIPE ===============================================================
  let sEquipe = slidesTL[ATISlides.Equipe];
  let tEquipe = slidesTags[ATISlides.Equipe];
  // out previous
  // in current
  tl.add(sEquipe);
  // OBRIGADO =============================================================
  let sObrigado = slidesTL[ATISlides.Obrigado];
  let tObrigado = slidesTags[ATISlides.Obrigado];
  // out previous
  // in current
  tl.add(sObrigado);

  var td = new TweenDeck(tl);


  // var element:HTMLElement = document.getElementById('blz');
  // //create a TimelineLite instance
  // var tl = new TimelineMax();

  // //append a to() tween
  // tl.to(element, 1, {width:"50%"});

  // //add another sequenced tween (by default, tweens are added to the end of the timeline which makes sequencing simple)
  // tl.to(element, 1, {height:"300px", ease:Elastic.easeOut});

  // //offset the next tween by 0.75 seconds so there's a gap between the end of the previous tween and this new one
  // tl.to(element, 1, {opacity:0.5}, "+=0.75");

  // //overlap the next tween with the previous one by 0.5 seconds (notice the negative offset at the end)
  // tl.to(element, 1, {backgroundColor:"#FF0000"}, "-=0.5");
}

document.addEventListener('DOMContentLoaded', init);