$(document).ready(function() {
    $('#tax-form').submit(function(event) {
        event.preventDefault(); 

        let hasErrors = false;

        // ... (validation for age, income, deductions - add your logic here) ...

        if (!hasErrors) {
            let grossIncome = parseFloat($('#gross-income').val());
            let extraIncome = parseFloat($('#extra-income').val());
            let deductions = parseFloat($('#deductions').val());
            let taxableIncome = grossIncome + extraIncome - deductions;

            let taxRate = 0;
            let taxAmount = 0;

            if (taxableIncome > 800000) {
                let excessIncome = taxableIncome - 800000;
                let age = $('#age').val();

                if (age === 'below40') {
                    taxRate = 0.3;
                } else if (age === '40to60') {
                    taxRate = 0.4;
                } else if (age === 'above60') { 
                    taxRate = 0.1;
                }

                taxAmount = excessIncome * taxRate;
            }

            // Prepare modal content
            let modalContent = `
                <div class="modal-header">
                    <h5 class="modal-title">Tax Calculation Results</h5>
                </div>
                <div class="modal-body">
                    <p>Taxable Income (₹): ${taxableIncome.toFixed(2)}</p>
                    <p>Tax Rate: ${taxRate * 100}%</p>
                    <p>Tax Amount (₹): ${taxAmount.toFixed(2)}</p>
                </div>`;

            // Display results in the modal
            $('#resultModal').find('.modal-content').html(modalContent);
            $('#resultModal').modal('show');
        } 
    });
});