
// v0.01, 07/1/2025
//  v0.02, 07/1/2025
//  v0.03, 07/1/2025

class sampleContainer {
    
    varAlbumin=38.47;
    varCreatinine=79.12;
    varGlucoseSerum=7.04;
    varC_reactiveProtein=1.4;
    varLymphocyte_percent=21.71;
    varMean_red_cell_volume=91.35;
    varRed_cell_distribution_width=13.18;
    varAlkaline_phosphatase=87.04;
    varWhite_blood_cell_count=8.53;
    varAge=72.36;

    constructor() {}
}

class PhenoAgeCalculator {
  XBIntercept = -19.907;
  weightAlbumin = -0.0336;
  weightCreatinine = 0.0095;
  weightGlucoseSerum = 0.1953;
  weightC_reactiveProtein = 0.0954;
  weightLymphocyte_percent = -0.012;
  weightMean_red_cell_volume = 0.0268;
  weightRed_cell_distribution_width = 0.3306;
  weightAlkaline_phosphatase = 0.00188;
  weightWhite_blood_cell_count = 0.0554;
  weightAge = 0.0804;

  globalVarAlbumin = null;
  globalVarCreatinine = null;
  globalVarGlucoseSerum = null;
  globalVarC_reactiveProtein = null;
  globalVarLymphocyte_percent = null;
  globalVarMean_red_cell_volume = null;
  globalVarRed_cell_distribution_width = null;
  globalVarAlkaline_phosphatase = null;
  globalVarWhite_blood_cell_count = null;
  globalVarAge = null;

  globalXB = null;
  globalMortalityScore = null;
  globalPhenotypicAge = null;
  globalPhenotypicAccelaration = null;

  constructor() {}

  calculateXB() {
    let localXB =
      this.XBIntercept +
      this.weightAlbumin *  this.globalVarAlbumin +
      this.weightCreatinine *  this.globalVarCreatinine +
      this.weightGlucoseSerum *  this.globalVarGlucoseSerum +
      this.weightC_reactiveProtein * Math.log( this.globalVarC_reactiveProtein) +
      this.weightLymphocyte_percent *  this.globalVarLymphocyte_percent +
      this.weightMean_red_cell_volume *  this.globalVarMean_red_cell_volume +
      this.weightRed_cell_distribution_width * this.globalVarRed_cell_distribution_width +
      this.weightAlkaline_phosphatase *  this.globalVarAlkaline_phosphatase +
      this.weightWhite_blood_cell_count *  this.globalVarWhite_blood_cell_count +
      this.weightAge *  this.globalVarAge;

    return localXB;
  }

  calculateMortarityScore(getXB) {
    let localMortarityScore =
      1 - Math.exp(  (-1.51714 * Math.exp(getXB) ) / 0.0076927);

    return localMortarityScore;
  }

  calculatePhenotypicAge(
    getAlbumin,
    getCreatinine,
    getGlucoseSerum,
    getC_reactiveProtein,
    getLymphocyte_percent,
    getMean_red_cell_volume,
    getRed_cell_distribution_width,
    getAlkaline_phosphatase,
    getWhite_blood_cell_count,
    getAge
  ) {
    this.globalVarAlbumin = getAlbumin;
    this.globalVarCreatinine = getCreatinine;
    this.globalVarGlucoseSerum = getGlucoseSerum;
    this.globalVarC_reactiveProtein = getC_reactiveProtein;
    this.globalVarLymphocyte_percent = getLymphocyte_percent;
    this.globalVarMean_red_cell_volume = getMean_red_cell_volume;
    this.globalVarRed_cell_distribution_width = getRed_cell_distribution_width;
    this.globalVarAlkaline_phosphatase = getAlkaline_phosphatase;
    this.globalVarWhite_blood_cell_count = getWhite_blood_cell_count;
    this.globalVarAge = getAge;

    this.globalXB = this.calculateXB();
    this.globalMortalityScore = this.calculateMortarityScore(this.globalXB);
    this.globalPhenotypicAge =
      141.5 +
      Math.log(-0.00553 * Math.log(1 - this.globalMortalityScore)) / 0.09165;
    this.globalPhenotypicAccelaration=this.globalPhenotypicAge-this.globalVarAge;

    return this.globalPhenotypicAge;
  }

  getHTMLresult() {
    let localFixedGloablAge=String(Number.parseFloat(this.globalVarAge).toFixed(2));
    let localFixedGlobalPhenotypicAge=String(Number.parseFloat(this.globalPhenotypicAge).toFixed(2));
    let localFixedGlobalAccelaration=String(Number.parseFloat(this.globalPhenotypicAccelaration).toFixed(2));
    let localFixedglobalMortalityScore=String(Number.parseFloat(this.globalMortalityScore*100).toFixed(2));
    let resultHTML, thisDate;

    thisDate = new Date().toLocaleString("el-GR");
    
    resultHTML =
      "<p>"+thisDate+"</p>"+
      "<div class='table-responsive'>" +
      "<table class='table table-bordered border-primary' table-sm>" +
      "<thead>"+
      "<tr>" +
      "<th>Real Age(years)</th>" +
      "<th>PhenoAge(years)</th>" +
      "<th>PhenoAccelaration(years)</th>" +
      "<th>MortalityRisk(percent for the next 10 years)</th>" +
      "</tr>" +
      "</thead>" +
      " <tbody class='table-group-divider'>" +
      "<tr>" +
      "<td>"+ localFixedGloablAge+"</td>" +
      "<td>"+ localFixedGlobalPhenotypicAge +"</td>" +
      "<td>"+localFixedGlobalAccelaration+"</td>" +
      "<td>"+ localFixedglobalMortalityScore+"%"+"</td>" +
      "</tr>" +
      "</tbody>"+
      "</table>" +
      "</div>";

      return(resultHTML)
  }

} // class PhenoAgeCalculator

const isNumeric = (string) => string == Number.parseFloat(string)


function htmlCallcalculatePhenoAge() {

    let varAlbumin,varCreatinine, varGlucoseSerum;
    let varC_reactiveProtein, varLymphocyte_percent;
    let varMean_red_cell_volume, varRed_cell_distribution_width;
    let varAlkaline_phosphatase,varWhite_blood_cell_count;
    let varAge;


    varAlbumin=parseFloat(document.getElementById("input_Albumin").value);
    varCreatinine=parseFloat(document.getElementById("input_Creatinine").value);
    varGlucoseSerum=parseFloat(document.getElementById("input_Glucose_serum").value);
    varC_reactiveProtein=parseFloat(document.getElementById("input_C_reactive_protein").value);
    varLymphocyte_percent=parseFloat(document.getElementById("input_Lymphocyte_percent").value);
    varMean_red_cell_volume=parseFloat(document.getElementById("input_Mean_red_cell_volume").value);
    varRed_cell_distribution_width=parseFloat(document.getElementById("input_Red_cell_distribution_width").value);
    varAlkaline_phosphatase=parseFloat(document.getElementById("input_Alkaline_phosphatase").value);
    varWhite_blood_cell_count=parseFloat(document.getElementById("input_White_blood_cell_count").value);
    varAge=parseFloat(document.getElementById("input_Age").value);



    console.log(
    "varAlbumin = " + varAlbumin + "\n"+
    "varCreatinine = " + varCreatinine + "\n" +
    "varGlucoseSerum = " + varGlucoseSerum + "\n" +
    "varC_reactiveProtein = " + varC_reactiveProtein + "\n" +
    "varLymphocyte_percent = " + varLymphocyte_percent + "\n" +
    "varMean_red_cell_volume = " + varMean_red_cell_volume + "\n" +
    "varRed_cell_distribution_width = " + varRed_cell_distribution_width + "\n" +
    "varAlkaline_phosphatase = " + varAlkaline_phosphatase + "\n" +
    "varWhite_blood_cell_count = " + varWhite_blood_cell_count + "\n" +
    "varAge = " + varAge + "\n"

    );

    if (!(isNumeric(varAlbumin) && isNumeric(varCreatinine) && isNumeric(varGlucoseSerum)
    && isNumeric(varC_reactiveProtein) && isNumeric(varLymphocyte_percent)
    && isNumeric(varMean_red_cell_volume) && isNumeric(varRed_cell_distribution_width)
    && isNumeric(varAlkaline_phosphatase) &&  isNumeric(varWhite_blood_cell_count)
    && isNumeric(varAge))) {

        document.getElementById("divMsgID").style.color="red"
        //document.getElementById("parMsgID").textContent="Error in entered variables! only numbers allowed.";
        document.getElementById("parMsgID").innerHTML = "Error in entered variables! only numbers allowed.";
        localPhenoAgeCalculator.getHTMLresult()
        return;

    } 

    let localPhenoAgeCalculator = new PhenoAgeCalculator()
    localPhenoAgeCalculator.calculatePhenotypicAge(
      varAlbumin,
      varCreatinine,
      varGlucoseSerum,
      varC_reactiveProtein,
      varLymphocyte_percent,
      varMean_red_cell_volume,
      varRed_cell_distribution_width,
      varAlkaline_phosphatase,
      varWhite_blood_cell_count,
      varAge
    );

    document.getElementById("divMsgID").style.color="black"
    //#document.getElementById("parMsgID").textContent=localPhenoAgeCalculator.globalPhenotypicAge;
    document.getElementById("parMsgID").innerHTML =localPhenoAgeCalculator.getHTMLresult()
  
}

function htmlCallfillWithSample() {
    let localSampleContainer = new sampleContainer()

    document.getElementById("input_Albumin").value=localSampleContainer.varAlbumin;
    document.getElementById("input_Creatinine").value=localSampleContainer.varCreatinine;
    document.getElementById("input_Glucose_serum").value=localSampleContainer.varGlucoseSerum;
    document.getElementById("input_C_reactive_protein").value=localSampleContainer.varC_reactiveProtein;
    document.getElementById("input_Lymphocyte_percent").value=localSampleContainer.varLymphocyte_percent;
    document.getElementById("input_Mean_red_cell_volume").value=localSampleContainer.varMean_red_cell_volume;
    document.getElementById("input_Red_cell_distribution_width").value=localSampleContainer.varRed_cell_distribution_width;
    document.getElementById("input_Alkaline_phosphatase").value=localSampleContainer.varAlkaline_phosphatase;
    document.getElementById("input_White_blood_cell_count").value=localSampleContainer.varWhite_blood_cell_count;
    document.getElementById("input_Age").value=localSampleContainer.varAge;

}
