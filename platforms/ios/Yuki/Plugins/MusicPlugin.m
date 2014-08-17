//
//  MusicPlugin.m
//  HelloCordova
//
//  Created by 近藤健 on 2014/05/10.
//
//

#import "MusicPlugin.h"

@implementation MusicPlugin

@synthesize command;
@synthesize timer;


- (void)openWindow:(CDVInvokedUrlCommand*)command2
{
    [self setCommand:command2];
    MPMediaPickerController *picker = [[MPMediaPickerController alloc] initWithMediaTypes:MPMediaTypeAnyAudio];
    [picker setDelegate:self];
    picker.prompt = NSLocalizedString(@"ディクテーション対象の音楽を選択",
                                      @"Prompt in media item picker");
    
    [[super viewController] presentViewController:picker animated:NO completion:^{
    }];
     
}

unsigned long long myfanc(const char *p)
{
	unsigned long long n = 0;
	/* 数値の取得 */
	while (isdigit(*p)) {
		n = n * 10 + *p - '0';
		p++;
	}
	/* 結果を返す */
	return n;
}

- (void)play:(CDVInvokedUrlCommand*)command2
{
    NSString* persistentID = [command2 argumentAtIndex:0];
    
    if(persistentID != NULL){
        [self playMusic:persistentID];
    }
}

- (void)stop:(CDVInvokedUrlCommand*)command2
{
    MPMusicPlayerController* musicPlayer = [MPMusicPlayerController applicationMusicPlayer];
    [musicPlayer stop];
    
}

- (void)playWithTime:(CDVInvokedUrlCommand*)command2{

    MPMusicPlayerController* musicPlayer = [MPMusicPlayerController applicationMusicPlayer];
    NSString* persistentID = [command2 argumentAtIndex:0];
    NSNumber* argTime = [command2 argumentAtIndex:1];
    NSTimeInterval time = [argTime doubleValue];
    NSNumber* argLength = [command2 argumentAtIndex:2];
    
    if(persistentID == NULL){
        return;
    }
    [self playMusic:persistentID];
    
    dispatch_time_t delay = dispatch_time(DISPATCH_TIME_NOW, NSEC_PER_SEC * 0.25);
    dispatch_after(delay, dispatch_get_main_queue(), ^(void){
        musicPlayer.currentPlaybackTime = time/1000;

        if(argLength != NULL){
            
            dispatch_time_t delay2 = dispatch_time(DISPATCH_TIME_NOW, NSEC_PER_SEC * 0.5);
            
            dispatch_after(delay2, dispatch_get_main_queue(), ^(void){
                
                NSTimeInterval length = [argLength doubleValue];
                NSLog(@"stop length %@",argLength);
                NSTimeInterval t = (time + length)/1000;
                NSNumber* stopTime = [[NSNumber alloc] initWithDouble:t];
                MPMusicPlayerController* musicPlayer = [MPMusicPlayerController applicationMusicPlayer];
                NSTimeInterval diff = t - musicPlayer.currentPlaybackTime;
                if(diff <= 0){
                    diff = 0.1;
                }
                if(diff >= length){
                    diff = 0.1;                    
                }
                
                NSTimer* timer2 = [NSTimer scheduledTimerWithTimeInterval:diff
                                                                   target:self
                                                                 selector:@selector(stopMusic:)
                                                                 userInfo:stopTime repeats:NO];
                [self setTimer:timer2];

            });
        }
        
    });
    
}

- (void)stopMusic:(NSTimer*)theTimer
{
    MPMusicPlayerController* musicPlayer = [MPMusicPlayerController applicationMusicPlayer];
    NSLog(@"Stop Music %@/%f" ,[theTimer userInfo], musicPlayer.currentPlaybackTime);

   [musicPlayer stop];
    
}


- (void)back:(CDVInvokedUrlCommand*)command2{
    
    MPMusicPlayerController* musicPlayer = [MPMusicPlayerController applicationMusicPlayer];

    NSNumber* argTime = [command2 argumentAtIndex:0];
    NSTimeInterval time = [argTime doubleValue];
    NSTimeInterval thisTime = [musicPlayer currentPlaybackTime];
    musicPlayer.currentPlaybackTime = thisTime - time/1000;
    
}




- (void)time:(CDVInvokedUrlCommand*)command2
{
    MPMusicPlayerController* musicPlayer = [MPMusicPlayerController applicationMusicPlayer];
    NSTimeInterval time = [musicPlayer currentPlaybackTime];
    
    
    CDVPluginResult* pluginResult =
    [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:(time * 1000)];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command2.callbackId];
    

}


- (void) mediaPicker: (MPMediaPickerController *) mediaPicker didPickMediaItems: (MPMediaItemCollection *) collection
{
    NSArray *keys = [NSArray arrayWithObjects:
                      MPMediaItemPropertyPersistentID,
                      MPMediaItemPropertyMediaType,
                      MPMediaItemPropertyTitle,
                      MPMediaItemPropertyAlbumTitle,
                      MPMediaItemPropertyAlbumPersistentID,
                      MPMediaItemPropertyArtist,
                      MPMediaItemPropertyArtistPersistentID,
                      MPMediaItemPropertyAlbumArtist,
                      MPMediaItemPropertyAlbumArtistPersistentID,
                      MPMediaItemPropertyGenre,
                      MPMediaItemPropertyGenrePersistentID,
                      MPMediaItemPropertyComposer,
                      MPMediaItemPropertyComposerPersistentID,
                      MPMediaItemPropertyPlaybackDuration,
                      MPMediaItemPropertyAlbumTrackNumber,
                      MPMediaItemPropertyAlbumTrackCount,
                      MPMediaItemPropertyDiscNumber,
                      MPMediaItemPropertyDiscCount,
//                      MPMediaItemPropertyArtwork,
                      MPMediaItemPropertyLyrics,
                      MPMediaItemPropertyIsCompilation,
//                      MPMediaItemPropertyReleaseDate,
                      MPMediaItemPropertyBeatsPerMinute ,
                      MPMediaItemPropertyComments,
//                      MPMediaItemPropertyAssetURL,
                      MPMediaItemPropertyIsCloudItem,
                      MPMediaItemPropertyPodcastTitle,
                      MPMediaItemPropertyPodcastPersistentID,
                      MPMediaItemPropertyPlayCount,
                      MPMediaItemPropertySkipCount,
                      MPMediaItemPropertyRating,
//                      MPMediaItemPropertyLastPlayedDate,
                      MPMediaItemPropertyUserGrouping,
                      MPMediaItemPropertyBookmarkTime,
                     nil];
    
    MPMediaItem* item = collection.items[0];
    NSMutableDictionary* dic = [NSMutableDictionary dictionary];
    for (NSString* key in keys ) {
        id value = [item valueForProperty:key];
        if(value != NULL){
            NSString* v = [NSString stringWithFormat:@"%@",value];
            [dic setObject:v forKey:key];
        }
    }
    
    CDVPluginResult* pluginResult =
        [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dic];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    [self setCommand:NULL];
    
    
    [[super viewController] dismissViewControllerAnimated:YES completion:^{
    }];

}

- (void) playMusic:(NSString*) pid {
    
    const char *pS= [pid UTF8String];     //C言語で使える文字列に変換する
    unsigned long long pid_num = myfanc(pS); //変換する
    NSNumber *persistentID = [NSNumber numberWithUnsignedLongLong:pid_num]; //Number型に直す

    
    MPMediaPropertyPredicate * predicate =[MPMediaPropertyPredicate
                                           predicateWithValue:persistentID
                                           forProperty:MPMediaItemPropertyPersistentID];
    
    MPMediaQuery *searchQuery = [[MPMediaQuery alloc] init];
    [searchQuery addFilterPredicate:predicate];
    NSArray *mediaCollections = [searchQuery collections];
    
//    NSLog(@"search result %@ [%@]",persistentID,mediaCollections);
    
    if([mediaCollections count] == 0){
        return;
    }
    
    MPMediaItemCollection* mediaCollection = mediaCollections[0];
    
    MPMusicPlayerController* musicPlayer = [MPMusicPlayerController applicationMusicPlayer];
    
    [musicPlayer setQueueWithItemCollection: [MPMediaItemCollection
                                              collectionWithItems: [mediaCollection items]]];
    
    if(self.timer != NULL){
        [self.timer invalidate];
        [self setTimer:NULL];
    }
    [musicPlayer play];

}

- (void) mediaPickerDidCancel:(MPMediaPickerController *)mediaPicker
{
    [[super viewController] dismissViewControllerAnimated:YES completion:^{}];

    CDVPluginResult* pluginResult =
        [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"cancel"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    [self setCommand:NULL];

}



@end
