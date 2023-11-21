// Array to store valid entries
var validEntries = [];

function validateForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var dob = new Date(document.getElementById('dob').value);
    var acceptTerms = document.getElementById('acceptTerms').checked;

    var validationMessage = document.getElementById('validationMessage');

    if (name === '' || email === '' || password === '' || !dob || !acceptTerms) {
        validationMessage.innerHTML = 'Please fill in all fields and accept terms and conditions.';
        validationMessage.style.display = 'block';
        return false;
    }

    var age = calculateAge(dob);

    if (age < 18 || age > 55) {
        validationMessage.innerHTML = 'You are not eligible. Age must be between 18 and 55.';
        validationMessage.style.display = 'block';
        return false;
    }

    // If all validations pass, add the entry to the array
    var entry = { name: name, email: email, password: password, dob: dob.toLocaleDateString(), acceptTerms: acceptTerms };
    validEntries.push(entry);

    // Update the table with valid entries
    updateEntryTable();

    // Clear the form
    document.getElementById('registrationForm').reset();

    // If all validations pass, the form will be submitted
    return false;
}

function calculateAge(dob) {
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

function updateEntryTable() {
    var table = document.getElementById('entryDetails');

    // Remove existing rows
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    // Add new rows based on valid entries
    for (var i = 0; i < validEntries.length; i++) {
        var entry = validEntries[i];
        var newRow = table.insertRow(-1);

        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);

        cell1.innerHTML = entry.name;
        cell2.innerHTML = entry.email;
        cell3.innerHTML = entry.password;
        cell4.innerHTML = entry.dob;
        cell5.innerHTML = entry.acceptTerms ? 'Yes' : 'No';
    }
}
