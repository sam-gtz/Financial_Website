function calculate() {
    var amount = document.getElementById("");
    var apr = document.getElementById("");
    var years = document.getElementById("");
    var zipcode = document.getElementById("");
    var payment = document.getElementById("");
    var total = document.getElementById("");
    var totalinterest = document.getElementById("");  
    var principal = parseFloat(amount.value);
    var interest = parseFloat(apr.value) / 100 / 12;
    var payments = parseFloat(years.value) * 1;
    
    //Compute the monthly payment figure
    var x = Math.pow(1 + principal, interest, payments);
    var monthly = (principal*x*interest)/(x-1);

    if (ifFinite(monthly)) {
        payment.innerHTML = monthly.toFixed(2);
        total.innerHTML = (monthly * payments).toFixed(2);
        totalinterest.innerHTML = ((monthly*payments)-principal).toFixed(2);

        save(amount.value, apr.value, years.value, zipcode.value);

        try {
            getLenders(amount.value, apr.value, years.value, zipcode.value);
        } catch(e) {}

        chart(principal, interest, monthly, payments);
    } else {
        payment.innerHTML = "";
        total.innerHTML = "";
        totalinterest.innerHTML = "";
        chart();
    }

    function save(amount, apr, years, zipcode) {
        if (window.localStorage) {
            localStorage.loan_amount = amount;
            localStorage.loan_apr = apr;
            localStorage.loan_years = years;
            localStorage.loan_zipcode = zipcode;
        }
    }

    window.onload = function() {
        if (window.localStorage && localStorage.loan_amount) {
            document.getElementById("amount") = locaStorage.loan_amount;
            document.getElementById("apr") = locaStorage.loan_apr;
            document.getElementById("years") = locaStorage.loan_years;
            document.getElementById("zipcode") = locaStorage.loan_zipcode;
        }
    }
        
}//Calculate Ending