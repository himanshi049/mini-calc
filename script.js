let currentOperation = '';

function selectOperation(operation) {
    currentOperation = operation;
    
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('inputSection').classList.remove('hidden');
    document.getElementById('result').classList.add('hidden');
    
    const operationNames = {
        'ADD': 'Addition',
        'SUB': 'Subtraction',
        'DIV': 'Division',
        'MULT': 'Multiplication',
        'MOD': 'Modulo (Remainder)',
        'POW': 'Power (Exponent)',
        'SQRT': 'Square Root',
        'PERC': 'Percentage'
    };
    document.getElementById('operationTitle').textContent = operationNames[operation];
    
    const num2Group = document.getElementById('num2').parentElement;
    if (operation === 'SQRT') {
        num2Group.style.display = 'none';
        document.getElementById('num1').parentElement.querySelector('label').textContent = 'Enter number:';
    } else {
        num2Group.style.display = 'block';
        document.getElementById('num1').parentElement.querySelector('label').textContent = 'Enter first number:';
    }
    
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
    document.getElementById('num1').focus();
}

function calculate() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const resultDiv = document.getElementById('result');
    
    if (currentOperation === 'SQRT') {
        if (isNaN(num1)) {
            showResult('Please enter a valid number!', true);
            return;
        }
    } else {
        if (isNaN(num1) || isNaN(num2)) {
            showResult('Please enter valid numbers!', true);
            return;
        }
    }
    
    let result;
    let operationSymbol;
    let error = false;
    
    switch(currentOperation) {
        case 'ADD':
            result = num1 + num2;
            operationSymbol = '+';
            break;
        case 'SUB':
            result = num1 - num2;
            operationSymbol = '-';
            break;
        case 'DIV':
            if (num2 === 0) {
                showResult('Error: Cannot divide by zero!', true);
                return;
            }
            result = num1 / num2;
            operationSymbol = '/';
            break;
        case 'MULT':
            result = num1 * num2;
            operationSymbol = '*';
            break;
        case 'MOD':
            if (num2 === 0) {
                showResult('Error: Cannot perform modulo by zero!', true);
                return;
            }
            result = num1 % num2;
            operationSymbol = '%';
            break;
        case 'POW':
            result = Math.pow(num1, num2);
            operationSymbol = '^';
            break;
        case 'SQRT':
            if (num1 < 0) {
                showResult('Error: Cannot calculate square root of negative number!', true);
                return;
            }
            result = Math.sqrt(num1);
            const resultText = `√${num1} = ${result}`;
            showResult(resultText, false);
            return;
        case 'PERC':
            result = (num1 * num2) / 100;
            const percText = `${num2}% of ${num1} = ${result}`;
            showResult(percText, false);
            return;
    }
    
    const resultText = `${num1} ${operationSymbol} ${num2} = ${result}`;
    showResult(resultText, false);
}

function showResult(message, isError) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p>${message}</p>`;
    resultDiv.classList.remove('hidden');
    
    if (isError) {
        resultDiv.classList.add('error');
    } else {
        resultDiv.classList.remove('error');
    }
}

function goBack() {
    document.getElementById('menu').classList.remove('hidden');
    document.getElementById('inputSection').classList.add('hidden');
    document.getElementById('result').classList.add('hidden');
    
    currentOperation = '';
}

function exitCalculator() {
    if (confirm('Are you sure you want to exit the calculator?')) {
        document.body.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column; color: white;">
                <h1 style="font-size: 48px; margin-bottom: 20px;">👋</h1>
                <h2 style="font-family: 'Courier New', monospace;">Thank you for using Mini Calculator!</h2>
                <p style="font-family: 'Courier New', monospace; margin-top: 10px;">Refresh the page to start again.</p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('#num1, #num2');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculate();
            }
        });
    });
});
