@echo off
title Universal Video Downloader
echo =======================================================
echo           Universal Video Downloader
echo =======================================================
echo Starting server, please wait...
echo.

where python >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not added to PATH!
    echo Please install Python and check "Add Python to PATH".
    echo.
    pause
    exit /b 1
)

:: Install requirements silently if missing
python -m pip install -r requirements.txt --quiet

:: Start the Python server in the background
start /b python app.py

:: Wait 3 seconds to ensure the server is fully running
timeout /t 3 /nobreak >nul

:: Open the browser directly to the app
start http://localhost:5000

echo.
echo =======================================================
echo The Downloader is now open in your web browser!
echo URL: http://localhost:5000
echo.
echo IMPORTANT: Keep this window open while downloading.
echo When you are done, press any key or close this window.
echo =======================================================
echo.
pause
