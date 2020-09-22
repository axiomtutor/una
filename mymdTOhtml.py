import sys
from pathlib import PurePosixPath, Path

'''
Establishing file paths, open files
'''
mymdPath = PurePosixPath(Path.cwd() / sys.argv[1])
mymd = open(mymdPath, "r")

# Slice the directory where the mymd file is located.
dir = mymdPath.parent
# Slice the file name
name = mymdPath.name

askingPath = "/home/addem/Desktop/asking"

template = open(Path(askingPath + "/html/notes/noteTemplate.html"), "r")

html = open(dir / (name[:-4] + ".html"), "w")

'''
Write the HTML top matter
'''
# First several lines always copy over
for i in range(10):
    html.write(template.readline())

htmlLine = '    <link rel="stylesheet" href="' + askingPath + '/css/notes.css">'
html.write(htmlLine)
template.readline()

mymdLine = mymd.readline()
if not (mymdLine[:8] == 'Title - '):
    print("\nTitle not formatted properly.  It should look like 'Title - ...'")
htmlLine = '    <title>' + mymdLine[8:] + '</title>'
html.write(htmlLine)
template.readline()

'''
Copy over the remaining top matter and code for the navbar
'''
# lines 13 to 19
for i in range(7):
    html.write(template.readline())
# line 20
htmlLine = '          <a href="' + askingPath + \
  'html/notes/index.html">Notes</a> <a href="' + askingPath + \
  'community/">Community</a>'
html.write(htmlLine)
template.readline()
# lines 21 to 25
for i in range(5):
    html.write(template.readline())


'''
Close it up!
'''
template.close()
html.close()
mymd.close()
