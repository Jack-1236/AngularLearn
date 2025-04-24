import {HammerGestureConfig} from '@angular/platform-browser';

export  class SwipeBottomTabHammer extends  HammerGestureConfig{

  override  overrides={swipe: { direction: Hammer.DIRECTION_ALL },}

}
