const loginFormHandler = async (event) => {
    event.preventDefault();

    //collect email & password values from form
    const email = document.querySelector('#email-login').value.trim(); 
    const password = document.querySelector('#password-login').value.trim();

    if(email && password){
        //Send a request to API endpoint
        const response = await fetch('/api/users/login', { //TODO: Problem is here
            method: 'POST',
            body:JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'}
        });

        if(response.ok){
            //if success redirect to order page
            document.location.replace('/orders');
        }else{
            alert(response.statusText);
        }
    }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);