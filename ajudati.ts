function init(){
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
    tl.add(slidesTL[i]);
    slidesTags[i] = document.getElementById(`slide-${slidesnames[i]}`);
  }

  // PROBLEMAS ============================================================
  let sProblema = slidesTL[ATISlides.Problema];
  let tProblema = slidesTags[ATISlides.Problema];
  sProblema.to(body,0.5,{backgroundColor:'#2a1948'});
  sProblema.to(tProblema,0,{immediateRender:false,css:{display:'block'}});
  sProblema.from("#title-problema-text",0.75,{css:{opacity:0,marginTop:'-50px'}});
  sProblema.from("#line-title-problema .line",0.75,{css:{width:'0px'}});
  sProblema.from("#line-backbone",1,{css:{width:'0%'}},1);
  sProblema.from("#circle-disponibilidade", 0.5, {opacity:0});
  sProblema.from("#circle-seguranca"      , 0.5, {opacity:0});
  sProblema.from("#circle-comodidade"     , 0.5, {opacity:0});
  sProblema.from("#circle-usabilidade"     , 0.5, {opacity:0});

  

  // MERCADO ==============================================================
  // DOMÉSTICO ============================================================
  // PÚBLICO ALVO =========================================================
  // SOLUÇÕES =============================================================
  // REDES SOCIAIS ========================================================
  // QUALIDADES ===========================================================
  // AJUDATI ==============================================================
  // GERENCIAR CHAMADOS ===================================================
  // PROCURAR AJUDANTES ===================================================
  // PROCURAR SERVIÇO =====================================================
  // CONVERSAÇÃO ==========================================================
  // DIFERENCIAIS =========================================================
  // MODELO DE NEGÓCIO ====================================================
  // INOVAÇÃO =============================================================
  // EQUIPE ===============================================================
  // OBRIGADO =============================================================


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