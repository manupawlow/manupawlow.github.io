// let processor = {
//     timerCallback: function() {
//       if (this.video.paused || this.video.ended) {
//         return;
//       }
//       this.computeFrame();
//       let self = this;
//       setTimeout(function () {
//           self.timerCallback();
//         }, 0);
//     },
  
//     doLoad: function() {
//       this.video = document.getElementById("video");
//       this.c1 = document.getElementById("c1");
//       this.ctx1 = this.c1.getContext("2d");
//       this.c2 = document.getElementById("c2");
//       this.ctx2 = this.c2.getContext("2d");
//       let self = this;
//       this.video.addEventListener("play", function() {
//           self.width = self.video.videoWidth / 2;
//           self.height = self.video.videoHeight / 2;
//           self.timerCallback();
//         }, false);
//     },
  
//     computeFrame: function() {
//       this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
//       let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
//           let l = frame.data.length / 4;
  
//       for (let i = 0; i < l; i++) {
//         let r = frame.data[i * 4 + 0];
//         let g = frame.data[i * 4 + 1];
//         let b = frame.data[i * 4 + 2];
//         if (g > 100 && r > 100 && b < 43)
//           frame.data[i * 4 + 3] = 0;
//       }
//       this.ctx1.putImageData(frame, 0, 0);
//       this.ctx2.putImageData(frame, 0, 0);
//       return;
//     }
//   };

// document.addEventListener("DOMContentLoaded", () => {
//   processor.doLoad();
// });


document.addEventListener("DOMContentLoaded", () => {
    function computeFrame() {
        ctx1.drawImage(video, 0, 0, width, height);

        let frame = ctx1.getImageData(0, 0, width, height);

        for (let i = 0; i < frame.data.length / 4; i++) {
            let r = frame.data[i * 4 + 0];
            let g = frame.data[i * 4 + 1];
            let b = frame.data[i * 4 + 2];
            if (g > 100 && r > 100 && b < 43)
                frame.data[i * 4 + 3] = 0;
        }
        ctx1.putImageData(frame, 0, 0);
    }
    
    function timerCallback() {
        if (video.paused || video.ended) {
            return;
        }
        computeFrame();
        setTimeout(function () {
            timerCallback();
        }, 0);
    }
    
    const video = document.getElementById("video");
    const c1 = document.getElementById("c1");
    const ctx1 = c1.getContext("2d");
    const c2 = document.getElementById("c2");
    const ctx2 = c2.getContext("2d");
    let width, height;
    
    video.addEventListener("play", function() {
        width = video.videoWidth / 2;
        height = video.videoHeight / 2;
        timerCallback();
    }, false);    
});