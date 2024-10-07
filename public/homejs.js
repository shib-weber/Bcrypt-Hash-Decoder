const button = document.getElementById('verifyButton');
document.querySelector('#checker').addEventListener('submit',async (e)=>{
    e.preventDefault();

    button.disabled = true;
    button.innerHTML = 'Processing...';


    //const plaint=document.querySelector('#plaint').value
    const hashedt =document.querySelector('#hashedt').value


    function* generateAlphanumericPermutations(length) {
        const chars = '1234567890';
        const n = chars.length;
    
        const indices = Array(length).fill(0); // Starting with first combination
        while (true) {
            // Create the current permutation based on indices
            let permutation = indices.map(i => chars[i]).join('');
            yield permutation;
    
            // Increment the indices to move to the next permutation
            let i = length - 1;
            while (i >= 0 && ++indices[i] === n) {
                indices[i] = 0;
                i--;
            }
            
            // If all indices are 0 again, we've cycled through all permutations
            if (i < 0) {
                document.querySelector('.result').innerHTML='Not a correct Hash'
                button.disabled = false;
                button.innerHTML = 'Decode';
                break;
            }
        }
    }
    
    const generator = generateAlphanumericPermutations(8);
    for (let value of generator) {
        const response= await fetch('/check',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({value,hashedt})
        })

        const result= await response.json()
        console.log(result)
    
        if(result ==='not verified'){
            document.querySelector('.result').innerHTML='Processing...'
        }
        else{
            document.querySelector('.result').innerHTML='Your Password is '+ result
            break
        }
    }

    })
    


