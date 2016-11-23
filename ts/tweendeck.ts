export interface TweenDeckOptions{
  allowSkip?:boolean;
  tweenFirst?:boolean;
}
export class TweenDeck{
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