var mainModule = (function () {
    var mainModuleObj = {};
    var rowsCount;
    var columnsCount;
    var numberForIllumination;

    mainModuleObj.buttonClickHandler = function (button){
        button.style.display = "none";
        readData();
        dataModule.createMatrix();
        dataModule.createCloneArray();
        tableModule.createTable();
        eventModule.addEventListener();
        tableModule.fillTableWithData();
        tableModule.fillAverageBlockWithData();
        tableModule.fillSumBlockWithData();
        tableModule.createClassForFindPercent();
    };

    mainModuleObj.buttonClickHandlerForAddNewRow = function () {
        rowsCount++;
        dataModule.addNewRowInArrayOfObjects();
        dataModule.addNewRowInCloneArray();
        tableModule.createNewRow();
        eventModule.addEventListener();
        tableModule.fillTableWithData();
        tableModule.fillAverageBlockWithData();
        tableModule.fillSumBlockWithData();
        tableModule.createClassForFindPercent();
    };

    mainModuleObj.buttonClickHandlerForDeleteRow = function  () {
        dataModule.deleteObjFromArray();
        tableModule.preparationDeleteAmountFromArray();
        tableModule.deleteRow();
        rowsCount--;
        tableModule.fillAverageBlockWithData();
        tableModule.fillSumBlockWithData();
    };


    function readData(){
        rowsCount = Number(document.getElementById("column").value);
        columnsCount = Number(document.getElementById("row").value);
        numberForIllumination = Number(document.getElementById("numberForIllumination").value);
    }

    mainModuleObj.getRowsCount = function () {
        return rowsCount;
    };
    mainModuleObj.getColumnsCount = function () {
        return columnsCount;
    };
    mainModuleObj.getNumberForIllumination = function () {
        return numberForIllumination;
    };

    return mainModuleObj;
}());





var dataModule = (function () {
    var dataModuleObj = {};
    var arrayOfObjects;
    var arrayOfObjectsClone;
    var arrayOfElementForIllumination;


    dataModuleObj.arrayOfIdIlluminationOfElements=0;

    dataModuleObj.createMatrix = function (){
        arrayOfObjects=new Array(mainModule.getRowsCount());
        for(var i=0; i<mainModule.getRowsCount(); i++){
            arrayOfObjects[i] = new Array(mainModule.getColumnsCount());
            for(var j=0; j<mainModule.getColumnsCount(); j++){
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

    dataModuleObj.getDataObjectById = function (id){
        var result;
        for( var i=0; i<mainModule.getRowsCount(); i++){
            for(var j=0; j<mainModule.getColumnsCount(); j++){
                if(arrayOfObjects[i][j].id==id){
                    result=arrayOfObjects[i][j];
                }
            }
        }
        return result;
    };

    dataModuleObj.createCloneArray = function (){
        arrayOfObjectsClone=[];
        for(var i=0; i<mainModule.getRowsCount(); i++){
            for(var j=0; j<mainModule.getColumnsCount(); j++){
                arrayOfObjectsClone.push(arrayOfObjects[i][j]);
            }
        }
    };

    dataModuleObj.addNewRowInArrayOfObjects = function () {
        arrayOfObjects[mainModule.getRowsCount()-1]=[];
        for(var j=0; j<mainModule.getColumnsCount(); j++){
            arrayOfObjects[mainModule.getRowsCount()-1][j]=createDatObject();
        }
    };



    dataModuleObj.addNewRowInCloneArray = function (){
        for(var j=0; j<mainModule.getColumnsCount(); j++){
            arrayOfObjectsClone.push(arrayOfObjects[mainModule.getRowsCount()-1][j]);
        }
    };


    dataModuleObj.createTableIdArrayForIdIllumination = function (){
        dataModuleObj.arrayOfIdIlluminationOfElements=[];
        var k=0;
        for (var h=0; h<=mainModule.getNumberForIllumination(); h++){
            for (var i=0; i<mainModule.getRowsCount()*mainModule.getColumnsCount()-1; i++){
                if(arrayOfObjectsClone[i].amount === arrayOfElementForIllumination[k]){
                    dataModuleObj.arrayOfIdIlluminationOfElements.push(arrayOfObjectsClone[i].id);
                    k++;
                }
            }
        }
    };

    dataModuleObj.deleteAmountFromArray = function (id){
        for(var i = 0; i <mainModule.getRowsCount()*mainModule.getColumnsCount(); i++){
            if(arrayOfObjectsClone[i].id === id){
                arrayOfObjectsClone.splice(i,1);
                break;
            }
        }
    };
    dataModuleObj.deleteObjFromArray = function () {
        arrayOfObjects.splice(mainModule.getRowsCount()-1,1);
    };


    dataModuleObj.changeToPercent = function (classname){
        var arrayOfClassElement=document.getElementsByClassName(classname);
        for (var i=0; i<arrayOfClassElement.length-1; i++) {
            var percent=arrayOfClassElement[i].innerHTML/arrayOfClassElement[arrayOfClassElement.length-1].innerHTML;
            arrayOfClassElement[i].innerHTML=(parseInt(percent*100))+'%';
            tableModule.paintedBlock(arrayOfClassElement[i],percent);
        }
    };

    dataModuleObj.findNearestElementInArray = function  (amount){
        var i=0;
        var minDiff=1000;
        var result;
        var resultID;
        arrayOfElementForIllumination=[];
        while(arrayOfElementForIllumination.length!==mainModule.getNumberForIllumination()){
            for(i in arrayOfObjectsClone){
                var min=Math.abs(amount-arrayOfObjectsClone[i].amount);
                if(min<=minDiff){
                    minDiff=min;
                    result=arrayOfObjectsClone[i].amount;
                    resultID=arrayOfObjectsClone[i].id;
                }
            }
            arrayOfElementForIllumination.push(result);
            dataModule.deleteAmountFromArray(resultID);
            minDiff=1000;
        }
    };

    dataModuleObj.getArrayOfObjects = function (i,j ) {
        return arrayOfObjects[i][j];
    };


    return dataModuleObj;
}());







var tableModule = (function () {

    var tableModuleObj = {};

    var myTable = document.createElement('table');
    document.getElementById('tcontainer').appendChild(myTable);

    tableModuleObj.createTable = function (){
        for(var i=0; i<mainModule.getRowsCount(); i++){
            var newRow = myTable.insertRow(i);
            for(var j=0; j<mainModule.getColumnsCount()+1; j++){
                newCell = newRow.insertCell(j);
            }
        }
        newRow = myTable.insertRow(i);
        for(var j=0; j<mainModule.getColumnsCount(); j++){
            newCell = newRow.insertCell(j);
        }
    };
    tableModuleObj.createNewRow = function () {
        var newRow = myTable.insertRow(mainModule.getRowsCount()-1);
        for(var j=0; j<=mainModule.getColumnsCount(); j++){
            newCell = newRow.insertCell(j);
        }
    };

    tableModuleObj.illuminationTable = function (){
        for (var i=0; i<dataModule.arrayOfIdIlluminationOfElements.length; i++){
            document.getElementById(dataModule.arrayOfIdIlluminationOfElements[i]).style.background= 'linear-gradient(to right, #e50b2f 100%, #e50b2f 0%)';
        }
    };
    tableModuleObj.deleteRow = function () {
        myTable.deleteRow(mainModule.getRowsCount()-1);
    };

    tableModuleObj.paintedBlock = function (arrayOfClassElement, percent) {
        var a=0;
        var percent1=(parseInt(percent*100));
        arrayOfClassElement.style.background= 'linear-gradient(to right, #e50b2f '+percent1.toString()+'%, #AFCDE7 '+a.toString()+'%)';
    };

    tableModuleObj.preparationDeleteAmountFromArray = function (){
        for(var i=0; i<mainModule.getColumnsCount()-1; i++){
            dataModule.deleteAmountFromArray(myTable.rows[mainModule.getRowsCount()-1].cells[i].id);
        }
    };
    tableModuleObj.createClassForFindPercent = function () {
        for (var i=0; i<mainModule.getRowsCount(); i++){
            for(var j=0; j<=mainModule.getColumnsCount(); j++){
                myTable.rows[i].cells[j].className=i;
            }
        }
    };

    tableModuleObj.fillTableWithData = function (){
        for(var i=0;i<mainModule.getRowsCount();i++){
            for(var j=0; j<mainModule.getColumnsCount(); j++){
                myTable.rows[i].cells[j].innerHTML=dataModule.getArrayOfObjects(i,j).amount;
                myTable.rows[i].cells[j].id = dataModule.getArrayOfObjects(i,j).id;
            }
        }
    };

    tableModuleObj.fillAverageBlockWithData = function (){
        for (var i=0; i<mainModule.getColumnsCount(); i++){
            var sum=0;
            for(var j=0; j<mainModule.getRowsCount(); j++){
                sum += dataModule.getArrayOfObjects(j,i).amount;
            }
            myTable.rows[mainModule.getRowsCount()].cells[i].innerHTML = (parseInt(sum/mainModule.getColumnsCount()*10)/10);
        }

    };

    tableModuleObj.fillSumBlockWithData = function fillSumBlockWithData(){
        for (var i=0; i<mainModule.getRowsCount(); i++){
            var sum=0;
            for(var j=0; j<mainModule.getColumnsCount(); j++){
                sum += dataModule.getArrayOfObjects(i,j).amount;
            }
            myTable.rows[i].cells[mainModule.getColumnsCount()].innerHTML = sum;
        }
    };

    tableModuleObj.getCell = function fillSumBlockWithData(i,j){
        return myTable.rows[i].cells[j];
    };

    return tableModuleObj;
}());



var eventModule = (function () {
    var eventModuleObj = {};

    eventModuleObj.addEventListener = function (){
        for(var i=0; i<mainModule.getRowsCount(); i++){
            for(var j=0; j<mainModule.getColumnsCount(); j++){
                tableModule.getCell(i, j).onclick = onCellClick;
                tableModule.getCell(i, j).onmouseover = eventModuleObj.onMouseOverCell;
                tableModule.getCell(i, j).onmouseout =  eventModuleObj.onMouseOutCell;
                tableModule.getCell(i,mainModule.getColumnsCount()).onmouseover = onMouseOverSumBlock;
                tableModule.getCell(i,mainModule.getColumnsCount()).onmouseout =  onMouseOutSumBlock;

            }
        }
    };

    function onCellClick(event) {
        var id = event.target.id;
        increaseDataObjectAmount(id);
        tableModule.fillTableWithData();
        tableModule.fillAverageBlockWithData();
        tableModule.fillSumBlockWithData();
    }

    eventModuleObj.onMouseOverCell = function (event){
        var obj = dataModule.getDataObjectById(event.target.id);
        dataModule.deleteAmountFromArray(obj.id);
        dataModule.findNearestElementInArray(obj.amount);
        dataModule.createCloneArray();
        dataModule.deleteAmountFromArray(obj.id);
        dataModule.createTableIdArrayForIdIllumination();
        tableModule.illuminationTable();
    };

    eventModuleObj.onMouseOutCell = function (event){
        dataModule.createCloneArray();
        for (var i=0; i<dataModule.arrayOfIdIlluminationOfElements.length; i++){
            document.getElementById(dataModule.arrayOfIdIlluminationOfElements[i]).style.background= 'linear-gradient(to right, #AFCDE7 100%, #AFCDE7 0%)';
        }

    };

    function onMouseOverSumBlock(event) {
        dataModule.changeToPercent(event.target.className);

    }

    function onMouseOutSumBlock(event) {
        var arrayOfClassElement=document.getElementsByClassName(event.target.className);
        for (var i=0; i<arrayOfClassElement.length-1; i++) {
            var cell = arrayOfClassElement[i];
            var object = dataModule.getDataObjectById(cell.id);
            cell.innerHTML=object.amount;
            cell.style.background = 'linear-gradient(to right, #AFCDE7 100%, #AFCDE7 0%)';
        }
    }

    function increaseDataObjectAmount(id){
        var obj = dataModule.getDataObjectById(id);
        obj.amount++;
        eventModuleObj.onMouseOutCell(event);
        eventModuleObj.onMouseOverCell(event);
    }

    return eventModuleObj;
}());























