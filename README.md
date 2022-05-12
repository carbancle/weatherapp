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
1. electron-builder 을 사용하기 위해 package.json 에 설정한 값 (for windows)
```json
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
    "oneClick": true            /* 설정의 변경없이 한번에 파일 설치가 된다 */
  }
}
```
