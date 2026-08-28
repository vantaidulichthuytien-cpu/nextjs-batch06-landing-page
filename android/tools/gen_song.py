import math, wave, array, sys

SR = 22050

def note(freq, dur, amp=1.0, harmonics=(1.0, 0.35, 0.15, 0.06)):
    n = int(SR * dur)
    buf = [0.0] * n
    atk = int(0.01 * SR)
    rel = int(n * 0.55)
    for i in range(n):
        t = i / SR
        s = 0.0
        for h, ha in enumerate(harmonics, start=1):
            s += ha * math.sin(2 * math.pi * freq * h * t)
        # envelope: quick attack, exponential decay
        if i < atk:
            env = i / atk
        else:
            env = math.exp(-3.0 * (i - atk) / max(rel, 1))
        buf[i] = s * env * amp
    return buf

def add(track, start_sec, samples):
    s = int(start_sec * SR)
    need = s + len(samples)
    if need > len(track):
        track.extend([0.0] * (need - len(track)))
    for i, v in enumerate(samples):
        track[s + i] += v

def f(name):
    # name like C4, A#3
    names = {'C':0,'C#':1,'D':2,'D#':3,'E':4,'F':5,'F#':6,'G':7,'G#':8,'A':9,'A#':10,'B':11}
    octave = int(name[-1]); key = names[name[:-1]]
    midi = (octave + 1) * 12 + key
    return 440.0 * 2 ** ((midi - 69) / 12)

BEAT = 0.55
track = []

# I - V - vi - IV, hai vòng
chords = [
    ('C4', ['C5','E5','G5','E5']),
    ('G3', ['B4','D5','G5','D5']),
    ('A3', ['A4','C5','E5','C5']),
    ('F3', ['F4','A4','C5','A4']),
]

melody_lines = [
    ['G5','E5','C5','D5', 'D5','B4','G4','A4', 'C5','A4','E5','C5', 'A4','C5','F5','E5'],
    ['E5','G5','C6','G5', 'D5','G5','B5','G5', 'C5','E5','A5','E5', 'F5','A5','C6','A5'],
]

t = 0.0
for loop in range(2):
    mel = melody_lines[loop]
    mi = 0
    for root, arp in chords:
        for b in range(4):
            # bass
            add(track, t, note(f(root) / 2, BEAT * 1.6, amp=0.42, harmonics=(1.0, 0.2, 0.05)))
            # arpeggio đệm
            add(track, t, note(f(arp[b]) / 2, BEAT * 1.1, amp=0.16))
            add(track, t + BEAT * 0.5, note(f(arp[(b + 2) % 4]), BEAT * 0.7, amp=0.10))
            # giai điệu
            add(track, t, note(f(mel[mi]), BEAT * 1.3, amp=0.30))
            if b % 2 == 1:
                add(track, t + BEAT * 0.5, note(f(mel[mi]) * 1.5, BEAT * 0.5, amp=0.12))
            mi += 1
            t += BEAT

# hợp âm kết
add(track, t, note(f('C4'), 2.4, amp=0.30))
add(track, t, note(f('E4'), 2.4, amp=0.22))
add(track, t, note(f('G4'), 2.4, amp=0.22))
add(track, t, note(f('C3'), 2.6, amp=0.40, harmonics=(1.0, 0.2, 0.05)))
t += 2.6

# chuẩn hoá + fade
peak = max(abs(v) for v in track) or 1.0
gain = 0.85 / peak
fade = int(0.25 * SR)
out = array.array('h')
n = len(track)
for i, v in enumerate(track):
    g = gain
    if i < fade:
        g *= i / fade
    if i > n - fade:
        g *= max(0.0, (n - i) / fade)
    out.append(max(-32767, min(32767, int(v * g * 32767))))

path = sys.argv[1]
with wave.open(path, 'w') as w:
    w.setnchannels(1)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(out.tobytes())
print('OK', path, round(n / SR, 2), 'giây')
