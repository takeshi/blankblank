//
//  MusicPlugin.h
//  HelloCordova
//
//  Created by 近藤健 on 2014/05/10.
//
//

#import <Cordova/CDV.h>
#import <MediaPlayer/MediaPlayer.h>
#import <AVFoundation/AVFoundation.h>

@interface MusicPlugin : CDVPlugin<MPMediaPickerControllerDelegate>{
  CDVInvokedUrlCommand* command;
    NSTimer* timer;
}
@property CDVInvokedUrlCommand* command;
@property NSTimer* timer;

- (void)openWindow:(CDVInvokedUrlCommand*)command;
- (void)play:(CDVInvokedUrlCommand*)command;
- (void)stop:(CDVInvokedUrlCommand*)command2;
- (void)time:(CDVInvokedUrlCommand*)command2;
//- (void)stopMusic:(NSNumber*)stopTime;

@end
