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

  late final List crChords;
  late final PageController crPageController;
  late final Timer crTimer;
  int crCurIndex = 1;

  bool isLoading = true;

  @override
  void initState() {
    init();
    super.initState();
  }

  init() async {
    //구버전 모델 데이터 init ================================================
    String path = widget.data['chord'];
    String file = await DefaultAssetBundle.of(context).loadString(path);
    Map json = jsonDecode(file);
    Map chord = jsonDecode(json['btc_chord_data']['normal']);
    chords = [];
    Map startTimes = chord['Start_Time'];
    Map endTimes = chord['End_Time'];
    Map chordData = chord['Chord'];

    for (int i = 0; i < startTimes.length - 1; i++) {
      chords.add({
        'start_time': startTimes[i.toString()],
        'end_time': endTimes[i.toString()],
        'chord':
            chordData[i.toString()].replaceAll('maj', '').replaceAll('min', 'm')
      });
    }

    // Add last chord
    int lastIndex = startTimes.length - 1;
    chords.add({
      'start_time': startTimes[lastIndex.toString()],
      'end_time': endTimes[lastIndex.toString()],
      'chord': chordData[lastIndex.toString()].replaceAll('min', 'm')
    });

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

    //새버전 모델 데이터 init ================================================
    String crPath = widget.data['chord'];
    String crFile = await DefaultAssetBundle.of(context).loadString(crPath);
    Map crJson = jsonDecode(crFile);
    Map crChord = jsonDecode(crJson['cr_chord_data']['normal']);
    crChords = [];
    Map crStartTimes = crChord['Start_Time'];
    Map crEndTimes = crChord['End_Time'];
    Map crChordData = crChord['Chord'];

    for (int i = 0; i < crStartTimes.length - 1; i++) {
      crChords.add({
        'start_time': crStartTimes[i.toString()],
        'end_time': crEndTimes[i.toString()],
        'chord': crChordData[i.toString()]
            .replaceAll('maj', '')
            .replaceAll('min', 'm')
      });
    }

    // Add last chord
    int clastIndex = crStartTimes.length - 1;
    crChords.add({
      'start_time': crStartTimes[clastIndex.toString()],
      'end_time': crEndTimes[clastIndex.toString()],
      'chord': crChordData[clastIndex.toString()].replaceAll('min', 'm')
    });

    crPageController = PageController(viewportFraction: 0.32);
    crTimer = Timer.periodic(
      const Duration(milliseconds: 250),
      (timer) {
        if (player.position.inMilliseconds == 0) return;
        final double curTime = player.position.inSeconds.toDouble() + 0.4;

        final int index = crChords.indexWhere((element) =>
            element['start_time'] <= curTime && element['end_time'] >= curTime);
        if (index == -1) return;

        if (crPageController.hasClients) {
          crPageController.animateToPage(index,
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

    crPageController.dispose();
    crTimer.cancel();
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
                        max: player.duration?.inMilliseconds.toDouble() ?? 1,
                      );
                    },
                  ),
                ),
                const Align(
                    alignment: Alignment.center,
                    child: Padding(
                        padding: EdgeInsets.symmetric(vertical: 8),
                        child: Text('구버전'))),
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
                      final String suffix = chordName.contains(':')
                          ? chordName.split(':').last
                          : '';
                      final ChordPosition? parsedChord =
                          instrument.getChordPositions(key, suffix)?.first;

                      return Padding(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 80, vertical: 45),
                        child: parsedChord == null
                            ? Container(
                                alignment: Alignment.center,
                                child: Text(
                                    'key : $key, suffix : $suffix chord not found'),
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
                ),
                const Align(
                    alignment: Alignment.center,
                    child: Padding(
                        padding: EdgeInsets.symmetric(vertical: 8),
                        child: Text('신버전'))),
                Expanded(
                  child: PageView.builder(
                    controller: crPageController,
                    padEnds: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: crChords.length,
                    onPageChanged: (value) =>
                        setState(() => crCurIndex = value),
                    itemBuilder: (context, index) {
                      String chordName = crChords[index]['chord'];

                      final String key = chordName.split(':').first;
                      final String suffix = chordName.contains(':')
                          ? chordName.split(':').last
                          : '';
                      final ChordPosition? parsedChord =
                          instrument.getChordPositions(key, suffix)?.first;

                      return Padding(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 80, vertical: 45),
                        child: parsedChord == null
                            ? Container(
                                alignment: Alignment.center,
                                child: Text(
                                    'key : $key, suffix : $suffix chord not found'),
                              )
                            : FlutterGuitarChord(
                                baseFret: parsedChord.baseFret,
                                chordName: chordName.replaceAll(':', ''),
                                fingers: parsedChord.fingers,
                                frets: parsedChord.frets,
                                fingerSize: 16,
                                labelColor: index == crCurIndex
                                    ? Colors.black
                                    : Colors.grey,
                                barColor: index == crCurIndex
                                    ? Colors.black
                                    : Colors.grey,
                                stringColor: index == crCurIndex
                                    ? Colors.black
                                    : Colors.grey,
                                tabBackgroundColor: index == crCurIndex
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
