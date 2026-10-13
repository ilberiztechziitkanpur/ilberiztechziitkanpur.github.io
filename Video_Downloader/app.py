import os
import sys
import re
import shutil
import uuid
import threading
from flask import Flask, render_template, request, jsonify
import yt_dlp

app = Flask(__name__)

# Ensure FFmpeg is accessible if installed via WinGet, Scoop, or standard locations
def auto_configure_ffmpeg():
    if shutil.which('ffmpeg'):
        return
    
    potential_paths = [
        os.path.join(os.environ.get('LOCALAPPDATA', ''), 'Microsoft', 'WinGet', 'Links'),
        r'C:\ffmpeg\bin',
        r'C:\Program Files\ffmpeg\bin',
        os.path.join(os.path.expanduser('~'), 'AppData', 'Local', 'Microsoft', 'WinGet', 'Links')
    ]
    for p in potential_paths:
        if os.path.exists(os.path.join(p, 'ffmpeg.exe')) or os.path.exists(os.path.join(p, 'ffmpeg')):
            os.environ['PATH'] = p + os.pathsep + os.environ.get('PATH', '')
            break

auto_configure_ffmpeg()

# Path to the user's Downloads folder
DOWNLOAD_FOLDER = os.path.join(os.path.expanduser('~'), 'Downloads')

progress_data = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/progress/<download_id>')
def get_progress(download_id):
    return jsonify(progress_data.get(download_id, {
        "status": "starting",
        "progress": "0%",
        "speed": "N/A",
        "eta": "N/A"
    }))

@app.route('/download', methods=['POST'])
def download_video():
    data = request.json or {}
    url = data.get('url')
    convert_for_telegram = data.get('convertForTelegram', False)
    download_id = data.get('download_id')

    if not url:
        return jsonify({"success": False, "error": "No URL provided."})

    # Ensure FFmpeg is available if conversion is requested
    auto_configure_ffmpeg()
    if convert_for_telegram and not shutil.which('ffmpeg'):
        return jsonify({
            "success": False,
            "error": "FFmpeg is required for Telegram Optimization, but it is not found in PATH. Please install FFmpeg or place ffmpeg.exe in your PATH."
        })

    try:
        if download_id:
            progress_data[download_id] = {
                "status": "starting",
                "progress": "0%",
                "speed": "N/A",
                "eta": "N/A"
            }

        def my_hook(d):
            if not download_id:
                return
            if d.get('status') == 'downloading':
                p = d.get('_percent_str', '0%')
                s = d.get('_speed_str', 'N/A')
                eta = d.get('_eta_str', 'N/A')
                # Strip ANSI escape codes
                p = re.sub(r'\x1b[^m]*m', '', p).strip()
                s = re.sub(r'\x1b[^m]*m', '', s).strip()
                eta = re.sub(r'\x1b[^m]*m', '', eta).strip()
                progress_data[download_id] = {
                    "status": "downloading",
                    "progress": p,
                    "speed": s,
                    "eta": eta
                }
            elif d.get('status') == 'finished':
                progress_data[download_id] = {
                    "status": "finished",
                    "progress": "100%",
                    "speed": "N/A",
                    "eta": "00:00"
                }

        # Configuration for yt-dlp
        ydl_opts = {
            'outtmpl': os.path.join(DOWNLOAD_FOLDER, '%(title)s.%(ext)s'),
            'format': 'bestvideo+bestaudio/best',
            'quiet': True,
            'noprogress': True,
            'progress_hooks': [my_hook]
        }

        # Telegram streaming format: H.264 + AAC + faststart in MP4 container
        if convert_for_telegram:
            ydl_opts['merge_output_format'] = 'mp4'
            ydl_opts['postprocessors'] = [{
                'key': 'FFmpegVideoConvertor',
                'preferedformat': 'mp4',
            }]
            ydl_opts['postprocessor_args'] = [
                '-c:v', 'libx264',
                '-preset', 'fast',
                '-c:a', 'aac',
                '-movflags', '+faststart'
            ]

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)

            if info is None:
                return jsonify({"success": False, "error": "Could not extract video data."})

            filename = ydl.prepare_filename(info)

            if convert_for_telegram:
                filename = os.path.splitext(filename)[0] + '.mp4'

        return jsonify({
            "success": True,
            "message": "Video downloaded successfully!",
            "filename": os.path.basename(filename),
            "path": filename
        })

    except Exception as e:
        if download_id:
            progress_data[download_id] = {"status": "error", "error": str(e)}
        return jsonify({"success": False, "error": str(e)})

if __name__ == '__main__':
    # Debug False to prevent double execution in background batch scripts
    app.run(debug=False, port=5000)
