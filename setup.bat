@echo off
rem Get the directory of the batch file
set "currentDir=%~dp0"

rem Starting script
echo Starting script

rem Create db directory if it doesn't exist
echo Checking db directory
if not exist "%currentDir%db" (
    mkdir "%currentDir%db"
    if %errorlevel% neq 0 call echo "Error creating db directory." && pause
)
echo db directory check complete

rem Generate random strings for NEXTAUTH_SECRET and BACKEND_KEY
echo Generating NEXTAUTH_SECRET and BACKEND_KEY
for /f "delims=" %%i in ('powershell -Command "[guid]::NewGuid().ToString('N').Substring(0,30)"') do set "NEXTAUTH_SECRET=%%i"
if %errorlevel% neq 0 call echo "Error generating NEXTAUTH_SECRET." && pause

for /f "delims=" %%i in ('powershell -Command "[guid]::NewGuid().ToString('N') + [guid]::NewGuid().ToString('N').Substring(0,32)"') do set "BACKEND_KEY=%%i"
if %errorlevel% neq 0 call echo "Error generating BACKEND_KEY."&& pause

echo NEXTAUTH_SECRET: %NEXTAUTH_SECRET%
echo BACKEND_KEY: %BACKEND_KEY%
echo Generated NEXTAUTH_SECRET and BACKEND_KEY

rem Create the FrontEnd .env.production file
echo Creating FrontEnd .env.production file
(
    echo NEXTAUTH_SECRET=%NEXTAUTH_SECRET%
    echo NODE_OPTIONS='--max-http-header-size=128000'
    echo BACKEND_KEY=%BACKEND_KEY%
    echo NEXTAUTH_URL=https://127.0.0.1
    echo BACKEND_API_URL='http://backdb:5000'
) > "%currentDir%FrontEnd\.env.production"
if %errorlevel% neq 0 call echo "Error creating FrontEnd .env.production file."&& pause
echo FrontEnd .env.production file created

rem Create the FrontEnd .env.development file
echo Creating FrontEnd .env.development file
(
    echo NEXTAUTH_SECRET=%NEXTAUTH_SECRET%
    echo NODE_OPTIONS='--max-http-header-size=128000'
    echo BACKEND_KEY=%BACKEND_KEY%
    echo NEXTAUTH_URL=http://127.0.0.1:3000
    echo BACKEND_API_URL='http://127.0.0.1:5000'
) > "%currentDir%FrontEnd\.env.development"
if %errorlevel% neq 0 call echo "Error creating FrontEnd .env.development file."&& pause
echo FrontEnd .env.development file created

rem Create BackEnd .env.development file
echo Creating BackEnd .env.development file
(
    echo BACKEND_KEY=%BACKEND_KEY%
    echo DATABASE_URL="mongodb://127.0.0.1:27017/monkeChatDb" 
) > "%currentDir%BackEnd\.env.development"
if %errorlevel% neq 0 call echo "Error creating BackEnd .env.development file."&& pause
echo BackEnd .env.development file created

rem Create BackEnd .env.production file
echo Creating BackEnd .env.production file
(
    echo BACKEND_KEY=%BACKEND_KEY%
    echo DATABASE_URL="mongodb://db:27017/monkeChatDb" 
) > "%currentDir%BackEnd\.env.production"
if %errorlevel% neq 0 call echo "Error creating BackEnd .env.production file."&& pause
echo BackEnd .env.production file created

rem Install FrontEnd dependencies
echo Changing to FrontEnd directory
cd "%currentDir%FrontEnd"
if %errorlevel% neq 0 call echo "Error changing to FrontEnd directory."&& pause
echo Running npm install in FrontEnd
call npm install
if %errorlevel% neq 0 call echo "Error running npm install in FrontEnd."&& pause
echo npm install in FrontEnd completed

rem Build FrontEnd
echo Running npm build in FrontEnd
call npm run build
if %errorlevel% neq 0 call echo "Error running npm build in FrontEnd."&& pause
echo npm build in FrontEnd completed

rem Install BackEnd dependencies
echo Changing to BackEnd directory
cd "%currentDir%BackEnd"
if %errorlevel% neq 0 call echo "Error changing to BackEnd directory."&& pause
echo Running npm install in BackEnd
call npm install
if %errorlevel% neq 0 call echo "Error running npm install in BackEnd."&& pause
echo npm install in BackEnd completed

rem Build BackEnd
echo Running npm build in BackEnd
call npm run build
if %errorlevel% neq 0 call echo "Error running npm build in BackEnd."&& pause
echo npm build in BackEnd completed

rem Change directory back to the root directory
echo Changing back to root directory
cd "%currentDir%"
if %errorlevel% neq 0 call echo "Error changing back to root directory."&& pause
echo Changed back to root directory

rem Create ssl_certs directory if it doesn't exist
echo Checking ssl_certs directory
if not exist "%currentDir%ssl_certs" (
    mkdir "%currentDir%ssl_certs"
    if %errorlevel% neq 0 call echo "Error creating ssl_certs directory."&& pause
)
echo ssl_certs directory check complete

rem Generate SSL certificates and DH parameters
echo Generating self-signed certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout "%currentDir%ssl_certs\private_nginx-selfsigned.key" -out "%currentDir%ssl_certs\public_nginx-selfsigned.crt" -subj "/C=IN/ST=Karnataka/L=Bangalore/O=BMS/CN=127.0.0.1"
if %errorlevel% neq 0 call :handleError "Error generating self-signed certificate."
echo Self-signed certificate generated

echo Generating DH parameters
openssl dhparam -out "%currentDir%ssl_certs\dhparam.pem" 2048
if %errorlevel% neq 0 call :handleError "Error generating DH parameters."
echo DH parameters generated

echo SSL keys and DH parameters creation complete

rem Run docker-compose up
echo Running docker-compose down
docker-compose down
if %errorlevel% neq 0 call echo "Error running docker-compose down."&& pause
echo docker-compose down completed

echo Running docker-compose up
docker-compose up -d
if %errorlevel% neq 0 call echo "Error running docker-compose up."&& pause
echo docker-compose up completed

echo Docker containers started successfully
pause
