set argVersion=%1

del nuspec.list /Q
dir /S /b *.nuspec > nuspec.list
for /f "usebackq delims=" %%F in (nuspec.list) DO (	
	NuGet.exe pack "%%F" -OutputDirectory %%~dpF -Version %argVersion%
)

for /f "usebackq delims=" %%F in (nuspec.list) DO (	
	move "%%~dpF%%~nF.%argVersion%.nupkg" \\buildserver\d$\Publish\NuGets\MonoSoftware.Baasic\
)
