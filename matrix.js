mytable = document.createElement('table');
document.getElementById('tcontainer').appendChild(mytable);

var arrayOfObjects;
var rowsCount=0;
var columnsCount=0;
var arrayOfObjectsClone;
var numberForIllumination;
var arrayOfElementForIllumination;
var arrayOfIdIlluminationOfElements;

var mainModule = (function () {
    var mainModuleObj = {};

    mainModuleObj.buttonClickHandler = function (button){
        button.style.display = "none";
        arraysModule.readData();
        arraysModule.createMatrix();
        arraysModule.createCloneArray();
        tableModule.createTable();
        eventModule.addEventListener();
        mathematicalWithTableModule.fillTableWithData();
        mathematicalWithTableModule.fillAverageBlockWithData();
        mathematicalWithTableModule.fillSumBlockWithData();
        arraysModule.createClassForFindPercent();
    };

    mainModuleObj.buttonClickHandlerForAddNewRow = function () {
        rowsCount++;
        arraysModule.addNewRowInArrayOfObjects();
        arraysModule.addNewRowInCloneArray();
        tableModule.createTableOfnewRow();
        eventModule.addEventListener();
        mathematicalWithTableModule.fillTableWithData();
        mathematicalWithTableModule.fillAverageBlockWithData();
        mathematicalWithTableModule.fillSumBlockWithData();
        arraysModule.createClassForFindPercent();
    };

    mainModuleObj.buttonClickHandlerForDeleteRow = function  () {
        arraysModule.deleteObjFromArray();
        arraysModule.preparationDeleteAmountFromArray();
        tableModule.deleteRow();
        rowsCount--;
        mathematicalWithTableModule.fillAverageBlockWithData();
        mathematicalWithTableModule.fillSumBlockWithData();
    };


     return mainModuleObj;
}());





var arraysModule = (function () {
    var arraysModuleObj = {};

    arraysModuleObj.readData = function (){
        rowsCount = Number(document.getElementById("column").value);
        columnsCount = Number(document.getElementById("row").value);
        numberForIllumination = Number(document.getElementById("numberForIllumination").value);

    };
    arraysModuleObj.createMatrix = function (){
        arrayOfObjects=new Array(rowsCount);
        for(var i=0; i<rowsCount; i++){
            arrayOfObjects[i] = new Array(columnsCount);
            for(var j=0; j<columnsCount; j++){
                arrayOfObjects[i][j]=createDatObject();
            }
        }
    };

    function createDatObject(){
        var obj = {};
        obj.amount = Math.floor(Math.random()*(1000-100))+100;
        obj.id=Math.floor(Math.random()*100000);
        return obj;
    }

    arraysModuleObj.getDataObjectById = function (id){
        var result;
        for( var i=0; i<rowsCount; i++){
            for(var j=0; j<columnsCount; j++){
                if(arrayOfObjects[i][j].id==id){
                    result=arrayOfObjects[i][j];
                }
            }
        }
        return result;
    };

    arraysModuleObj.createCloneArray = function (){
        arrayOfObjectsClone=[];
        for(var i=0; i<rowsCount; i++){
            for(var j=0; j<columnsCount; j++){
                arrayOfObjectsClone.push(arrayOfObjects[i][j]);
            }
        }
    };

    arraysModuleObj.addNewRowInArrayOfObjects = function () {
        arrayOfObjects[rowsCount-1]=[];
        for(var j=0; j<columnsCount; j++){
            arrayOfObjects[rowsCount-1][j]=createDatObject();
        }
    };



    arraysModuleObj.addNewRowInCloneArray = function (){
        for(var j=0; j<columnsCount; j++){
            arrayOfObjectsClone.push(arrayOfObjects[rowsCount-1][j]);
        }
    };


    arraysModuleObj.createTableIdArrayForIdllumination = function (){
        arrayOfIdIlluminationOfElements=[];
        var k=0;
        for (var h=0; h<=numberForIllumination; h++){
            for (var i=0; i<rowsCount*columnsCount-1; i++){
                if(arrayOfObjectsClone[i].amount === arrayOfElementForIllumination[k]){
                    arrayOfIdIlluminationOfElements.push(arrayOfObjectsClone[i].id);
                    k++;
                }
            }
        }
    };

    arraysModuleObj.deleteAmountFromArray = function (id){
        for(var i = 0; i <rowsCount*columnsCount; i++){
            if(arrayOfObjectsClone[i].id === id){
                arrayOfObjectsClone.splice(i,1);
                break;
            }
        }
    };
    arraysModuleObj.deleteObjFromArray = function () {
        arrayOfObjects.splice(rowsCount-1,1);
    };

    arraysModuleObj.preparationDeleteAmountFromArray = function (){
        for(var i=0; i<columnsCount-1; i++){
            arraysModule.deleteAmountFromArray(mytable.rows[rowsCount-1].cells[i].id);
        }
    };

    arraysModuleObj.createClassForFindPercent = function () {
        for (var i=0; i<rowsCount; i++){
            for(var j=0; j<=columnsCount; j++){
                mytable.rows[i].cells[j].className=i;
            }
        }
    };

    return arraysModuleObj;
}());







var tableModule = (function () {

    var tableModuleObj = {};

    tableModuleObj.createTable = function (){
        for(var i=0; i<rowsCount; i++){
            var newrow = mytable.insertRow(i);
            for(var j=0; j<columnsCount+1; j++){
                newCell = newrow.insertCell(j);
            }
        }
        newrow = mytable.insertRow(i);
        for(j=0; j<columnsCount; j++){
             newCell = newrow.insertCell(j);
        }
    };
    tableModuleObj.createTableOfnewRow = function () {
        var newrow = mytable.insertRow(rowsCount-1);
        for(var j=0; j<=columnsCount; j++){
            newCell = newrow.insertCell(j);
        }
    };

    tableModuleObj.illuminationTable = function (){
        for (var i=0; i<arrayOfIdIlluminationOfElements.length; i++){
            document.getElementById(arrayOfIdIlluminationOfElements[i]).style.background= 'linear-gradient(to right, #e50b2f 100%, #e50b2f 0%)';
        }
    };
    tableModuleObj.deleteRow = function () {
        mytable.deleteRow(rowsCount-1);
    };

    tableModuleObj.paintedBlock = function (arrayOfClassElement, percent) {
        var a=0;
        var percent1=(parseInt(percent*100));
        arrayOfClassElement.style.background= 'linear-gradient(to right, #e50b2f '+percent1.toString()+'%, #AFCDE7 '+a.toString()+'%)';
    };

    return tableModuleObj;
}());


var mathematicalWithTableModule = (function () {
    var mathematicalWithTableModuleObj = {};

    mathematicalWithTableModuleObj.fillTableWithData = function (){
        for(var i=0;i<rowsCount;i++){
            for(var j=0; j<columnsCount; j++){
                mytable.rows[i].cells[j].innerHTML=arrayOfObjects[i][j].amount;
                mytable.rows[i].cells[j].id = arrayOfObjects[i][j].id;
            }
        }
    };

    mathematicalWithTableModuleObj.fillAverageBlockWithData = function (){
        for (var i=0; i<columnsCount; i++){
            var sum=0;
            for(var j=0; j<rowsCount; j++){
                sum += arrayOfObjects[j][i].amount;
            }
            mytable.rows[rowsCount].cells[i].innerHTML = (parseInt(sum/columnsCount*10)/10);
        }

    };

    mathematicalWithTableModuleObj.fillSumBlockWithData = function fillSumBlockWithData(){
        for (var i=0; i<rowsCount; i++){
            var sum=0;
            for(var j=0; j<columnsCount; j++){
                sum += arrayOfObjects[i][j].amount;
            }
            mytable.rows[i].cells[columnsCount].innerHTML = sum;
        }
    };

    mathematicalWithTableModuleObj.increaseDataObjectAmount = function (id){
        var obj = arraysModule.getDataObjectById(id);
        obj.amount++;
        eventModule.onMouseOutCell(event);
        eventModule.onMouseOverCell(event);
    };

    mathematicalWithTableModuleObj.changeToPercent = function (classname){
        var arrayOfClassElement=document.getElementsByClassName(classname);
        for (var i=0; i<arrayOfClassElement.length-1; i++) {
            var percent=arrayOfClassElement[i].innerHTML/arrayOfClassElement[arrayOfClassElement.length-1].innerHTML;
            arrayOfClassElement[i].innerHTML=(parseInt(percent*100))+'%';
            tableModule.paintedBlock(arrayOfClassElement[i],percent);
        }
    };

    mathematicalWithTableModuleObj.findNearestElementInArray = function  (amount){
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
            arraysModule.deleteAmountFromArray(resultID);
            minDiff=1000;
        }
    };

    return mathematicalWithTableModuleObj;
}());







var eventModule = (function () {
    var eventModuleObj = {};

    eventModuleObj.addEventListener = function (){
        for(var i=0; i<rowsCount; i++){
            for(var j=0; j<columnsCount; j++){
                mytable.rows[i].cells[j].onclick = onCellClick;
                mytable.rows[i].cells[j].onmouseover = eventModuleObj.onMouseOverCell;
                mytable.rows[i].cells[j].onmouseout =  eventModuleObj.onMouseOutCell;
                mytable.rows[i].cells[columnsCount].onmouseover = onMouseOverSumBlock;
                mytable.rows[i].cells[columnsCount].onmouseout =  onMouseOutSumBlock;

            }
        }
    };

    function onCellClick(event) {
        var id = event.target.id;
        mathematicalWithTableModule.increaseDataObjectAmount(id);
        mathematicalWithTableModule.fillTableWithData();
        mathematicalWithTableModule.fillAverageBlockWithData();
        mathematicalWithTableModule.fillSumBlockWithData();
    }

    eventModuleObj.onMouseOverCell = function (event){
        var obj = arraysModule.getDataObjectById(event.target.id);
        arraysModule.deleteAmountFromArray(obj.id);
        mathematicalWithTableModule.findNearestElementInArray(obj.amount);
        arraysModule.createCloneArray();
        arraysModule.deleteAmountFromArray(obj.id);
        arraysModule.createTableIdArrayForIdllumination();
        tableModule.illuminationTable();
    };

    eventModuleObj.onMouseOutCell = function (event){
        arraysModule.createCloneArray();
        for (var i=0; i<arrayOfIdIlluminationOfElements.length; i++){
            document.getElementById(arrayOfIdIlluminationOfElements[i]).style.background= 'linear-gradient(to right, #AFCDE7 100%, #AFCDE7 0%)';
        }

    };

    function onMouseOverSumBlock(event) {
        mathematicalWithTableModule.changeToPercent(event.target.className);

    }

    function onMouseOutSumBlock(event) {
        var arrayOfClassElement=document.getElementsByClassName(event.target.className);
        for (var i=0; i<arrayOfClassElement.length-1; i++) {
            var cell = arrayOfClassElement[i];
            var object = arraysModule.getDataObjectById(cell.id);
            cell.innerHTML=object.amount;
            cell.style.background = 'linear-gradient(to right, #AFCDE7 100%, #AFCDE7 0%)';
        }
    }

    return eventModuleObj;
}());




























