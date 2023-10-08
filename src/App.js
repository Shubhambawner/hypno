import { useEffect, useRef } from "react";
import { ReactMediaRecorder } from "react-media-recorder";

let abs = (a) => a > 0 ? a : -1 * a;
let min = (a, b) => abs(a) < abs(b) ? a : b
let max = (a, b) => a > b ? a : b
let middle = (a, b, c) => {
  if (a > b) {
    if (b > c) return b;
    else if (c > a) return a;
    else return c;
  } else {
    if (a > c) return a;
    else if (c > b) return b;
    else return c;
  }
}

function handleMouseMove(e, videoRef) {
  let top = videoRef.current.offsetTop + e.movementY * 4
  let left = videoRef.current.offsetLeft + e.movementX * 4

  let maxtop = (window.innerHeight - videoRef.current.offsetHeight)
  let maxleft = (window.innerWidth - videoRef.current.offsetWidth)

  videoRef.current.style.left = middle(left, maxleft, 0) + 'px';
  videoRef.current.style.top = middle(top, maxtop, 0) + 'px';
}

const VideoPreview = ({ stream, util }) => {
  const videoRef = useRef(null);
  const { status, startRecording, pauseRecording } = util;


  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;

      // setInterval(() => {
      //   if (videoRef?.current) videoRef.current.style.transform = `scale(${100 + Math.ceil(Math.random() * 20) - 10}%)`
      //   // console.log(videoRef?.current.style.width);
      // }, 1000);
    }
  }, [stream]);

  // if (!stream) {
  //   return null;

  // }
  return <video ref={videoRef}
    onClick={() => {  status !== 'recording' ? startRecording() : pauseRecording(); }}
    onMouseMove={(e) => handleMouseMove(e, videoRef)}
    autoPlay controls
    style={{ position: 'absolute', width: `105%`, border: "2px solid" }} />;
};

const App = () => (
  <ReactMediaRecorder
    screen
    render={({ status, startRecording, pauseRecording, previewStream }) => {
      return (
        <VideoPreview stream={previewStream} util={{ status, startRecording, pauseRecording }} />
      )
    }}
  />
);

export default App