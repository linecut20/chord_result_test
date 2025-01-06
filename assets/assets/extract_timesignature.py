from madmom.features.downbeats import DBNDownBeatTrackingProcessor
from madmom.features.downbeats import RNNDownBeatProcessor
from madmom.features.beats import RNNBeatProcessor
import numpy as np
from collections import Counter

def analyze_time_signature(audio_file):
    # 비트와 서브비트 추적을 위한 프로세서
    beat_proc = RNNBeatProcessor()
    beat_act = beat_proc(audio_file)

    # 다운비트 추적
    proc = RNNDownBeatProcessor()
    act = proc(audio_file)

    # DBN으로 박자 추적 (더 다양한 박자 패턴 허용)
    processor = DBNDownBeatTrackingProcessor(beats_per_bar=[3, 4, 6, 12], fps=100)
    beats = processor(act)

    result = "Could not determine time signature reliably"

    if len(beats) > 0:
        downbeats = beats[beats[:, 1] == 1]
        if len(downbeats) >= 2:
            beats_between_downbeats = []
            beat_patterns = []

            for i in range(len(downbeats) - 1):
                bar_beats = beats[(beats[:, 0] >= downbeats[i][0]) &
                                  (beats[:, 0] < downbeats[i + 1][0])]
                beats_between_downbeats.append(len(bar_beats))

                # 각 마디 내의 비트 패턴 분석
                if len(bar_beats) > 1:
                    beat_times = bar_beats[:, 0]
                    intervals = np.diff(beat_times)
                    normalized_intervals = intervals / np.mean(intervals)
                    beat_patterns.append(normalized_intervals)

            most_common_beats = Counter(beats_between_downbeats).most_common(1)[0][0]

            # 비트 패턴 분석으로 8분의 12박자 특성 확인
            if beat_patterns:
                mean_pattern = np.mean(beat_patterns, axis=0)
                pattern_variation = np.std(mean_pattern)

                # 서브비트 강도 분석
                subbeat_strength = np.mean(beat_act)

                if most_common_beats == 12 or (
                        most_common_beats == 4 and pattern_variation > 0.2 and subbeat_strength > 0.5):
                    result = "12/8"
                else:
                    result = f"{most_common_beats}/4"

    return result