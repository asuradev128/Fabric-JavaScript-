function removePlaceholder(canvas, id) {
    canvas.forEachObject(function(obj) {
        if (obj.id && obj.id === id) canvas.remove(obj);
    });
}

var handleUpload = function(event) {
	var url = URL.createObjectURL(event.target.files[0]);
  artWorkUrl = url;
    removePlaceholder(canvas, "artwork");
    removePlaceholder(canvas, "frames");
    removePlaceholder(canvas, "innerframe");
    showImg(url, config);
};

function deleteSelected(){
    if(canvas.getActiveObject().id == "artwork"){
        canvas.remove(canvas.getActiveObject());
        removePlaceholder(canvas, "frames");
    }
}

function addArtwork(){
    var up = document.getElementById("uploadImg");
    up.click();
}

function getColor(){
    var color = document.getElementById("vcolorful").color;

    objectsArr = canvas.getObjects();

    const walls = objectsArr.filter(item => item.id == "wall");

    for(var i = 0 ; i <= walls.length ; i++){
        canvas.setActiveObject(walls[i]);
        canvas.getActiveObject(canvas).set('fill', color);
    }

    canvas.renderAll();
}

function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}

function openWallNav() {
  document.getElementById("myWallSidebar").style.height = "50px";
  // document.getElementById("main").style.marginRight = "50px";
}

function closeWallNav() {
  document.getElementById("myWallSidebar").style.height = "0";
  // document.getElementById("main").style.marginRight = "0";
}

// Generate a color pallete
function generateColorPallete(img){
  const data = getImageData();

}


function showImg(pho, config){

  frameFlag = 0;

  fabric.Image.fromURL(pho, function(img){

      img.hasControls = false;
      removePlaceholder(canvas, 'placeholder');
   
      img.id = "artwork";
      img.top = config.height * 0.2;
      img.left = config.width * 0.3;
      img.stroke="white";
      img.strokeWidth = 0;
      img.borderColor = "blue";
      img.borderScaleFactor = 2;
      img.scaleToHeight(500);

        // img.shadow =  new fabric.Shadow({
        //     color: 'rgba(0,0,0,0.3)',
        //     blur: 15,
        //     offsetX: -20,
        //     offsetY: 20,
        //     nonScaling: true
        // })
      
        artWorkTop = img.top;
        artWorkLeft = img.left;
        artWorkHeight = img.height*img.scaleY;
        artWorkWidth = img.width*img.scaleX;
      if(dimensFlag==0) {
        $("#wd").val(artWorkWidth);
        $("#hd").val(artWorkHeight);
        $(".dimen").val(parseInt(artWorkWidth) +"X" + parseInt(artWorkHeight));}
      else {
        $("#wd").val(artWorkWidth/2.54);
        $("#hd").val(artWorkHeight/2.54);
        $(".dimen").val(parseInt(artWorkWidth/2.54) +"X" + parseInt(artWorkHeight/2.54));
        $("#thickness").val(thickFrame/2.54);
      }

        //insert the image to canvas
        
        if(printFlag ==1){
          addInnerFrame();
        }
        addFrame();

        if(printFlag ==1){
        img.set("scaleX", (artWorkWidth-2*innerthickFrame)/img.width);
        img.set("scaleY", (artWorkHeight-2*innerthickFrame)/img.height);
        img.top = artWorkTop + innerthickFrame;
        img.left = artWorkLeft + innerthickFrame;
        }
        canvas.insertAt(img, 2);
        canvas.renderAll();

  }, 
  {crossOrigin: 'anonymous'}
  )
  }

  function takeScreenshot(){
    var data = canvas.toDataURL();
  }



