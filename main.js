const { app, BrowserWindow } = require('electron')
const path = require('path')
require('electron-reload')

// 프로그램 창 실행 함수
function createWindow() {
    // 윈도우 창 설정값을 win 상수에 저장
    const win = new BrowserWindow ({
        width: 800,
        height: 600,
        // 창 크기 변경 불가
        resizable: false,
        webPreferences: {
            // require 함수를 호출하기 위해
            // nodeIntegration: true, contextIsolation: false 설정
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    // 윈도우 창에 html 파일을 호출해서 불러온다
    win.webContents.openDevTools()
    win.loadFile(__dirname + '/html/dashboard.html')
}

// app이 준비되면 윈도우창을 생성(프로그램 실행)한다.
app.whenReady().then(createWindow)

// 프로그램을 종료한다.
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit()
    }
})

// BrowerWindow의 창 정보를 가져와서 정보가 없는 경우 프로그램을 실행한다?
app.on('activate', () => {
    if (BrowerWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// add these to the end or middle of main.js

// main.js ----------------------------------------------

const PY_DIST_FOLDER = 'py'
const PY_FOLDER = 'main'
const PY_MODULE = 'main' // without .py suffix

const guessPackaged = () => {
  const fullPath = path.join(__dirname, PY_DIST_FOLDER)
  return require('fs').existsSync(fullPath)
}

const getScriptPath = () => {
  if (!guessPackaged()) {
    return path.join(__dirname, PY_FOLDER, PY_MODULE + '.py')
  }
  if (process.platform === 'win32') {
    return path.join(__dirname, PY_DIST_FOLDER, PY_MODULE, PY_MODULE + '.exe')
  }

  return path.join(__dirname, PY_DIST_FOLDER, PY_MODULE, PY_MODULE)
}

// ----------------------------------------------

let pyProc = null
let pyPort = null

const selectPort = () => {
  pyPort = 5000
  return pyPort
}

const createPyProc = () => {
  let port = '' + selectPort()
  let script = getScriptPath()

  if (guessPackaged()) {
    pyProc = require('child_process').execFile(script, [port])
  } else {
    pyProc = require('child_process').spawn('python', [script, port])
  }

  if (pyProc != null) {
    // console.log(pyProc)
    console.log('child process success on port ' + port)
  }

}

const exitPyProc = () => {
  pyProc.kill()
  pyProc = null
  pyPort = null
}

app.on('ready', createPyProc)
app.on('will-quit', exitPyProc)