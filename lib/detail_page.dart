import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_guitar_chord/flutter_guitar_chord.dart';
import 'package:guitar_chord_library/guitar_chord_library.dart';
import 'package:just_audio/just_audio.dart';

class DetailPage extends StatefulWidget {
  final Map data;
  const DetailPage({super.key, required this.data});

  @override
  State<DetailPage> createState() => _DetailPageState();
}

class _DetailPageState extends State<DetailPage> {
  late final List chords;
  late final AudioPlayer player;
  late final PageController pageController;
  late final Timer timer;
  var instrument = GuitarChordLibrary.instrument();
  int curIndex = 1;

  bool isLoading = true;

  @override
  void initState() {
    init();
    super.initState();
  }

  init() async {
    String path = widget.data['chord'];
    String file = await DefaultAssetBundle.of(context).loadString(path);
    Map json = jsonDecode(file);
    chords = json['chords'];

    for (var chord in chords) {
      chord['chord'] = chord['chord'].replaceAll('min', 'm');
      chord['chord'] = chord['chord'].replaceAll('/', '');
    }

    player = AudioPlayer()
      ..setAudioSource(AudioSource.asset(widget.data['music']));
    pageController = PageController(viewportFraction: 0.32);
    timer = Timer.periodic(
      const Duration(milliseconds: 250),
      (timer) {
        if (player.position.inMilliseconds == 0) return;
        final double curTime = player.position.inSeconds.toDouble() + 0.4;

        final int index = chords.indexWhere((element) =>
            element['start_time'] <= curTime && element['end_time'] >= curTime);
        if (index == -1) return;

        if (pageController.hasClients) {
          pageController.animateToPage(index,
              duration: const Duration(milliseconds: 150),
              curve: Curves.easeInOut);
        }

        setState(() {});
      },
    );

    isLoading = false;
    setState(() {});
    player.play();
  }

  @override
  void dispose() {
    player.dispose();
    pageController.dispose();
    timer.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: isLoading
          ? const CircularProgressIndicator()
          : Column(
              children: [
                StreamBuilder<PlayerState>(
                  stream: player.playerStateStream,
                  builder: (context, snapshot) {
                    final playerState = snapshot.data;
                    final processingState = playerState?.processingState;
                    final playing = playerState?.playing;
                    if (processingState == ProcessingState.loading ||
                        processingState == ProcessingState.buffering) {
                      return Container(
                        margin: const EdgeInsets.all(8.0),
                        width: 64.0,
                        height: 64.0,
                        child: const CircularProgressIndicator(),
                      );
                    } else if (playing != true) {
                      return IconButton(
                        icon: const Icon(Icons.play_arrow),
                        iconSize: 64.0,
                        onPressed: player.play,
                      );
                    } else if (processingState != ProcessingState.completed) {
                      return IconButton(
                        icon: const Icon(Icons.pause),
                        iconSize: 64.0,
                        onPressed: player.pause,
                      );
                    } else {
                      return IconButton(
                        icon: const Icon(Icons.replay),
                        iconSize: 64.0,
                        onPressed: () => player.seek(Duration.zero),
                      );
                    }
                  },
                ),
                SizedBox(
                  width: 400,
                  child: StreamBuilder(
                    stream: player.positionStream,
                    builder: (context, snapshot) {
                      final positionData = snapshot.data;
                      return Slider(
                        value: positionData != null
                            ? positionData.inMilliseconds.toDouble()
                            : 0,
                        onChangeStart: (value) {
                          player.pause();
                        },
                        onChanged: (value) {
                          player.seek(Duration(milliseconds: value.toInt()));
                          player.play();
                        },
                        min: 0.0,
                        max: player.duration?.inMilliseconds.toDouble() ?? 0.0,
                      );
                    },
                  ),
                ),
                Expanded(
                  child: PageView.builder(
                    controller: pageController,
                    // padEnds: false,
                    padEnds: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: chords.length,
                    onPageChanged: (value) => setState(() => curIndex = value),
                    itemBuilder: (context, index) {
                      String chordName = chords[index]['chord'];

                      final String key = chordName.split(':').first;
                      final String suffix = chordName.split(':').last;
                      final ChordPosition? parsedChord =
                          instrument.getChordPositions(key, suffix)?.first;

                      return Padding(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 80, vertical: 70),
                        child: parsedChord == null
                            ? Container(
                                alignment: Alignment.center,
                                child: Text(
                                    '"${chordName.replaceAll(':', '')}" chord not found'),
                              )
                            : FlutterGuitarChord(
                                baseFret: parsedChord.baseFret,
                                chordName: chordName.replaceAll(':', ''),
                                fingers: parsedChord.fingers,
                                frets: parsedChord.frets,
                                fingerSize: 16,
                                labelColor: index == curIndex
                                    ? Colors.black
                                    : Colors.grey,
                                barColor: index == curIndex
                                    ? Colors.black
                                    : Colors.grey,
                                stringColor: index == curIndex
                                    ? Colors.black
                                    : Colors.grey,
                                tabBackgroundColor: index == curIndex
                                    ? Colors.black
                                    : Colors.grey,
                                tabForegroundColor: Colors.transparent,
                              ),
                      );
                    },
                  ),
                )
              ],
            ),
    );
  }
}
