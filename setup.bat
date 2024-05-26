@echo off
rem Get the directory of the batch file
set "currentDir=%~dp0"

rem Create the db directory in the same folder as the batch file
mkdir "%currentDir%db"
if %errorlevel% neq 0 (
    echo Error creating db directory.
    exit /b 1
)

rem Create directories for FrontEnd and BackEnd
mkdir "%currentDir%FrontEnd"
if %errorlevel% neq 0 (
    echo Error creating FrontEnd directory.
    exit /b 1
)
mkdir "%currentDir%BackEnd"
if %errorlevel% neq 0 (
    echo Error creating BackEnd directory.
    exit /b 1
)

rem Generate random strings for NEXTAUTH_SECRET and BACKEND_KEY
for /f "delims=" %%i in ('powershell -Command "[guid]::NewGuid().ToString('N').Substring(0,30)"') do set "NEXTAUTH_SECRET=%%i"
if %errorlevel% neq 0 (
    echo Error generating NEXTAUTH_SECRET.
    exit /b 1
)
for /f "delims=" %%i in ('powershell -Command "[guid]::NewGuid().ToString('N') + [guid]::NewGuid().ToString('N').Substring(0,32)"') do set "BACKEND_KEY=%%i"
if %errorlevel% neq 0 (
    echo Error generating BACKEND_KEY.
    exit /b 1
)

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
if %errorlevel% neq 0 (
    echo Error creating FrontEnd .env.production file.
    exit /b 1
)

rem Create the FrontEnd .env.development file
(
    echo NEXTAUTH_SECRET=%NEXTAUTH_SECRET%
    echo NODE_OPTIONS='--max-http-header-size=128000'
    echo BACKEND_KEY=%BACKEND_KEY%
    echo NEXTAUTH_URL=http://127.0.0.1:3000
    echo BACKEND_API_URL='http://127.0.0.1:5000'
) > "%currentDir%FrontEnd\.env.development"
if %errorlevel% neq 0 (
    echo Error creating FrontEnd .env.development file.
    exit /b 1
)

rem Create empty BackEnd .env files as specified earlier
(
    echo BACKEND_KEY=%BACKEND_KEY%
    echo DATABASE_URL="mongodb://127.0.0.1:27017/monkeChatDb" 
) > "%currentDir%BackEnd\.env.development"
if %errorlevel% neq 0 (
    echo Error creating BackEnd .env.development file.
    exit /b 1
)
(
    echo BACKEND_KEY=%BACKEND_KEY%
    echo DATABASE_URL="mongodb://db:27017/monkeChatDb" 
) > "%currentDir%BackEnd\.env.production"
if %errorlevel% neq 0 (
    echo Error creating BackEnd .env.production file.
    exit /b 1
)

echo Folders and files created successfully.

rem Change directory to FrontEnd and run npm install
cd "%currentDir%FrontEnd"
if %errorlevel% neq 0 (
    echo Error changing to FrontEnd directory.
    exit /b 1
)
npm install
if %errorlevel% neq 0 (
    echo Error running npm install in FrontEnd.
    exit /b 1
)

rem Build FrontEnd
npm run build
if %errorlevel% neq 0 (
    echo Error running npm build in FrontEnd.
    exit /b 1
)

rem Change directory to BackEnd and run npm install
cd "%currentDir%BackEnd"
if %errorlevel% neq 0 (
    echo Error changing to BackEnd directory.
    exit /b 1
)
npm install
if %errorlevel% neq 0 (
    echo Error running npm install in BackEnd.
    exit /b 1
)

rem Build BackEnd
npm run build
if %errorlevel% neq 0 (
    echo Error running npm build in BackEnd.
    exit /b 1
)

rem Change directory back to the root directory
cd "%currentDir%"
if %errorlevel% neq 0 (
    echo Error changing back to root directory.
    exit /b 1
)

openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout "%currentDir%private_nginx-selfsigned.key" -out "%currentDir%public_nginx-selfsigned.crt" -subj "/C=IN/ST=Karnataka/L=Bangalore/O=BMS/CN=127.0.0.1"
if %errorlevel% neq 0 (
    echo Error generating self-signed certificate. Try installing openssl
    exit /b 1
)
openssl dhparam -out "%currentDir%dhparam.pem" 2048
if %errorlevel% neq 0 (
    echo Error generating DH parameters.
    exit /b 1
)

rem Run docker-compose up
docker-compose down
if %errorlevel% neq 0 (
    echo Error running docker-compose down.
    exit /b 1
)
docker-compose up -d
if %errorlevel% neq 0 (
    echo Error running docker-compose up.
    exit /b 1
)

echo Docker containers started successfully.
pause
