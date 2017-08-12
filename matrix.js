mytable = document.createElement('table');
document.getElementById('tcontainer').appendChild(mytable);

var arrayOfObjects;
var rowsCount=0;
var columsCount=0;
var arrayOfAmountObjects;
var numberForIllumination;
var arrayOfElementForIllumination;
var arrayOfIdIlluminationOfElements;

function buttonClickHandler(button){
    button.style.display = "none";
    readData();
    createMatrix();
    createAmountArray();
    createTable();
    addEventLisener();
    fillTableWithData();
    fillAverageBlockWithData();
    fillSumBlockWithData();
    createClassForFindPercent();
}



function buttonClickHandlerForAddNewRow() {
    rowsCount++;
    addNewRowInArrayOfObjects();
    addNewRowInAmountArray();
    createTableOfnewRow();
    addEventLisener();
    fillTableWithData();
    fillAverageBlockWithData();
    fillSumBlockWithData();
    createClassForFindPercent();
}

function addNewRowInArrayOfObjects() {
        arrayOfObjects[rowsCount-1]=[];
        for(var j=0; j<columsCount; j++){
            arrayOfObjects[rowsCount-1][j]=createDatObject();
        }
}

function createTableOfnewRow() {
    newrow = mytable.insertRow(rowsCount-1);
    for( j=0; j<=columsCount; j++){
        newCell = newrow.insertCell(j);
    }
}

function addNewRowInAmountArray(){
        for(var j=0; j<columsCount; j++){
            arrayOfAmountObjects.push(arrayOfObjects[rowsCount-1][j].amount);
        }
}

function readData(){
   rowsCount = Number(document.getElementById("column").value);
   columsCount = Number(document.getElementById("row").value);
   numberForIllumination = Number(document.getElementById("numberForIllumination").value);

}
function createMatrix(){
    arrayOfObjects=new Array(rowsCount);
    for(var i=0; i<rowsCount; i++){
      arrayOfObjects[i] = new Array(columsCount);
        for(var j=0; j<columsCount; j++){
             arrayOfObjects[i][j]=createDatObject();
        }
    }
}

function createAmountArray(){
    arrayOfAmountObjects=[];
    for(var i=0; i<rowsCount; i++){
        for(var j=0; j<columsCount; j++){
             arrayOfAmountObjects.push(arrayOfObjects[i][j].amount);
        }
    }
}

function createDatObject(){
    var obj = new Object();
    obj.amount = Math.floor(Math.random()*(1000-100))+100;
    obj.id=Math.floor(Math.random()*100000);
    return obj;
}

function createTable(){
    for( i=0; i<rowsCount; i++){
        newrow = mytable.insertRow(i);
            for( j=0; j<columsCount+1; j++){
                 newCell = newrow.insertCell(j);
            }
    }
    newrow = mytable.insertRow(i);
        for( j=0; j<columsCount; j++){
             newCell = newrow.insertCell(j);
        }
}
function fillTableWithData(){
    for(var i=0;i<rowsCount;i++){
        for(var j=0;j<columsCount;j++){
            mytable.rows[i].cells[j].innerHTML=arrayOfObjects[i][j].amount;
            mytable.rows[i].cells[j].id = arrayOfObjects[i][j].id;
        }
    }
}

function fillAverageBlockWithData(){
    for (var i=0; i<columsCount; i++){
        var sum=0;
        for(var j=0; j<rowsCount; j++){
           sum += arrayOfObjects[j][i].amount;
        }
        mytable.rows[rowsCount].cells[i].innerHTML = (parseInt(sum/columsCount*10)/10);
    }
    
}

function fillSumBlockWithData(){
    for (var i=0; i<rowsCount; i++){
        var sum=0;
        for(var j=0; j<columsCount; j++){
           sum += arrayOfObjects[i][j].amount;
        }
        mytable.rows[i].cells[columsCount].innerHTML = sum;
    }
}

function createClassForFindPercent() {
    for (var i=0; i<rowsCount; i++){
        for(var j=0; j<=columsCount; j++){
            mytable.rows[i].cells[j].className=i;
        }
    }
}

function onCellClick(event) {
    var id = event.target.id;
    increaseDataObjectAmount(id);
    fillTableWithData();
    fillAverageBlockWithData();
    fillSumBlockWithData();
}

function increaseDataObjectAmount(id){    
    var obj = getDataObjectById(id);
    obj.amount++;
    onMouseOutCell(event)
    onMouseOverCell(event);
}

function getDataObjectById(id){
    var result;
    for( i=0; i<rowsCount; i++){      
        for( j=0; j<columsCount; j++){
             if(arrayOfObjects[i][j].id==id){
               result=arrayOfObjects[i][j];
             }
        }
    }
    return result;
}


function addEventLisener(){
    for( i=0; i<rowsCount; i++){       
            for( j=0; j<columsCount; j++){
                mytable.rows[i].cells[j].onclick = onCellClick;
                mytable.rows[i].cells[j].onmouseover = onMouseOverCell;
                mytable.rows[i].cells[j].onmouseout =  onMouseOutCell;
                mytable.rows[i].cells[columsCount].onmouseover = onMouseOverSumBlock;
                mytable.rows[i].cells[columsCount].onmouseout =  onMouseOutSumBlock;

            }
    }
}


function onMouseOverCell(event){
    var obj = getDataObjectById(event.target.id);
    deleteAmountFromArray(obj.amount);
    findNearestElementInArray(obj.amount);
    createTableIdArrayForIdllumination();
    illuminationTable();
}

function onMouseOutCell(event){
    createAmountArray();
    for (i=0; i<arrayOfIdIlluminationOfElements.length; i++){
        document.getElementById(arrayOfIdIlluminationOfElements[i]).style.background= 'linear-gradient(to right, #AFCDE7 100%, #AFCDE7 0%)';
    }
    
}

function deleteAmountFromArray(amount){
    for(var i = 0; i <rowsCount*columsCount; i++){
        if(arrayOfAmountObjects[i] === amount){
            arrayOfAmountObjects.splice(i,1);
        }
    }
}

function  findNearestElementInArray(amount){
    var i=0;
    var minDiff=1000;
    var result;
    arrayOfElementForIllumination=[];
    while(arrayOfElementForIllumination.length!==numberForIllumination){
         for(i in arrayOfAmountObjects){ 
         var min=Math.abs(amount-arrayOfAmountObjects[i]);
            if(min<=minDiff){
                minDiff=min;
                result=arrayOfAmountObjects[i];
            }
        }
        arrayOfElementForIllumination.push(result);
        deleteAmountFromArray(result);
        minDiff=1000;
    }
}

function createTableIdArrayForIdllumination(){
    arrayOfIdIlluminationOfElements=[];
    var k=0;
    for (h=0; h<=numberForIllumination; h++){
        for (i=0; i<rowsCount; i++){
            for(j=0; j<columsCount; j++){
                if(arrayOfObjects[i][j].amount === arrayOfElementForIllumination[k]){
                arrayOfIdIlluminationOfElements.push(arrayOfObjects[i][j].id);
                k++;
                }
            }    
        }
    }
    for (var i=0; i<rowsCount; i++){
        for(var j=0; j<columsCount; j++){
           if(arrayOfObjects[i][j].amount === arrayOfElementForIllumination[k]){
               arrayOfIdIlluminationOfElements.push(arrayOfObjects[i][j].id);
               k++;
           }
        }    
    }
    console.log(arrayOfIdIlluminationOfElements);
}

function illuminationTable(){
    for (i=0; i<arrayOfIdIlluminationOfElements.length; i++){
        document.getElementById(arrayOfIdIlluminationOfElements[i]).style.background= 'linear-gradient(to right, #e50b2f 100%, #e50b2f 0%)';
    }
}

function onMouseOverSumBlock(event) {
    changeToPercent(event.target.className);

}
function changeToPercent(classname){
    var arrayOfClassElement=document.getElementsByClassName(classname);
    for (var i=0; i<arrayOfClassElement.length-1; i++) {
        var amount = arrayOfClassElement[i].innerHTML;
        var percent=amount/arrayOfClassElement[arrayOfClassElement.length-1].innerHTML;
        arrayOfClassElement[i].innerHTML=(parseInt(percent*100))+'%';
        paintedBlock(arrayOfClassElement[i],percent);
    }
}

function paintedBlock(arrayOfClassElement, percent) {
    var a=0;
    var percenta=(parseInt(percent*100));
    // arrayOfClassElement.style.backgroundImage.style.visibility = "inline";
    arrayOfClassElement.style.background= 'linear-gradient(to right, #e50b2f '+percenta.toString()+'%, #AFCDE7 '+a.toString()+'%)';
}

function paintedBlockBack() {
    for (var i=0; i<rowsCount; i++){
        for(var j=0; j<columsCount; j++){
            mytable.rows[i].cells[j].style.background = 'linear-gradient(to right, #AFCDE7 100%, #AFCDE7 0%)';
        }
    }
}

function onMouseOutSumBlock(event) {
    fillTableWithData();
    paintedBlockBack();
}
function  buttonClickHandlerForAddDeleteRow() {
    deleteObjFromArray();
    preparationDeleteAmountFromArray();
    deleteRow();
    rowsCount--;
    fillAverageBlockWithData();
    fillSumBlockWithData();


}

function deleteObjFromArray() {
    arrayOfObjects.splice(rowsCount-1,1);
}

function deleteRow() {
    mytable.deleteRow(rowsCount-1);
}

function preparationDeleteAmountFromArray(){
    for(var i=0; i<columsCount-1;i++){
        deleteAmountFromArray(mytable.rows[rowsCount-1].cells[i].amount);
    }
}


