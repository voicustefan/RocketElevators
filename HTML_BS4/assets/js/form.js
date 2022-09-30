/************************************************************/
/***  Logic Code Pertaining to the "REQUEST A QUOTE" Form ***/
/************************************************************/

/***  Validation for the Type of Building ***/
$(document).ready(function() {
    $("#residentialDDL").click(function() {
        $("#residential").attr("hidden", false);
        $("#commercial").attr("hidden", true);
        $("#corporate").attr("hidden", true);
        $("#hybrid").attr("hidden", true);
    });
    $("#commercialDDL").click(function() {
        $("#residential").attr("hidden", true);
        $("#commercial").attr("hidden", false);
        $("#corporate").attr("hidden", true);
        $("#hybrid").attr("hidden", true);
    });
    $("#corporateDDL").click(function() {
        $("#residential").attr("hidden", true);
        $("#commercial").attr("hidden", true);
        $("#corporate").attr("hidden", false);
        $("#hybrid").attr("hidden", true);
    });
    $("#hybridDDL").click(function() {
        $("#residential").attr("hidden", true);
        $("#commercial").attr("hidden", true);
        $("#corporate").attr("hidden", true);
        $("#hybrid").attr("hidden", false);
    });
});
/*** Global Variables***/
var numberElevators; 
var installationFee;
var numberOccupantsPerFloor;
var numberFloors;
var numberBasements;
var totalOccupants;
var numberColumns;
var elevatorPerColumn;
/* If the user chooses "Residential" as "Type of Building" */ 
function numberElevatorsResidential(){
    numberFloors = $("#numberFloorsResidential").val();
    var apartsPerFloor = $("#numberApartsResidential").val() / numberFloors;
    numberElevators = Math.floor(apartsPerFloor / 6);

   if(numberFloors > 20){
      var extraColumns = Math.floor(numberFloors / 20);
      numberElevators = Math.floor((apartsPerFloor / 6)*(extraColumns + 1));
    
   }
    $("#elevators").val(numberElevators);
    $("#numberElevators").attr("hidden", false);
    $("#productLine").attr("hidden", false);
}
/* If the user chooses "Commercial" as "Type of Building" */
function numberElevatorsCommercial(){
    numberElevators = $("#numberElevatorCageCommercial").val();
    
    $("#elevators").val(numberElevators);
    $("#numberElevators").attr("hidden", false);
    $("#productLine").attr("hidden", false);

}
/* If the user chooses "Corporate" as "Type of Building" */
function numberElevatorsCorporate(){
numberOccupantsPerFloor = $("#numberOccupantsPerFloor1").val();
numberFloors = $("#numberFloors1").val() + $("#numberBasements1").val();
totalOccupants = numberOccupantsPerFloor * numberFloors;
numberElevators = totalOccupants / 1000;
numberColumns = numberFloors / 20;
elevatorPerColumn = numberElevators / numberColumns;
numberElevators = elevatorPerColumn * numberColumns;

    $("#elevators").val(numberElevators);
    $("#numberElevators").attr("hidden", false);
    $("#productLine").attr("hidden", false);
    
}
/* If the user chooses "Hybrid" as "Type of Building" */
function numberElevatorsHybrid(){
        numberOccupantsPerFloor = $("#numberOccupantsPerFloor2").val();
        numberFloors = $("#numberFloors2").val() + $("#numberBasements2").val();
        totalOccupants = numberOccupantsPerFloor * numberFloors;
        numberElevators = totalOccupants / 1000;
        numberColumns = numberFloors / 20;
        elevatorPerColumn = numberElevators / numberColumns;
        numberElevators = elevatorPerColumn * numberColumns;
        
            $("#elevators").val(numberElevators);
            $("#numberElevators").attr("hidden", false);
            $("#productLine").attr("hidden", false);
}

/*** Determine the number of lift cages ***/


/*** Validation for the Budget ***/
function determinePrice(){
    let choice = $("input[name='line']:checked").val();
    //alert("choice is " + choice); 
    pricePerElevator(choice);
}

/*** Calculate Price Per Elevator***/
function pricePerElevator(choice){
   if(choice === "Standard"){
    var priceOfElevator = 7565;
    installationFee = 0.1;
    priceElevators(priceOfElevator, numberElevators, installationFee);
 } else if(choice === "Premium"){
    var priceOfElevator = 12345;
    installationFee = 0.13;
    priceElevators(priceOfElevator, numberElevators, installationFee);
 } else if(choice === "Excelium"){
  var priceOfElevator = 15400;
  installationFee = 0.16;
  priceElevators(priceOfElevator, numberElevators, installationFee);
 }
  
}

/*** Calculate Total Price of Elevators***/
function priceElevators(priceOfElevator, numberElevators, installationFee){
    var totalPriceElevators = priceOfElevator * numberElevators;
    installationFees(totalPriceElevators, priceOfElevator, numberElevators, installationFee);
}

/*** Calculate Installation Fees ***/
function installationFees(totalPriceElevators, priceOfElevator, numberElevators, installationFee){
   var finalInstallationFee = totalPriceElevators * installationFee;
  totalPrice(totalPriceElevators, finalInstallationFee, priceOfElevator, numberElevators);
}

/*** Calculate Total Price***/
function totalPrice(totalPriceElevators, finalInstallationFee, priceOfElevator, numberElevators){
   var finalPrice = totalPriceElevators + finalInstallationFee;
   $("#results").attr("hidden", false);
   $("#elevatorz").val(numberElevators);
   $("#unitPrice").val(priceOfElevator + "$");
   $("#totalPrice").val(totalPriceElevators + "$");
   $("#fees").val(finalInstallationFee + "$");
   $("#finalPrice").val(finalPrice + "$");
}
