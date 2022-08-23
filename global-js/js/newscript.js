
$(".frame2").click(()=>{

    if($(".frame2").val()==1) {
        $(".pattern").show();
        $(".frame2").val(2);
    }
    else {$(".frame2").val()==2
        $(".pattern").hide();
        $(".frame2").val(1);
    }
});

$(".inpat").click(()=>{

    if($(".inpat").val()==1) {
        $(".innerpattern").show();
        $(".inpat").val(2);
    }
    else {$(".inpat").val()==2
        $(".innerpattern").hide();
        $(".inpat").val(1);
    }
});

$("#p1").click(()=>{
    removePlaceholder(canvas,"frames");
    $(".pattern").css("border-width","1px");
    $("#p1").css("border-width","5px")
    frameUrl = 1;
    addFrame();
});

$("#p2").click(()=>{
    removePlaceholder(canvas,"frames");
    $(".pattern").css("border-width","1px");
    $("#p2").css("border-width","5px");
    frameUrl = 2;
    addFrame();
});

$("#p3").click(()=>{
    removePlaceholder(canvas,"frames");
    $(".pattern").css("border-width","1px");
    $("#p3").css("border-width","5px");
    frameUrl = 3;
    addFrame();
});

$("#p4").click(()=>{
    removePlaceholder(canvas,"frames");
    $(".pattern").css("border-width","1px");
    $("#p4").css("border-width","5px");
    frameUrl = 4;
    addFrame();
});

$("#p5").click(()=>{
    removePlaceholder(canvas,"frames");
    $(".pattern").css("border-width","1px");
    $("#p5").css("border-width","5px");
    frameUrl = 5;
    addFrame();
});

$("#ip1").click(()=>{
    removePlaceholder(canvas,"innerframe");
    $(".innerpattern").css("border-width","1px");
    $("#ip1").css("border-width","5px")
    innerframeUrl = 1;
    addInnerFrame();
});

$("#ip2").click(()=>{
    removePlaceholder(canvas,"innerframe");
    $(".innerpattern").css("border-width","1px");
    $("#ip2").css("border-width","5px");
    innerframeUrl = 2;
    addInnerFrame();
});

$("#ip3").click(()=>{
    removePlaceholder(canvas,"innerframe");
    $(".innerpattern").css("border-width","1px");
    $("#ip3").css("border-width","5px");
    innerframeUrl = 3;
    addInnerFrame();
});

$("#ip4").click(()=>{
    removePlaceholder(canvas,"innerframe");
    $(".innerpattern").css("border-width","1px");
    $("#ip4").css("border-width","5px");
    innerframeUrl = 4;
    addInnerFrame();
});

$("#ip5").click(()=>{
    removePlaceholder(canvas,"innerframe");
    $(".pattern").css("border-width","1px");
    $("#ip5").css("border-width","5px");
    innerframeUrl = 5;
    addInnerFrame();
});

$("#inhex").on("click", ()=>{
    removePlaceholder(canvas,"innerframe");
    $(".innerpattern").css("border-width","1px");
   $("#inhex").css("border-width","5px");
   innerframeUrl = 6;
   addInnerFrame();
})
// $("#p6").click(()=>{
//     $(".pattern").css("border-width","1px");
//     $("#p6").css("border-width","5px");
//     frameUrl = 6;
//     addFrame();
// });


$(".frame1").click(()=>{
    if(frameFlag==0){
        frameFlag = 1;    
        $(".frame1").html("Apply Frame");
        removePlaceholder(canvas,"frames");
    }
    else{
        frameFlag = 0; 
        $(".frame1").html("Cancel Frame");
        addFrame();

    }        
});

$("#thickness").on("change",()=>{

    if($("#thickness").val()!=""){
        removePlaceholder(canvas,"frames");
        if(dimensFlag==0){
        thickFrame = Number($("#thickness").val());
        }
        else{
        thickFrame = Number($("#thickness").val())*2.54; 
        }
        addFrame();
    }
});

$("#innerthick").on("change",()=>{

    if($("#innerthick").val()!=""){
        var cash = innerthickFrame;

        if(dimensFlag==0){
            innerthickFrame = Number($("#innerthick").val());
        }
        else{
            innerthickFrame = Number($("#innerthick").val())*2.54; 
        }
        
        canvas.forEachObject(function(obj) {
            if (obj.id && obj.id === "artwork") 
            {
                
                obj.set("left", obj.left + (innerthickFrame-cash));
                obj.set("top", obj.top + (innerthickFrame-cash));
  
                obj.set("scaleX", (artWorkWidth-2*innerthickFrame)/obj.width);
                obj.set("scaleY", (artWorkHeight-2*innerthickFrame)/obj.height);

                canvas.renderAll();
            }
        });
    }
});

$(".link").on("click",()=>{
    if(lockFlag == 0) {
        lockFlag = 1;
        $(".link").html("unLinked");
    }
    else {
        lockFlag = 0;
        $(".link").html("Linked");
    }
})

$(".select2").change(()=>{

    if($(".select2").val()=="cm")
    {
        dimensFlag = 0;
        $("#wd").val($("#wd").val()*2.54);
        $("#hd").val($("#hd").val()*2.54);
        $("#wd").change();
        $("#hd").change();
        $("#thickness").val($("#thickness").val()*2.54);
        $("#innerthick").val($("#innerthick").val()*2.54);
    }
    else{
        dimensFlag = 1;
        $("#wd").val($("#wd").val()/2.54);
        $("#hd").val($("#hd").val()/2.54);
        $("#wd").change();
        $("#hd").change();
        $("#thickness").val($("#thickness").val()/2.54);
        $("#innerthick").val($("#innerthick").val()/2.54);
    }
  });

  $(".select1").change(()=>{

    if($(".select1").val()=="paint")
    {
        printFlag = 0;
        $("#inner").css("display","none");
        $("#outer").css("display","inline");
        removePlaceholder(canvas,"innerframe");
        canvas.forEachObject(function(obj) {
            if (obj.id && obj.id === "artwork") 
            {             
                obj.left = artWorkLeft;
                obj.top = artWorkTop;
                obj.set("scaleX", artWorkWidth/obj.width);
                obj.set("scaleY", artWorkHeight/obj.height);
          
                canvas.renderAll();
            }
        });
    }
    else{
        printFlag = 1;
        $("#outer").css("display","none");
        $("#inner").css("display","inline");

        addInnerFrame();

        canvas.forEachObject(function(obj) {
            if (obj.id && obj.id === "artwork") 
            {             
                obj.left = artWorkLeft + innerthickFrame;
                obj.top = artWorkTop + innerthickFrame;
                obj.set("scaleX", (artWorkWidth - 2*innerthickFrame)/obj.width);
                obj.set("scaleY", (artWorkHeight - 2*innerthickFrame)/obj.height);

                canvas.renderAll();
            }
        });
    }
  });

  $("#inhex").on("focus", ()=>{
    var interval = setInterval(() => {
       
        canvas.forEachObject(function(obj) {
            if (obj.id && obj.id === "innerframe") 
            {
                obj.set("fill",  $("#inhex").val());
                canvas.renderAll();
            }
        });
    }, 20);

  $("#inhex").on("focusout", ()=>{
    clearInterval(interval);
  })
});


$("#wd").change(()=>{
    if(dimensFlag==0){
        var val = Number($("#wd").val());
    }
    else{
        var val = Number($("#wd").val())*2.54;
    }
    if(lockFlag == 0){
        canvas.forEachObject(function(obj) {
            if (obj.id && obj.id === "artwork") 
            {
                
                artWorkWidth = val;
                artWorkHeight =artWorkWidth/ (obj.width/obj.height);
   
                 if(printFlag==0){ 
                obj.set("scaleX", artWorkWidth/obj.width);
                obj.set("scaleY", artWorkHeight/obj.height);
                 }

                 else {

                    obj.set("scaleX", (artWorkWidth-2*innerthickFrame)/obj.width);
                    obj.set("scaleY", (artWorkHeight-2*innerthickFrame)/obj.height);

                    canvas.forEachObject(function(inner) {
                        if (inner.id && inner.id === "innerframe") 
                        {
                            inner.set("scaleX", (artWorkWidth)/inner.width);
                            inner.set("scaleY", (artWorkHeight)/inner.height);
                            canvas.renderAll();
                        }
                    });
                 }

                removePlaceholder(canvas,"frames");
                addFrame();
                canvas.renderAll();

                 $("#hd").val( Number($("#wd").val())/(obj.width/obj.height));
                $(".dimen").val(parseInt(Number($("#wd").val())) +"X" + parseInt(Number($("#hd").val())));
            }
        });
    }
    else {
                artWorkWidth = val;
 
                if(printFlag==0){              
                    newpaintImg();
                }
                else {
                    newprintImg();

                    canvas.forEachObject(function(inner) {
                        if (inner.id && inner.id === "innerframe") 
                        {
                            inner.set("scaleX", (artWorkWidth)/inner.width);
                            canvas.renderAll();
                        }
                    });
                 }

                removePlaceholder(canvas,"frames");
                addFrame();             
                canvas.renderAll();

                $(".dimen").val(parseInt(Number($("#wd").val())) +"X" + parseInt(Number($("#hd").val())));
    }

});

$("#hd").change(()=>{
    if(dimensFlag==0){
       var val = Number($("#hd").val());
    }
    else {
       var val = Number($("#hd").val())*2.54;
    }
    if(lockFlag == 0){
        canvas.forEachObject(function(obj) {
            if (obj.id && obj.id === "artwork") 
            {           
                artWorkHeight = val;
                artWorkWidth =artWorkHeight/ (obj.height/obj.width);

                if(printFlag==0){
                obj.set("scaleX", artWorkWidth/obj.width);                
                obj.set("scaleY", artWorkHeight/obj.height);
                }
                else {

                    obj.set("scaleX", (artWorkWidth-2*innerthickFrame)/obj.width);
                    obj.set("scaleY", (artWorkHeight-2*innerthickFrame)/obj.height);
               
                    canvas.forEachObject(function(inner) {
                        if (inner.id && inner.id === "innerframe") 
                        {
                            inner.set("scaleX", (artWorkWidth)/inner.width);
                            inner.set("scaleY", (artWorkHeight)/inner.height);
                            canvas.renderAll();
                        }
                    });
                 }
                removePlaceholder(canvas,"frames");
                addFrame();             
                canvas.renderAll();

                $("#wd").val(Number($("#hd").val())/(obj.height/obj.width));
                $(".dimen").val(parseInt(Number($("#wd").val())) +"X" + parseInt(Number($("#hd").val())));
            }
        });
    }
    else {
                artWorkHeight = val;
                if(printFlag==0){
                    newpaintImg();
                }
                else {
                    newprintImg();
                canvas.forEachObject(function(inner) {
                    if (inner.id && inner.id === "innerframe") 
                    {
                        inner.set("scaleY", (artWorkHeight)/inner.height);
                        canvas.renderAll();
                    }
                });
                }
                removePlaceholder(canvas,"frames");
                addFrame();             
                canvas.renderAll();
                $(".dimen").val(parseInt(Number($("#wd").val())) +"X" + parseInt(Number($("#hd").val())));
            }
});


function deselectall(event){
    if(event.target===finish[0]){

        canvas.forEachObject(function(obj) {
            obj.selectable = false;
            obj.hasBorders = false;
            canvas.renderAll();
            canvas.discardActiveObject();
            obj.selectable = true;
            obj.hasBorders = true;
        })
    }      
}
// apply frames

function addFrame(){

    var urlTop = "../frames/" + frameUrl + "/top.jpg";
    var urlRight = "../frames/" + frameUrl + "/right.jpg";
    var urlBottom = "../frames/" + frameUrl + "/bottom.jpg";
    var urlLeft = "../frames/" + frameUrl + "/left.jpg";

    fabric.Image.fromURL(urlTop, function(img){

            var poly = new fabric.Polyline([
                { x: thickFrame, y: thickFrame },
                { x: thickFrame+artWorkWidth, y: thickFrame },
                { x: thickFrame+artWorkWidth+thickFrame, y: 0},
                { x: 0, y: 0 },
                { x: thickFrame, y: thickFrame }
            ], {
            stroke: 'black',
            strokeWidth:0,
            border:"black",
            left: artWorkLeft - thickFrame,
            top: artWorkTop - thickFrame,
            });
 
            var pattern = new fabric.Pattern({source: img.getElement(), offsetX: -20, offsetY: -50});
            poly.set({       
                id:"frames",     
              fill: pattern,
            });

            poly.hasControls = false;
            poly.selectable = false;

            canvas.insertAt(poly,1);
     });


     fabric.Image.fromURL(urlRight, function(img){
 
        var poly = new fabric.Polyline([
            { x: 0, y: 0 },
            { x: 0, y: artWorkHeight },
            { x: thickFrame, y: artWorkHeight + thickFrame},
            { x: thickFrame, y: - thickFrame },
            { x: 0, y: 0 }
        ], {
        stroke: 'black',
        strokeWidth:0,
        left: artWorkLeft + artWorkWidth,
        top: artWorkTop - thickFrame,
        });

        var pattern = new fabric.Pattern({source: img.getElement(), offsetX: -20, offsetY: -50});
        poly.set({       
            id:"frames",     
          fill: pattern,
        });

        poly.hasControls = false;
        poly.selectable = false;
        canvas.insertAt(poly,1);
 });


    fabric.Image.fromURL(urlBottom, function(img){
 
            var poly = new fabric.Polyline([
                { x: 0, y: 0 },
                { x: -thickFrame, y: thickFrame },
                { x: artWorkWidth+thickFrame, y:  thickFrame},
                { x: artWorkWidth, y: 0 },
                { x: 0, y: 0 }
            ], {
            stroke: 'black',
            strokeWidth:0,
            left: artWorkLeft - thickFrame,
            top: artWorkTop + artWorkHeight,
            });

            var pattern = new fabric.Pattern({source: img.getElement(), offsetX: -20, offsetY: -50});
            poly.set({       
                id:"frames",     
              fill: pattern,
            });

            poly.hasControls = false;
            poly.selectable = false;

            canvas.insertAt(poly,1);
     });

     fabric.Image.fromURL(urlLeft, function(img){
        
        var poly = new fabric.Polyline([
            { x: 0, y: 0 },
            { x: -thickFrame, y: -thickFrame },
            { x: -thickFrame, y: artWorkHeight + thickFrame},
            { x: 0, y: artWorkHeight },
            { x: 0, y: 0 }
        ], {
        stroke: 'black',
        strokeWidth:0,
        borderWidth:0,
        left: artWorkLeft - thickFrame,
        top: artWorkTop - thickFrame,
        });

        var pattern = new fabric.Pattern({source: img.getElement(), offsetX: -20, offsetY: -50});
        poly.set({       
            id:"frames",     
          fill: pattern,
          borderWidth : 0,
        });

        poly.hasControls = false;
        poly.selectable = false;
        poly.borderColor = 'blcak';
        canvas.insertAt(poly,1);
    });
 }

  function addInnerFrame() {

  if(innerframeUrl == 6){
    var innerColor = new fabric.Rect({
        id: "innerframe",
        width: artWorkWidth,
        height: artWorkHeight,
        left:artWorkLeft,
        top:artWorkTop,
        fill:$("#inhex").val(),
        hasControls: false,
        strokeWidth:1,
        borderScaleFactor:3,
        borderColor:'lightblue',
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        });
    canvas.insertAt(innerColor, 1);
  }
    else{
        var inUrl = "../frames/" + innerframeUrl + "/icon.jpg";
    
    fabric.Image.fromURL(inUrl, function(img){

        img.hasControls = false;
        img.id = "innerframe";
        img.stroke="white";
        img.borderScaleFactor = 1;
        img.borderWidth = 0;
        img.borderColor = "white";
        img.left = artWorkLeft;
        img.top = artWorkTop;
        img.selectable = false;
        img.scaleToHeight(artWorkHeight);
        img.set("scaleX", (artWorkWidth)/img.width);
        canvas.insertAt(img,2);
        canvas.renderAll();
    });
    }
  }

// $(".check").click(()=>{
//     var val1 =Number($("#OriginWidth").val());
//     var val2 =Number($("#OriginHeight").val());
//     if(val1 && val2){
//         $(".dismiss").click();
//         $("#wd").val(val1);
//         $("#hd").val(val2);
//     }
//     else {
//         $(".validation").show();
//     }
// });



  function newpaintImg(){
    removePlaceholder(canvas, 'artwork');

    var url = artWorkUrl;

    fabric.Image.fromURL(url, function(img){
        img.hasControls = false;
        img.id = "artwork";
        img.top = artWorkTop
        img.left = artWorkLeft;
        img.stroke="white";
        img.borderColor = "blue";
        img.borderScaleFactor = 2;

        if((artWorkWidth/artWorkHeight) >=  (img.width/img.height)){
            img.scaleToWidth(artWorkWidth);           
            img.cropY = ((img.height*img.scaleY-artWorkHeight)/2)/img.scaleY;
            img.height = artWorkHeight/img.scaleY;       
        }

        else{
            img.scaleToHeight(artWorkHeight);
            img.cropX = ((img.width*img.scaleX-artWorkWidth)/2)/img.scaleX;
            img.width = artWorkWidth/img.scaleX;
        }

          canvas.insertAt(img, 2);
          canvas.renderAll();
  
    }, 
    {crossOrigin: 'anonymous'}
    )
   }

    function newprintImg(){
        removePlaceholder(canvas, 'artwork');
    
        var url = artWorkUrl;
    
        fabric.Image.fromURL(url, function(img){
      
            img.hasControls = false;
            img.id = "artwork";
            img.top = artWorkTop+innerthickFrame;
            img.left = artWorkLeft + innerthickFrame;
            img.stroke="white";
            img.borderColor = "blue";
            img.borderScaleFactor = 2;
    
            if((artWorkWidth/artWorkHeight) >=  (img.width/img.height)){
                img.scaleToWidth(artWorkWidth-2*innerthickFrame);           
    
                img.cropY = ((img.height*img.scaleY-(artWorkHeight-2*innerthickFrame))/2)/img.scaleY;
                img.height = (artWorkHeight-2*innerthickFrame)/img.scaleY;
                
            }
            else{
                img.scaleToHeight(artWorkHeight-2*innerthickFrame);
                img.cropX = ((img.width*img.scaleX-(artWorkWidth-2*innerthickFrame))/2)/img.scaleX;
                img.width = (artWorkWidth-2*innerthickFrame)/img.scaleX;
    
            }  
              canvas.insertAt(img, 2);
              canvas.renderAll();
      
        }, 
        {crossOrigin: 'anonymous'}
        )
    }