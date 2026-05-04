@echo off
setlocal enabledelayedexpansion
title CMS - Launcher
color 0B

cls
echo.
echo  ============================================================
echo    Complaint Management System - Starting...
echo  ============================================================
echo.

:: ================================================================
:: Paths
:: ================================================================
set "PROJECT_DIR=%~dp0"
if "!PROJECT_DIR:~-1!"=="\" set "PROJECT_DIR=!PROJECT_DIR:~0,-1!"
set "BACKEND_DIR=!PROJECT_DIR!\complaint-management-backend"
set "FRONTEND_DIR=!PROJECT_DIR!\complaint-management-frontend"

:: Maven - check cms-tools first, then common locations
set "MVN_CMD=C:\cms-tools\maven\bin\mvn.cmd"
if not exist "!MVN_CMD!" set "MVN_CMD=C:\Users\%USERNAME%\maven\apache-maven-3.9.6\bin\mvn.cmd"
if not exist "!MVN_CMD!" (
    where mvn >nul 2>&1
    if !errorlevel! equ 0 ( set "MVN_CMD=mvn" ) else (
        echo  [ERROR] Maven not found. Run setup.bat first.
        pause & exit /b 1
    )
)

:: JAVA_HOME - auto-detect if not set
if "!JAVA_HOME!"=="" (
    for /d %%i in ("C:\Program Files\Eclipse Adoptium\jdk-21*") do set "JAVA_HOME=%%i"
    for /d %%i in ("C:\Program Files\Java\jdk-21*") do set "JAVA_HOME=%%i"
    for /d %%i in ("C:\Program Files\Microsoft\jdk-21*") do set "JAVA_HOME=%%i"
)
if "!JAVA_HOME!"=="" (
    echo  [ERROR] JAVA_HOME not set. Run setup.bat first, then open a new CMD.
    pause & exit /b 1
)

:: Get 8.3 short paths to handle & and spaces in directory names
for %%i in ("!BACKEND_DIR!") do set "BACKEND_SHORT=%%~si"
for %%i in ("!FRONTEND_DIR!") do set "FRONTEND_SHORT=%%~si"

:: Check frontend dependencies exist
if not exist "!FRONTEND_SHORT!\node_modules" (
    echo  [WARN] node_modules not found. Running npm install first...
    cd /d "!FRONTEND_SHORT!"
    call npm install
    echo.
)

:: ================================================================
:: [1] Start MySQL
:: ================================================================
echo  [1/3] Starting MySQL...
if exist "C:\xampp\mysql_start.bat" (
    start /min "MySQL" cmd /c "C:\xampp\mysql_start.bat"
    echo        Started via XAMPP.
) else (
    net start MySQL80 >nul 2>&1 || net start MySQL >nul 2>&1
    echo        Started as Windows service.
)
timeout /t 3 /nobreak >nul

:: ================================================================
:: [2] Start Backend (Spring Boot)
:: ================================================================
echo  [2/3] Starting Backend (Spring Boot on port 8080)...

:: Write backend launcher to temp file (avoids & in path breaking cmd /k)
set "BACK_TMP=%TEMP%\cms_backend.bat"
> "!BACK_TMP!" echo @echo off
>> "!BACK_TMP!" echo title CMS Backend - Spring Boot
>> "!BACK_TMP!" echo color 0A
>> "!BACK_TMP!" echo set "JAVA_HOME=!JAVA_HOME!"
>> "!BACK_TMP!" echo cd /d !BACKEND_SHORT!
>> "!BACK_TMP!" echo echo Starting Spring Boot...
>> "!BACK_TMP!" echo "!MVN_CMD!" spring-boot:run
>> "!BACK_TMP!" echo.
>> "!BACK_TMP!" echo Backend stopped. Press any key to close.
>> "!BACK_TMP!" echo pause

start "CMS Backend" cmd /k "!BACK_TMP!"
echo        Window opened. First start takes ~30 seconds to compile.

:: ================================================================
:: [3] Start Frontend (React)
:: ================================================================
echo  [3/3] Starting Frontend (React on port 3000)...
timeout /t 6 /nobreak >nul

:: Write frontend launcher to temp file
set "FRONT_TMP=%TEMP%\cms_frontend.bat"
> "!FRONT_TMP!" echo @echo off
>> "!FRONT_TMP!" echo title CMS Frontend - React
>> "!FRONT_TMP!" echo color 0B
>> "!FRONT_TMP!" echo cd /d !FRONTEND_SHORT!
>> "!FRONT_TMP!" echo echo Starting React...
>> "!FRONT_TMP!" echo node node_modules\react-scripts\bin\react-scripts.js start
>> "!FRONT_TMP!" echo.
>> "!FRONT_TMP!" echo Frontend stopped. Press any key to close.
>> "!FRONT_TMP!" echo pause

start "CMS Frontend" cmd /k "!FRONT_TMP!"
echo        Window opened. Browser will open automatically at http://localhost:3000

echo.
echo  ============================================================
echo    All 3 services starting in separate windows.
echo.
echo    Wait ~30 seconds for the backend to finish compiling,
echo    then open: http://localhost:3000
echo.
echo    Login Credentials:
echo      HOD       : hod_user1 / 123456
echo      Employee  : emp2@gmail.com / 123123
echo      Engineer  : engineer1@example.com / 444444
echo  ============================================================
echo.
pause
