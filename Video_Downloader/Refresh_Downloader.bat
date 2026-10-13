@echo off
title Refreshing and Starting Downloader...
echo =======================================================
echo Forcing a complete refresh of dependencies...
echo This might take a minute, please wait.
echo =======================================================

:: Force uninstall and reinstall of the problematic packages to ensure no old code is left
python -m pip install --upgrade --force-reinstall -r requirements.txt

echo.
echo =======================================================
echo Update complete! Starting your Video Downloader...
echo =======================================================

:: Start the Python server in the background
start /b python app.py

:: Wait 3 seconds to ensure the server is fully running
timeout /t 3 /nobreak >nul

:: Open the browser directly to the app
start http://localhost:5000

echo.
echo =======================================================
echo The Downloader is now open in your web browser!
echo IMPORTANT: Keep this black window open while you download.
echo When you are completely done, you can just close this window.
echo =======================================================
pause
