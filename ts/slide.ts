export type position = number|string;
export enum SlideEffectType{
  From = 0,
  To
};
export interface SlideEffect{
  object:HTMLElement|string;
  duration:number;
  type:SlideEffectType;
  vars:Object;
  position?:position;
}

export interface SlideConf{
  name:string;
  bgColor:string;
  fgColor:string;
  titleColor:string;
}
export interface Slide{
  conf:SlideConf;
  inEffects:SlideEffect[];
  outEffects?:SlideEffect[];
}

export function renderSlideEffect(slide:Slide, effect:SlideEffect, tl:TimelineMax){
  let object:HTMLElement|string = effect.object;
  if(effect.type === SlideEffectType.From)
    tl.from(object, effect.duration, effect.vars, effect.position);
  else
    tl.to(object, effect.duration, effect.vars, effect.position);
}

export function renderSlide(slide:Slide, tl:TimelineMax, slidePrev:Slide){
  let tlSlide:TimelineMax = new TimelineMax();
  // Render out effect of previous slide
  if(slidePrev) {
    console.log("rendering outEffect");
    slidePrev.outEffects.forEach(effect=>renderSlideEffect(slidePrev,effect,tlSlide));
  }
  // Render in effect of current slide
  console.log("rendering inEffect");
  slide.inEffects.forEach(effect=>renderSlideEffect(slide,effect,tlSlide));
  tl.add(tlSlide);
}

export function renderSlides(slides:Slide[], tl:TimelineMax){
  slides.forEach((slide,i)=>renderSlide(slide,tl,i===0?null:slides[i-1]));
}