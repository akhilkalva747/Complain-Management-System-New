@echo off
setlocal enabledelayedexpansion
title CMS - Auto Setup
color 0A

cls
echo.
echo  ============================================================
echo    Complaint Management System - One-Click Setup
echo    Installs: Java 21, Maven 3.9.6, Node.js, XAMPP + MySQL
echo  ============================================================
echo.
echo  Requirements: Windows 10/11 with internet connection.
echo  Press any key to begin (Ctrl+C to cancel)...
pause >nul

:: ================================================================
:: Paths
:: ================================================================
set "PROJECT_DIR=%~dp0"
if "!PROJECT_DIR:~-1!"=="\" set "PROJECT_DIR=!PROJECT_DIR:~0,-1!"
set "BACKEND_DIR=!PROJECT_DIR!\complaint-management-backend"
set "FRONTEND_DIR=!PROJECT_DIR!\complaint-management-frontend"
set "SCHEMA_FILE=!BACKEND_DIR!\src\main\resources\schema.sql"
set "TOOLS_DIR=C:\cms-tools"
set "MAVEN_DIR=!TOOLS_DIR!\maven"
set "MVN_CMD=!MAVEN_DIR!\bin\mvn.cmd"

echo.
echo  Project : !PROJECT_DIR!
echo.

:: ================================================================
:: STEP 1 - Java JDK 21
:: ================================================================
echo  [1/5] Java JDK 21
echo  -------------------------------------------------------
java -version >nul 2>&1
if !errorlevel! equ 0 (
    echo  [OK] Java already installed.
) else (
    echo  Installing Java 21 via winget...
    winget install --id EclipseAdoptium.Temurin.21.JDK -e --silent --accept-package-agreements --accept-source-agreements
    if !errorlevel! neq 0 (
        echo.
        echo  [FAIL] Automatic install failed.
        echo  Please install manually from: https://adoptium.net/temurin/releases/?version=21
        echo  Then run this script again.
        pause & exit /b 1
    )
    echo  [OK] Java 21 installed.
)

:: Detect and save JAVA_HOME
if "!JAVA_HOME!"=="" (
    for /d %%i in ("C:\Program Files\Eclipse Adoptium\jdk-21*") do set "JAVA_HOME=%%i"
    for /d %%i in ("C:\Program Files\Java\jdk-21*") do set "JAVA_HOME=%%i"
    for /d %%i in ("C:\Program Files\Microsoft\jdk-21*") do set "JAVA_HOME=%%i"
)
if not "!JAVA_HOME!"=="" (
    setx JAVA_HOME "!JAVA_HOME!" >nul 2>&1
    echo  JAVA_HOME = !JAVA_HOME!
) else (
    echo  [WARN] JAVA_HOME not auto-detected. Set it manually if Maven fails.
)
echo.

:: ================================================================
:: STEP 2 - Apache Maven 3.9.6
:: ================================================================
echo  [2/5] Apache Maven 3.9.6
echo  -------------------------------------------------------
if exist "!MVN_CMD!" (
    echo  [OK] Maven already installed at !MAVEN_DIR!
) else (
    echo  Downloading Maven from apache.org...
    if not exist "!TOOLS_DIR!" mkdir "!TOOLS_DIR!"

    powershell -NoProfile -ExecutionPolicy Bypass -Command "Invoke-WebRequest -Uri 'https://archive.apache.org/dist/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.zip' -OutFile '!TOOLS_DIR!\maven.zip' -UseBasicParsing"
    if !errorlevel! neq 0 (
        echo  [FAIL] Download failed. Check internet connection.
        pause & exit /b 1
    )

    echo  Extracting...
    powershell -NoProfile -ExecutionPolicy Bypass -Command "Expand-Archive -Path '!TOOLS_DIR!\maven.zip' -DestinationPath '!TOOLS_DIR!\mvn-tmp' -Force; Move-Item '!TOOLS_DIR!\mvn-tmp\apache-maven-3.9.6' '!MAVEN_DIR!' -Force; Remove-Item '!TOOLS_DIR!\mvn-tmp','!TOOLS_DIR!\maven.zip' -Recurse -Force"
    echo  [OK] Maven installed to !MAVEN_DIR!
)
setx MAVEN_HOME "!MAVEN_DIR!" >nul 2>&1
echo.

:: ================================================================
:: STEP 3 - Node.js LTS
:: ================================================================
echo  [3/5] Node.js LTS
echo  -------------------------------------------------------
node -v >nul 2>&1
if !errorlevel! equ 0 (
    echo  [OK] Node.js already installed.
) else (
    echo  Installing Node.js LTS via winget...
    winget install --id OpenJS.NodeJS.LTS -e --silent --accept-package-agreements --accept-source-agreements
    if !errorlevel! neq 0 (
        echo  [FAIL] Install failed. Download from https://nodejs.org/
        pause & exit /b 1
    )
    echo  [OK] Node.js LTS installed.
)
echo.

:: ================================================================
:: STEP 4 - XAMPP / MySQL
:: ================================================================
echo  [4/5] MySQL (via XAMPP)
echo  -------------------------------------------------------
set "MYSQL_BIN="
if exist "C:\xampp\mysql\bin\mysql.exe"                          set "MYSQL_BIN=C:\xampp\mysql\bin"
if exist "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" set "MYSQL_BIN=C:\Program Files\MySQL\MySQL Server 8.0\bin"
if exist "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe" set "MYSQL_BIN=C:\Program Files\MySQL\MySQL Server 8.4\bin"

if not "!MYSQL_BIN!"=="" (
    echo  [OK] MySQL found at !MYSQL_BIN!
) else (
    echo  Installing XAMPP via winget...
    winget install --id ApacheFriends.Xampp.8.2 -e --silent --accept-package-agreements --accept-source-agreements
    if !errorlevel! neq 0 (
        echo.
        echo  [INFO] Winget XAMPP install failed (this is common).
        echo  Please install XAMPP manually from: https://www.apachefriends.org/
        echo  After installing, run this script again.
        pause & exit /b 1
    )
    set "MYSQL_BIN=C:\xampp\mysql\bin"
    echo  [OK] XAMPP installed.
)
set "MYSQL_CMD=!MYSQL_BIN!\mysql.exe"

:: Start MySQL
echo  Starting MySQL...
if exist "C:\xampp\mysql_start.bat" (
    start /min "MySQL" cmd /c "C:\xampp\mysql_start.bat"
) else (
    net start MySQL80 >nul 2>&1
    net start MySQL >nul 2>&1
)
timeout /t 5 /nobreak >nul
echo.

:: ================================================================
:: STEP 5 - Database
:: ================================================================
echo  [5/5] Database Setup
echo  -------------------------------------------------------
if not exist "!MYSQL_CMD!" (
    echo  [WARN] mysql.exe not found. Start MySQL manually then run:
    echo         mysql -u root querysolve ^< "!SCHEMA_FILE!"
) else (
    "!MYSQL_CMD!" -u root -e "CREATE DATABASE IF NOT EXISTS querysolve;" 2>nul
    if !errorlevel! neq 0 (
        echo  [WARN] Cannot connect to MySQL. Is it running?
        echo         Open XAMPP Control Panel and click Start next to MySQL.
        echo         Then re-run this script or manually import schema.sql
    ) else (
        "!MYSQL_CMD!" -u root querysolve < "!SCHEMA_FILE!" 2>nul
        echo  [OK] Database 'querysolve' created with sample data.
    )
)
echo.

:: ================================================================
:: npm install
:: ================================================================
echo  [+] Installing frontend npm packages
echo  -------------------------------------------------------
cd /d "!FRONTEND_DIR!"
where node >nul 2>&1
if !errorlevel! equ 0 (
    call npm install
    echo  [OK] npm packages installed.
) else (
    echo  [WARN] Node.js not in PATH yet (needs new CMD window).
    echo         After restarting CMD, run in frontend folder:
    echo         npm install
)
echo.

:: ================================================================
:: Done
:: ================================================================
echo  ============================================================
echo    Setup Complete!
echo.
echo    IMPORTANT: Open a NEW Command Prompt, then run:
echo      start-app.bat
echo.
echo    (New window needed so PATH picks up Java + Node.js)
echo  ============================================================
echo.
pause
