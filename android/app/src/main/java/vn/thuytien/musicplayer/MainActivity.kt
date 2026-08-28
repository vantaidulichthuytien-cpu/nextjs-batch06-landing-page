package vn.thuytien.musicplayer

import android.content.Context
import android.media.AudioAttributes
import android.media.AudioFocusRequest
import android.media.AudioManager
import android.media.MediaPlayer
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.widget.SeekBar
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import vn.thuytien.musicplayer.databinding.ActivityMainBinding
import java.util.Locale

/**
 * Màn hình duy nhất của ứng dụng: một nút bấm lớn để phát / tạm dừng bài hát
 * nằm trong res/raw, kèm thanh tua và thời lượng.
 */
class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private var player: MediaPlayer? = null

    private val handler = Handler(Looper.getMainLooper())
    private val progressTicker = object : Runnable {
        override fun run() {
            player?.let { updateProgress(it.currentPosition) }
            handler.postDelayed(this, PROGRESS_INTERVAL_MS)
        }
    }

    private lateinit var audioManager: AudioManager
    private var focusRequest: AudioFocusRequest? = null
    private var resumeOnFocusGain = false

    private val focusListener = AudioManager.OnAudioFocusChangeListener { change ->
        when (change) {
            AudioManager.AUDIOFOCUS_LOSS -> pause()
            AudioManager.AUDIOFOCUS_LOSS_TRANSIENT -> {
                resumeOnFocusGain = player?.isPlaying == true
                pause()
            }
            AudioManager.AUDIOFOCUS_GAIN -> if (resumeOnFocusGain) {
                resumeOnFocusGain = false
                play()
            }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        audioManager = getSystemService(Context.AUDIO_SERVICE) as AudioManager

        val mediaPlayer = MediaPlayer.create(this, R.raw.bai_hat_mau)
        if (mediaPlayer == null) {
            // Không mở được file nhạc (file hỏng hoặc định dạng không hỗ trợ).
            Toast.makeText(this, R.string.load_error, Toast.LENGTH_LONG).show()
            binding.buttonPlayPause.isEnabled = false
            binding.buttonReplay.isEnabled = false
            binding.seekBar.isEnabled = false
            return
        }
        player = mediaPlayer
        mediaPlayer.setOnCompletionListener { onSongFinished() }

        binding.seekBar.max = mediaPlayer.duration
        binding.textTotalTime.text = formatTime(mediaPlayer.duration)
        updateProgress(0)

        binding.buttonPlayPause.setOnClickListener {
            if (player?.isPlaying == true) pause() else play()
        }

        binding.buttonReplay.setOnClickListener {
            player?.seekTo(0)
            updateProgress(0)
            play()
        }

        binding.seekBar.setOnSeekBarChangeListener(object : SeekBar.OnSeekBarChangeListener {
            override fun onProgressChanged(bar: SeekBar, progress: Int, fromUser: Boolean) {
                if (fromUser) {
                    player?.seekTo(progress)
                    updateProgress(progress)
                }
            }

            override fun onStartTrackingTouch(bar: SeekBar) = Unit
            override fun onStopTrackingTouch(bar: SeekBar) = Unit
        })
    }

    private fun play() {
        val mediaPlayer = player ?: return
        if (!requestAudioFocus()) return

        mediaPlayer.start()
        binding.buttonPlayPause.setIconResource(R.drawable.ic_pause)
        binding.buttonPlayPause.contentDescription = getString(R.string.pause)
        handler.removeCallbacks(progressTicker)
        handler.post(progressTicker)
    }

    private fun pause() {
        val mediaPlayer = player ?: return
        if (mediaPlayer.isPlaying) mediaPlayer.pause()
        handler.removeCallbacks(progressTicker)
        binding.buttonPlayPause.setIconResource(R.drawable.ic_play)
        binding.buttonPlayPause.contentDescription = getString(R.string.play)
    }

    private fun onSongFinished() {
        handler.removeCallbacks(progressTicker)
        player?.seekTo(0)
        updateProgress(0)
        binding.buttonPlayPause.setIconResource(R.drawable.ic_play)
        binding.buttonPlayPause.contentDescription = getString(R.string.play)
        abandonAudioFocus()
    }

    private fun updateProgress(positionMs: Int) {
        binding.seekBar.progress = positionMs
        binding.textCurrentTime.text = formatTime(positionMs)
    }

    private fun formatTime(millis: Int): String {
        val totalSeconds = millis / 1000
        return String.format(Locale.US, "%d:%02d", totalSeconds / 60, totalSeconds % 60)
    }

    private fun requestAudioFocus(): Boolean {
        val granted = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val request = focusRequest ?: AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN)
                .setAudioAttributes(
                    AudioAttributes.Builder()
                        .setUsage(AudioAttributes.USAGE_MEDIA)
                        .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
                        .build()
                )
                .setOnAudioFocusChangeListener(focusListener)
                .build()
                .also { focusRequest = it }
            audioManager.requestAudioFocus(request)
        } else {
            @Suppress("DEPRECATION")
            audioManager.requestAudioFocus(
                focusListener,
                AudioManager.STREAM_MUSIC,
                AudioManager.AUDIOFOCUS_GAIN
            )
        }
        return granted == AudioManager.AUDIOFOCUS_REQUEST_GRANTED
    }

    private fun abandonAudioFocus() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            focusRequest?.let { audioManager.abandonAudioFocusRequest(it) }
        } else {
            @Suppress("DEPRECATION")
            audioManager.abandonAudioFocus(focusListener)
        }
    }

    override fun onDestroy() {
        handler.removeCallbacks(progressTicker)
        abandonAudioFocus()
        player?.release()
        player = null
        super.onDestroy()
    }

    private companion object {
        const val PROGRESS_INTERVAL_MS = 250L
    }
}
