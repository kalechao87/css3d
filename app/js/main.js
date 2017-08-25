/**
  Author: Kale Chao | FakeCityMan
  Blog: http://kalechao87.github.io/
**/
/**
 *
 * variables
 *
 */

// 禁止页面滚动
function disableBodyMove () {
  $('body').on('touchmove', function (e) {
    e.preventDefault()
  }) // 禁止页面滚动
}

disableBodyMove()

var imgData = {
  logo: ['load/logo2.png', 'load/logo3.png', 'load/logo4.png'],
  bg: [
    'bg/1.png',
    'bg/2.png',
    'bg/3.png',
    'bg/4.png',
    'bg/5.png',
    'bg/6.png',
    'bg/7.png',
    'bg/8.png',
    'bg/9.png',
    'bg/10.png',
    'bg/11.png',
    'bg/12.png',
    'bg/13.png',
    'bg/14.png',
    'bg/15.png',
    'bg/16.png',
    'bg/17.png',
    'bg/18.png',
    'bg/19.png',
    'bg/20.png'
  ]
}

var panoBg = document.querySelector('#pano-bg')
var sliceWidth = 129 // 一张图的宽度
var sliceDeg = 360 / imgData.bg.length // 圆柱图片角度
console.log('sliceDeg is: ' + sliceDeg)
var disR = parseInt(sliceWidth / 2 / Math.tan(sliceDeg / 2 * Math.PI / 180) - 1) // tan@ = 对边(R) / 临边(W/2)
console.log('disR is: ' + disR)
var startDeg = 180
for (var i = 0; i < 20; i++) {
  var span = document.createElement('span')

  span.style.backgroundImage = 'url(images/' + imgData.bg[i] + ')'

  // css(span, "rotateY", startDeg);
  // css(span, "translateZ", -disR);
  // TweenMax.set(span, {z: -disR, rotationY: startDeg, transformOrigin: '50% 50% '+ disR +'px' });
  TweenMax.set(span, {
    z: -disR,
    rotationY: startDeg,
    transformOrigin: '50% 50% ' + disR + 'px'
  })
  panoBg.appendChild(span)
  startDeg -= sliceDeg
  console.log('startDeg is: ' + startDeg)
}

;(function () {
  // setPerc()
})()

/*
  根据当前屏幕的大小，来计算景深 \
  1.固定视野的角度大小，根据这个角度的大小，计算出景深
  2. 保持我和景物之间的距离不变
*/
function setPerc () {
  resteview()
  window.onresize = resteview

  function resteview () {
    var view = document.querySelector('.view__3d')
    var main = document.querySelector('#main')
    var deg = 52.5
    var height = document.documentElement.clientHeight
    var R = Math.round(Math.tan(deg / 180 * Math.PI) * height * 0.5)
    view.style.WebkitPerspective = view.style.perspective = R + 'px'
    css(main, 'translateZ', R)
  }
}

TweenMax.fromTo(
  '.opening__logo',
  2,
  { rotationY: 0 },
  { rotationY: 360, repeat: 1, ease: Power0.easeNone, onComplete: startOpening }
)

function startOpening () {
  var view = document.querySelector('.view__3d')
  var step1 = document.querySelector('.opening__step1')
  var step2 = document.createElement('div')
  var step3 = document.createElement('div')
  var step2Img = new Image()
  var step3Img = new Image()
  step2Img.src = 'images/' + imgData.logo[0]
  step3Img.src = 'images/' + imgData.logo[1]
  step2.classList.add('opening__logo', 'opening__step2')
  step2.appendChild(step2Img)
  view.appendChild(step2)
  step3.classList.add('opening__logo', 'opening__step3')
  step3.appendChild(step3Img)
  view.appendChild(step3)
  TweenMax.fromTo(
    ['.opening__step2', '.opening__step3'],
    2,
    { rotationY: 0 },
    { rotationY: 360, ease: Power0.easeNone, repeat: -1 }
  )

  TweenMax.set([step2, step3], { z: -1000, autoAlpha: 0 })

  var openingAN = new TimelineMax()
  openingAN
    .to('.opening__step1', 1, {
      autoAlpha: 0,
      onComplete: function () {
        view.removeChild(step1)
      }
    })
    .set(step2, { autoAlpha: 1 })
    .to('.opening__step2', 0.3, { z: 0, ease: Power1.easeInOut })
    .to(
      '.opening__step2',
      1,
    {
      z: -1000,
      onComplete: function () {
          view.removeChild(step2)
        }
    },
      '+=2'
    )
    .set('.opening__step3', { autoAlpha: 1 })
    .to('.opening__step3', 0.3, { z: 0, ease: Power1.easeInOut })
    .to(
      '.opening__step3',
      1,
    {
      z: -1000,
      onComplete: function () {
          view.removeChild(step3)
        }
    },
      '+=1'
    )
}
