mytable = document.createElement('table');
document.getElementById('tcontainer').appendChild(mytable);

var arrayOfObjects;
var rowsCount=0;
var columsCount=0;
var arrayOfObjectsClone;
var numberForIllumination;
var arrayOfElementForIllumination;
var arrayOfIdIlluminationOfElements;

function buttonClickHandler(button){
    button.style.display = "none";
    readData();
    createMatrix();
    createCloneArray();
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
    addNewRowInCloneArray();
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

function addNewRowInCloneArray(){
        for(var j=0; j<columsCount; j++){
            arrayOfObjectsClone.push(arrayOfObjects[rowsCount-1][j]);
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

function createCloneArray(){
    arrayOfObjectsClone=[];
    for(var i=0; i<rowsCount; i++){
        for(var j=0; j<columsCount; j++){
             arrayOfObjectsClone.push(arrayOfObjects[i][j]);
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
    onMouseOutCell(event);
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
    deleteAmountFromArray(obj.id);
    findNearestElementInArray(obj.amount);
    createCloneArray();
    deleteAmountFromArray(obj.id);
    createTableIdArrayForIdllumination();
    illuminationTable();
}

function onMouseOutCell(event){
    createCloneArray();
    for (i=0; i<arrayOfIdIlluminationOfElements.length; i++){
        document.getElementById(arrayOfIdIlluminationOfElements[i]).style.background= 'linear-gradient(to right, #AFCDE7 100%, #AFCDE7 0%)';
    }
    
}

function deleteAmountFromArray(id){
    for(var i = 0; i <rowsCount*columsCount; i++){
        if(arrayOfObjectsClone[i].id === id){
            arrayOfObjectsClone.splice(i,1);
            break;
        }
    }
}

function  findNearestElementInArray(amount){
    var i=0;
    var minDiff=1000;
    var result;
    var resultID;
    arrayOfElementForIllumination=[];
    while(arrayOfElementForIllumination.length!==numberForIllumination){
         for(i in arrayOfObjectsClone){
         var min=Math.abs(amount-arrayOfObjectsClone[i].amount);
            if(min<=minDiff){
                minDiff=min;
                result=arrayOfObjectsClone[i].amount;
                resultID=arrayOfObjectsClone[i].id;
            }
        }
        arrayOfElementForIllumination.push(result);
        deleteAmountFromArray(resultID);
        minDiff=1000;
    }
}

function createTableIdArrayForIdllumination(){
    arrayOfIdIlluminationOfElements=[];
    var k=0;
    for (var h=0; h<=numberForIllumination; h++){
        for (var i=0; i<rowsCount*columsCount-1; i++){
                if(arrayOfObjectsClone[i].amount === arrayOfElementForIllumination[k]){
                arrayOfIdIlluminationOfElements.push(arrayOfObjectsClone[i].id);
                k++;
                }
            }    
        }
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
        var percent=arrayOfClassElement[i].innerHTML/arrayOfClassElement[arrayOfClassElement.length-1].innerHTML;
        arrayOfClassElement[i].innerHTML=(parseInt(percent*100))+'%';
        paintedBlock(arrayOfClassElement[i],percent);
    }
}

function paintedBlock(arrayOfClassElement, percent) {
    var a=0;
    var percenta=(parseInt(percent*100));
    arrayOfClassElement.style.background= 'linear-gradient(to right, #e50b2f '+percenta.toString()+'%, #AFCDE7 '+a.toString()+'%)';
}

function onMouseOutSumBlock(event) {
    var arrayOfClassElement=document.getElementsByClassName(event.target.className);
    for (var i=0; i<arrayOfClassElement.length-1; i++) {
        var cell = arrayOfClassElement[i];
        var object = getDataObjectById(cell.id);
        cell.innerHTML=object.amount;
        cell.style.background = 'linear-gradient(to right, #AFCDE7 100%, #AFCDE7 0%)';
    }
}

function  buttonClickHandlerForDeleteRow() {
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
        deleteAmountFromArray(mytable.rows[rowsCount-1].cells[i].id);
    }
}


