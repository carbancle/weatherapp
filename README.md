# electron-python 을 활용한 weatherApp 제작

### 작업환경
- windows 10
- visual studio code 1.67.1
- python 3.7.4
- node v16.15.0

### 플러그인
#### node moudle(npm install / package.json 의 의존성 모듈을 일괄적으로 설치)
#### devDependencies
- electron
- electron-builder
#### dependencies
- bootstrap
- electron-reload
- jquery
- request
- request-promise

#### python(site-packages)
- flask
- pyinstaller

### 작업 참고 사항
* local 환경에서 프로그램을 실행하기 위해서 필요한 설정
```javascript
// python이 설치되지 않은 환경에서 실행 가능하도록 pyinstaller 을 사용해서 .py 파일을 .exe 파일로 변환
// electron 실행 파일 .js 에 다음과 같은 내용 추가 (해당 weatherapp 에서 local server는 flask를 사용했다)

const PY_DIST_FOLDER = 'py'
const PY_FOLDER = 'main'
const PY_MODULE = 'main'

// 프로그램의 packaged 여부를 확인하는 함수. currentFolder/PY_DIST_FOLDER 정보의 존재 여부를 판별한다
// ex) pyinstaller 를 사용하여 python 파일을 exe 화 하였다면 해당 폴더가 생성되었으므로 true
const guessPackaged = () => {
  const fullPath = path.join(__dirname, PY_DIST_FOLDER)
  return require('fs').existsSync(fullPath)
}

const getScriptPath = () => { // 파이썬의 경로를 설정하는 함수
  if (!guessPackaged()) {
    // packaged 되지 않았다면 실행파일.py 값을 반환
    return path.join(__dirname, PY_FOLDER, PY_MODULE + '.py')
  }
  if (process.platform === 'win32') {
    // 사용자 플랫폼이 window인 경우 python 실행파일.exe 값을 반환
    return path.join(__dirname, PY_DIST_FOLDER, PY_MODULE, PY_MODULE + '.exe')
  }

  return path.join(__dirname, PY_DIST_FOLDER, PY_MODULE, PY_MODULE)
}

let pyProc = null
let pyPort = null

const selectPort = () => {
  // port 값 설정 flask의 기본 port인 5000 으로 설정하였다
  pyPort = 5000
  return pyPort
}

const createPyProc = () => {
  let port = '' + selectPort()
  let script = getScriptPath()

  if (guessPackaged()) {
    // 프로그램이 packaged 되었다면 .exe 파일을 실행
    pyProc = require('child_process').execFile(script, [port])
  } else {
    // 프로그램이 packaged 되지 않았다면 .py 파일을 실행
    pyProc = require('child_process').spawn('python', [script, port])
  }

  if (pyProc != null) {
    // console.log(pyProc)
    console.log('child process success on port ' + port)
  }

}

// 프로그램 종료시 값을 초기화시키는 함수
const exitPyProc = () => {
  pyProc.kill()
  pyProc = null
  pyPort = null
}

app.on('ready', createPyProc)
app.on('will-quit', exitPyProc)
```

* electron-builder 을 사용하기 위해 package.json 에 설정한 값 (for windows)
```javascript
"scripts":{
  "build:wind-ia32": "electron-builder --win --ia32",
  "build:win-x64": "electron-builder --win --x64"
  /* npm run build:win-x64 으로 축약하여 명령어 실행을 가능하게 한다. */
},
"build": {
  "productName": "weatherApp",  /* 파일명 */
  "asar": false,                /* app 파일들을 asar 파일로 묶어주는 역할 */
  "win": {
    "target": "nsis"            /* windows 기반의 installer 제작 도구 */
  },
  "nsis": {
    "oneClick": true            /* install 시 oneClick 설치 */
  }
}
```
