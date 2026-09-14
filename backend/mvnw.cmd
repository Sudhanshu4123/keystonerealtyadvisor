@REM ----------------------------------------------------------------------------
@REM Maven Start Up Batch script
@REM ----------------------------------------------------------------------------
@IF "%DEBUG%" == "" @ECHO OFF
@SETLOCAL
SET ERROR_CODE=0

@REM To isolate internal variables from possible post scripts, we use another setlocal
@SETLOCAL

SET MAVEN_PROJECTBASEDIR=%~dp0
IF NOT "%MAVEN_PROJECTBASEDIR%"=="" SET MAVEN_PROJECTBASEDIR=%MAVEN_PROJECTBASEDIR:~0,-1%

SET WRAPPER_JAR="%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar"
SET WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain

@REM Provide a default value for MAVEN_HOME
SET MAVEN_HOME=%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\dists\apache-maven-3.9.6

IF EXIST "%WRAPPER_JAR%" GOTO runMavenWrapper

@REM Download wrapper jar if not present
powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object Net.WebClient).DownloadFile('https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar', '%WRAPPER_JAR%')"

:runMavenWrapper
SET JAVA_EXE=java.exe
IF NOT "%JAVA_HOME%"=="" SET JAVA_EXE="%JAVA_HOME%\bin\java.exe"
%JAVA_EXE% %MAVEN_OPTS% -Dmaven.multiModuleProjectDirectory="%MAVEN_PROJECTBASEDIR%" -jar "%WRAPPER_JAR%" %*
IF ERRORLEVEL 1 GOTO error
GOTO end

:error
SET ERROR_CODE=1

:end
@ENDLOCAL & SET ERROR_CODE=%ERROR_CODE%
EXIT /B %ERROR_CODE%
