import speech_recognition as sr

def audio_recorder(timeout=3):
    while True:
        filename = "audio.wav"
        with sr.Microphone() as source:
            rec = sr.Recognizer()
            rec.adjust_for_ambient_noise(source, duration=1)
            rec.pause_threshold = 2

            try:
                print("Say something!")

                audio = rec.listen(source, timeout=timeout)
                print("Recorded")
            except sr.WaitTimeoutError:
                print("Timeout")
                return "ERROR: Try again"  
            with open(filename, "wb") as f:
                f.write(audio.get_wav_data())
            break
    return "Completed recording!"
