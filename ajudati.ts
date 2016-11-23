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
  allowSkip?:boolean;
  tweenFirst?:boolean;
}
class TweenDeck{
  private positions:Array<number>;
  private positionIndex:number;
  private timeScale:number;
  private options:TweenDeckOptions;
  private tl:TimelineMax;
  constructor(tl:TimelineMax, options?:TweenDeckOptions){
    this.options       = Object.assign({},<TweenDeckOptions>{allowSkip:true,tweenFirst:true},options);
    this.positionIndex = 1;
    this.timeScale     = 0;
    this.tl            = tl;
    this.positions     = (<TimelineMax[]>tl.getChildren(false)).map(timeline=>timeline.startTime());
    this.positions.push(tl.duration());
    if(this.options.tweenFirst)
      tl.tweenTo(this.positions[1]);

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
  let backgrounds:string[] = ["2a1948","0d4f08","080b4f","4f164c","333333","660000","340c7a","340c7a","674900","1a6700","0c2e7a","7a0c3d","340c7a","094c0d","7a0c0c","3e374c","210066"];
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
  // VAZIO ============================================================
  tl.add(new TimelineMax());
  // PROBLEMAS ============================================================
  let sProblema = slidesTL[ATISlides.Problema];
  let tProblema = slidesTags[ATISlides.Problema];
  // in current
  let fxProblemaCircle:Object = {scale:0.1,opacity:0,ease:Elastic.easeOut.config(1,0.3)};
  sProblema.to(body,0.5,{backgroundColor:'#'+backgrounds[ATISlides.Problema]});
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
  sMercado.to(body,0.5,{backgroundColor:'#'+backgrounds[ATISlides.Mercado]},0.75);
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
  sDomestico.to(body,0.5,{backgroundColor:'#'+backgrounds[ATISlides.Domestico]},0.75);
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
  sPublicoAlvo.to(body,0.5,{backgroundColor:'#'+backgrounds[ATISlides.PublicoAlvo]},1.25);
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
  sSolucoes.to(body,0.5,{backgroundColor:'#'+backgrounds[ATISlides.Solucoes]},1.25);
  sSolucoes.to(tSolucoes,0,{immediateRender:false,css:{display:'block'}});
  sSolucoes.from("#title-solucoes-text",0.75,{css:{opacity:0,marginTop:'-50px'}});
  sSolucoes.from("#line-title-solucoes .line",0.75,{css:{width:'0px'}});
  sSolucoes.from("#content-solucoes-shadow1",0.75,{opacity:0},1.7);
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
  sRedesSociais.to(body,0.5,{backgroundColor:'#'+backgrounds[ATISlides.RedesSociais]},3);
  sRedesSociais.to(tRedesSociais,0,{immediateRender:false,css:{display:'block'}});
  tl.add(sRedesSociais);

  // QUALIDADES ===========================================================
  let sQualidades = slidesTL[ATISlides.Qualidades];
  let tQualidades = slidesTags[ATISlides.Qualidades];
  // out previous
  sQualidades.to("#line-title-redessociais .line",0.75,{css:{width:'0px'}},1.3);
  sQualidades.to("#title-redessociais-text",0.75,{css:{opacity:0,marginTop:'-50px'}},1.6);
  // in current
  sQualidades.to(tQualidades,0,{immediateRender:false,css:{display:'block'}});
  sQualidades.to(body,0.5,{backgroundColor:'#'+backgrounds[ATISlides.Qualidades]},3);
  sQualidades.from("#line-title-qualidades .line",0.75,{css:{width:'0px'}},1.3);
  sQualidades.from("#title-qualidades-text",0.75,{css:{opacity:0,marginTop:'-50px'}},1.6);
  tl.add(sQualidades);
  // AJUDATI ==============================================================
  let sAjudaTI = slidesTL[ATISlides.AjudaTI];
  let tAjudaTI = slidesTags[ATISlides.AjudaTI];
  // out previous
  sAjudaTI.to("#line-title-qualidades .line",0.75,{css:{width:'0px'}},1.3);
  sAjudaTI.to("#title-qualidades-text",0.75,{css:{opacity:0,marginTop:'-50px'}},1.6);
  // in current
  sAjudaTI.to(tAjudaTI,0,{immediateRender:false,css:{display:'block'}});
  sAjudaTI.to(body,0.5,{backgroundColor:'#'+backgrounds[ATISlides.AjudaTI]},3);
  sAjudaTI.from("#line-title-ajudati .line",0.75,{css:{width:'0px'}},1.3);
  sAjudaTI.from("#title-ajudati-text",0.75,{css:{opacity:0,marginTop:'-50px'}},1.6);
  tl.add(sAjudaTI);
  // GERENCIAR CHAMADOS ===================================================
  let sGerenciarChamados = slidesTL[ATISlides.GerenciarChamados];
  let tGerenciarChamados = slidesTags[ATISlides.GerenciarChamados];
  // out previous
  sGerenciarChamados.to("#line-title-ajudati .line",0.75,{css:{width:'0px'}},1.3);
  sGerenciarChamados.to("#title-ajudati-text",0.75,{css:{opacity:0,marginTop:'-50px'}},1.6);
  // in current
  sGerenciarChamados.to(tGerenciarChamados,0,{immediateRender:false,css:{display:'block'}});
  sGerenciarChamados.to(body,0.5,{backgroundColor:'#'+backgrounds[ATISlides.GerenciarChamados]},3);
  sGerenciarChamados.from("#line-title-gerenciarchamados .line",0.75,{css:{width:'0px'}},1.3);
  sGerenciarChamados.from("#title-gerenciarchamados-text",0.75,{css:{opacity:0,marginTop:'-50px'}},1.6);
  tl.add(sGerenciarChamados);
  // PROCURAR AJUDANTES ===================================================
  let sProcurarAjudantes = slidesTL[ATISlides.ProcurarAjudantes];
  let tProcurarAjudantes = slidesTags[ATISlides.ProcurarAjudantes];
  // out previous
  sProcurarAjudantes.to("#line-title-gerenciarchamados .line",0.75,{css:{width:'0px'}},1.3);
  sProcurarAjudantes.to("#title-gerenciarchamados-text",0.75,{css:{opacity:0,marginTop:'-50px'}},1.6);
  // in current
  sProcurarAjudantes.to(tProcurarAjudantes,0,{immediateRender:false,css:{display:'block'}});
  sProcurarAjudantes.to(body,0.5,{backgroundColor:'#'+backgrounds[ATISlides.ProcurarAjudantes]},3);
  sProcurarAjudantes.from("#line-title-procurarajudantes .line",0.75,{css:{width:'0px'}},1.3);
  sProcurarAjudantes.from("#title-procurarajudantes-text",0.75,{css:{opacity:0,marginTop:'-50px'}},1.6);
  tl.add(sProcurarAjudantes);
  // PROCURAR SERVIÇO =====================================================
  let sProcurarServico = slidesTL[ATISlides.ProcurarServico];
  let tProcurarServico = slidesTags[ATISlides.ProcurarServico];
  // out previous
  sProcurarServico.to("#line-title-procurarajudantes .line",0.75,{css:{width:'0px'}},1.3);
  sProcurarServico.to("#title-procurarajudantes-text",0.75,{css:{opacity:0,marginTop:'-50px'}},1.6);
  // in current
  sProcurarServico.to(tProcurarServico,0,{immediateRender:false,css:{display:'block'}});
  sProcurarServico.to(body,0.5,{backgroundColor:'#'+backgrounds[ATISlides.ProcurarServico]},3);
  sProcurarServico.from("#line-title-procurarservico .line",0.75,{css:{width:'0px'}},1.3);
  sProcurarServico.from("#title-procurarservico-text",0.75,{css:{opacity:0,marginTop:'-50px'}},1.6);
  tl.add(sProcurarServico);
  // CONVERSAÇÃO ==========================================================
  let sConversacao = slidesTL[ATISlides.Conversacao];
  let tConversacao = slidesTags[ATISlides.Conversacao];
  // out previous
  sConversacao.to("#line-title-procurarservico .line",0.75,{css:{width:'0px'}},1.3);
  sConversacao.to("#title-procurarservico-text",0.75,{css:{opacity:0,marginTop:'-50px'}},1.6);
  // in current
  sConversacao.to(tConversacao,0,{immediateRender:false,css:{display:'block'}});
  sConversacao.to(body,0.5,{backgroundColor:'#'+backgrounds[ATISlides.Conversacao]},3);
  sConversacao.from("#line-title-conversacao .line",0.75,{css:{width:'0px'}},1.3);
  sConversacao.from("#title-conversacao-text",0.75,{css:{opacity:0,marginTop:'-50px'}},1.6);
  tl.add(sConversacao);
  // DIFERENCIAIS =========================================================
  let sDiferenciais = slidesTL[ATISlides.Diferenciais];
  let tDiferenciais = slidesTags[ATISlides.Diferenciais];
  // out previous
  sDiferenciais.to("#line-title-conversacao .line",0.75,{css:{width:'0px'}},1.3);
  sDiferenciais.to("#title-conversacao-text",0.75,{css:{opacity:0,marginTop:'-50px'}},1.6);
  // in current
  sDiferenciais.to(tDiferenciais,0,{immediateRender:false,css:{display:'block'}});
  sDiferenciais.to(body,0.5,{backgroundColor:'#'+backgrounds[ATISlides.Diferenciais]},3);
  sDiferenciais.from("#line-title-diferenciais .line",0.75,{css:{width:'0px'}},1.3);
  sDiferenciais.from("#title-diferenciais-text",0.75,{css:{opacity:0,marginTop:'-50px'}},1.6);
  tl.add(sDiferenciais);
  // MODELO DE NEGÓCIO ====================================================
  let sModeloNegocio = slidesTL[ATISlides.ModeloNegocio];
  let tModeloNegocio = slidesTags[ATISlides.ModeloNegocio];
  // out previous
  sModeloNegocio.to("#line-title-diferenciais .line",0.75,{css:{width:'0px'}},1.3);
  sModeloNegocio.to("#title-diferenciais-text",0.75,{css:{opacity:0,marginTop:'-50px'}},1.6);
  // in current
  sModeloNegocio.to(tModeloNegocio,0,{immediateRender:false,css:{display:'block'}});
  sModeloNegocio.to(body,0.5,{backgroundColor:'#'+backgrounds[ATISlides.ModeloNegocio]},3);
  sModeloNegocio.from("#line-title-modelonegocio .line",0.75,{css:{width:'0px'}},1.3);
  sModeloNegocio.from("#title-modelonegocio-text",0.75,{css:{opacity:0,marginTop:'-50px'}},1.6);
  tl.add(sModeloNegocio);
  // INOVAÇÃO =============================================================
  let sInovacao = slidesTL[ATISlides.Inovacao];
  let tInovacao = slidesTags[ATISlides.Inovacao];
  // out previous
  sInovacao.to("#line-title-modelonegocio .line",0.75,{css:{width:'0px'}},1.3);
  sInovacao.to("#title-modelonegocio-text",0.75,{css:{opacity:0,marginTop:'-50px'}},1.6);
  // in current
  sInovacao.to(tInovacao,0,{immediateRender:false,css:{display:'block'}});
  sInovacao.to(body,0.5,{backgroundColor:'#'+backgrounds[ATISlides.Inovacao]},3);
  sInovacao.from("#line-title-inovacao .line",0.75,{css:{width:'0px'}},1.3);
  sInovacao.from("#title-inovacao-text",0.75,{css:{opacity:0,marginTop:'-50px'}},1.6);
  tl.add(sInovacao);
  // EQUIPE ===============================================================
  let sEquipe = slidesTL[ATISlides.Equipe];
  let tEquipe = slidesTags[ATISlides.Equipe];
  // out previous
  sEquipe.to("#line-title-inovacao .line",0.75,{css:{width:'0px'}},1.3);
  sEquipe.to("#title-inovacao-text",0.75,{css:{opacity:0,marginTop:'-50px'}},1.6);
  // in current
  sEquipe.to(tEquipe,0,{immediateRender:false,css:{display:'block'}});
  sEquipe.to(body,0.5,{backgroundColor:'#'+backgrounds[ATISlides.Equipe]},3);
  sEquipe.from("#line-title-equipe .line",0.75,{css:{width:'0px'}},1.3);
  sEquipe.from("#title-equipe-text",0.75,{css:{opacity:0,marginTop:'-50px'}},1.6);
  tl.add(sEquipe);
  // OBRIGADO =============================================================
  let sObrigado = slidesTL[ATISlides.Obrigado];
  let tObrigado = slidesTags[ATISlides.Obrigado];
  // out previous
  sObrigado.to("#line-title-equipe .line",0.75,{css:{width:'0px'}},1.3);
  sObrigado.to("#title-equipe-text",0.75,{css:{opacity:0,marginTop:'-50px'}},1.6);
  // in current
  sObrigado.to(tObrigado,0,{immediateRender:false,css:{display:'block'}});
  sObrigado.to(body,0.5,{backgroundColor:'#'+backgrounds[ATISlides.Obrigado]},3);
  sObrigado.from("#line-title-obrigado .line",0.75,{css:{width:'0px'}},1.3);
  sObrigado.from("#title-obrigado-text",0.75,{css:{opacity:0,marginTop:'-50px'}},1.6);
  tl.add(sObrigado);

  // tl.seek(26);
  var td = new TweenDeck(tl,{tweenFirst:true});


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