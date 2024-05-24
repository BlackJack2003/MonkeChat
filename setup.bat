@echo off
rem Get the directory of the batch file
set "currentDir=%~dp0"

rem Create the db directory in the same folder as the batch file
mkdir "%currentDir%db"

rem Create directories for FrontEnd and BackEnd
mkdir "%currentDir%FrontEnd"
mkdir "%currentDir%BackEnd"

rem Generate random strings for NEXTAUTH_SECRET and BACKEND_KEY
for /f "delims=" %%i in ('powershell -Command "[guid]::NewGuid().ToString('N').Substring(0,44)"') do set "NEXTAUTH_SECRET=%%i"
for /f "delims=" %%i in ('powershell -Command "[guid]::NewGuid().ToString('N') + [guid]::NewGuid().ToString('N').Substring(0,32)"') do set "BACKEND_KEY=%%i"

rem Display the generated secrets (for debugging purposes, can be removed)
echo NEXTAUTH_SECRET: %NEXTAUTH_SECRET%
echo BACKEND_KEY: %BACKEND_KEY%

rem Create the FrontEnd .env.production file
(
    echo NEXTAUTH_SECRET=%NEXTAUTH_SECRET%
    echo NODE_OPTIONS='--max-http-header-size=128000'
    echo BACKEND_KEY=%BACKEND_KEY%
    echo NEXTAUTH_URL=https://127.0.0.1
    echo BACKEND_API_URL='http://backdb:5000'
) > "%currentDir%FrontEnd\.env.production"

rem Create the FrontEnd .env.development file
(
    echo NEXTAUTH_SECRET=%NEXTAUTH_SECRET%
    echo NODE_OPTIONS='--max-http-header-size=128000'
    echo BACKEND_KEY=%BACKEND_KEY%
    echo NEXTAUTH_URL=http://127.0.0.1:3000
    echo BACKEND_API_URL='http://127.0.0.1:5000'
) > "%currentDir%FrontEnd\.env.development"

rem Create empty BackEnd .env files as specified earlier
(
    echo BACKEND_KEY=%BACKEND_KEY%
    echo DATABASE_URL="mongodb://127.0.0.1:27017/monkeChatDb" 
) > "%currentDir%BackEnd\.env.development"
(
    echo BACKEND_KEY=%BACKEND_KEY%
    echo DATABASE_URL="mongodb://db:27017/monkeChatDb" 
) > "%currentDir%BackEnd\.env.production"

echo Folders and files created successfully.
pause

rem Change directory to FrontEnd and run npm install
cd "%currentDir%FrontEnd"
npm install

rem Build FrontEnd
npm run build

rem Change directory to BackEnd and run npm install
cd "%currentDir%BackEnd"
npm install

rem Build BackEnd
npm run build

rem Change directory back to the root directory
cd "%currentDir%"

rem Run docker-compose up
docker-compose down
docker-compose up -d

echo Docker containers started successfully.
pause
