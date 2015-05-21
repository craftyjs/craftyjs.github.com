---
title: Sound
layout: documentation
---

Currently Crafty implements sound playback through the audio element, which is buggy in some browsers.  In the future we plan to switch to the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) where available.

## Loading audio

To play a sound, you first have to load it.  Because browser support for audio formats is inconsistent, you can supply a list of audio files, and Crafty will load only the first one which is supported in the current environment.  For more information on loading assets, see [Crafty.load](/api/Crafty-loader.html).


```
// Here we're just loading a single sound, and calling it "beep".
// But you can load multiple assets at once!
var assets = {
	"audio": {
		"beep": ["beep.wav", "beep.mp3", "beep.ogg"]
    }
}
Crafty.load({assets,  callback})
```

## Playing audio

Once the sound has loaded, you can play it using the name you previously designated:

```
Crafty.audio.play("beep")
```

You can also specify a repeat count and a volume:

```
// Play the sound, repeating twice, at 75% volume:
Crafty.audio.play("beep", 2, 0.75)
```

To repeat a sound forever, use a repeat count of `-1`.

```
Crafty.audio.play("beep", -1)
```

You can also mute, pause and resume audio playback.  See [Crafty.audio](/api/Crafty-audio.html) for complete documentation.