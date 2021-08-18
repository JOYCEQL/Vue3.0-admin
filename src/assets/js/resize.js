/*
 * @Author: yuguangzhou
 * @Date: 2021-05-22 14:53:33
 * @LastEditTime: 2021-05-22 16:42:58
 * @LastEditors: yuguangzhou
 * @Description:  可视化缩放
 */
export  function screenSize(editorDom) {
    let screenWidth = document.body.clientWidth || document.documentElement.clientWidth;
    let screenHeight = document.body.clientHeight || document.documentElement.clientHeight;
    let defWidth = 1920;
    let defHeight = 1080;
    let xScale = screenWidth / defWidth;
    let yScale = screenHeight / defHeight;
    // editorDom.style.cssText += ';transform: scale(' + xScale + ',' + yScale + ')';
    editorDom.style.transform = `scale(${xScale} , ${yScale})`

    window.onresize=(() => {
      let screenWidth = document.body.clientWidth || document.documentElement.clientWidth;
      let screenHeight = document.body.clientHeight || document.documentElement.clientHeight;
      xScale = screenWidth / defWidth;
      yScale = screenHeight / defHeight;
    //   editorDom.style.cssText += ';transform: scale(' + xScale + ',' + yScale + ')';
    editorDom.style.transform = `scale(${xScale} , ${yScale})`

    })
  }